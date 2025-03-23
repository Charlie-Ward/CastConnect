//options.ts
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/app/prismadb"
import bcrypt from "bcryptjs"

export const options:NextAuthOptions = {
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialProvider({
            name:"Credentials",
            credentials:{
                email:{},
                password:{}
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined, req) { //Called in the sumbit function on the signIn page
                if(!credentials?.email || !credentials?.password){
                    return null
                }

                const user = await prisma.user.findUnique({ //Assign the user associated with the email to user
                    where:{
                        email: credentials.email
                    }
                })

                if(!user || !user.password){ //If user doesn't exist or if it doesn't have a password
                    return null
                }

                const passwordcompare = await bcrypt.compare(credentials.password, user.password)

                if(!passwordcompare){
                    return null
                }
                return user
            },
        })
    ],

    pages:{
        signIn:"/signin"
    },

    callbacks:{
        async jwt({token, user, session}){
            console.log("JWT Callback", {token, user, session})
            return token
        },
        async session({session, user, token}){
            console.log("Session Callback", {session, user, token})
            return session
        }
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
}
