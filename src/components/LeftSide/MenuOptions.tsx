//MenuOptions.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import { Home, LayoutGrid, SquarePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Separator } from '../ui/separator'

type Props = {}

type MenuItemProps = {
  icon: React.ReactElement
  label: string
  href: string
}

// Button creation function
const MenuItem = ({icon, label, href}: MenuItemProps) => {
    return(
        <Link href={href} className='flex items-center space-x-6 py-2 hover:text-pink-500 cursor-pointer opacity-80 hover:opacity-100'>
            {icon}
            <span>{label}</span>
        </Link>
    )
}

const MenuOptions = (props: Props) => {

    const MenuItems = [
        {icon: <Home />, label: 'Home', href: '/home'},
        {icon: <SquarePlus />, label: 'New Casting Call', href: '/new-casting-call'},
        {icon: <LayoutGrid />, label: 'My Casting Calls', href: '/my-casting-calls'},
    ]

    //The return of the page. Runs over each entry of the array and calls the creation function with the data of each entry in the array.
    return (
        <div className='lg:w-1/4 md:1/5 p-5 max-md:hidden my-5'>
            <div className='flex flex-col'>
                <Separator className='my-4' />
                {MenuItems.map((item, index) => (
                    <MenuItem key={index} icon={item.icon} label={item.label} href={item.href} />
                ))}
                <Separator className='my-4' />
            </div>
        </div>
    )
}

export default MenuOptions