import { createFileRoute } from '@tanstack/react-router'
import { SignUpForm } from '../../components/Forms/SignUpForm'
import { AuthPageLayout } from '../../components/Layouts/AuthPageLayout'

export const Route = createFileRoute('/AuthPage/signup')({
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <AuthPageLayout bgImageClass="min-w-full h-full object-cover">
      <SignUpForm />
    </AuthPageLayout>
  )
}