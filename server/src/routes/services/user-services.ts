import { compare, hash } from 'bcryptjs';
import { db } from '../../db/index.js';
import { sign } from 'hono/jwt';
import { usersTable, type InsertUser } from '../../db/schema.js';
import { eq} from 'drizzle-orm';
import supabase from '../../db/supabase.js';
import "dotenv/config";
import { z } from 'zod';
import type { updateUserSchema } from '../../schemas/users-schemas.js';

type CreateUserInput = Omit<InsertUser, 'id' | 'image'> & {
    password: string;
    avatar?: string;
    avatarName?: string;
    avatarType?: string;
};

type UpdateUserInput = { userId: number } & Omit<z.infer<typeof updateUserSchema>, 'password'>;

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024;

export const getUserById = async (id: number) => {
    const [user] = await db
        .select({
            id: usersTable.id,
            email: usersTable.email,
            firstname: usersTable.firstname,
            lastname: usersTable.lastname,
            image: usersTable.image,
            password: usersTable.password,
        })
        .from(usersTable)
        .where(eq(usersTable.id, id));
 
    if (!user) throw new Error('User not found');
    return user;
};

export const getUserByEmail = async (email: string) => {
    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));
 
    if (!user) throw new Error('Invalid credentials');
    return user;
}

export const getUserPasswordById = async (id: number) => {
    const [user] = await db
        .select({ password: usersTable.password })
        .from(usersTable)
        .where(eq(usersTable.id, id));
 
    if (!user) throw new Error('User not found');
    return user.password;
};

export const insertUser = async (data: InsertUser) => {
    const [newUser] = await db
        .insert(usersTable)
        .values(data)
        .returning();
 
    return newUser;
};

export const updateUserFields = async (userId: number, fields: {
    firstname?: string;
    lastname?: string;
    image?: string;
}) => {
     const [updatedUser] = await db
        .update(usersTable)
        .set(fields)
        .where(eq(usersTable.id, userId))
        .returning({
            id:        usersTable.id,
            email:     usersTable.email,
            firstname: usersTable.firstname,
            lastname:  usersTable.lastname,
            image:     usersTable.image,
        });

    return updatedUser;
};

export const deleteUser = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id));
};

export const validatePassword = async (plain: string, hashed: string) => {
    const isValid = await compare(plain, hashed);
    return isValid;
};
 
export const hashPassword = async (password: string) => {
    return await hash(password, 10);
};
 
export const generateToken = async (userId: number, email: string) => {
    return await sign(
        {
            userId,
            email,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        },
        process.env.AUTH_SECRET!,
        'HS256'
    );
};

export const parseAvatarBase64 = (avatarBase64: string) => {
    const base64Data = avatarBase64.replace(/^data:.+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
};

export const getAvatarPublicUrl = (fileName: string) => {
    const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
 
    return data.publicUrl;
};

export const uploadAvatar = async (avatarBase64?: string, avatarName?: string, avatarType?: string) => {
    if (!avatarBase64 || !avatarName) return undefined;
 
    const buffer = parseAvatarBase64(avatarBase64);
    const fileName = `${Date.now()}-${avatarName}`;
 
    await uploadAvatarToStorage(fileName, buffer, avatarType);
 
    return getAvatarPublicUrl(fileName);
};

export const uploadAvatarToStorage = async (fileName: string, buffer: Buffer, avatarType?: string) => {
    const { error } = await supabase.storage
        .from('avatars')
        .upload(fileName, buffer, {
            contentType: avatarType || 'image/jpeg',
        });
 
    if (error) throw new Error(`Avatar upload failed: ${error.message}`);
};

export const createUser = async (data: CreateUserInput) => {
    const image = await uploadAvatar(data.avatar, data.avatarName, data.avatarType);
    const hashedPassword = await hashPassword(data.password);
 
    const newUser = await insertUser({
        firstname: data.firstname,
        lastname:  data.lastname,
        email:     data.email,
        password:  hashedPassword,
        image,
    });

    return newUser;
};

export const updateUser = async ({ userId, firstname, lastname, avatarBase64, avatarName, avatarType }: UpdateUserInput) => {

    const image = await uploadAvatar(avatarBase64, avatarName, avatarType);

    const updatedUser = await updateUserFields(userId, {
        ...(firstname && { firstname }),
        ...(lastname && { lastname }),
        ...(image && { image }),
    });

    return updatedUser;
};

