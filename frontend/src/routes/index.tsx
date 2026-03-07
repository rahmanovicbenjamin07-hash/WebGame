import { createFileRoute } from '@tanstack/react-router'
import "leaflet/dist/leaflet.css"

export const Route = createFileRoute('/')({

  component: HomePage,
})

function HomePage() {
   return (
    <></>
  )
}
