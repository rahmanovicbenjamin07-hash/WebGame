interface NewUpload {
    id:number,
    imageUrl:string
}

interface LocationsList {
    pageParam:number,
    limit:number,
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

export const fetchLocationsList = async ({ pageParam = 0, limit = 9 }: LocationsList): Promise<NewUpload[]> => {
    const res = await fetch(`http://localhost:3001/location/new?offset=${pageParam}&limit=${limit}`)
    if (!res.ok) throw new Error("Failed to fetch locations");
    return res.json();
}

export const fetchLocation = async (locationId: number) => {
  const res = await fetch(`http://localhost:3001/location/${locationId}`);
  if (!res.ok) throw new Error('Failed to fetch location');
  return res.json();
};