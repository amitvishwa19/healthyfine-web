import { db } from '@/lib/db'
import { useSession } from 'next-auth/react'
import React from 'react'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function WorkspaceLayout({ children }) {
    //const { data: session } = useSession()
    //const workspace = await db.server

    //console.log(session)
    return (
        <div className={`${inter.className} `}>
            {/* Workspace Layout */}
            {/* <p>Made with 💗 by Devlomatix</p> */}
            {children}
        </div>
    )
}
