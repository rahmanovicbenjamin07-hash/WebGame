interface NewUpload {
    id:number,
    imageUrl:string
}

export const loadUploadSignedOut = async () => {
    const res = await fetch("http://localhost:3001/location/new/signed-out");
            
        if(!res.ok) throw new Error("Failed to fetch Uploads");
        const data: NewUpload[] = await res.json();

        return data;
}


export const fetchLocations = async (limit:number) => {
    const res = await fetch(`http://localhost:3001/location/new?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch new uploads");
    const data: NewUpload[] = await res.json();
    return data;
}