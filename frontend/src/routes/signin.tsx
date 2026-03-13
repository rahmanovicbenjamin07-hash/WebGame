import { createFileRoute } from '@tanstack/react-router'
import { SignInForm } from '../components/SignInForm';
import BgImage from "../assets/SignUpPageImage.png";
import Logo from "../assets/Logo.png";

export const Route = createFileRoute('/signin')({
  component: SingInPage,
})

function SingInPage() {
  return(
        <div className="flex flex-row max-h-screen gap-22 overflow-hidden items-stretch justify-end w-full">
            <img src={Logo} className="absolute left-17.5 top-11.5" />
            <SignInForm></SignInForm>
            <div className="min-w-[57%] min-h-full overflow-hidden">
                <img src={BgImage} className="min-w-full h-full object-cover" alt=""/>
            </div>
        </div>
    )
}
