import React, { useState } from "react";
import { Button } from "../components/ui/button"
import ProfileImage from "../assets/ProfileImageLarge.png";
import { InputNoBorder } from "./ui/inputNoBorder";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Input } from "./ui/input";
import { FieldError } from "./ui/FieldError";
import { useUser } from "@/authentication/userContext";
import { ProfileFormSchema } from "@/schemas/ProfileFormSchema";

export function ProfileForm(){
    const queryClient = useQueryClient();
    const { user } = useUser();
    const [message,setMessage] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
            }   
    }; 

    const userAvatarQuery = useQuery({
        queryKey: ['userAvatar', user?.id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3001/user/${user?.id}`);

            if (!res.ok) throw new Error("Failed to fetch avatar");
            const data = await res.json();
            return data[0]?.image ?? null;          
        },

        enabled: !!user?.id,
      
        select: (image) => {
            return image;
        }
           
    })

    const displayAvatar = avatarPreview ?? userAvatarQuery.data ?? ProfileImage;

    const updateProfileMutation = useMutation({
        mutationFn: async (values :{password:string; firstname:string; lastname:string}) => {
            
            let avatarBase64: string | null = null;
                if (avatar) {
                    avatarBase64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(avatar);
                });
            }
           
            const response = await fetch(`http://localhost:3001/user/update/${user?.id}`, {
                method:"PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...values,
                    avatar: avatarBase64, 
                    avatarName: avatar?.name,
                    avatarType: avatar?.type,
                }),
            })

            const result = await response.json();
            if(!response.ok) throw new Error(result.error || "Failed to update profile!");
            return result;
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
            if (result.image) setAvatarPreview(result.image);
            setMessage("Profile updated successfully!");
        },
        onError: (error) => {
            setMessage(error.message)
        }
    })

    const form = useForm({
        defaultValues: {
            email: user?.email ?? "",
            password: "",
            firstname: user?.firstname ?? "",
            lastname: user?.lastname ?? "",          
        },
        validators: {
            onChange: ProfileFormSchema,
        },
        onSubmit: ({value}) => {
            updateProfileMutation.mutate(value);
        }
    })

    return (
        <div className="relative xl:max-w-105 lg:min-h-189.75 flex flex-col items-center justify-end gap-6 my-auto shadow-[0_0_10px_0_rgba(0,0,0,0.2)] px-8 pb-6 rounded-2xl">
        
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

            <form key={user?.id} className="flex flex-col lg:gap-4 gap-6 w-full" onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
            }}
            >            
                <div className="mx-auto">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                    <img src={displayAvatar} className="h-20 w-20 lg:mt-0 mt-24.25 rounded-full object-cover"/>
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
                <form.Field
                name="email"
                children={(field) => (
                    <div className="flex flex-col gap-2">
                        <p className="text-[16px] weight-[500]! leading-[150%]">Email</p>
                            <InputNoBorder
                            placeholder="example@net.com"  
                            type="email" 
                            value={field.state.value}
                            onBlur={field.handleBlur}/>                       
                    </div>               
                )}
                />
                <form.Field
                        name="firstname"
                        children={(field) => (
                            <div className="flex flex-col gap-2">
                                <p className="text-[12px] weight-[500]! leading-[150%] text-dark">First Name</p>
                                <Input
                                    placeholder="Jacob"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                <FieldError errors={field.state.meta.errors} />
                            </div>
                        )}
                    />
                <form.Field
                        name="lastname"
                        children={(field) => (
                            <div className="flex flex-col gap-2">
                                <p className="text-[12px] weight-[500]! leading-[150%] text-dark">Last Name</p>
                                <Input
                                    placeholder="Jones"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                <FieldError errors={field.state.meta.errors} />
                            </div>
                        )}
                    />
                <form.Field
                    name="password"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <p className="text-[12px] weight-[500]! leading-[150%] text-dark">Password</p>
                            <Input
                                placeholder="••••••••••••••••"
                                type="password"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                                <FieldError errors={field.state.meta.errors} />
                        </div>
                    )}
                />
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    )}
                />
            </form>
        </div>
    )
}