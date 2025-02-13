import prisma from "@/app/prismadb"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { randomUUID } from "crypto"
import { z } from "zod"
import { SignUpSchema } from "@/ZodSchema/UserSchema"
import nodemailer from "nodemailer"

type SignUpSchemaT = z.infer<typeof SignUpSchema>

export async function POST(request: Request) {
    const body:SignUpSchemaT = await request.json()
    console.log(SignUpSchema.safeParse(body))

    if(SignUpSchema.safeParse(body).success === false){
        return NextResponse.json("Data provided is not valid", {status:400})
    }

    const userExist = await prisma.user.findUnique({
        where:{
            email:body.email
        }
    })

    if(userExist){
        return NextResponse.json({
            errorMessage: "Email is associated with another account"
        })
    }

    const hashedPassword = await bcrypt.hash(body.password, 14) // Was 10 update to be more secure

    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.USER_MAIL,
            pass:process.env.USER_PASSWORD
        }
    })

    try{
        const User = await prisma.user.create({
            data:{
                name:body.username,
                email:body.email,
                password:hashedPassword
            }
        })
        return NextResponse.json({message: "User created successfully", User})
    } catch (error) {
        return NextResponse.json({errorMessage: "Error creating user", error})
    }
}