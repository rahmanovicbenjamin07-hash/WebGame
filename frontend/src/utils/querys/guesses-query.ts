import { apiFetch } from "@/lib/api"

interface Guess {
  id: number
  missMeters: number
  imageUrl: string
}

export const fetchGuesses = async (userId: number) => {
  try {
    return await apiFetch<Guess[]>(`/guess/bestGuesses/${userId}`)
  } catch (error) {
    console.error(error)
  }
}


export const addGuess = async (userId: number, locationId: number,lat: number,lng: number,missMeters: number) => {
    try {

        return await apiFetch(`/guess/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              locationId: locationId,
              guessedLat: lat,
              guessedLng: lng,
              missMeters: missMeters,
            }),
          })
          }catch (error) {
          console.error(error);
        }
}

