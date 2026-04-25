import { apiFetch } from '@/lib/api';
import { sha256Hex } from '@/lib/crypto';

export interface UpdateUserPayload {
  avatar?: string | null;
  avatarName?: string;
  avatarType?: string;
  password?: string;
  [key: string]: unknown;
}

export interface UpdateProfileResponse {
  id: number;
  username: string;
  image?: string;
}

export const updateUser = async (
  userId: number | undefined,
  payload: UpdateUserPayload,
): Promise<UpdateProfileResponse> => {
  if (!userId) throw new Error('User is not logged in');

  const hashedPayload = {
    ...payload,
    ...(payload.password ? { password: await sha256Hex(payload.password) } : {}),
  };
  console.log("hashedPayload: ",hashedPayload)
  return apiFetch<UpdateProfileResponse>(`/user/update/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hashedPayload),
  });
  
};