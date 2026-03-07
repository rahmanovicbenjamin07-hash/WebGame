import { Hono } from 'hono'
import { locationsTable } from '../db/schema.js';
import { db } from '../db/index.js';
import { desc,asc, eq } from 'drizzle-orm';
import { NUMBER } from 'sequelize';
import { error } from 'console';

const locationRoute = new Hono()

{/* Get all the locations */}

locationRoute.get('/', async (c) => {
    const locations = await db.select().from(locationsTable);
    return c.json(locations);
})

{/* Create new location */}

locationRoute.post("/", async (c) => {
    const {location,locationImage,lat,lng} = await c.req.json();
    const newLocation = await db.insert(locationsTable).values({location,locationImage,lat,lng});
    return c.json(newLocation);
})

{/* Get the newest locations */}

locationRoute.get("/new", async (c) => {
    const newestLocations = await db.select({id: locationsTable.id,imageUrl: locationsTable.locationImage}).from(locationsTable).orderBy(desc(locationsTable.createdAt)).limit(9);
    return c.json(newestLocations);
    console.log("Locations:", newestLocations);
})

{/* Get specific location */}

locationRoute.get("/:id", async (c) => {
    const {id} = c.req.param();
    const location = await db.select().from(locationsTable).where(eq(locationsTable.id,Number(id)));
    return c.json(location);
})




export default locationRoute;