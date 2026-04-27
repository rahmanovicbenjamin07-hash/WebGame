import React, { useState } from "react";
import { Button } from "../ui/button"
import ProfileImage from "../../assets/ProfileImageLarge.png";
import { InputNoBorder } from "../ui/inputNoBorder";
import { useMutation} from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { useUser } from "@/authentication/userContext";
import { ProfileFormSchema } from "@/schemas/ProfileFormSchema";
import { fileToBase64 } from "@/utils/fileToBase";
import { FieldGroup, Field, FieldLabel, FieldError } from "../ui/form-field-components";
import { updateUser } from '../../utils/querys/user-query';
import { useObjectUrl } from "@/hook/useObjectUrl";
import FormMessage from "../ui/message-status";

export function ProfileForm(){
    const { user, setUser } = useUser();
    const [message,setMessage] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);
    const objectUrlPreview = useObjectUrl(avatar);
    const [serverAvatarPreview, setServerAvatarPreview] = useState<string | null>(null);

    const displayAvatar = serverAvatarPreview ?? objectUrlPreview ?? user?.image ?? ProfileImage;

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file);
            }   
    }; 
    
   const updateProfileMutation = useMutation({
    mutationFn: async (values: { password: string; firstname: string; lastname: string }) => {
        const avatarBase64 = await fileToBase64(avatar);   
        return updateUser({
            ...values,
            avatar: avatarBase64,
            avatarName: avatar?.name,
            avatarType: avatar?.type,
        });
    },
    onSuccess: (result) => {
        setUser({ ...user!, image: result.image ?? user?.image ?? null });
        if (result.image) setServerAvatarPreview(result.image);
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

    const isLoading = updateProfileMutation.isPending;

    return (
    <div className="relative xl:max-w-105 lg:min-h-189.75 flex flex-col items-center justify-end gap-6 my-auto shadow-[0_0_10px_0_rgba(0,0,0,0.2)] px-8 pb-6 rounded-2xl">
        <div className="bottom-24 lg:absolute left-8.75 right-8.75 lg:mb-0 mb-6">
            <FormMessage message={message} onClose={() => setMessage(null)} />
        </div>
        <form key={user?.id} className="flex flex-col lg:gap-4 gap-6 w-full" onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
        }}>            
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
            <FieldGroup>
                <form.Field
                    name="email"
                    children={(field) => (
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <InputNoBorder
                                placeholder="example@net.com"
                                type="email"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                            />
                        </Field>
                    )}
                />
                <form.Field
                    name="firstname"
                    children={(field) => (
                        <Field>
                            <FieldLabel>First Name</FieldLabel>
                            <Input
                                placeholder="Jacob"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                            <FieldError errors={field.state.meta.errors} />
                        </Field>
                    )}
                />
                <form.Field
                    name="lastname"
                    children={(field) => (
                        <Field>
                            <FieldLabel>Last Name</FieldLabel>
                            <Input
                                placeholder="Jones"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                            <FieldError errors={field.state.meta.errors} />
                        </Field>
                    )}
                />
                <form.Field
                    name="password"
                    children={(field) => (
                        <Field>
                            <FieldLabel>Password</FieldLabel>
                            <Input
                                placeholder="••••••••••••••••"
                                type="password"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                            />
                            <FieldError errors={field.state.meta.errors} />
                        </Field>
                    )}
                />
            </FieldGroup>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={!canSubmit || isSubmitting || isLoading}
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                )}
            />
        </form>
    </div>
)
}