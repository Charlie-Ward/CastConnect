//route.ts
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import prisma from '@/app/prismadb'
import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { TypePost } from '@prisma/client'

export async function GET(request: NextRequest) {
    // const Session = getServerSession(options) IF WANTED TO FORCE LOGIN TO VIEW POSTS

    // Parse query parameters from the URL
    const searchParams = new URLSearchParams(request.url.split('?')[1])
    const typePost = searchParams.get('typePost')
    const take = searchParams.get('take') //Number of posts to fetch
    const lastCursor = searchParams.get('lastCursor') // ID of the last post

    try {
        // Fetch posts from database
        const Post = await prisma.post.findMany({
            where: {
                type:typePost as TypePost, //Filter by post type
            },
            include: {
                author:{
                    select:{
                        name:true //Include username in the response as not included in Post type
                    }
                }
            },
            take: take ? parseInt(take as string) : 10, //Number of items to take. Default to 10
            ...(lastCursor && {
                skip: 1, // Skip the last item from the previous page
                cursor: {
                    id: lastCursor as string, //Start from this postID
                }
            }),
            orderBy: {
                createdAt: 'desc' //Sort by newest first
            }
        })

        //If no posts return empty
        if(Post.length == 0) {
            return new Response(JSON.stringify({
                data:[],
                metaData:{
                    lastCursor: null,
                    hasNextPage: false
                }
            }), {status: 200})
        }

        //Get cursor point for next page
        const lastPointInResults : any = Post[Post.length - 1]
        const cursor = lastPointInResults.id

        //Check if more posts?
        const nextPage = await prisma.post.findMany({
            take: take ? parseInt(take as string) : 10,
            skip: 1,
            cursor: {
                id: cursor
            }
        })

        // Return the data
        const data = {
            data: Post,
            metaData:{
                lastCursor: cursor,
                hasNextPage: nextPage.length > 0 //Do more posts exist
            }
        }

        return NextResponse.json(data)

    } catch (error) {
        console.log(error, "Error fetching posts")
        return NextResponse.error()

    }
}