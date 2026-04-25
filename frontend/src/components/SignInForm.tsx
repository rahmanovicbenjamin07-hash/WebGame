import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { signIn } from "@/authentication/auth";
import { useMutation} from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { setStoredUser, type User, useUser } from "@/authentication/userContext";
import { signInSchema } from '@/schemas/SignInSchema';
import { FieldError } from "./ui/FieldError";
import { Label } from "./ui/label";
import { toast } from "sonner";

type LoginResponse = {
    data: User,
    message:string
}

export function SignInForm(){
    const navigate = useNavigate();
    const { setUser } = useUser();

    const SignInMutation = useMutation({
        mutationFn: async (values: { email: string; password: string }) => {           
            return signIn({ email: values.email, password: values.password });    
        },
        onSuccess: (response: LoginResponse) => {
            setStoredUser(response.data);
            setUser(response.data);
            navigate({ to: '/home/signed-in' });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })

    const form = useForm({
        defaultValues: {
            email:'',
            password:'',
        },
        validators: {
            onChange: signInSchema,
        },
        onSubmit: ({value}) => {
            SignInMutation.mutate(value);
        }
    })

    return(
        <div className="lg:max-w-105 max-w-86 flex flex-col items-center gap-4 my-auto relative z-10 lg:bg-transparent bg-foreground-primary lg:px-0 lg:py-0 px-7.5 py-5 lg:rounded-none rounded-4xl">
            {/* Heading wrapper */}

                <div className="flex flex-col items-center gap-2">
                    <h3 className="lg:leading-18.5 text-dark lg:text-[49px] lg:font-medium text-[35px] leading-13.25 font-normal">Sign in</h3>
                    <p className="text-foreground-dark text-center">Welcome back to Geotagger. We are glad that you are back.</p>
                </div>
            <form
                className="flex flex-col gap-4 w-full"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <form.Field
                    name="email"                    
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input
                                placeholder="example@net.com"
                                type="email"
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
                            <Label>Password</Label>
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
                            variant="outline"
                            className="w-full"
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </Button>
                    )}
                />

                <div className="flex justify-between items-center">
                    <p className="lg:leading-[150%]">Do you want to create an account?</p>
                    <Link to="/signup" className="text-primary text-[16px] font-normal text-nowrap">Sign up</Link>
                </div>
            </form>
        </div>
    )
}
