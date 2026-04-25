import { apiFetch } from "@/lib/api";

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

export const signUp = (payload: SignUpPayload): Promise<SignUpResponse> => {
    console.log("Payload: ", payload)
  
    return apiFetch('/user/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  
};