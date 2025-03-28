'use client'

import React, { useEffect } from 'react'
import { Post, Image as ImageType, Video as VideoType, TypePost } from '@prisma/client'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import page from '@/app/app/page'
import { Lasso } from 'lucide-react'
import { fetchInternalImage } from 'next/dist/server/image-optimizer'
import { Card } from '../ui/card'
import Image from 'next/image'

type Props = {}

type PostQueryParams = {
    take?: number
    lastCursor?: string
    typePost: TypePost
}

export interface PostData extends Post{
    images: ImageType[]
    videos: VideoType[]
    author: {
        name: string
    }
}

const PostRender = (props: Props) => {
    
    const {ref, inView} = useInView()
    const AllPost = async ({take, lastCursor, typePost}: PostQueryParams) => {
        const response = await axios.get('/api/getPost', {
            params:{
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
        queryFn: ({pageParam = ""}) => AllPost({take:5, lastCursor: pageParam, typePost: TypePost.POST}),
        queryKey:['posts'],
        getNextPageParam: (lastPage) => {
            return lastPage?.metaData.lastCursor
        },
        initialPageParam: undefined
    })

    useEffect(() => {
        if(inView && hasNextPage) {
            fetchNextPage()
        }
    }, [hasNextPage, inView, fetchNextPage])

    if(error as any) {
        return (
            <div className='mt-10'>
                Unable to fetch post
            </div>
        )
    }

    console.log(data)

    return (
        <div className='mt-8'>
            {data?.pages.map((page) => 
                page.data.map((post: PostData, index: number) => {
                    if(page.data.length == index + 1) {
                        return(
                            <div key={index} ref={ref}>
                                <PostRenderData data={post}/>
                            </div>
                        )
                    } else {
                        return (
                            <div key={index}>
                                <PostRenderData data={post}/>
                            </div>
                        )
                    }
                })
            )}

        </div>
    )
}

export default PostRender

const PostRenderData = ({data}:{data:PostData}) => {
    return (
        <Card className='p-4 my-6'>
            <div className='flex items-center space-x-4'>
                <div className='text-sm'>
                    <p>{data.author.name}</p>
                </div>
            </div>
            <div className='p-4 my-2'>
                {data.content && (
                    <p className='prose prose-sm sm:prose focus:outline-none prose-p:loading-0 prose-a:text-red-400 xl:prose-base dark:prose-code:text-white dark:prose-p:text-white dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-h3:text-white dark:prose-strong:text-white dark:prose-italic:text-white' dangerouslySetInnerHTML={{__html:data.content}}></p>
                )}
            </div>
        </Card>
    )
}