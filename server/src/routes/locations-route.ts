import { Hono } from 'hono'
import { locationsTable } from '../db/schema.js';
import { db } from '../db/index.js';
import { eq } from 'drizzle-orm';
import { NUMBER } from 'sequelize';
import { error } from 'console';

const locationRoute = new Hono()

locationRoute.get('/', async (c) => {
    const locations = await db.select().from(locationsTable);
    return c.json(locations);
})

locationRoute.post("/", async (c) => {
    const {location,locationImage,lat,lng} = await c.req.json();
    const newLocation = await db.insert(locationsTable).values({location,locationImage,lat,lng});
    return c.json(newLocation);
})

locationRoute.get("/:id", async (c) => {
    const {id} = c.req.param();
    const location = await db.select().from(locationsTable).where(eq(locationsTable.id,Number(id)));
    return c.json(location);
})
