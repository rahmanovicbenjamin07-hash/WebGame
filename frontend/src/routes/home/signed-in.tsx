import { createFileRoute, redirect } from '@tanstack/react-router'
import { HeroHomeSignedIn } from '../../components/HeroHomeSignedIn'
import { fetchUser } from '@/authentication/auth'

export const Route = createFileRoute('/home/signed-in')({
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

    <div className='mx-auto 2xl:px-0 md:px-8.75'>
      <HeroHomeSignedIn/>
    </div>
  )
}
