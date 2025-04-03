//page.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
    return (
        <div className="max-w-[1280px] mx-auto py-8 px-4">
            {/* About Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">About CastConnect</h1>
                <p className="text-xl text-gray-600 mb-8">
                    CastConnect was founded with a vision to revolutionize the casting process in the entertainment industry. Since our inception, we have been dedicated to creating a platform that connects casting directors and talent in a seamless and innovative way.
                </p>
            </div>

            {/* History Section */}
            <div className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-center">Our History</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    CastConnect was established in 2024 by a group of industry professionals who recognized the challenges faced by casting directors and talent alike.
                </p>
            </div>

            {/* Values Section */}
            <div className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 text-center">Our Values</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border rounded-lg p-6 shadow-sm">
                        <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
                        <p className="text-gray-600">
                            We embrace technology to provide cutting-edge solutions that simplify the casting process for everyone involved.
                        </p>
                    </div>
                    <div className="border rounded-lg p-6 shadow-sm">
                        <h3 className="text-2xl font-semibold mb-4">Community</h3>
                        <p className="text-gray-600">
                            Building a supportive and inclusive community is at the heart of everything we do.
                        </p>
                    </div>
                    <div className="border rounded-lg p-6 shadow-sm">
                        <h3 className="text-2xl font-semibold mb-4">Excellence</h3>
                        <p className="text-gray-600">
                            We strive for excellence in every aspect of our platform, ensuring a seamless experience for our users.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="mt-16 text-center">
                <h2 className="text-2xl font-semibold mb-6">Want to learn more or get started?</h2>
                <div className="flex justify-center gap-4">
                    <Button variant="default">
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                    <Button variant="secondary">
                        <Link href="/signup">Join Now</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}