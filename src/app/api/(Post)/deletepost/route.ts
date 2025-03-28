import prisma from '@/app/prismadb';
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

// filepath: c:/Users/joand/Documents/CastConnect/CastConnect/src/app/api/(Post)/deletepost/route.ts

export async function DELETE(request: NextRequest) {
    try {
        const Session = await getServerSession(options);

        console.log('Session object:', Session); // Log the session object for debugging

        if (!Session) {
            console.error('Session not found');
            return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
        }

        if (!Session.user || !('id' in Session.user)) {
            console.error('Session user ID not found:', Session);
            return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
        }

        const searchParams = new URLSearchParams(request.url.split('?')[1]);
        const postId = searchParams.get('postId');

        if (!postId) {
            console.error('Post ID is required');
            return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { authorId: true },
        });

        if (!post) {
            console.error('Post not found');
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

        console.log('Session user ID:', Session.user.id);
        console.log('Post author ID:', post.authorId);

        if (post.authorId !== Session.user.id) {
            console.error('User not authorized to delete this post');
            return NextResponse.json({ message: 'User not authorized to delete this post' }, { status: 403 });
        }

        await prisma.post.delete({
            where: { id: postId },
        });

        console.log('Post deleted successfully');
        return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ message: 'Error deleting post' }, { status: 500 });
    }
}