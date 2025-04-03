//MiddleComponent.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import PostRender from './PostRender'
import QuerryWrapper from '../QueryWrapper'

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