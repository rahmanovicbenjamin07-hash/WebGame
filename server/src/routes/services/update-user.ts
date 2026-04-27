import { compare, hash } from 'bcryptjs';
import { db } from '../../db/index.js';
import { usersTable } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import supabase from '../../db/supabase.js';

export const updateUser = async (params: {
    userId: number;
    firstname?: string;
    lastname?: string;
    currentPassword?: string; 
    newPassword?: string;     
    avatarBase64?: string;
    avatarName?: string;
    avatarType?: string;
}) => {
    const { userId, firstname, lastname, currentPassword, newPassword, avatarBase64, avatarName, avatarType } = params;

    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, Number(userId)));

    if (!user) return null;

    let image: string | undefined;
    let newHashedPassword: string | undefined;

    if (newPassword && newPassword.trim() !== "") {
        if (!currentPassword) throw new Error("Current password required");
        
        const isValid = await compare(currentPassword, user.password);
        if (!isValid) throw new Error("Invalid credentials");
        
        newHashedPassword = await hash(newPassword, 10);
    }


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
            ...(newHashedPassword ? { password: newHashedPassword } : {}),
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