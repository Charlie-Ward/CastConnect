//ForgotPasswordForm.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'

type Props = {}

const ForgotPasswordSchema = z.object({
    email: z.string().email().refine((value) => !!value, {
        message: "Email is required"
    }),
    password:z.string()
    .min(8, {message: "Password must be at least 8 characters"})
    .max(15, {message: "Password must not be more than 15 characters"})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, 
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character (@$!%*?&) and be between 8 to 15 characters long.'
    )
    .refine(value => !!value, {
        message:"Please enter a password"
})
})

const ForgotPasswordForm = (props: Props) => {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
    })

    async function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
        console.log(values)
        try {
            const response = await axios.post('/api/passwordchange', {
                email: values.email,
                password: values.password
            })
            toast({
                description: "Password changed"
            })
            console.log(response)
            router.push('/signin')
        } catch (error) {
            console.log("Error", error)
            toast({
                description: "Error changing password"
            })
        }
    }

    return (
        <div className="mt-4 max-w-[1280px] mx-auto">
            <Card className="p-5 max-w-[600px] mx-auto">
                <h1 className="text-2xl text-center font-medium my-2 mb-6">Forgot Password</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-base">Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="email@email.com" autoComplete="off" {...field} />
                                    </FormControl>
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="lg">
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default ForgotPasswordForm