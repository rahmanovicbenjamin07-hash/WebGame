interface Guess {
  id: number
  missMeters: number
  imageUrl: string
}

export const fetchGuesses = async (userId: number) => {
  try {
    const res = await fetch(`http://localhost:3001/guess/bestGuesses/${userId}`)

    if (!res.ok) {
      throw new Error('Failed to get the guesses')
    }

    return (await res.json()) as Guess[]
  } catch (error) {
    console.error(error)
  }
}


export const addGuess = async (userId: number, locationId: number,lat: number,lng: number,missMeters: number) => {
    try {

        const res = await fetch(`http://localhost:3001/guess/${userId}` , { 
            method:"POST",
            headers:{
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({
                locationId:locationId,
                guessedLat:lat,
                guessedLng:lng,
                missMeters:missMeters
                }),
          });
          const result = await res.json();
          return result;

          }catch (error) {
          console.error(error);
        }
}

