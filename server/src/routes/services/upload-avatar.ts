import supabase from "../../db/supabase.js";

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; 

export const uploadAvatar = async (avatar?: File): Promise<string | null> => {
    if (!avatar || !(avatar instanceof File)) return null;

    if (!ALLOWED_TYPES.includes(avatar.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.');
    }

    if (avatar.size > MAX_SIZE) {
        throw new Error('File too large. Maximum size is 5MB.');
    }

    const fileName = `${Date.now()}-${avatar.name}`;
    const arrayBuffer = await avatar.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error } = await supabase.storage
        .from("avatars")
        .upload(fileName, buffer, {
            contentType: avatar.type,
        });

    if (error) {
        console.error('Avatar upload failed:', error.message);
        return null;
    }

    const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

    return data.publicUrl;
};