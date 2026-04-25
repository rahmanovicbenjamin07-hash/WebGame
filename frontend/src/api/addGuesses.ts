import { apiFetch } from '@/lib/api';

export interface CreateGuessPayload {
  locationId: number | null;
  guessedLat: number;
  guessedLng: number;
  missMeters: number;
}

export interface GuessResponse {
  id: number;
  missMeters: number;
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