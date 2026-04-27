import { usersTable } from '../../db/schema.js';
import { db } from '../../db/index.js';

export const getUsers = async () => {
    return await db.select({
        id: usersTable.id,
        email: usersTable.email,
        firstname: usersTable.firstname,
        lastname: usersTable.lastname,
        image: usersTable.image,
    }).from(usersTable);
};