import { createFileRoute} from '@tanstack/react-router'
import { SignUpPage } from '@/components/pages/SingUp'
export const Route = createFileRoute('/')({
  component: HomePage,
})


function HomePage() {
  return (
    <div>
      <SignUpPage></SignUpPage>
    </div>
  )
}
