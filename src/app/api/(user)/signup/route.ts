//route.ts
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import prisma from "@/app/prismadb"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { randomUUID } from "crypto"
import { z } from "zod"
import { SignUpSchema } from "@/ZodSchema/UserSchema"
import nodemailer from "nodemailer"

// Get the schema that the form used
type SignUpSchemaT = z.infer<typeof SignUpSchema>

//API is called
export async function POST(request: Request) {
    //Get the data sent to it
    const body:SignUpSchemaT = await request.json()
    console.log(SignUpSchema.safeParse(body))

    //Does the data sent match the schema
    if(SignUpSchema.safeParse(body).success === false){
        return NextResponse.json("Data provided is not valid", {status:400}) //Failed to match schema
    }

    //Find if the inputted email already exists in the database
    const userExist = await prisma.user.findUnique({
        where:{
            email:body.email
        }
    })

    //If email exists return an error to be handled
    if(userExist){
        return NextResponse.json({
            errorMessage: "Email is associated with another account"
        })
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 14) // Was 10 updated to be more secure

    //For a verification token system WIP
    // var transport = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth:{
    //         user:process.env.USER_MAIL,
    //         pass:process.env.USER_PASSWORD
    //     }
    // })

    //Try to create a new entry in the model of user with the data from the original call of the API
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
        //Give the error response if this fails
        return NextResponse.json({errorMessage: "Error creating user", error})
    }
}