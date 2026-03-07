import { usersTable } from "../src/db/schema.js";
import { db } from "../src/db/index.js";
import { eq } from "drizzle-orm";

export async function findUserIdByEmail(email:string){
    const [user] = await db
        .select({
            id: usersTable.id,
            email: usersTable.email,
            firstname: usersTable.firstname,
            lastname: usersTable.lastname
        })
        .from(usersTable)
        .where(eq(usersTable.email, email ));


        const userId = user?.id;
        console.log(userId);

        return {userId};
}