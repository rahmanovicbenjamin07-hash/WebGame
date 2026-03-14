import { createFileRoute } from '@tanstack/react-router'
import { SignUpForm } from '../components/SingUpForm';
import BgImage from "../assets/SignUpPageImage.png";
import Logo from "../assets/Logo.png";
import { NavigationSignedOut } from '@/components/navigationSignedOut';

export const Route = createFileRoute('/signup')({
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <div className="lg:pt-0 pt-38 flex flex-row lg:max-h-screen max-h-none gap-22 overflow-hidden lg:items-stretch lg:justify-end items-center justify-center w-full lg:min-h-0 min-h-screen">
            <div className='absolute z-50 top-0 left-0 right-0 lg:hidden'>
                <NavigationSignedOut/>
            </div>
            <img src={Logo} className="absolute left-17.5 top-11.5 lg:flex hidden"/>
            <SignUpForm></SignUpForm>
            <div className="lg:min-w-[57%] min-w-full lg:static absolute min-h-[120%] overflow-hidden z-0 top-24 bottom-0 left-0 right-0">
                <img src={BgImage} className="min-w-full h-full object-cover" alt=""/>
            </div>
        </div>
  )
}
