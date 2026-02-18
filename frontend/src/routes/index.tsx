import { createFileRoute} from '@tanstack/react-router'
export const Route = createFileRoute('/')({
  component: HomePage,
})

import { Map } from '@/components/ui/map'

const sampleUrl : string = "https://cdn.britannica.com/12/64412-050-41065C81/San-Francisco-California.jpg";

function HomePage() {
  return (
    <>
  <Map imageUrl={sampleUrl} />
  </>
  )
}
