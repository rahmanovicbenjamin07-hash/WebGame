import { compare } from 'bcryptjs';
import { sign } from 'hono/jwt';
import { db } from '../../db/index.js';
import { usersTable } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import "dotenv/config";

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