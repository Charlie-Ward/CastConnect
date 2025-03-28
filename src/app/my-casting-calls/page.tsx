//Page.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

'use client'

import MenuOptions from '@/components/LeftSide/MenuOptions'

import React from 'react'
import QueryWrapper from '@/components/QueryWrapper'
import OwnPostRender from '@/components/own-casting-calls'
import { useSession } from 'next-auth/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {

  const { data: Session, status } = useSession()

  return (
    <div className='max-w-[1300px] mx-auto'>
      <div className='flex w-full'>
        <MenuOptions />
        <div className='h-[90vh] overflow-y-auto lg:w-2/4 md:w-3/5 py-5 mx-4 px-4'>
          {status === 'unauthenticated' && (
            <div className='w-2/4 py-5 rounded-md mx-auto px-4'>
            <Card className='p-6 text-center'>
              <div className='mb-4 text-lg font-semibold'>
                Login To See Your Casting Calls
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
          {status === "authenticated" && (
            <QueryWrapper>
              <OwnPostRender />
            </QueryWrapper>
          )}
        </div>
      </div>
    </div>
  )
}

export default page