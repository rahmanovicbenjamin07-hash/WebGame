import { Hono } from 'hono'
import { deleteCookie, setCookie } from "hono/cookie";
import { authMiddleware } from '../../middleware/middleware.js';
import "dotenv/config";
import { getUsers } from './services/get-users.js';
import { createUser } from './services/create-user.js';
import { updateUser } from './services/update-user.js';
import { getUserById } from './services/get-user.js';
import { deleteUser } from './services/delete-user.js';
import { signInUser } from './services/sign-in-user.js';

const usersRoute = new Hono()

usersRoute.get('/', authMiddleware, async (c) => {
    const users = await getUsers();
    return c.json(users);
});

usersRoute.post("/signup", async (c) => {
    const body = await c.req.json();

    const user = await createUser({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password,
        avatar: body.avatar,
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

usersRoute.put("/update", authMiddleware, async (c) => {
    const { userId } = c.get("jwtPayload");
    const body = await c.req.json();

    try {
        const user = await updateUser({
            userId: Number(userId),
            firstname: body.firstname,
            lastname: body.lastname,
            password: body.password,
            avatarBase64: body.avatar,
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

usersRoute.post("/signin", async (c) => {
    const { email, password } = await c.req.json();
    if (!email || !password) {
        return c.json({ error: 'Email and password are required' }, 400);
    }
    try {
        const { token, user } = await signInUser(email, password);
        setCookie(c, 'session', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            path: '/',
            domain: 'localhost',
        });
        return c.json({ message: 'Signed in successfully', data: user });
    } catch (err) {
        const message = (err as Error).message;
        const status = message === 'Invalid credentials' ? 401 : 500;
        return c.json({ error: message }, status);
    }
});

usersRoute.post('/signout', (c) => {
    deleteCookie(c, 'session', {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        path: '/',
    });
    return c.json({ message: 'Signed out successfully' });
});



export default usersRoute;

