import { Hono } from 'hono'
import { deleteCookie, setCookie } from "hono/cookie";
import { authMiddleware } from '../../middleware/middleware.js';
import "dotenv/config";
import { createUser, updateUser, getUserById, deleteUser, signInUser } from './services/user-services.js';
import { zValidator } from '@hono/zod-validator';
import { signinSchema, signupSchema, updateUserSchema } from '../schemas/users-schemas.js';
import { sessionCookieDeleteOptions, sessionCookieOptions } from '../coockie-options.js';

const usersRoute = new Hono()

usersRoute.post("/signup", zValidator("json", signupSchema), async (c) => {
    const body = c.req.valid("json");

    try {
        const user = await createUser({
        firstname:  body.firstname,
        lastname:   body.lastname,
        email:      body.email,
        password:   body.password,
        avatar:     body.avatar,
        avatarName: body.avatarName,
        avatarType: body.avatarType,
    });
        return c.json({ message: "User created and signed in", user }, 201);
    } catch (err) {
        return c.json({ error: (err as Error).message }, 500);
    }
});

usersRoute.get("/me", authMiddleware, async (c) => {
    const { userId } = c.get("jwtPayload");

    if (!userId) {
        return c.json({ error: 'Invalid or missing id' }, 400);
    }

    try {
        const user = await getUserById(Number(userId));
        return c.json({ user });
    } catch (err) {
        return c.json({ error: (err as Error).message }, 404);
    }
})

usersRoute.get("/:id", async (c) => {
    const { id } = c.req.param();   

    if (!id) {
        return c.json({ error: 'Invalid or missing id' }, 400);
    }

    try {
        const user = await getUserById(Number(id));
        return c.json(user);
    } catch (err) {
        return c.json({ error: (err as Error).message }, 404);
    }
});

usersRoute.put("/update", authMiddleware, zValidator("json", updateUserSchema), async (c) => {
    const { userId } = c.get("jwtPayload");
    const body = c.req.valid("json");

    if (!userId) {
        return c.json({ error: 'Invalid or missing id' }, 400);
    }
 
    try {
        const user = await updateUser({
            userId:       Number(userId),
            firstname:    body.firstname,
            lastname:     body.lastname,
            password:     body.password,
            avatarBase64: body.avatarBase64,
            avatarName:   body.avatarName,
            avatarType:   body.avatarType,
        });
        return c.json(user);
    } catch (err) {
        return c.json({ error: (err as Error).message }, 401);
    }
});

usersRoute.delete("/", authMiddleware, async (c) => {
    const { userId } = c.get('jwtPayload');

    if (!userId) {
        return c.json({ error: 'Invalid or missing id' }, 400);
    }

    try {
        await deleteUser(Number(userId));
        return c.json({ message: 'User deleted successfully' });
    } catch (err) {
        return c.json({ error: 'Failed to delete user' }, 500);
    }
});

usersRoute.post("/signin", zValidator("json", signinSchema), async (c) => {
    const { email, password } = c.req.valid("json");
 
    if (!email || !password) {
        return c.json({ error: 'Invalid or missing email & password' }, 400);
    }

    try {
        const { token, user } = await signInUser(email, password);
        setCookie(c, 'session', token, sessionCookieOptions);
        return c.json({ message: 'Signed in successfully', data: user });
    } catch (err) {
        const message = (err as Error).message;
        const status = message === 'Invalid credentials' ? 401 : 500;
        return c.json({ error: message }, status);
    }
});

usersRoute.post('/signout', (c) => {
    deleteCookie(c, 'session', sessionCookieDeleteOptions);
    return c.json({ message: 'Signed out successfully' });
});

export default usersRoute;

