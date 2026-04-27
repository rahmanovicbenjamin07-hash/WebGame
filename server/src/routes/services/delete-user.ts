import { db } from "../../db/index.js";
import { usersTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export const deleteUser = async  (id:number) => {
    await db.delete(usersTable).where(eq(usersTable.id,id));
}