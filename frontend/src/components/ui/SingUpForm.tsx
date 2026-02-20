import { Input } from "./input"
import { Button } from "./button"
import ProfileImage from "../../assets/ProfileImageIcon.png";

export function SignUpForm(){
    return (
        <div className="max-w-105 flex flex-col items-center gap-4 my-auto">
            {/* Heading wrapper */}

            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-2">
                    <h3 className="leading-18.5 text-dark">Sign up</h3>
                    <p className="text-foreground-dark text-center">Your name will appear on posts and your public profle.</p>
                </div>
                <img src={ProfileImage} className="h-16 w-16"></img>
            </div>

            {/* Form wrapper */}


            {/* Email input wrapper */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <p className="text-[12px] weight-[500]! leading-none">Email</p>
                    <Input placeholder="example@net.com"></Input>
                </div>

            {/* Name input wrapper */}

                <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px] weight-[500]!">First Name</p>
                        <Input placeholder="Jacob"></Input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px] weight-[500]!">Last Name</p>
                        <Input placeholder="Jones"></Input>
                    </div>
                </div>

            {/* Password input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[12px] weight-[500]! leading-none">Password</p>
                    <Input placeholder="••••••••••••••••"></Input>
                </div>

            {/* Confirm password input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[12px] weight-[500]! leading-none">Confirm password</p>
                    <Input placeholder="••••••••••••••••"></Input>
                </div>

            <Button className="w-full">Sign Up</Button>

                <div className="flex justify-between items-center">
                    <p className="leading-6">Already have an account?</p>
                    <a href="google.com" className="text-primary text-[16px] font-normal">Sign in</a>
                </div>
            </div>
        </div>
    )
}