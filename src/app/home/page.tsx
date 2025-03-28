//Page.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import MenuOptions from '@/components/LeftSide/MenuOptions'
import MiddleComponent from '@/components/Middle/MiddleComponent'
import React from 'react'

const page = () => {
  return (
    <div className='max-w-[1300px] mx-auto'>
      <div className='flex w-full'>
        <MenuOptions />
        <div className='h-[90vh] overflow-y-auto lg:w-3/4 md:w-3/5 py-5 mx-4 px-4'>
          <MiddleComponent />
        </div>
      </div>
    </div>
  )
}

export default page