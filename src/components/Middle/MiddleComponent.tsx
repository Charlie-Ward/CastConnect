//MiddleComponent.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

'use client'

import React from 'react'
import NewPost from './NewPost'
import { useSession } from 'next-auth/react'
import { Card } from '../ui/card'
import PostRender from './PostRender'
import QuerryWrapper from '../QueryWrapper'
import { Button } from '../ui/button'
import Link from 'next/link'

type Props = {}
 
const MiddleComponent = (props: Props) => {

  const {data: Session, status} = useSession()

  return (
    <div>
      {/* {status === 'unauthenticated' && (
        <div className='w-2/4 py-5 rounded-md mx-auto px-4'>
            <Card className='p-6 text-center'>
            <div className='mb-4 text-lg font-semibold'>
              Login To Write A Post
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
        <NewPost />
      )} */}
      <QuerryWrapper>
        <PostRender />
      </QuerryWrapper>
    </div>
  )
}

export default MiddleComponent