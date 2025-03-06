//Navbar.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

'use client'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Moon, Sun, User, DoorOpen} from "lucide-react"
import { useTheme } from 'next-themes'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from '@/components/ui/hover-card'
import { useSession, signOut } from 'next-auth/react'

type Props = {}

const Navbar = (props: Props) => {
    const { setTheme } = useTheme()
    const {data: Session, status} = useSession()
    return (
        <div className='max-w-[1280px] mx-auto'>
            <div className='flex items-center py-4 gap-4 md:gap-10 justify-between'>
                <a href='/'>
                    <Image src='/logo.png' width={100} height={40} alt='Logo Image' />
                </a>
                <div className='hidden md:block w-3/4'>
                    <Input type='text' placeholder='Search' className='w-full' />
                </div>
                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-4'>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button variant='outline' size='icon'>
                                <Link href='/app'><DoorOpen /></Link>
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className='w-auto opacity-15 text-black'>
                            Go To App
                        </HoverCardContent>
                    </HoverCard>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <User className="h-[1.2rem] w-[1.2rem]" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {status === 'unauthenticated' && (
                                <DropdownMenuItem>
                                    <Link href='/signin'>Sign In</Link>
                                </DropdownMenuItem>
                            )}
                            {status === "authenticated" && (
                                <>
                                    <DropdownMenuItem>
                                        <p>Hello {Session.user?.name}</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <p className='text-red-500' onClick={() => signOut()}>Sign Out</p>
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0' />
                                <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                                <span className='sr-only'>Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Mobile Navigation */}
                <div className='md:hidden'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="outline" size="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <div className="focus:bg-accent px-2 py-1.5">
                                <Input type='text' placeholder='Search' className='w-full' />
                            </div>
                            {status === 'unauthenticated' && (
                                <DropdownMenuItem asChild>
                                    <Link href='/signin'>Sign In</Link>
                                </DropdownMenuItem>
                            )}
                            {status === "authenticated" && (
                                <>
                                    <DropdownMenuItem>
                                        <p>Hello {Session.user?.name}</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => signOut()}>
                                        <p className='text-red-500'>Sign Out</p>
                                    </DropdownMenuItem>
                                </>
                            )}
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onSelect={() => setTheme("light")}>
                                        Light Mode
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => setTheme("dark")}>
                                        Dark Mode
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => setTheme("system")}>
                                        System Theme
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default Navbar