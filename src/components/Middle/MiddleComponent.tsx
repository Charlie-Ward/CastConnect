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
      <QuerryWrapper>
        <PostRender />
      </QuerryWrapper>
    </div>
  )
}

export default MiddleComponent