//page.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import React from 'react'

const page = () => {
    return (
        <div className="max-w-[1280px] mx-auto px-4 py-8">
            <div className="space-y-8">
                <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">About This Project</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    A Computer Science A-Level Project for OCR
                </p>
                </div>

                <div className="space-y-6">
                <section className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-semibold">Project Overview</h2>
                    <p>
                    CastConnect is a completed demonstration project developed as part of the OCR A-Level Computer Science coursework. 
                    It showcases a practical application of modern web development technologies and frameworks, demonstrating 
                    full-stack development capabilities and best practices.
                    </p>
                </section>

                <section className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-semibold">Technical Stack</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-medium">Core Framework</h3>
                        <ul className="list-disc pl-6">
                        <li>Next.js 14 - React framework with server-side rendering capabilities</li>
                        <li>TypeScript - For type-safe JavaScript development</li>
                        <li>Tailwind CSS - Utility-first CSS framework</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-medium">Key Libraries</h3>
                        <ul className="list-disc pl-6">
                        <li>Shadcn/ui - React components built with Radix UI</li>
                        <li>Next-Auth - Authentication solution</li>
                        <li>React Hook Form - Form validation and handling</li>
                        <li>Zod - Schema validation</li>
                        <li>Prisma - Database ORM</li>
                        <li>Axios - HTTP client for API requests</li>
                        <li>Framer Motion - Animation library</li>
                        </ul>
                    </div>
                    </div>
                </section>

                <section className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-semibold">Educational Purpose</h2>
                    <p>
                    This project was designed and implemented solely for educational purposes as part of an A-Level 
                    qualification. While it demonstrates functional features and modern development practices, it is 
                    not intended for production use. The codebase served as a learning platform to understand concepts 
                    like:
                    </p>
                    <ul className="list-disc pl-6">
                    <li>Full-stack web development</li>
                    <li>Modern JavaScript frameworks</li>
                    <li>User authentication and authorization</li>
                    <li>Responsive design principles</li>
                    <li>Database management</li>
                    <li>Hot Module Replacement (HMR) and Webpack configuration</li>
                    </ul>
                </section>
                <section className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-semibold">Project Completion</h2>
                    <p>
                    The project has been successfully completed, meeting all the requirements of the OCR A-Level Computer Science coursework. 
                    It serves as a comprehensive demonstration of the skills and technologies learned during the course.
                    </p>
                </section>
                </div>
            </div>
        </div>
    )
}

export default page