import { Hono } from 'hono'
import { authMiddleware } from '../../middleware/middleware.js';
import { getLocations, getNewestLocations } from './services/location-services.js';
import { createLocation } from './services/location-services.js';
import { getLocationById } from './services/location-services.js';
import { zValidator } from '@hono/zod-validator';
import { createLocationSchema, locationPaginationSchema } from '../schemas/locations-schemas.js';

const locationRoute = new Hono();

locationRoute.get('/', async (c) => {
    const locations = await getLocations();
    return c.json(locations);
});

locationRoute.post('/newLocation', zValidator("json", createLocationSchema) ,authMiddleware, async (c) => {
    try {
        const body = c.req.valid("json");

        if (!body.image) {
            return c.json({ error: 'Image is required' }, 400);
        }

        const newLocation = await createLocation({
            location: body.locationName,
            lat: body.lat,
            lng: body.lng,
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

locationRoute.get('/new', zValidator("query", locationPaginationSchema), async (c) => {
    const { limit, offset } = c.req.valid("query");
    const locations = await getNewestLocations(limit, offset);
    return c.json(locations);
});


locationRoute.get('/new/signed-out',zValidator("query",locationPaginationSchema) ,async (c) => {
    const { offset } = c.req.valid("query");
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