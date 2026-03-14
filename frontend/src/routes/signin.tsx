import { createFileRoute } from '@tanstack/react-router'
import { SignInForm } from '../components/SignInForm';
import BgImage from "../assets/SignUpPageImage.png";
import Logo from "../assets/Logo.png";
import { NavigationSignedOut } from '@/components/navigationSignedOut';

export const Route = createFileRoute('/signin')({
  component: SingInPage,
})

function SingInPage() {
  return(
        <div className="flex flex-row max-h-screen pt-24 gap-22 overflow-hidden lg:items-stretch lg:justify-end items-center justify-center w-full lg:min-h-0 min-h-screen">
            <div className='absolute z-50 top-0 left-0 right-0 '>
                <NavigationSignedOut/>
            </div>
            <img src={Logo} className="absolute left-17.5 top-11.5 lg:block hidden"/>
            <SignInForm></SignInForm>
            <div className="lg:min-w-[57%] lg:static absolute min-w-full min-h-full overflow-hidden z-0 top-0 bottom-0 left-0 right-0">
                <img src={BgImage} className="min-w-full h-full object-cover" alt=""/>
            </div>
        </div>
    )
}
