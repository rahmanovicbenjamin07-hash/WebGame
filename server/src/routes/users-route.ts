import { Hono } from 'hono'
import { usersTable } from '../db/schema.js';
import { db } from '../db/index.js';
import { eq } from 'drizzle-orm';
import { NUMBER } from 'sequelize';
import { error } from 'console';

const usersRoute = new Hono()

usersRoute.get('/', async (c) => {
    const users = await db.select().from(usersTable);
    return c.json(users);
})

usersRoute.post("/", async (c) => {
    const {firstname,lastname,email,password,image} = await c.req.json();
    const newUser = await db.insert(usersTable).values({firstname,lastname,email,password,image});
    return c.json(newUser);
})

usersRoute.get("/:id", async (c) => {
    const {id} = c.req.param();
    const user = await db.select().from(usersTable).where(eq(usersTable.id,Number(id)));
    return c.json(user);
})

usersRoute.put("/:id",async (c) => {
    const {id} = c.req.param();
    const {firstname,lastname,email,password,image} = await c.req.json();

    const response = await db.update(usersTable).set({firstname,lastname,email,password,image}).where(eq(usersTable.id, Number(id)));

    if(!response){
        return c.json({error:"User not found"},404);
    }

    const updatedUser = await db.select().from(usersTable).where(eq(usersTable.id, Number(id)))
    return c.json(updatedUser);
})

usersRoute.delete("/:id", async (c) => {
    const {id} = c.req.param();
    const deletedUser = await db.delete(usersTable).where(eq(usersTable.id,Number(id)));
    return c.json(deletedUser);
})

export default usersRoute;