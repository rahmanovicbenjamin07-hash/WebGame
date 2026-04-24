import { HeroHomeSignedOut } from '@/components/HeroHomeSignedOut'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <HeroHomeSignedOut />
    </div>
  )
}
