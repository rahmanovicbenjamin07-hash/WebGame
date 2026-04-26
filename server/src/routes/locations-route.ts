import { Hono } from 'hono'
import { locationsTable } from '../db/schema.js';
import { db } from '../db/index.js';
import { desc,asc, eq } from 'drizzle-orm';
import { NUMBER } from 'sequelize';
import supabase from "../db/supabase.js";
import { authMiddleware } from '../../middleware/middleware.js';

const locationRoute = new Hono()

{/* Get all the locations */}

locationRoute.get('/', async (c) => {
    const locations = await db.select().from(locationsTable);
    return c.json(locations);
})

{/* Route for creating new location from profile */}

locationRoute.post("/newLocation", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();

    const location = body["locationName"] as string;
    const lat = Number(body["lat"]);
    const lng = Number(body["lng"]);

    const imageBase64 = body["image"] as string | null;
    const imageName = body["imageName"] as string | undefined;
    const imageType = body["imageType"] as string | undefined;

    if (!imageBase64) {
      return c.json({ error: "Image is required" }, 400);
    }

    const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      return c.json({ error: "Invalid image format" }, 400);
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    const safeOriginalName = imageName?.replace(/\s+/g, "") ?? "image";
    const fileExt = safeOriginalName.includes(".")
      ? safeOriginalName.split(".").pop()
      : mimeType.split("/")[1] || "jpg";

    const fileName = `${Date.now()}${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("GeoTagger")
      .upload(fileName, buffer, {
        contentType: imageType || mimeType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return c.json({ error: uploadError.message }, 500);
    }

    const { data: publicData } = supabase.storage
      .from("GeoTagger")
      .getPublicUrl(fileName);

    const publicUrl = publicData.publicUrl;

    const newLocation = await db.insert(locationsTable).values({
      location,
      locationImage: publicUrl,
      lat,
      lng,
    });

    return c.json(newLocation);
  } catch (err) {
    console.error("Caught error:", err);
    return c.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      500
    );
  }
});

{/* Get the newest locations - limit 9*/}

locationRoute.get("/new", async (c) => {
    const offset = Number(c.req.query("offset") || 0)
    const limit = Number(c.req.query("limit") || 9)
    const newestLocations = await db
    .select({id: locationsTable.id,imageUrl: locationsTable.locationImage})
    .from(locationsTable)
    .orderBy(desc(locationsTable.createdAt))
    .limit(limit)
    .offset(offset);
    return c.json(newestLocations);
})


{/* Get the newest locations - limit 3 */}

locationRoute.get("/new/signed-out", async (c) => {

    const offset = Number(c.req.query("offset") || 0)

    const newestLocations = await db
    .select({id: locationsTable.id,imageUrl: locationsTable.locationImage})
    .from(locationsTable)
    .orderBy(desc(locationsTable.createdAt))
    .limit(3)
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