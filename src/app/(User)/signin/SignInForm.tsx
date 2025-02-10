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

type Props = {}

const SignInForm = (props: Props) => {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof SignInSchema>) {
        try {
            toast({
                description: "User Registered Successfully"
            })
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
                <CardHeader className='text-2xl font-semibold text-center'>Register</CardHeader>
                <Form {...form}>
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
                        <Button type="submit">Register</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default SignInForm