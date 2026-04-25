import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({context}) => {   
    if(!context.auth?.isAuthenticated) {
      throw redirect({ to: '/AuthPage/signin' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
