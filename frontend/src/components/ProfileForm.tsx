import { Button } from "../components/ui/button"
import ProfileImage from "../assets/ProfileImageLarge.png";
import React, { useEffect, useState } from "react";
import { InputNoBorder } from "./ui/inputNoBorder";
import { fetchUser } from "@/authentication/auth";

interface ProfileFormState  {
  email: string,
  firstname:string,
  lastname:string,
  password: string,
}

interface userData {
    email: string,
    firstname:string,
    id:number;
    lastname:string,
}

export function ProfileForm(){
    const [message,setMessage] = useState<string | null>(null);
    const [user, setUser] = useState<userData | null>(null);
    const [userAvatar, setUserAvatar] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [formData,setFormData] = useState<ProfileFormState>({
            email:"",
            firstname:"",
            lastname:"",
            password:"",
                    
        })

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUserAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        const loadUser = async () => {
            const data = await fetchUser();
            if (!data) return;

            setUser(data);
            setFormData(prev => ({
                ...prev,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
            }));

            try {
                const res = await fetch(`http://localhost:3001/user/${data.id}`);
                if (res.ok) {
                    const userData = await res.json();
                    if (userData[0]?.image) setAvatarPreview(userData[0].image);
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadUser();
    }, []);
    

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setFormData(prevData => ({...prevData,[name]:value}))
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();               
        console.log("Button is pressed!");
        if (!formData.email.trim()) { setMessage("Email is required!"); return; }
        if (!formData.password.trim()) { setMessage("Password is required to save changes!"); return; }
        if (!user?.id) return;

        setIsLoading(true)

        const data = new FormData();
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("firstname", formData.firstname);
        data.append("lastname", formData.lastname);
        if (userAvatar) data.append("avatar", userAvatar);

        try {

            const response = await fetch(`http://localhost:3001/user/update/${user.id}`, {
                method:"PUT",
                credentials: "include",
                body: data,
            })
            
            const result = await response.json();
            console.log(response);

            if (response.ok) {
                setMessage("Profile updated successfully!");
                if (result.image) setAvatarPreview(result.image);
            } else {
                setMessage(result.error || "Failed to update profile!");
            }
            
        }catch (error) {
            console.error(error);
            setMessage("Something went wrong!");
        } finally {
            setIsLoading(false);
            setUserAvatar(null); 
        
      }
 
}
    return (
        <div className="relative max-w-105 lg:min-h-189.75 flex flex-col items-center justify-end gap-6 my-auto shadow-[0_0_10px_0_rgba(0,0,0,0.2)] px-8 pb-6 rounded-2xl">
        
            <div className="bottom-24 lg:absolute left-8.75 right-8.75 lg:mb-0 mb-6">
                {message && (
                <div className={`w-full px-4 py-3 rounded-2xl text-sm font-medium text-center flex items-center justify-between
                        ${message.includes("successfully") 
                        ? "bg-green-100 text-green-700 border border-green-200" 
                        : "bg-red-100 text-red-700 border border-red-200"}`}>
                        <span>{message}</span>
                    <button onClick={() => setMessage(null)} className="ml-2 text-current opacity-60 hover:opacity-100 cursor-pointer">✕</button>
                </div>
                )}
            </div>

            {/* Form wrapper */}

            <form className="flex flex-col lg:gap-4 gap-6 w-full" onSubmit={handleSubmit}>
                <div className="mx-auto">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                    <img src={avatarPreview ?? ProfileImage} className="h-20 w-20 lg:mt-0 mt-24.25 rounded-full object-cover"/>
                </label>
            <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                    />
            </div>

                 <h4 className="mx-auto text-center">{user?.firstname} {user?.lastname}</h4>

                <div className="flex flex-col gap-2">
                    <p className="text-[16px] weight-[500]! leading-[150%]">Name</p>
                    <InputNoBorder placeholder={formData.firstname} name="firstname" onChange={handleInputChange}/>
                </div>

            {/* Name input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[16px] weight-[500]! leading-[150%]">Last Name</p>
                    <InputNoBorder placeholder={formData.lastname}  name="lastname" onChange={handleInputChange}/>
                </div>


            {/* Password input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[16px] weight-[500]! leading-[150%]">Email</p>
                    <InputNoBorder placeholder={formData.email} type="email" name="email" onChange={handleInputChange}/>
                </div>

            {/* Confirm password input wrapper */}

                <div className="flex flex-col gap-2">
                    <p className="text-[16px] weight-[500]! leading-[150%]">Password</p>
                    <InputNoBorder placeholder="••••••••••••••••" type="password" name="password" onChange={handleInputChange}/>
                </div>

            <Button className="w-full lg:mt-23.5" type="submit">
                {isLoading ? "Saving..." : "Save Profile"}
            </Button>
            </form>
        </div>
    )
}