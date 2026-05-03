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