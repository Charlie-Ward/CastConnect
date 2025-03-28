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

type Props = {}

const MiddleComponent = (props: Props) => {

  const {data: Session, status} = useSession()

  return (
    <div>
      {status === 'unauthenticated' && (
        <div className='w-2/4 py-5 rounded-md mx-auto px-4'>
          <Card className='p-4'>
            <div className='flex items-center space-x-5 justify-center'>
              Login To Write A Post
            </div>
          </Card>
        </div>
      )}
      {status === "authenticated" && (
        <NewPost />
      )}
      <QuerryWrapper>
        <PostRender />
      </QuerryWrapper>
    </div>
  )
}

export default MiddleComponent