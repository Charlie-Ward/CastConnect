//Provider.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

type Props = {
    children: ReactNode
}

const Provider = ({children}:Props) => {
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default Provider
