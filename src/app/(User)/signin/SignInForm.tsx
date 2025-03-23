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
                email:values.email,
                password:values.password
            })
            console.log(response)
            toast({
                description: "User Log In Successful"
            })
            router.push('/')
        } catch (error) {
            console.log(error)
            toast({
                description: "Something went wrong"
            })
        }
    } 

    return (
        <div className='mt-4 max-w-[1280px] mx-auto'>
            <Card className='p-5 max-w-[600px] mx-auto'>
                <CardHeader className='text-2xl font-semibold text-center'>Sign In</CardHeader>
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
                <p className='text-m text-center'>Don&apos;t have an account <Link href="/signup" className='text-decoration: underline text-blue-500'>Sign Up</Link></p>
            </Card>
        </div>
    )
}

export default SignInForm