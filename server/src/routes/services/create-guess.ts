import { db } from '../../db/index.js';
import { guessesTable } from '../../db/schema.js';

export const createGuess = async  (params: {userId: number;locationId: number;guessedLat: number;guessedLng: number;missMeters: number;}) =>  {

    const [guess] = await db.insert(guessesTable).values(params).returning();
    return guess;
}

