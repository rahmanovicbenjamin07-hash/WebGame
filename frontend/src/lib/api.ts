const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...init,
  })

  if (!response.ok) {
    const result = await response.json().catch(() => ({}))
    const zodMessage = result.error?.issues?.[0]?.message
    throw new Error(zodMessage || result.message || `Request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}