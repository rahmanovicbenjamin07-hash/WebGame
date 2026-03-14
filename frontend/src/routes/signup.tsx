import { createFileRoute } from '@tanstack/react-router'
import { SignUpForm } from '../components/SingUpForm';
import BgImage from "../assets/SignUpPageImage.png";
import Logo from "../assets/Logo.png";

export const Route = createFileRoute('/signup')({
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <div className="flex flex-row max-h-screen gap-22 overflow-hidden lg:items-stretch lg:justify-end items-center justify-center w-full lg:min-h-0 min-h-screen">
            <img src={Logo} className="absolute left-17.5 top-11.5" />
            <SignUpForm></SignUpForm>
            <div className="lg:min-w-[57%] min-w-full lg:static absolute min-h-full overflow-hidden z-0 top-0 bottom-0 left-0 right-0">
                <img src={BgImage} className="min-w-full h-full object-cover" alt=""/>
            </div>
        </div>
  )
}
