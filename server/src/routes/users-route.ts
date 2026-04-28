import { Hono } from 'hono'
import { deleteCookie, setCookie } from "hono/cookie";
import { authMiddleware } from '../../middleware/middleware.js';
import "dotenv/config";
import { createUser } from './services/user-services.js';
import { updateUser } from './services/user-services.js';
import { getUserById } from './services/user-services.js';
import { deleteUser } from './services/user-services.js';
import { signInUser } from './services/user-services.js';
import { zValidator } from '@hono/zod-validator';
import { signinSchema, signupSchema, updateUserSchema } from '../schemas/users-schemas.js';
import { sessionCookieDeleteOptions, sessionCookieOptions } from '../coockie-options.js';

const usersRoute = new Hono()

usersRoute.post("/signup", zValidator("json", signupSchema), async (c) => {
    const body = c.req.valid("json");

    const user = await createUser({
        firstname: body.firstname,
        lastname:  body.lastname,
        email:     body.email,
        password:  body.password,
        avatar:     body.avatar,
        avatarName: body.avatarName,
        avatarType: body.avatarType,
    });

    return c.json(
        { message: "User created and signed in", user }, 201);
});

usersRoute.get("/me", authMiddleware, async (c) => {
    const tokenData = c.get("jwtPayload");
     const user = await getUserById(Number(tokenData.userId));
    if (!user) return c.json({ error: 'User not found' }, 404);
    return c.json({ user });
});

usersRoute.get("/:id", async (c) => {
    const { id } = c.req.param();
    const user = await getUserById(Number(id));
    if (!user) return c.json({ error: "User not found" }, 404);
    return c.json(user);
});

usersRoute.put("/update", authMiddleware, zValidator("json",updateUserSchema), async (c) => {
    const { userId } = c.get("jwtPayload");
    const body = c.req.valid("json");

    try {
        const user = await updateUser({
            userId: Number(userId),
            firstname: body.firstname,
            lastname: body.lastname,
            password: body.password,
            avatarBase64: body.avatarBase64,
            avatarName: body.avatarName,
            avatarType: body.avatarType,
        });
        if (!user) return c.json({ error: 'User not found' }, 404);
        return c.json(user);
    } catch (err) {
        return c.json({ error: (err as Error).message }, 401);
    }
});

usersRoute.delete("/", authMiddleware, async (c) => {
    const { userId } = c.get('jwtPayload');
    try {
        await deleteUser(Number(userId));
        return c.json({ message: 'User deleted successfully' });
    } catch (err) {
        return c.json({ error: 'Failed to delete user' }, 500);
    }
})

usersRoute.post("/signin", zValidator("json",signinSchema) ,async (c) => {
    const { email, password } = c.req.valid("json");
    
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

