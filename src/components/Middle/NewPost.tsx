//NewPost.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"
import { Card } from '../ui/card'
import Image from 'next/image'
import { useSession } from "next-auth/react"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import ContentArea from '../Editor/ContentArea'

type Props = {}

const NewPost = (props: Props) => {
    const {data: Session} = useSession()
    const [content, setContent] = useState<string>()
    

    console.log(content)
    return (
        <div className='w-2/4 py-5 rounded-md mx-4 px-4'>
            <Card className='p-4'>
                <div className='flex items-center space-x-5'>
                    {/* Maybe add image back in */}
                    {/* <Image src={Session?.user?.image ? Session.user?.image : '/image4.jpg'} width={40} height={40} alt='Image' className='rounded-full h-[40px] object-cover object-top' /> */}
                    <Dialog>
                        <DialogTrigger className='w-full'>
                            <Button variant="default" size="lg">Make A Post</Button>
                            {/* <p>Make a post</p> */}
                        </DialogTrigger>
                        <DialogContent className='max-w-[800px] max-h-[600px] min-h-[200px] overflow-auto'>
                            <DialogHeader>
                                <DialogTitle className='my-2 text-xl'>
                                    Make Your Post
                                </DialogTitle>
                                <DialogDescription>
                                    <ContentArea content = {content} setContent = {setContent}/>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </Card>
        </div>
    )
}

export default NewPost