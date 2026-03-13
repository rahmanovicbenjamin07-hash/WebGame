import { createFileRoute,redirect } from '@tanstack/react-router'
import { ProfileForm } from '@/components/ProfileForm'
import { ClosesGuesesProfile } from '@/components/ProfileBestGuess'
import { NewLocationForm } from '@/components/newLoactionForm'
import { NavigationSignedIn } from '@/components/navigationSignedIn'
import { Footer } from '@/components/footer'
import { fetchUser } from '@/authentication/auth'

export const Route = createFileRoute('/profile')({
  beforeLoad: async () => {
      const user = await fetchUser()
      if (!user) {
        throw redirect({ to: '/signin' })
      }
      return { user }
    },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
     <div className='max-w-325 mx-auto'>
        <NavigationSignedIn/>
        <div className='grid gap-5 items-stretch grid-cols-3 mb-17'>
          <ProfileForm/>
          <NewLocationForm/>
          <ClosesGuesesProfile/>
        </div>    
      </div>
      <Footer/>
    </>  
  )
}
