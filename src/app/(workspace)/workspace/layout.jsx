import { db } from '@/lib/db'
import { useSession } from 'next-auth/react'
import React from 'react'

export default async function WorkspaceLayout({ children }) {
    //const { data: session } = useSession()
    //const workspace = await db.server

    //console.log(session)
    return (
        <div>
            {/* Workspace Layout */}
            {/* <p>Made with 💗 by Devlomatix</p> */}
            {children}
        </div>
    )
}
