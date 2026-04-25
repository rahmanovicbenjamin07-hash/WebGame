import { apiFetch } from '@/lib/api';
import type { CreateGuessPayload, GuessResponse } from '@/types/api';


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


export const createGuess = (
  userId: number  | undefined,
  payload: CreateGuessPayload,
): Promise<GuessResponse> => {
  if (!userId) throw new Error('User is not logged in');

  return apiFetch<GuessResponse>(`/guess/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

