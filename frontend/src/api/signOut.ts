import { apiFetch } from "@/lib/api";

export const signOut = (): Promise<void> => {
  return apiFetch('/user/signout', {
    method: 'POST',
    credentials: 'include',
  });
};