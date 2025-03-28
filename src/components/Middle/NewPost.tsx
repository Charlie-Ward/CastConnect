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
import { Plus, UploadCloud } from 'lucide-react'
import axios from 'axios'

type Props = {}

const NewPost = (props: Props) => {
    const {data: Session} = useSession()
    const [content, setContent] = useState<string>()
    const [files, setFiles] = useState<File[]>([])
    const [fileUrls, setFileUrls] = useState<string[]>([])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;

        if(selectedFiles){
            const newFiles: File[] = Array.from(selectedFiles)

            for (let i = 0; i < newFiles.length; i++) {
                const file = newFiles[i]
                const MaxSiseInByte = 4 * 1024 * 1024 // 4MB

                if(file.size > MaxSiseInByte) {
                    alert('File size exceeds the limit of 4MB. Please choose a smaller file.')
                    return
                }
            }

            setFiles((prevFiles) => [...newFiles, ...prevFiles])

            const newUrls : string[] = newFiles.map((file) => URL.createObjectURL(file))
            setFileUrls((prevFileUrls) => [...newUrls, ...prevFileUrls])
        }
    }
    
    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault()
        const droppedFiles = event.dataTransfer.files


        if(droppedFiles.length > 0){
            const newFiles: File[] = Array.from(droppedFiles)

            for (let i = 0; i < newFiles.length; i++) {
                const file = newFiles[i]
                const MaxSiseInByte = 4 * 1024 * 1024 // 4MB

                if(file.size > MaxSiseInByte) {
                    alert('File size exceeds the limit of 4MB. Please choose a smaller file.')
                    return
                }
            }

            setFiles((prevFiles) => [...newFiles, ...prevFiles])

            const newUrls : string[] = newFiles.map((file) => URL.createObjectURL(file))
            setFileUrls((prevFileUrls) => [...newUrls, ...prevFileUrls])
        }
    }

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault()
    }

    const deleteFiles = (index:number) => {
        const updateFiles = [...files]
        updateFiles.splice(index,1)
        
        const updateUrls = [...fileUrls]
        updateUrls.splice(index,1)

        setFiles(updateFiles)
        setFileUrls(updateUrls)
    }

    const CreatePost = async () => {
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
            console.log(response)
            alert('Post created successfully!')
            setContent('')
        } catch (error: any) {
            console.error('Error creating post:', error.response?.data || error)
            alert('Error creating post: ' + (error.response?.data?.message || error.message))
        }
    }

    return (
        <div className='w-2/4 py-5 rounded-md mx-auto px-4'>
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
                                    {/*
                                    <Card onDrop={handleDrop} onDragOver={handleDragOver} className='w-full min-h-[300px] max-md:max-h-[300px] max-h-[600px] hover:border-red-500 border border-dashed rounded-md border-gray-700 relative overflow-auto'>
                                        {fileUrls.length > 0 ? (
                                            <Carousel className='w-full h-full'>
                                                <CarouselContent>
                                                    {fileUrls.map((url,index) => {
                                                        return (
                                                            <CarouselItem key={index} className='relative flex items-center justify-center'>
                                                                {files[index].type.startsWith('image/') ? (
                                                                    <img src={url} alt={files[index].name} />
                                                                ) : files[index].type.startsWith('video/') ? (
                                                                    <video src={url} autoPlay loop muted />
                                                                ) : (
                                                                    <div className='flex items-center justify-center w-full h-full'>
                                                                        <iframe src={url} height='100%' className='w-full' style={{ zIndex: 0 }} />
                                                                    </div>
                                                                )}
                                                                <Button onClick={() => deleteFiles(index)} className='absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 cursor-pointer flex items-center justify-center z-10'>
                                                                    X
                                                                </Button>
                                                            </CarouselItem>
                                                        )
                                                    })}
                                                </CarouselContent>
                                                <label style={{zIndex:'1000'}} htmlFor='file' className='absolute bottom-1 right-1 w-10 h-10 rounded-full border-dotted border-[1px] border-black bg-gray-100 cursor-pointer flex items-center justify-center'>
                                                    <Plus className='w-6 h-6' />
                                                    <input multiple onChange={handleFileChange} type='file' name='file' id='file' className='hidden' />
                                                </label>
                                                <CarouselPrevious className='left-0 z-10' style={{ zIndex: 10 }} />
                                                <CarouselNext className='right-0 z-10' style={{ zIndex: 10 }} />
                                            </Carousel>
                                        ):(
                                            <label htmlFor='file' className='absolute top-0 left-0 bottom-0 right-0 cursor-pointer flex flex-col items-center justify-center'>
                                                <UploadCloud className='text-3xl opacity-70' />
                                                <span className='block'>Click or drag & drop your files</span>
                                                <span className='block'>Image, Videos, PDF and txt files only (No word docx)</span>
                                                <span className='block'>Max-size 4MB</span>
                                                <input multiple onChange={handleFileChange} type='file' name='file' id='file' className='hidden' />
                                            </label>
                                        )
                                    }
                                    </Card> */}
                                    <Button className='my-2 w-full' onClick={CreatePost}>Submit</Button>
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