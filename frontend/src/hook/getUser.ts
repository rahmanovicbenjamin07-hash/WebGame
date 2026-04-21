import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '@/authentication/auth'

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  })
}