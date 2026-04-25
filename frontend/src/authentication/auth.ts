import { apiFetch } from "@/lib/api"
import { sha256Hex } from "@/lib/crypto"
import type { UserDto, LoginResponseDto } from "@/types/api"

export interface SignInInput {
  email: string
  password: string
}

export const fetchUser = async () => {
  try {
    const data = await apiFetch<{ user: UserDto }>('/user/me')
    return data.user
  } catch (error) {
    console.error(error)
    return null
  }
}

export const signIn = async (data: SignInInput): Promise<LoginResponseDto> => {
  return apiFetch<LoginResponseDto>('/user/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      password: await sha256Hex(data.password),
    }),
  });
};

