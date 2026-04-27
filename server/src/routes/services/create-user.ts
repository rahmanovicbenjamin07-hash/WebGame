import { compare, hash } from 'bcryptjs';
import { uploadAvatar } from "./upload-avatar.js";
import { db } from '../../db/index.js';
import { usersTable } from '../../db/schema.js';

export const createUser = async (data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    avatar?: File;
}) => {
    const image = await uploadAvatar(data.avatar);

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

