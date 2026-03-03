import { createFileRoute } from '@tanstack/react-router'
import ImageSample from "../assets/placeholder-image.png"
import ClosesGuesesProfile from '@/components/ProfileBestGuess'
export const Route = createFileRoute('/')({

  component: HomePage,
})

function HomePage() {
   return (
    <div>
      <ClosesGuesesProfile meters={123} imageUrl={ImageSample}></ClosesGuesesProfile>
    </div>
  )
}
