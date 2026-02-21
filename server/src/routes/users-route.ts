import { Hono } from 'hono'
import { usersTable } from '../db/schema.js';
import { db } from '../db/index.js';
import { eq } from 'drizzle-orm';
import { NUMBER } from 'sequelize';

const usersRoute = new Hono()

usersRoute.get('/', async (c) => {
    const users = await db.select().from(usersTable);
    return c.json(users);
})

usersRoute.post("/", async (c) => {
    const {firstname,lastname,email,password} = await c.req.json();
    const newUser = await db.insert(usersTable).values({firstname,lastname,email,password});
    return c.json(newUser);
})

usersRoute.get("/:id", async (c) => {
    const {id} = c.req.param();
    const user = await db.select().from(usersTable).where(eq(usersTable.id,Number(id)));
    return c.json(user);
})

usersRoute.put("/:id",async (c) => {
    const {id} = c.req.param();
    const {firstname,lastname,email,password} = await c.req.json();

    const updateUser = await db.update(usersTable).set({firstname,lastname,email,password}).where(eq(usersTable.id, Number(id)));
})

usersRoute.delete("/:id", async (c) => {
    const {id} = c.req.param();
    const deletedUser = await db.delete(usersTable).where(eq(usersTable.id,Number(id)));
    return c.json(deletedUser);
})

export default usersRoute;