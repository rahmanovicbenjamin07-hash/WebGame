import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '../../../components/HeroSections/Dashboard'

export const Route = createFileRoute('/_authenticated/home/Dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mx-auto 2xl:px-0 md:px-8.75">
      <Dashboard />
    </div>
  )
}
