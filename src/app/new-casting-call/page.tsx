'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import NewPost from '@/components/Middle/NewPost'
import { Menu } from 'lucide-react'
import MenuOptions from '@/components/LeftSide/MenuOptions'

type Props = {}

const Page = (props: Props) => {

    const {data: Session, status} = useSession() // Able to see the session details from next-auth

  return (
    <div className='max-w-[1300px] mx-auto'>
      <div className='flex w-full'>
        <MenuOptions /> {/* Left side menu options */}
        <div className='h-[90vh] overflow-y-auto lg:w-3/4 md:w-3/5 py-5 mx-4 px-4'>
          {status === 'unauthenticated' && ( // If user is not logged in
            <div className='w-2/4 py-5 rounded-md mx-auto px-4'>
                <Card className='p-6 text-center'>
                  {/* Provide user feedback that they should login */}
                  <div className='mb-4 text-lg font-semibold'>
                    Login To Write A Casting Call
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button variant="default" className="w-32">
                      <Link href='/signin'>Log In</Link>
                    </Button>
                    <Button variant="secondary" className="w-32">
                      <Link href='/signup'>Sign Up Now</Link>
                    </Button>
                  </div>
                </Card>
            </div>
          )}
          {status === "authenticated" && ( // If user is logged in
            <NewPost />
          )}
        </div>
      </div>
    </div>
  )
}

export default Page