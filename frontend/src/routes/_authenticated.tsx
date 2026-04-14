import { fetchUser } from '@/authentication/auth'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const user = await fetchUser()
    if (!user) {
      throw redirect({ to: '/signin' })
    }

    return user
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
