import { Hono } from 'hono'
import { locationsTable } from '../db/schema.js';
import { db } from '../db/index.js';
import { desc,asc, eq } from 'drizzle-orm';
import { NUMBER } from 'sequelize';
import supabase from "../db/supabase.js";

const locationRoute = new Hono()

{/* Get all the locations */}

locationRoute.get('/', async (c) => {
    const locations = await db.select().from(locationsTable);
    return c.json(locations);
})

{/* Route for creating new location from profile */}

locationRoute.post("/newLocation", async (c) => {

    try {
        const formData = await c.req.formData();
        const file = formData.get("image") as File;
        const location = formData.get("location") as string;
        const lat = Number(formData.get("lat"));
        const lng = Number(formData.get("lng"));

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `${Date.now()}_${file.name}`;

        const { error: uploadError } = await supabase.storage
            .from("GeoTagger")
            .upload(fileName, buffer, { contentType: file.type });

        if (uploadError) {
            console.error("Supabase error:", uploadError); 
            return c.json({ error: uploadError.message }, 500);
        }

        const { data } = supabase.storage
            .from("GeoTagger")
            .getPublicUrl(fileName);

        const newLocation = await db.insert(locationsTable).values({
            location,
            locationImage: data.publicUrl,
            lat,
            lng,
        });

        return c.json(newLocation);
    } catch (err) {
        console.error("Caught error:", err); 
        return c.json({ error: String(err) }, 500);
    }     
})

{/* Get the newest locations */}

locationRoute.get("/new", async (c) => {
    const offset = Number(c.req.query("offset") || 0)

    const newestLocations = await db
    .select({id: locationsTable.id,imageUrl: locationsTable.locationImage})
    .from(locationsTable)
    .orderBy(desc(locationsTable.createdAt))
    .limit(9)
    .offset(offset);
    return c.json(newestLocations);
})

{/* Get specific location */}

locationRoute.get("/:id", async (c) => {
    const {id} = c.req.param();
    const location = await db.select().from(locationsTable).where(eq(locationsTable.id,Number(id)));
    return c.json(location);
})




export default locationRoute;