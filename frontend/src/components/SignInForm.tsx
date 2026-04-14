import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

interface SignUpFormState  {
  email: string;
  password: string
}

export function SignInForm(){

    const navigate = useNavigate();

    const [formData,setFormData] = useState<SignUpFormState>({
        email:"",
        password:""
    })

    
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setFormData(prevData => ({...prevData,[name]:value}))
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

        if (!formData.email || !formData.password) {
        alert("All fields required!");
        return;
    }

    try {

            const response = await fetch("http://localhost:3001/user/signin", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                }),
            })

            const result = await response.json();

            if(response.ok){
                console.log(result);
                navigate({ to: '/home/signed-in' }); 
            }
          
        }catch (error) {
          console.error(error);
        }
  }

    return(
        <div className="lg:max-w-105 max-w-86 flex flex-col items-center gap-4 my-auto relative z-10 lg:bg-transparent bg-foreground-primary lg:px-0 lg:py-0 px-7.5 py-5 lg:rounded-none rounded-4xl">
            {/* Heading wrapper */}

                <div className="flex flex-col items-center gap-2">
                    <h3 className="lg:leading-18.5 text-dark lg:text-[49px] lg:font-medium text-[35px] leading-13.25 font-normal">Sign in</h3>
                    <p className="text-foreground-dark text-center">Welcome back to Geotagger. We are glad that you are back.</p>
                </div>

             {/* Email input wrapper */}

            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <p className="text-[12px] weight-[500]! text-dark lg:leading-[150%]">Email</p>
                    <Input placeholder="example@net.com" type="email" name="email" onChange={handleInputChange}></Input>
                </div>


            {/* Password input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[12px] weight-[500]! leading-none text-dark lg:leading-[150%]">Password</p>
                    <Input placeholder="••••••••••••••••" type="password" name="password" onChange={handleInputChange}></Input>
                </div>

            <Button variant="outline" className="w-full" type="submit">Sign In</Button>

                <div className="flex justify-between items-center">
                    <p className="lg:leading-[150%]">Do you want to create an account?</p>
                    <Link  to="/signup" className="text-primary text-[16px] font-normal text-nowrap">Sign up</Link>
                </div>
            </form>

        </div>
    )
}