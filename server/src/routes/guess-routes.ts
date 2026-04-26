import { Hono } from 'hono'
import { guessesTable } from '../db/schema.js';
import { db } from '../db/index.js';
import { eq, asc, desc } from 'drizzle-orm';
import { NUMBER } from 'sequelize';
import { error } from 'console';
import { locationsTable } from '../db/schema.js';
import { usersTable } from '../db/schema.js';
import { authMiddleware } from '../../middleware/middleware.js';

const guessesRoute = new Hono()

{/* Guess route to get all guesses */}

guessesRoute.get('/',authMiddleware , async (c) => {
    const { userId } = c.get("jwtPayload");
    const { locationId, guessedLat, guessedLng, missMeters } = await c.req.json();

    const newGuess = await db.insert(guessesTable).values({
        userId: userId,
        locationId: Number(locationId),
        guessedLat: Number(guessedLat),
        guessedLng: Number(guessedLng),
        missMeters: Number(missMeters),
    }).returning();

    return c.json({ message: "Guess added.", guess: newGuess }, 201);
})

{/* Guess route to get 3 best guesses */}

guessesRoute.get('/bestGuesses', authMiddleware, async (c) => {
    const { userId } = c.get("jwtPayload");

    const bestGuesses = await db
        .select({
            id: guessesTable.id,
            missMeters: guessesTable.missMeters,
            imageUrl: locationsTable.locationImage,
        })
        .from(guessesTable)
        .innerJoin(locationsTable, eq(guessesTable.locationId, locationsTable.id))
        .innerJoin(usersTable, eq(guessesTable.userId, usersTable.id))
        .where(eq(usersTable.id,Number(userId)))
        .orderBy(asc(guessesTable.missMeters))
        .limit(3);

    return c.json(bestGuesses);
});

guessesRoute.post('/:userId', async (c) => {

    const {userId} = c.req.param();
    const {locationId,guessedLat,guessedLng,missMeters} = await c.req.json();

    const newGuess = await db.insert(guessesTable).values({
        userId: Number(userId),
        locationId: Number(locationId),
        guessedLat: Number(guessedLat),
        guessedLng: Number(guessedLng),
        missMeters: Number(missMeters),
    }).returning();

    return c.json({ message: "Guess added.", user: newGuess }, 201);

})

export default guessesRoute;