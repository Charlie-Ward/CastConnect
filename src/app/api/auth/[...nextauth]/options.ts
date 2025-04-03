//options.ts
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import type { NextAuthOptions, Session } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/app/prismadb"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export const options: NextAuthOptions = {
    adapter:PrismaAdapter(prisma),
    providers:[
        CredentialProvider({
            name:"Credentials",
            credentials:{
                email:{},
                password:{}
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined, req) { //Called in the submit function on the signIn page
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Data provided is not valid")
                }

                const user = await prisma.user.findUnique({ //Assign the user associated with the email to user
                    where:{
                        email: credentials.email
                    }
                })

                if(!user || !user.password){ //If user doesn't exist or if it doesn't have a password
                    throw new Error("User not found. Sign Up instead?")
                }

                if(!user.verified_user){
                    throw new Error("Account not verified. Accounts require manual verification by a member of the CastConnect team.")
                }


                const passwordcompare = await bcrypt.compare(credentials.password, user.password)

                if(!passwordcompare){
                    throw new Error("Password is incorrect. Do you need to reset it?")
                }
                return user
            },
        })
    ],

    pages:{
        signIn:"/signin"
    },

    callbacks:{
        async jwt({token, user}) {
            // Include the user ID in the JWT token
            if (user) {
                token.id = user.id;
            }
            console.log("JWT Callback", {token, user})
            return token
        },
        async session({session, token}) {
            // Include the user ID in the session object from the token
            if (session.user && token.id) {
                session.user.id = token.id as string;
            }
            console.log("Session Callback", {session, token})
            return session;
        }
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
}
