import { HeroHomeSignedOut } from '../../../components/HeroHomeSingedOut'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/home/signed-out')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <HeroHomeSignedOut />
    </div>
  )
}
