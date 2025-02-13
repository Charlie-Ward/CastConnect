//prismadb.ts
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import { PrismaClient } from "@prisma/client"

declare global{
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient
if(process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client