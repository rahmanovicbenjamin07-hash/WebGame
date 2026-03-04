import { HeroHomeSignedOut } from '../../components/HeroHomeSingedOut'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/signed-out')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
          <div>
            <HeroHomeSignedOut/>
          </div>
        ) 
}
