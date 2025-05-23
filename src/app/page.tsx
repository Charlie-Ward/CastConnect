//page.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
        {/* Hero Section */}
        <div className="max-w-[1280px] mx-auto py-8 px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome to CastConnect</h1>
            <p className="text-xl text-gray-600 mb-8">The premier platform connecting casting directors with talent</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="default">
                <Link href='/home'>
                  Browse Opportunities
                </Link>
              </Button>
            </div>
          </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">For New Casting Directors</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Post detailed casting calls</li>
              <li>• Reach a large audience of future talents</li>
            </ul>
            <Button size="lg" variant="default" className="space-y-3 mt-4">
              <Link href='/signup'>
                Create an account now
              </Link>
            </Button>
          </div>

          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">For Talent</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Browse casting opportunities</li>
              <li>• See all the info in one place</li>
            </ul>
            <Button size="lg" variant="default" className="space-y-3 mt-4">
              <Link href='/home'>
                Visit the platform
              </Link>
            </Button>
          </div>

          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">For Returning Casting Directors</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Edit previously posted casting calls</li>
            </ul>
            <Button size="lg" variant="default" className="space-y-3 mt-4">
              <Link href='/signin'>
                Sign In
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-16 text-center">
            <Button size="lg" variant="default" className="py-4 px-8 text-lg">
            <Link href='/about'>
              Find Out More
            </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
