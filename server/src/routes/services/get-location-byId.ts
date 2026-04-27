import { db } from '../../db/index.js';
import { locationsTable } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

export const getLocationById = async (id: number) => {
    const [location] = await db
        .select()
        .from(locationsTable)
        .where(eq(locationsTable.id, id));

    return location ?? null;
};