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
