'use client'
import React, { useContext, useEffect } from 'react'
import OrgSidebar from '../_components/OrgSidebar'
import { TopNav } from '../_components/TopNav'
import { OrgNavigation } from '../_components/OrgNavigation'
import { useAuth } from '@/providers/AuthProvider'
import { OrgContext } from '@/providers/OrgProvider'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useParams, useRouter } from 'next/navigation'
import AppLoader from '../_components/AppLoader'
import { QueryProvider } from '@/providers/QueryProvider'
import { useSession } from 'next-auth/react'
import { useAction } from '@/hooks/use-action'
import { getOrgData } from '../_action/server/get_org_data'
import { OrgModalProvider } from '@/providers/OrgModalProvider'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function OrgIdLayout({ children }) {
    const { orgId } = useParams()
    const { data: session } = useSession()
    const { user } = useAuth()
    const { server, updateServer, updateServers, loading, setLoading } = useContext(OrgContext)
    const router = useRouter()

    //console.log('user', user)

    useEffect(() => {
        //setLoading(true)
        getServerData({ userId: session?.user?.userId })
    }, [session])

    const { execute: getServerData, fieldErrors } = useAction(getOrgData, {
        onSuccess: (data) => {
            //console.log(data)
            //setLoading(false)
            updateServer(data.server)
            updateServers(data.servers)
        },
        onError: (error) => {
            setProcessing(false)
            toast.error(error)
        }
    })




    return (

        <QueryProvider>
            <OrgModalProvider />
            <div className={`flex h-screen max-w-screen ${inter.className} `}>
                <div className='h-screen  flex-grow hidden md:flex'>
                    <OrgNavigation />
                    <OrgSidebar server={server} userId={session?.user?.userId} />
                </div>


                <div className='flex flex-col w-full h-screen'>
                    <TopNav serverId={orgId} />

                    <ScrollArea className='h-full relative flex-1'>
                        {children}
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>

                </div>
                {loading && <AppLoader />}
            </div>
        </QueryProvider>


    )
}
