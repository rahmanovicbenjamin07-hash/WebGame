import { DashboardSingedOut } from '../components/HeroSections/DashboardSingedOut'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <DashboardSingedOut />
    </div>
  )
}
