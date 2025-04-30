'use client'
import { Separator } from '@/components/ui/separator';
import React, { useContext, useEffect, useState } from 'react'
import { ChannelItem } from '../_components/ChannelItem';
import { BoardItem } from '../_components/BoardItem';
import { OrgContext } from '@/providers/OrgProvider';
//import { useSelector } from 'react-redux';
import { ScrollArea } from "@/components/ui/scroll-area"
import { io } from 'socket.io-client'

export default function OrgIdPage({ params }) {

    const [socket, setSocket] = useState(undefined)
    const { server, servers } = useContext(OrgContext)
    const [msg, setMsg] = useState('')





    return (
        <ScrollArea className='flex flex-grow p-2'>
            {/* <div className='flex items-center px-4 h-12 bg-black/60 justify-between'>
                <div>
                    OrgId Top Navbar
                </div>
                <AuthSelector />
            </div> */}
            <div className=' space-y-4  h-full'>

                <div className='mb-10'>
                    <div>
                        <h3 className="text-md font-medium">Channels</h3>
                        <p className="text-xs text-muted-foreground mb-4">
                            All channel related with organization
                        </p>
                        <Separator />
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4'>
                        {
                            server?.channels?.map((channel, index) => {

                                return (
                                    <ChannelItem key={index} channel={channel} />
                                )
                            })
                        }
                    </div>
                </div>

                <div>
                    <div>
                        <h3 className="text-md font-medium">Taskboards</h3>
                        <p className="text-xs text-muted-foreground mb-4">
                            All Taskboards related with organization
                        </p>
                        <Separator />
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4'>
                        {
                            server?.boards?.map((board, index) => {
                                return (
                                    <BoardItem key={index} board={board} />
                                )
                            })
                        }
                    </div>
                </div>

                {/* <div>
                {
                    roles?.map((role) => {
                        return (
                            <div key={role.id}>
                                {role.title}
                                {
                                    role.permissions.map((permission, index) => {
                                        return (
                                            <div key={index} >
                                                {permission.title}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div> */}

                <div className='mb-10 bg-green-100 h-[600px] rounded-md'>

                </div>

                {/* <div className='mb-10 bg-green-100 h-[600px] rounded-md'>

                </div> */}

                {/* <div className='mb-10 bg-green-100 h-[600px] rounded-md'>

                </div> */}


            </div>

            {/* {
                loading && <Loader />
            } */}

        </ScrollArea >
    )
}
