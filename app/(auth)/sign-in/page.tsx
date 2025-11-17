'use client';

import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import InputField from '@/components/forms/inputField';
import FooterLink from '@/components/FooterLink';
import {signInWithEmail} from "@/lib/actions/auth.actions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });
    const onsubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data);
            if (result.success) router.push("/")
        } catch (error) {
            console.log(error)
            toast.error("sign in failed", {
                description: error instanceof Error ? error.message : "An unknown error occurred"
            })
        }
    }
    return (
        <>
            <h1 className="form-title">Welcome back</h1>

            <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{required: 'Email is required', pattern: /^\w+@\w+\.\w+$/}}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{required: 'Password is required', minLength: 8}}
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Signing In' : 'Sign In'}
                </Button>

                <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up"/>
            </form>
        </>
    )
}
export default SignIn
