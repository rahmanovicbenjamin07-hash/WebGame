import supabase from "../../db/supabase.js";

export async function uploadFile(fileName: string, buffer: Buffer, imageType?: string, mimeType?: string) {
    const { error: uploadError } = await supabase.storage
        .from('GeoTagger')
        .upload(fileName, buffer, {
            contentType: imageType || mimeType,
            upsert: false,
        });
 
    return { uploadError };
}

export function getPublicUrl(fileName: string) {
    const { data: publicData } = supabase.storage
        .from('GeoTagger')
        .getPublicUrl(fileName);
 
    return publicData;
}