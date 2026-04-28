import { db } from '../../db/index.js';
import { guessesTable, locationsTable, usersTable } from '../../db/schema.js';
import { eq,asc  } from "drizzle-orm";

export const createGuess = async  (params: {userId: number;locationId: number;guessedLat: number;guessedLng: number;missMeters: number;}) =>  {

    const [guess] = await db.insert(guessesTable).values(params).returning();
    return guess;
}

export const getBestGuesses = async (userId: number) => {
    return await db.select({
            id: guessesTable.id,
            missMeters: guessesTable.missMeters,
            imageUrl: locationsTable.locationImage,
        }).from(guessesTable)
        .innerJoin(locationsTable, eq(guessesTable.locationId, locationsTable.id))
        .innerJoin(usersTable, eq(guessesTable.userId, usersTable.id))
        .where(eq(usersTable.id,Number(userId)))
        .orderBy(asc(guessesTable.missMeters))
        .limit(3);
}