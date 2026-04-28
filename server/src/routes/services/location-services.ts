import { db } from '../../db/index.js';
import { locationsTable } from '../../db/schema.js';
import { desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import supabase from '../../db/supabase.js';

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

export const getLocationById = async (id: number) => {
    const [location] = await db
        .select()
        .from(locationsTable)
        .where(eq(locationsTable.id, id));

    return location ?? null;
};

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 10 * 1024 * 1024;

export const createLocation = async (params: {
    location: string;
    lat: number;
    lng: number;
    imageBase64: string;
    imageName?: string;
    imageType?: string;
}) => {
    const { location, lat, lng, imageBase64, imageName, imageType } = params;

    const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
    if (!matches) throw new Error('Invalid image format');

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    if (!ALLOWED_TYPES.includes(mimeType)) {
        throw new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.');
    }

    if (buffer.byteLength > MAX_SIZE) {
        throw new Error('File too large. Maximum size is 10MB.');
    }

    const safeOriginalName = imageName?.replace(/\s+/g, '') ?? 'image';
    const fileExt = safeOriginalName.includes('.')
        ? safeOriginalName.split('.').pop()
        : mimeType.split('/')[1] || 'jpg';

    const fileName = `${Date.now()}${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
        .from('GeoTagger')
        .upload(fileName, buffer, {
            contentType: imageType || mimeType,
            upsert: false,
        });

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicData } = supabase.storage
        .from('GeoTagger')
        .getPublicUrl(fileName);

    const [newLocation] = await db
        .insert(locationsTable)
        .values({
            location,
            locationImage: publicData.publicUrl,
            lat,
            lng,
        })
        .returning();

    return newLocation;
};