import { usersTable } from '../../db/schema.js';
import { db } from '../../db/index.js';
import { eq } from 'drizzle-orm';

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