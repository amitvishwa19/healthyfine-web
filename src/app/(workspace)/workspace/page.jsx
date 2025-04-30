'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import orgimage from "@/assets/images/org.png";
import { cn } from '@/lib/utils'
import { redirect, useRouter } from 'next/navigation'
import { OrgContext } from '@/providers/OrgProvider'
import { useAuth } from '@/providers/AuthProvider'
import { OrgCreateModal } from './_components/OrgCreateModal'
import { useAction } from '@/hooks/use-action'
import { getOrgData } from './_action/server/get_org_data'
import { useSession } from 'next-auth/react'
import { useModal } from '@/hooks/useModal'

const textFont = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})


export default function WorkspacePage() {
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const { server, servers, updateServer, updateServers } = useContext(OrgContext)
    const { user } = useAuth()
    const router = useRouter()
    const { data: session } = useSession()
    const { onOpen } = useModal()

    useEffect(() => {
        getServerData({ userId: session?.user?.userId })
    }, [])


    const { execute: getServerData, fieldErrors } = useAction(getOrgData, {
        onSuccess: (data) => {
            console.log(data)
            updateServer(data.server)
            updateServers(data.servers)
            setLoading(false)

            if (!data.server) {
                onOpen('createOrgModal')
            } else {
                router.push(`/workspace/${data?.server?.id}`)
            }
        },
        onError: (error) => {
            setProcessing(false)
            toast.error(error)
        }
    })

    useEffect(() => {
        if (server) {
            router.push(`/workspace/${server.id}`)
        } else {
            setShowCreateWorkspaceModal(true)
        }
    }, [server])

    return (
        <div className='flex flex-col h-screen items-center  justify-center w-full animated-dotted-background'>
            <div className='flex flex-col  gap-10 items-center p-10 '>


                <div className={cn('flex items-center justify-center flex-col')}>
                    <h1 className='text-4xl md:text-[42px] text-center text-grey-600 mb-6 font-semibold'>
                        Imagine a Organizational workspace and manage all SAAS...
                    </h1>
                </div>

                <div className='flex items-center w-full  mx-auto justify-center my-4' >
                    <Image src={orgimage.src} height={250} width={350} alt='kanban' className=''></Image>
                </div>

                {/* <DefaultOrgCreator /> */}
                <div className='flex items-center justify-center flex-col  w-full'>

                    <div className={cn('text-sm md:text-md mt-4 max-w-xs md:max-w-4xl text-center mb-4 font-semibold', textFont.className)}>
                        Collaborate, Manage Project and reach new productivity
                        peaks. ...where you can belong to a school club, a gaming group, or a worldwide art community.
                        Where just you and a handful of friends can spend time together.
                        A place that makes it easy to talk every day and hang out more often.
                    </div>



                </div>
            </div >

            <div className=''>
                {
                    (!loading && showCreateWorkspaceModal) && <OrgCreateModal />


                }
                <Loader className=' animate-spin' />
            </div>
        </div>
    )
}
