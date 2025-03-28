//SignInForm.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

'use client'
import React from 'react'
import { SignInSchema, SignUpSchema } from '@/ZodSchema/UserSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader } from '@/components/ui/card'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { useSession, signIn, signOut} from 'next-auth/react';
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Props = {}

const SignInForm = (props: Props) => {
    const { toast } = useToast()
    const router = useRouter()
    const {data: Session, status} = useSession() // Able to see the session details from next-auth

    // use the SignInSchema for this form
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof SignInSchema>) {
        console.log(values)
        try {
            // Sends details to an internal signIn command that I later pick up at api/auth/[...nextauth]/*
            const response = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false // Prevent redirect on error
            })

            if (response?.error) {
                throw new Error(response.error)
            }

            toast({
                description: "User Log In Successful"
            })
            router.push('/')
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                toast({
                    description: error.message || "Something went wrong"
                })
            } else {
                toast({
                    description: "Something went wrong"
                })
            }
        }
    } 

    return (
        <div className='mt-4 max-w-[1280px] mx-auto'>
            <Card className='p-5 max-w-[600px] mx-auto'>
                <CardHeader className='text-2xl font-semibold text-center'>Sign In</CardHeader>
                {status === 'unauthenticated' && (
                    <>
                        <Form {...form}>
                            {/* Creating the form */}
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                                <Button type="submit">Sign In</Button>
                            </form>
                        </Form>
                        <p className='text-m text-center'>Forgot your password? <Link href="/forgotpassword" className='text-decoration: underline text-blue-500'>Reset it</Link></p>
                        <p className='text-m text-center'>Don&apos;t have an account? <Link href="/signup" className='text-decoration: underline text-blue-500'>Sign Up</Link></p>
                    </>
                )}
                {status === "authenticated" && ( //If user is logged in
                    <div>
                        <p className='text-centre'>You are currently logged in to log in with another account.</p>
                        <p className='text-centre'>To continue please first logout.</p>
                        <p className='text-red-500 text-center cursor-pointer underline' onClick={() => signOut()}>Sign Out</p>
                    </div>
                )}
                </Card>
        </div>
    )
}

export default SignInForm