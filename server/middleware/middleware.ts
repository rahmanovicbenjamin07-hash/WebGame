import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { createMiddleware } from "hono/factory";
import "dotenv/config";

export const authMiddleware = createMiddleware( async (c, next) => {
    const token = getCookie(c,"session");

    if(!token) {
        return c.json({error:"Unauthorized!"},401);
    }
     
    try {
        
        const secret = process.env.AUTH_SECRET!;
        const decodedPayload = await verify(token, secret,"HS256");

        c.set("jwtPayload", decodedPayload);

        await next();
    } catch (err) {
        console.log("JWT VERIFY ERROR:", err);
        return c.json({ error: "Unauthorized: Invalid or expired token" }, 401);
    }
})
