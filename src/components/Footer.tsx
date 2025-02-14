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
              {/* <li>Our Story</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Contact</li> */}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Talent</h3>
            <ul className="space-y-2 text-gray-600">
              {/* <li>Browse Roles</li>
              <li>Create Profile</li>
              <li>Submit Applications</li>
              <li>Resources</li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Casting</h3>
            <ul className="space-y-2 text-gray-600">
              {/* <li>Post a Role</li>
              <li>Talent Search</li>
              <li>Manage Casting</li>
              <li>Pricing</li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/privacy-policy" className='text-decoration: hover:underline hover:text-blue-500'>Privacy Policy</Link></li>
              <li><Link href="/find-out-more" className='text-decoration: hover:underline hover:text-blue-500'>Disclaimer Explainer</Link></li>
              {/* <li>Terms of Service</li> */}
              {/* <li>Cookie Policy</li>
              <li>Accessibility</li> */}
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