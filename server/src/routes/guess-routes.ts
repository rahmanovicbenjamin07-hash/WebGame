import { Hono } from 'hono'
import { authMiddleware } from '../../middleware/middleware.js';
import { createGuess } from './services/create-guess.js';
import { getBestGuesses } from './services/get-best-guesses.js';

const guessesRoute = new Hono()

guessesRoute.post('/', authMiddleware, async (c) => {
    const { userId } = c.get('jwtPayload');
    const { locationId, guessedLat, guessedLng, missMeters } = await c.req.json();

    const guess = await createGuess({
        userId: Number(userId),
        locationId: Number(locationId),
        guessedLat: Number(guessedLat),
        guessedLng: Number(guessedLng),
        missMeters: Number(missMeters),
    });

    return c.json({ message: 'Guess added.', guess }, 201);
});


guessesRoute.get('/bestGuesses', authMiddleware, async (c) => {
    const { userId } = c.get('jwtPayload');
    const bestGuesses = await getBestGuesses(Number(userId));
    return c.json(bestGuesses);
});

export default guessesRoute;