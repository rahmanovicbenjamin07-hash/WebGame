import { apiFetch } from "@/lib/api"
import { type User } from "@/authentication/userContext"

interface userData {
  email: string
  firstname: string
  id: number
  lastname: string
}

export interface SignInInput {
  email: string
  password: string
}

type LoginResponse = {
    data: User,
    message: string
}

export const fetchUser = async () => {
  try {
    const data = await apiFetch<{ user: userData }>('/user/me')
    return data.user
  } catch (error) {
    console.error(error)
    return null
  }
}

export const signIn = async (data: SignInInput) => {
    return await apiFetch<LoginResponse>('/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
}

