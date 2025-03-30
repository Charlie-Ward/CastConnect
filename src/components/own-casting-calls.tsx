//own-casting-calls.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

'use client'

import React, { useEffect } from 'react'
import { Post, Image as ImageType, Video as VideoType, TypePost } from '@prisma/client'
import axios from 'axios'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { Trash2 } from 'lucide-react'
import { Card } from './ui/card'
import Image from 'next/image'
import { Separator } from './ui/separator'
import PostSkeleton from './Middle/PostSkeleton'
import { useToast } from '@/hooks/use-toast'

type Props = {}

type PostQueryParams = {
    take?: number
    lastCursor?: string
    typePost: TypePost
}

export interface PostData extends Post {
    images: ImageType[]
    videos: VideoType[]
    author: {
        name: string
    }
}

const OwnPostRender = (props: Props) => {
    const { ref, inView } = useInView()
    const AllPost = async ({ take, lastCursor, typePost }: PostQueryParams) => {
        const response = await axios.get('/api/getOwnPost', {
            params: {
                take,
                lastCursor,
                typePost
            }
        })
        return response?.data
    }

    const {
        data,
        error,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isSuccess,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryFn: ({ pageParam = "" }) => AllPost({ take: 5, lastCursor: pageParam, typePost: TypePost.POST }),
        queryKey: ['posts'],
        getNextPageParam: (lastPage) => {
            return lastPage?.metaData.lastCursor
        },
        initialPageParam: undefined
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [hasNextPage, inView, fetchNextPage])

    if (error as any) {
        return (
            <div className='mt-10'>
                Unable to fetch post
            </div>
        )
    }

    if (isLoading) {
        return (
            <PostSkeleton />
        )
    }

    return (
        <div className='mt-8'>
            <h1 className='text-2xl font-bold mb-4'>My Casting Calls</h1>
            {data?.pages.map((page) =>
                page.data.map((post: PostData, index: number) => {
                    if (page.data.length == index + 1) {
                        return (
                            <div key={index} ref={ref}>
                                <PostRenderData data={post} />
                            </div>
                        )
                    } else {
                        return (
                            <div key={index}>
                                <PostRenderData data={post} />
                            </div>
                        )
                    }
                })
            )}
        </div>
    )
}

export default OwnPostRender

const PostRenderData = ({ data }: { data: PostData }) => {

    const { toast } = useToast()

    const deletePost = useMutation({
        mutationFn: async (postId: string) => {
            await axios.delete(`/api/deletepost?postId=${postId}`, {
                withCredentials: true, // Ensure cookies are sent with the request
            });
        },
        onSuccess: () => {
            toast({
                title: 'Post Deleted',
                description: 'Your post has been deleted successfully',
            })
            window.location.reload()
        },
        onError: (error) => {
            console.error('Error deleting post:', error)
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Error deleting post',
            })
        }
    })

    const handleDelete = () => {
        console.log('Deleting post with ID:', data.id); // Log the post ID
        if (confirm('Are you sure you want to delete this post?')) {
            deletePost.mutate(data.id)
        }
    }

    return (
        <Card className='p-4 my-6'>
            <div className='flex items-center justify-between'>
                <div className='text-sm'>
                    <p>{data.author.name}</p>
                </div>
                <button onClick={handleDelete} className='text-red-500 hover:text-red-700'>
                    <Trash2 size={20} />
                </button>
            </div>
            <div className='p-4 my-2'>
                {data.content && (
                    <p className='prose prose-sm sm:prose focus:outline-none prose-p:loading-0 prose-a:text-red-400 xl:prose-base dark:prose-code:text-white dark:prose-p:text-white dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-h3:text-white dark:prose-strong:text-white dark:prose-italic:text-white' dangerouslySetInnerHTML={{ __html: data.content }}></p>
                )}
            </div>
            <Separator />
        </Card>
    )
}