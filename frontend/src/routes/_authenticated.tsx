import { fetchUser } from '@/authentication/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const user = await fetchUser()
    console.log("Usao sam!")
    if (!user) {
      throw redirect({ to: '/signin' })
    }
    console.log("Izaso sam!")
    return user
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
