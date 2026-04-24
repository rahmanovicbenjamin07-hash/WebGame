import { createContext, useContext, useState, useEffect } from 'react'

export interface User {
    email: string
    firstname: string
    id: number
    lastname: string
    image: string | null
}

export interface UserContextType {
  isAuthenticated: boolean
  logout: () => Promise<void>
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const key = 'tanstack.auth.user'

export function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User | null) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key)
  }
}

export function UserProvider({ children } : { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser())
  const isAuthenticated = !!user;

  const logout = async () => {
    setStoredUser(null)
    setUser(null);
  }

  useEffect(() => {
    setUser(getStoredUser())
  }, [])

  return (
    <UserContext.Provider value={{ isAuthenticated , logout, user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used inside UserProvider')
  }

  return context
}