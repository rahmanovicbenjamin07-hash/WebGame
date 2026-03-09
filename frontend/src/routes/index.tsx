import { createFileRoute, redirect } from '@tanstack/react-router'
import "leaflet/dist/leaflet.css"

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
      if (1==1) {
        throw redirect({ to: '/signin' })
      }
    },
  component: HomePage,
})

function HomePage() {
   return (
    <></>
  )
}
