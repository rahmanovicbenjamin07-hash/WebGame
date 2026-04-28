import { Hono } from 'hono'
import { authMiddleware } from '../../middleware/middleware.js';
import { createGuess } from './services/guess-service.js';
import { getBestGuesses } from './services/guess-service.js';
import { zValidator } from '@hono/zod-validator';
import { createGuessSchema } from '../schemas/guesses-schemas.js';

const guessesRoute = new Hono()

guessesRoute.post('/', authMiddleware, zValidator("json", createGuessSchema), async (c) => {
    const { userId } = c.get('jwtPayload');
    const { locationId, guessedLat, guessedLng, missMeters } = c.req.valid("json");

    const guess = await createGuess({
        userId:     Number(userId),
        locationId, 
        guessedLat,
        guessedLng,
        missMeters,
    });

    return c.json({ message: 'Guess added.', guess }, 201);
});


guessesRoute.get('/bestGuesses', authMiddleware, async (c) => {
    const { userId } = c.get('jwtPayload');
    const bestGuesses = await getBestGuesses(Number(userId));
    return c.json(bestGuesses);
});

export default guessesRoute;