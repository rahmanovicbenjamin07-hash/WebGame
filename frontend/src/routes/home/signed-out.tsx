import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/signed-out')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/home/signed-out"!</div>
}
