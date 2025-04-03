//PostRender.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

'use client'

import React, { useEffect } from 'react'
import { Post, Image as ImageType, Video as VideoType, TypePost } from '@prisma/client'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { Card } from '../ui/card'
import { Separator } from '../ui/separator'
import PostSkeleton from './PostSkeleton'

type Props = {}

//Define types for post data
type PostQueryParams = {
    take?: number
    lastCursor?: string
    typePost: TypePost
}

//Extend Post type to include related data
export interface PostData extends Post{
    images: ImageType[]
    videos: VideoType[]
    author: {
        name: string
    }
}

const PostRender = (props: Props) => {
    // Setup infinite scroll
    const {ref, inView} = useInView()

    //API call
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

    // Setup the infinite query
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
            return lastPage?.metaData.lastCursor //Get cursor for next page
        },
        initialPageParam: undefined
    })

    // Effect to load more posts when user scrolls to bottom
    useEffect(() => {
        if(inView && hasNextPage) {
            fetchNextPage()
        }
    }, [hasNextPage, inView, fetchNextPage])

    //Error handling
    if(error as any) {
        return (
            <div className='mt-10'>
                Unable to fetch post
            </div>
        )
    }

    //When posts loading
    if(isLoading) {
        return (
            <PostSkeleton />
        )
    }

    return (
        <div className='mt-8'>
            {/* Map through pages and posts to render them */}
            {data?.pages.map((page) => 
                page.data.map((post: PostData, index: number) => {
                    //Add ref to last post for the infinite scroll
                    if(page.data.length == index + 1) { //If last post add the invisible reference point to be trigger the next page load
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

//Component to render individual post data
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
            <Separator />
        </Card>
    )
}