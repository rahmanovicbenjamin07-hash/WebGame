import { apiFetch } from '@/lib/api';
import type { CreateGuessPayload, GuessResponse } from '@/types/api';

interface Guess {
  id: number
  missMeters: number
  imageUrl: string
}

export const fetchGuesses = async () => {
  try {
    return await apiFetch<Guess[]>(`/guess/bestGuesses`)
  } catch (error) {
    console.error(error)
  }
}

export const createGuess = (payload: CreateGuessPayload): Promise<GuessResponse> => {
  return apiFetch<GuessResponse>(`/guess`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};