import CloseGuess from './ui/CloseGuess'
import { useState, useEffect } from 'react'
import { fetchUser } from '@/authentication/auth'
import { useQuery } from '@tanstack/react-query'
import { fetchGuesses } from '@/lib/queries/guesses-query'

interface userData {
  email: string
  firstname: string
  id: number
  lastname: string
}

export function ClosesGuesesProfile() {
  const [user, setUser] = useState<userData | null>(null)

  useEffect(() => {
    fetchUser().then((data) => {
      if (data) {
        setUser(data)
      }
    })
  }, [])

  const { data, isPending, isError } = useQuery({
    queryKey: ['guesses'],
    queryFn: async () => await fetchGuesses(user?.id!),
  })

  if (isPending) return <div>Loading...</div>

  if (isError) {
    return <p>Something went wrong</p>
  }

  return (
    <div className="max-w-full flex-1 w-auto flex flex-col justify-between lg:gap-0 gap-6">
      {data?.map((guess) => (
        <div key={guess.id} className="flex-1 w-full min-h-0">
          <CloseGuess meters={guess.missMeters} imageUrl={guess.imageUrl} />
        </div>
      ))}
    </div>
  )
}
