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
        <div className="lg:pt-0 lg:pl-8.75 2xl:pl-0 pt-38 flex flex-row lg:max-h-screen max-h-none gap-22 overflow-hidden lg:items-stretch lg:justify-end items-center justify-center w-full lg:min-h-none min-h-screen">
            <div className='absolute z-50 top-0 left-0 right-0 lg:hidden'>
                <NavigationSignedOut/>
            </div>
            <img src={Logo} className="absolute left-17.5 top-11.5 lg:flex hidden"/>
            <SignInForm></SignInForm>
            <div className="lg:min-w-[57%] lg:static absolute min-w-full min-h-full overflow-hidden z-0 top-0 bottom-0 left-0 right-0 md:-left-2.5">
                <img src={BgImage} className="min-w-full h-full object-cover" alt=""/>
            </div>
        </div>
    )
}
