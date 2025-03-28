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
import { url } from 'inspector'
import { Loader2, Plus, UploadCloud } from 'lucide-react'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { set } from 'zod'

type Props = {}

const NewPost = (props: Props) => {
    const {data: Session} = useSession()
    const [content, setContent] = useState<string>()
    const [files, setFiles] = useState<File[]>([])
    const [fileUrls, setFileUrls] = useState<string[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const router = useRouter()

    const CreatePost = async () => {

        setLoading(true)

        if(content == "<p></p>" || !content) {
            console.log("Post is not valid")
            alert('Post is not valid')
            return
        }

        const tags = (content ?? '').match(/#\w+/g) || []

        try {
            const response = await axios.post('/api/createpost', {
                content,
                typePost: 'POST',
                tags
            })
            toast({
                title: 'Post Created',
                description: 'Your post has been created successfully',
            })
            console.log(response)
            window.location.reload()
        } catch (error: any) {
            console.error('Error creating post:', error.response?.data || error)
            alert('Error creating post: ' + (error.response?.data?.message || error.message))

            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.response?.data?.message || 'Error creating post',
            })
        }

        setLoading(false)
    }

    return (
        <div className='py-5 rounded-md mx-auto px-4'>
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
                                    <ContentArea content={content || ''} setContent={setContent} />
                                    {isLoading ? (
                                        <Button disabled className="w-full mt-2" size='lg'>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Loading
                                        </Button>
                                    ) : (
                                        <Button className='my-2 w-full' onClick={CreatePost}>Submit</Button>
                                    )}
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