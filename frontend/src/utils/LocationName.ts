export const getLocationName = async (lat: number, lng: number): Promise<string> => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();
    
    const address = data.address;
    const place = address.city || address.town || address.village || address.suburb;
    const country = address.country;
    
    return `${place}, ${country}`;
}