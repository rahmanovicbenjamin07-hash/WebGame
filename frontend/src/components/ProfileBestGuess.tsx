import CloseGuess from './ui/CloseGuess'
import { useQuery } from '@tanstack/react-query'
import { fetchGuesses } from '@/utils/querys/guesses-query'
import { useUser } from '@/authentication/userContext'

export function ProfileBestGuess() {
  const { user } = useUser();

  const query = useQuery({
    queryKey: ['bestGuesses'],
    queryFn: async () => await fetchGuesses(user?.id!),
    enabled: !!user?.id,
  })

  if(query.isError){
    return <p>{query.error.message}</p>
  }

  if(query.isPending) {
    return <p>Loading...</p>
  }
 
  return (
    <div className="max-w-full flex-1 w-auto flex flex-col justify-between lg:gap-0 gap-6">
      {query.data && query.data?.length > 0 
      
      ? query.data?.map((guess) => (
        <div key={guess.id} className="flex-1 w-full min-h-0">
          <CloseGuess meters={guess.missMeters} imageUrl={guess.imageUrl}/>
        </div>
      )) 
      
      : <p>No active Guesses!</p>}
    </div>
  )
}
