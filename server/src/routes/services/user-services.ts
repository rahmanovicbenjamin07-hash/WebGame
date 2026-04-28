import { compare, hash } from 'bcryptjs';
import { db } from '../../db/index.js';
import { sign } from 'hono/jwt';
import { usersTable } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import supabase from '../../db/supabase.js';
import "dotenv/config";

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; 

export const uploadAvatar = async (
    avatarBase64?: string,
    avatarName?: string,
    avatarType?: string
): Promise<string | null> => {
    if (!avatarBase64 || !avatarName) return null;

    const base64Data = avatarBase64.replace(/^data:.+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const fileName = `${Date.now()}-${avatarName}`;

    const { error } = await supabase.storage
        .from("avatars")
        .upload(fileName, buffer, {
            contentType: avatarType || "image/jpeg",
        });

    if (error) {
        console.error('Avatar upload failed:', error.message);
        return null;
    }

    const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

    return data.publicUrl;
};

export const updateUser = async (params: {
    userId: number;
    firstname?: string;
    lastname?: string;
    password?: string;    
    avatarBase64?: string;
    avatarName?: string;
    avatarType?: string;
}) => {
    const { userId, firstname, lastname, password, avatarBase64, avatarName, avatarType } = params;

    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, Number(userId)));

    if (!user) return null;

    if (password && password.trim() !== "") {
    const isValid = await compare(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");
}

    let image: string | undefined; 

    if (avatarBase64 && avatarName) {
        const base64Data = avatarBase64.replace(/^data:.+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const fileName = `${Date.now()}-${avatarName}`;

        const { error } = await supabase.storage
            .from("avatars")
            .upload(fileName, buffer, {
                contentType: avatarType || "image/jpeg",
            });

        if (!error) {
            const { data } = supabase.storage
                .from("avatars")
                .getPublicUrl(fileName);
            image = data.publicUrl;
        }
    }

    await db
        .update(usersTable)
        .set({
            ...(firstname ? { firstname } : {}),
            ...(lastname ? { lastname } : {}),
            ...(image ? { image } : {}),
        })
        .where(eq(usersTable.id, userId));

    const [updatedUser] = await db
        .select({
            id: usersTable.id,
            email: usersTable.email,
            firstname: usersTable.firstname,
            lastname: usersTable.lastname,
            image: usersTable.image,
        })
        .from(usersTable)
        .where(eq(usersTable.id, userId))
        .limit(1);

    return updatedUser;
};

export const signInUser = async (email: string, password: string) => {
    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = await sign(
        {
            userId: user.id,
            email: user.email,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        },
        process.env.AUTH_SECRET!,
        "HS256"
    );

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            image: user.image,
        },
    };
};

export const getUserById = async (id: number) => {
    const [user] = await db
        .select({
            id: usersTable.id,
            email: usersTable.email,
            firstname: usersTable.firstname,
            lastname: usersTable.lastname,
            image: usersTable.image,
        })
        .from(usersTable)
        .where(eq(usersTable.id, Number(id)));

    return user ?? null;
};

export const deleteUser = async  (id:number) => {
    await db.delete(usersTable).where(eq(usersTable.id,id));
}

export const createUser = async (data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    avatar?: string;
    avatarName?: string;
    avatarType?: string;
}) => {
    const image = await uploadAvatar(data.avatar, data.avatarName, data.avatarType);

    const hashedPassword = await hash(data.password, 10);

    const [newUser] = await db.insert(usersTable).values({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: hashedPassword,
        image: image,
    }).returning();

    return newUser;
};