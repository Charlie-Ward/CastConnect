//DisclaimerWarning.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import Link from 'next/link'
import React from 'react'

const DisclaimerWarning = () => {
  return (
    <div className="bg-yellow-100 dark:bg-yellow-900 p-2 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto text-center text-sm">
        <p className="text-yellow-800 dark:text-yellow-200">
          <span className="font-bold">Disclaimer:</span> This is an A-Level project and should not be used as a production service. The platform is for demonstration purposes only. <Link href='/find-out-more' className='text-decoration: underline text-blue-500'>Find Out More</Link>
        </p>
      </div>
    </div>
  )
}

export default DisclaimerWarning