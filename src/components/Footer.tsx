//Footer.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className="border-t mt-16">
      <div className="max-w-[1280px] mx-auto py-8 px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/about" className='text-decoration: hover:underline hover:text-blue-500'>Our Mission</Link></li>
              <li><Link href="/contact" className='text-decoration: hover:underline hover:text-blue-500'>Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Talent</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/home" className='text-decoration: hover:underline hover:text-blue-500'>Browse Roles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Casting</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/signup" className='text-decoration: hover:underline hover:text-blue-500'>Create an Account</Link></li>
              <li><Link href="/signin" className='text-decoration: hover:underline hover:text-blue-500'>Sign In</Link></li>
              <li><Link href="/home" className='text-decoration: hover:underline hover:text-blue-500'>Head to the Platform</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/privacy-policy" className='text-decoration: hover:underline hover:text-blue-500'>Privacy Policy</Link></li>
              <li><Link href="/find-out-more" className='text-decoration: hover:underline hover:text-blue-500'>Disclaimer Explainer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} CastConnect (Charlie Ward). All rights reserved. License can be found <Link href="/license" className='text-decoration: underline text-blue-500'>here.</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Footer