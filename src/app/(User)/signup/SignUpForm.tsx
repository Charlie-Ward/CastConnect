//SignUpForm.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

'use client'
import React from 'react'
import { SignUpSchema } from '@/ZodSchema/UserSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader } from '@/components/ui/card'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

type Props = {}

const SignUpForm = (props: Props) => {
    const { toast } = useToast()
    const router = useRouter()

    // Use the SignUpSchema for this form
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
        username: "",
        },
    })
    

    async function onSubmit(values: z.infer<typeof SignUpSchema>) {
        try {
            //Try to submit the form to the api with these values
            const response = await axios.post('/api/signup', {
                username:values.username,
                email:values.email,
                password:values.password,
                confirmpassword:values.confirmpassword
            })
            toast({
                description: "User Registered Successfully. Manual Verification Required please wait for an email from CastConnect",
                title: "Success",
            })
            router.push('/signin')
            console.log(response)
        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong"
            })
        }
    } 

    return (
        <div className='mt-4 max-w-[1280px] mx-auto'>
            <Card className='p-5 max-w-[600px] mx-auto'>
                <CardHeader className='text-2xl font-semibold text-center'>Sign Up</CardHeader>
                <Form {...form}>
                    {/* Creating the form */}
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type='email' placeholder="Email Address" {...field} />
                                    </FormControl>
                                    <FormMessage />
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
                        <FormField
                            control={form.control}
                            name="confirmpassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="Confirm Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Register</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default SignUpForm