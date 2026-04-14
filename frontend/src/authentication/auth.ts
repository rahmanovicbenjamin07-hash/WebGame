import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

interface userData {
  email: string
  firstname: string
  id: number
  lastname: string
}

export const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  const req = getRequest()
  const cookieHeader = req.headers.get('Cookie')

  if (!cookieHeader) return null

  try {
    const res = await fetch('http://localhost:3001/user/me', {
      headers: {
        Cookie: cookieHeader,
      },
    })

    if (!res.ok) return null
    const data = await res.json()
    return data.user as userData
  } catch (e) {
    return null
  }
})
