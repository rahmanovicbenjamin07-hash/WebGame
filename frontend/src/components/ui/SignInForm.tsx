import { Input } from "./input";
import { Button } from "./button";

export function SingInForm(){
    return(
        <div className="max-w-105 flex flex-col items-center gap-4 my-auto">
            {/* Heading wrapper */}

                <div className="flex flex-col items-center gap-2">
                    <h3 className="leading-18.5 text-dark">Sign in</h3>
                    <p className="text-foreground-dark text-center">Welcome back to Geotagger. We are glad that you are back.</p>
                </div>

             {/* Email input wrapper */}

            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                    <p className="text-[12px] weight-[500]! leading-none">Email</p>
                    <Input placeholder="example@net.com"></Input>
                </div>


            {/* Password input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[12px] weight-[500]! leading-none">Password</p>
                    <Input placeholder="••••••••••••••••"></Input>
                </div>

            <Button variant="outline" className="w-full">Sign In</Button>

                <div className="flex justify-between items-center">
                    <p className="leading-6">Do you want to create an account?</p>
                    <a href="google.com" className="text-primary text-[16px] font-normal">Sign up</a>
                </div>
            </div>

        </div>
    )
}