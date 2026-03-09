import { Hono } from 'hono'
import { guessesTable } from '../db/schema.js';
import { db } from '../db/index.js';
import { eq, asc, desc } from 'drizzle-orm';
import { NUMBER } from 'sequelize';
import { error } from 'console';
import { locationsTable } from '../db/schema.js';
import { usersTable } from '../db/schema.js';

const guessesRoute = new Hono()

{/* Guess route to get all guesses */}

guessesRoute.get('/', async (c) => {
    const guesses = await db.select().from(guessesTable);
    return c.json(guesses);
})

{/* Guess route to get 3 best guesses */}

guessesRoute.get('/bestGuesses/:id', async (c) => {

    const {id} = c.req.param();

    const bestGuesses = await db
        .select({
            id: guessesTable.id,
            missMeters: guessesTable.missMeters,
            imageUrl: locationsTable.locationImage,
        })
        .from(guessesTable)
        .innerJoin(locationsTable, eq(guessesTable.locationId, locationsTable.id))
        .innerJoin(usersTable, eq(guessesTable.userId, usersTable.id))
        .where(eq(usersTable.id,Number(id)))
        .orderBy(desc(guessesTable.missMeters))
        .limit(3);

    return c.json(bestGuesses);
});


export default guessesRoute;