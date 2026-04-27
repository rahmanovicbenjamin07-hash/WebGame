import { apiFetch } from "@/lib/api";

interface NewUpload {
    id:number,
    imageUrl:string
}

interface LocationsList {
    pageParam:number,
    limit:number,
}

interface LocationData {
    id: number
    locationImage: string
    lat: number
    lng: number
}

export const loadUploadSignedOut = async () => {
    return apiFetch<NewUpload[]>('/location/new/signed-out')
}


export const fetchLocations = async (limit:number) => {
    return apiFetch<NewUpload[]>(`/location/new?limit=${limit}`)
}

export const fetchLocationsList = async ({ pageParam = 0, limit = 9 }: LocationsList): Promise<NewUpload[]> => {
    return apiFetch<NewUpload[]>(`/location/new?offset=${pageParam}&limit=${limit}`)
}

export const fetchLocation = async (locationId: number) => {
    return apiFetch<LocationData>(`/location/${locationId}`) 
}