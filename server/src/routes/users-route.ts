import { Hono } from 'hono'
import { usersTable } from '../db/schema.js';
import { db } from '../db/index.js';
import { eq } from 'drizzle-orm';
import { NUMBER } from 'sequelize';
import { error } from 'console';
import { compare, hash } from 'bcryptjs';
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";
import { authMiddleware } from '../../middleware.js';
import "dotenv/config";

const usersRoute = new Hono()

{/* Route to get all users*/}

usersRoute.get('/', async (c) => {
    const users = await db.select().from(usersTable);
    return c.json(users);
})

{/* Sign up route */}

usersRoute.post("/signup", async (c) => {

    const {firstname,lastname,email,password,image} = await c.req.json();
    const hashedPassword = await hash(password,10);

    const [newUser] = await db.insert(usersTable).values({
    firstname,
    lastname,
    email,
    password: hashedPassword, 
  }).returning();

  const tokenData = {
        userId: newUser.id,
        email: newUser.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };

    const secret = process.env.AUTH_SECRET!;
    const token = await sign(tokenData, secret, "HS256");

    setCookie(c, "session", token, {
        httpOnly: true,
        secure: true, 
        sameSite: "Lax",
        path: "/",
    });

    return c.json({ message: "User created and signed in", user: newUser }, 201);
})

{/* Route to get user with specific id*/}

usersRoute.get("/:id", async (c) => {
    const {id} = c.req.param();
    const user = await db.select().from(usersTable).where(eq(usersTable.id,Number(id)));

    if(!user) {
        return c.json({error:"No user in database"},401);
    }

    return c.json(user);
})

{/* Route to get update user*/}

usersRoute.put("/:id",async (c) => {
    const {id} = c.req.param();
    const {firstname,lastname,email,password,image} = await c.req.json();
    const response = await db.update(usersTable).set({firstname,lastname,email,password,image}).where(eq(usersTable.id, Number(id)));
    
    if(!response){
        return c.json({error:"User not found"}, 404);
    }

    const [updatedUser] = await db.select().from(usersTable).where(eq(usersTable.id, Number(id)))
    return c.json(updatedUser);
})

{/* Route to delete user with specific id*/}

usersRoute.delete("/:id", async (c) => {
    const {id} = c.req.param();
    const deletedUser = await db.delete(usersTable).where(eq(usersTable.id,Number(id)));
    return c.json(deletedUser);
})


{/* Sign in route */}

usersRoute.post("/signin", async (c) => {
    const {email,password} = await c.req.json();
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if(!user) {
        return c.json({error:"Invalid credentials"},401);
    }

    const isPasswordSame = await compare(password, user.password);
    if (!isPasswordSame) return c.json({ error: "Invalid credentials" }, 401);

    const tokenData = {
        userId:user.id,
        email:user.email,
        exp:Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    }

    const secret = process.env.AUTH_SECRET!;
    const token = await sign(tokenData,secret, "HS256");

    setCookie(c, "session", token, {
    httpOnly: true,
    secure: true, 
    sameSite: "Lax", 
    path: "/",
  });

     return c.json({ message: "Signed in successfully" });
})

{/* "Security" route to redirect */}

usersRoute.get("/auth", authMiddleware, async (c) => {
    const tokenData = c.get("jwtPayload");

    const [user] = await db.select({id: usersTable.id,firstname: usersTable.firstname,lastname: usersTable.lastname,email: usersTable.email,}).from(usersTable).where(eq(usersTable.id, tokenData.userId));

    if (!user) {
        return c.json({ error: "User no longer exists" }, 404);
    }
    

    return c.json(user, 200); 
})


export default usersRoute;