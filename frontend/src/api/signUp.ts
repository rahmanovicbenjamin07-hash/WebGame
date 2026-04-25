import { apiFetch } from "@/lib/api";
import { sha256Hex } from "@/lib/crypto";

export interface SignUpPayload {
  avatar?: string | null;
  avatarName?: string;
  avatarType?: string;
  password: string;
  confirmpassword: string;
  [key: string]: unknown;
}

export interface SignUpResponse {
  id: number;
  email: string;
}

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