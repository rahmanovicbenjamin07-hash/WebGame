import { createFileRoute } from '@tanstack/react-router'
import { HeroHomeSignedIn } from '@/components/ui/HeroHomeSignedIn'

export const Route = createFileRoute('/home/signed-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return (

    <div className=' mx-auto'>
      <HeroHomeSignedIn/>
    </div>

  )
}
