import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  


  return (
    <div>
      <h1>Dobrodošao</h1>
    </div>
  )
}
