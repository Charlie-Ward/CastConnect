import prisma from "@/app/prismadb"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
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

    const hashedPassword = await bcrypt.hash(body.password, 10)

    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.USER_MAIL,
            pass:process.env.USER_PASSWORD
        }ç
    })

    try{
        const User = await prisma.user.create({
            data:{
                name:body.username,
                email:body.email,
                password:hashedPassword
            }
        })

        return NextResponse.json(User)
    } catch (error) {
        return NextResponse.json({errorMessage: "Error creating user", error})
    }
}