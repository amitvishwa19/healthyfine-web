'use client'
import { ActionTooltip } from '@/components/global/ActionTooltip'
import { UserAvatar } from '@/components/global/UseAvatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationAction } from './NavigationAction'
import logo from '@/assets/images/devlomatix.png'
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from "next/image";
import { OrgContext } from '@/providers/OrgProvider'

export function OrgNavigation() {
    const { orgId } = useParams();
    const router = useRouter();
    const { servers, updateServer, testFunction } = useContext(OrgContext)

    console.log('@orgNavigation@servers', servers)

    useEffect(() => {
        !servers && router.push(`/`)
    }, [servers])

    console.log(servers)

    const handleOnItemClick = (server) => {
        //console.log('Server select from OrgNavigation', server)
        updateServer(server)
        //testFunction(server)
        router.push(`/workspace/${server.id}`)
    }

    return (
        <div className='space-y-4 py-3 flex flex-col item-center dark:bg-[#031525] bg-zinc-500 h-screen w-[72px]'>
            <UserAvatar src={logo.src} className='ml-3' />

            <Separator className='h-[2px] dark:bg-gray-600  rounded-md w-12 mx-auto' />

            <ScrollArea className='flex-1 w-full'>
                {
                    servers?.map((server, index) => {

                        return (
                            <div key={server.id} className='mb-4'>
                                <ActionTooltip
                                    side="right"
                                    align="center"
                                    label={server?.name}
                                >
                                    <button
                                        onClick={() => { handleOnItemClick(server) }}
                                        className="group relative flex items-center"
                                    >
                                        <div className={cn(
                                            "absolute left-0 bdark:bg-primary bg-[#E5E7EB] rounded-r-full transition-all w-[4px]",
                                            orgId !== server?.id && "group-hover:h-[20px]",
                                            orgId === server?.id ? "h-[36px]" : "h-[8px]"
                                        )} />
                                        <div className={cn(
                                            "relative group flex mx-3 h-[48px] w-[48px] rounded-lg group-hover:rounded-lg transition-all overflow-hidden",
                                            orgId === server?.id && "bg-primary/10 text-primary rounded-[16px]"
                                        )}>

                                            {
                                                server?.imageUrl ? (
                                                    <Image
                                                        fill
                                                        src={server?.imageUrl || logo}
                                                        alt="Channel"
                                                    />) : (
                                                    <div className='dark:bg-[#162C46] bg-[#E5E7EB] flex items-center justify-center w-full capitalize font-bold text-3xl'>
                                                        {server?.name?.substring(0, 1)}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </button>
                                </ActionTooltip>
                            </div>
                        )
                    })
                }
                {/* <Separator className='h-[2px] dark:bg-gray-600  rounded-md w-12 mx-auto mb-2' /> */}

            </ScrollArea>

            <Separator className='h-[2px] dark:bg-gray-600  rounded-md w-12 mx-auto' />

            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <NavigationAction />
            </div>
        </div>
    )
}



