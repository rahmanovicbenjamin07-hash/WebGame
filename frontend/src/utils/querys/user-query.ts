import { apiFetch } from '@/lib/api';
import { sha256Hex } from '@/lib/crypto';
import type { UpdateUserPayload, UpdateProfileResponse } from '@/types/api';
import type { SignUpPayload, SignUpResponse } from '@/types/api';

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

export const signUp = async (payload: SignUpPayload): Promise<SignUpResponse> => {
  return apiFetch('/user/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      password: await sha256Hex(payload.password),
      confirmpassword: await sha256Hex(payload.confirmpassword),
    }),
  });
};

export const signOut = (): Promise<void> => {
  return apiFetch('/user/signout', {
    method: 'POST',
    credentials: 'include',
  });
};