import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";

export const authMiddleware = async (c: any, next: any) => {
  const token = getCookie(c, "session");

  if (!token) {
    return c.json({ error: "Unauthorized - No token provided" }, 401);
  }

  try {
    const secret = process.env.AUTH_SECRET!;
    const decodedUserData = await verify(token, secret,"HS256");
    
    c.set("jwtPayload", decodedUserData); 
    
    await next(); 
  } catch (err) {
    return c.json({ error: "Unauthorized - Invalid token" }, 401);
  }
};