//route.ts
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import prisma from "@/app/prismadb"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"

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

type ForgotPasswordSchemaT = z.infer<typeof ForgotPasswordSchema>

export async function POST(request: Request) {
    const {email, password} = await request.json()
    const validatedFields = ForgotPasswordSchema.safeParse({email, password})
    
    if(!validatedFields.success){
        return NextResponse.json({ message: "Data is not valid" }, { status: 400 })
    }

    const userExists = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(!userExists){
        return NextResponse.json({ message: "User does not exist" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const updatedUser = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: hashedPassword
            }
        })
        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error updating password", error }, { status: 500 })
    }
}
