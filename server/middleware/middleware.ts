import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';
import { createMiddleware } from 'hono/factory';
import { config } from '../src/config.js';

export const authMiddleware = createMiddleware(async (c, next) => {
    const token = getCookie(c, 'session');

    if (!token) {
        return c.json({ error: 'Unauthorized!' }, 401);
    }

    try {
        const decodedPayload = await verify(token, config.AUTH_SECRET, 'HS256');
        c.set('jwtPayload', decodedPayload);
        await next();
    } catch (err) {
        console.log('JWT VERIFY ERROR:', err);
        return c.json({ error: 'Unauthorized: Invalid or expired token' }, 401);
    }
});