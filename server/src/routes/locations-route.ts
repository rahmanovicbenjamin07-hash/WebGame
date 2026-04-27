import { Hono } from 'hono'
import { locationsTable } from '../db/schema.js';
import { db } from '../db/index.js';
import { desc,asc, eq } from 'drizzle-orm';
import { NUMBER } from 'sequelize';
import supabase from "../db/supabase.js";
import { authMiddleware } from '../../middleware/middleware.js';
import { getLocations, getNewestLocations } from './services/get-location.js';
import { createLocation } from './services/create-location.js';
import { getLocationById } from './services/get-location-byId.js';

const locationRoute = new Hono();

locationRoute.get('/', async (c) => {
    const locations = await getLocations();
    return c.json(locations);
});

locationRoute.post('/newLocation', authMiddleware, async (c) => {
    try {
        const body = await c.req.json();

        if (!body.image) {
            return c.json({ error: 'Image is required' }, 400);
        }

        const newLocation = await createLocation({
            location: body.locationName,
            lat: Number(body.lat),
            lng: Number(body.lng),
            imageBase64: body.image,
            imageName: body.imageName,
            imageType: body.imageType,
        });

        return c.json(newLocation, 201);
    } catch (err) {
        const message = (err as Error).message;
        const status = message === 'Invalid image format' || message.includes('Invalid file type') || message.includes('too large') ? 400 : 500;
        return c.json({ error: message }, status);
    }
});

locationRoute.get('/new', async (c) => {
    const offset = Number(c.req.query('offset') || 0);
    const limit = Number(c.req.query('limit') || 9);
    const locations = await getNewestLocations(limit, offset);
    return c.json(locations);
});


locationRoute.get('/new/signed-out', async (c) => {
    const offset = Number(c.req.query('offset') || 0);
    const locations = await getNewestLocations(3, offset);
    return c.json(locations);
});

locationRoute.get('/:id', async (c) => {
    const { id } = c.req.param();
    const location = await getLocationById(Number(id));
    if (!location) return c.json({ error: 'Location not found' }, 404);
    return c.json(location);
});

export default locationRoute;