import { db } from '../../db/index.js';
import { locationsTable } from '../../db/schema.js';
import { desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import supabase from '../../db/supabase.js';
import { getPublicUrl, uploadFile } from './supabase-storage-services.js';


export const getLocations = async () => {
    return await db.select().from(locationsTable);
};
 
export const getLocationById = async (id: number) => {
    const [location] = await db
        .select()
        .from(locationsTable)
        .where(eq(locationsTable.id, id));
 
    if (!location) throw new Error('Location not found');
    return location;
};

export const getNewestLocations = async (limit: number, offset: number) => {
    return await db
        .select({ id: locationsTable.id, imageUrl: locationsTable.locationImage })
        .from(locationsTable)
        .orderBy(desc(locationsTable.createdAt))
        .limit(limit)
        .offset(offset);
};

export async function insertLocation(location: string, locationImage: string, lat: number, lng: number) {
    const [newLocation] = await db
        .insert(locationsTable)
        .values({
            location,
            locationImage,
            lat,
            lng,
        })
        .returning();
 
    return newLocation;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 10 * 1024 * 1024;

export const parseImageBase64 = (imageBase64: string) => {
    const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
    if (!matches) throw new Error('Invalid image format');
 
    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
 
    return { mimeType, buffer };
};

export const validateImage = (mimeType: string, buffer: Buffer) => {
    if (!ALLOWED_TYPES.includes(mimeType))
        throw new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.');
 
    if (buffer.byteLength > MAX_SIZE)
        throw new Error('File too large. Maximum size is 10MB.');
};

export const buildFileName = (mimeType: string, imageName?: string) => {
    const safeOriginalName = imageName?.replace(/\s+/g, '') ?? 'image';
    const fileExt = safeOriginalName.includes('.')
        ? safeOriginalName.split('.').pop()
        : mimeType.split('/')[1] || 'jpg';
 
    return `${Date.now()}${crypto.randomUUID()}.${fileExt}`;
};

export const uploadLocationImage = async (fileName: string, buffer: Buffer, imageType?: string, mimeType?: string) => {
    const { uploadError } = await uploadFile(fileName, buffer, imageType, mimeType);
    if (uploadError) throw new Error(uploadError.message);
 
    const publicData = getPublicUrl(fileName);
    return publicData.publicUrl;
};

export const createLocation = async (params: {
    location: string;
    lat: number;
    lng: number;
    imageBase64: string;
    imageName?: string;
    imageType?: string;
}) => {
    const { location, lat, lng, imageBase64, imageName, imageType } = params;
 
    const { mimeType, buffer } = parseImageBase64(imageBase64);
    validateImage(mimeType, buffer);
 
    const fileName = buildFileName(mimeType, imageName);
    const imageUrl = await uploadLocationImage(fileName, buffer, imageType, mimeType);
 
    return await insertLocation(location, imageUrl, lat, lng);
};

