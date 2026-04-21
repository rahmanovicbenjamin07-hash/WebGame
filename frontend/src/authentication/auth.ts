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


export const fetchUser = async () => {
  try {
    const res = await fetch('http://localhost:3001/user/me', {
      method: 'GET',
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch user')
    }

    const data = (await res.json()) as { user: userData }

    return data.user
  } catch (error) {
    console.error(error)
    return null
  }
}

export const signIn = async (data: SignInInput) => {
  try {
    const res = await fetch('http://localhost:3001/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error('Invalid credentials')
    }

    return await res.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

