//route.ts
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/CastConnect/blob/main/LICENSE

import NextAuth from "next-auth"
import {options} from "./options"

const handler = NextAuth(options)

export {handler as GET, handler as POST}