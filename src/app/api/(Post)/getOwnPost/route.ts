//route.ts
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import prisma from '@/app/prismadb'
import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { TypePost } from '@prisma/client'

export async function GET(request: NextRequest) {
    const Session = await getServerSession(options)

    if(!Session?.user?.email) {
        return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: Session.user.email
        }
    })

    if(!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    const searchParams = new URLSearchParams(request.url.split('?')[1])
    const typePost = searchParams.get('typePost')
    const take = searchParams.get('take')
    const lastCursor = searchParams.get('lastCursor')

    try {
        const Post = await prisma.post.findMany({
            where: {
                type: typePost as TypePost,
                authorId: user.id // Filter posts by the logged-in user's ID - UPDATED LINE
            },
            include: {
                author:{
                    select:{
                        name:true
                    }
                }
            },
            take: take ? parseInt(take as string) : 10,
            ...(lastCursor && {
                skip: 1,
                cursor: {
                    id: lastCursor as string,
                }
            }),
            orderBy: {
                createdAt: 'desc'
            }
        })

        if(Post.length == 0) {
            return new Response(JSON.stringify({
                data:[],
                metaData:{
                    lastCursor: null,
                    hasNextPage: false
                }
            }), {status: 200})
        }


        const lastPointInResults : any = Post[Post.length - 1]
        const cursor = lastPointInResults.id

        const nextPage = await prisma.post.findMany({
            take: take ? parseInt(take as string) : 10,
            skip: 1,
            cursor: {
                id: cursor
            }
        })

        const data = {
            data: Post,
            metaData:{
                lastCursor: cursor,
                hasNextPage: nextPage.length > 0
            }
        }

        return NextResponse.json(data)

    } catch (error) {
        console.log(error, "Error fetching posts")
        return NextResponse.error()

    }
}