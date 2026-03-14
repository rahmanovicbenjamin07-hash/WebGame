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
        <div className='grid lg:gap-5 gap-10.5 items-stretch lg:grid-cols-3 grid-cols-1 lg:pb-17 pb-15.5 lg:pt-0 pt-8 lg:px-0 px-8.75'>
          <ProfileForm/>
          <NewLocationForm/>
          <ClosesGuesesProfile/>
        </div>    
      </div>
      <Footer/>
    </>  
  )
}
