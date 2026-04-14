import { createFileRoute } from '@tanstack/react-router'
import { HeroHomeSignedIn } from '../../../components/HeroHomeSignedIn'

export const Route = createFileRoute('/_authenticated/home/signed-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mx-auto 2xl:px-0 md:px-8.75">
      <HeroHomeSignedIn />
    </div>
  )
}
