import { db } from '../../db/index.js';
import { locationsTable } from '../../db/schema.js';
import { desc } from 'drizzle-orm';

export const getLocations = async () => {
    return await db.select().from(locationsTable);
};

export const getNewestLocations = async (limit: number, offset: number) => {
    return await db
        .select({ id: locationsTable.id, imageUrl: locationsTable.locationImage })
        .from(locationsTable)
        .orderBy(desc(locationsTable.createdAt))
        .limit(limit)
        .offset(offset);
};