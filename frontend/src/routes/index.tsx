import { createFileRoute} from '@tanstack/react-router'
import {SingInPage} from "../components/pages/SignInPage";
export const Route = createFileRoute('/')({
  component: HomePage,
})


function HomePage() {
  return (
    <div>
      <SingInPage></SingInPage>
    </div>
  )
}
