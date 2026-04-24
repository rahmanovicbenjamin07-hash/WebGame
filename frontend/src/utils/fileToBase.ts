export async function fileToBase64(file: File | null): Promise<string | null> {
    if (!file) return null;
    
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}