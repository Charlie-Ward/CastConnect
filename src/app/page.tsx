//page.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="max-w-[1280px] mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to CastConnect</h1>
          <p className="text-xl text-gray-600 mb-8">The premier platform connecting casting directors with talent</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="default">
              Post a Casting Call
            </Button>
            <Button size="lg" variant="outline">
              Browse Opportunities
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">For Casting Directors</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Post detailed casting calls</li>
              <li>• Manage applications efficiently</li>
              <li>• Direct communication with talent</li>
              <li>• Schedule auditions seamlessly</li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">For Talent</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Browse casting opportunities</li>
              <li>• Create professional profiles</li>
              <li>• Submit applications easily</li>
              <li>• Track your submissions</li>
            </ul>
          </div>

          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Latest Features</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Smart matching algorithm</li>
              <li>• Virtual audition rooms</li>
              <li>• Portfolio management</li>
              <li>• Industry networking tools</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Ready to get started?</h2>
          <div className="flex justify-center gap-4">
            <Button variant="default">Sign Up Now</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
