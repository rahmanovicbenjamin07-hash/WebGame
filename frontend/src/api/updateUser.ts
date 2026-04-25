import { apiFetch } from '@/lib/api';

export interface UpdateUserPayload {
    avatar?: string | null;
  avatarName?: string;
  avatarType?: string;
  [key: string]: unknown; 
}

export interface UpdateProfileResponse {
  id: number;
  username: string;
  image?: string;  
}
export const updateUser = (
  userId: number | undefined,
  payload: UpdateUserPayload,
): Promise<UpdateProfileResponse> => {
  if (!userId) throw new Error('User is not logged in');

  return apiFetch<UpdateProfileResponse>(`/user/update/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};