import prisma from '@/app/prismadb';
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { TypePost } from '@prisma/client';

export async function POST(request: NextRequest) {
    const Session = await getServerSession(options)

    if(!Session?.user?.email) {
        return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    try {
        const body = await request.json()
        const { content, typePost, tags } = body

        const user = await prisma.user.findUnique({
            where: {
                email: Session.user.email
            }
        })
        if(!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        try {
            const NewPost = await prisma.post.create({
                data: {
                    content,
                    authorId: user.id,
                    tags: tags || [],
                    type: TypePost[typePost as keyof typeof TypePost]
                }
            })
            return NextResponse.json({ message: 'Post created successfully', post: NewPost }, { status: 201 });
        } catch (error) {
            console.log('Error creating post:', error)
            return NextResponse.json({ 
                message: 'Error creating post', 
                error: error instanceof Error ? error.message : String(error) 
            }, { status: 500 });
        }
    } catch (error) {
        console.log('Error parsing request body:', error)
        return NextResponse.json({ message: 'Error parsing request body' }, { status: 400 });
    }
}