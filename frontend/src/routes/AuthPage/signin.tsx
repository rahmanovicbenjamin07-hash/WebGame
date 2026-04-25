import { createFileRoute } from '@tanstack/react-router'
import { SignInForm } from '../../components/Forms/SignInForm'
import { AuthPageLayout } from '../../components/Layouts/AuthPageLayout'

export const Route = createFileRoute('/AuthPage/signin')({
  component: SignIn,
})

function SignIn() {
  return (
    <AuthPageLayout>
      <SignInForm />
    </AuthPageLayout>
  )
}