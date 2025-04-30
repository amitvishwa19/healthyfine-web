'use client'
import React, { useContext, useState } from 'react'
import { ChannelType, MemberRole } from '@prisma/client';
import useAuth from '@/hooks/useAuth';
import { ServerHeader } from './ServerHeader';
import OrgSearch from './OrgSearch';
import { CogIcon, File, Goal, Hash, KeyIcon, LayoutDashboard, Mic, Plus, PlusIcon, ShieldAlert, ShieldCheck, Trash2, Video } from "lucide-react";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import ServerSection from './ServerSection';
import ServerChannel from './ServerChannel';
import ServerMember from './ServerMember';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SidebarItem } from './SidebarItem';
import { useLocalStorage } from '@uidotdev/usehooks'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import { OrgContext } from '@/providers/OrgProvider';
import { usePathname } from 'next/navigation'
import TaskMenu from '../[orgId]/workflow/_components/TaskMenu';
import { useSession } from 'next-auth/react';

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
};

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
}

export default function OrgSidebar({ serverId, server, boards, folders, userId, storageKey = 'sidebar-state' }) {
    const params = useParams()
    const [expanded, setExpanded] = useLocalStorage(storageKey, {})
    const boardId = params?.boardId
    const { data: session } = useSession()

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
    const members = server?.members.filter((member) => member.userId !== userId)
    const router = useRouter()
    const url = usePathname()



    const { server: selectedServer } = useContext(OrgContext)

    const role = server?.members.find((member) => member.userId === userId)?.role;
    const { onOpen } = useModal()


    const defaultAccordianValue = Object.keys(expanded)
        .reduce((acc, key) => {
            if (expanded[key]) {
                acc.push(key)
            }
            return acc;
        }, [])

    const onExpand = (i) => {
        setExpanded((curr) => ({
            ...curr,
            [i]: Boolean(expanded[i])
        }))

        //console.log('expanded', expanded)
    }

    return (
        <div className='flex-col min-h-full text-primary  w-[246px] dark:bg-[#162C46] bg-gray-200 relative'>
            <ServerHeader serverId={serverId} server={server} role={role} />
            <ScrollArea className=''>

                <Accordion type='multiple' defaultValue={defaultAccordianValue} className='py-2'>

                    <div className='p-2 -mb-2'>
                        <Link
                            href={`/workspace/${selectedServer?.id}`}
                            className={`p-2 px-2 flex items-center gap-2 cursor-pointer hover:bg-slate-900/40  rounded-md ${url.split('/')[3] === undefined && 'bg-slate-900/40'}`}
                        >
                            <CogIcon size={14} />
                            <span className='text-sm font-bold'>
                                Dashboard
                            </span>
                        </Link>
                    </div>


                    <SidebarItem onExpand={onExpand} title={'Channels'} value={'channel'} icon='Rss' >
                        <div className='flex flex-col'>
                            <div className='mt-2'>
                                <OrgSearch
                                    data={[
                                        {
                                            label: "Text Channels",
                                            type: "channel",
                                            data: textChannels?.map((channel) => ({
                                                id: channel.id,
                                                name: channel.name,
                                                icon: iconMap[channel.type],
                                            }))
                                        },
                                        {
                                            label: "Voice Channels",
                                            type: "channel",
                                            data: audioChannels?.map((channel) => ({
                                                id: channel.id,
                                                name: channel.name,
                                                icon: iconMap[channel.type],
                                            }))
                                        },
                                        {
                                            label: "Video Channels",
                                            type: "channel",
                                            data: videoChannels?.map((channel) => ({
                                                id: channel.id,
                                                name: channel.name,
                                                icon: iconMap[channel.type],
                                            }))
                                        },
                                        {
                                            label: "Members",
                                            type: "member",
                                            data: members?.map((member) => ({
                                                id: member.id,
                                                name: member?.user?.displayName,
                                                icon: roleIconMap[member.role],
                                            }))
                                        },
                                    ]}
                                />
                            </div>

                            <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

                            {!!textChannels?.length && (
                                <div className="mb-2">
                                    <ServerSection
                                        sectionType="channels"
                                        channelType={ChannelType.TEXT}
                                        role={role}
                                        label="Text Channels"
                                    />
                                    <div className="space-y-[2px]">
                                        {textChannels.map((channel) => (
                                            <ServerChannel
                                                key={channel.id}
                                                channel={channel}
                                                role={role}
                                                server={server}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!!audioChannels?.length && (
                                <div className="mb-2">
                                    <ServerSection
                                        sectionType="channels"
                                        channelType={ChannelType.AUDIO}
                                        role={role}
                                        label="Voice Channels"
                                    />
                                    <div className="space-y-[2px]">
                                        {audioChannels.map((channel) => (
                                            <ServerChannel
                                                key={channel.id}
                                                channel={channel}
                                                role={role}
                                                server={server}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!!videoChannels?.length && (
                                <div className="mb-2">
                                    <ServerSection
                                        sectionType="channels"
                                        channelType={ChannelType.VIDEO}
                                        role={role}
                                        label="Video Channels"
                                    />
                                    <div className="space-y-[2px]">
                                        {videoChannels.map((channel) => (
                                            <ServerChannel
                                                key={channel.id}
                                                channel={channel}
                                                role={role}
                                                server={server}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!!members?.length && (
                                <div className="mb-2">
                                    <ServerSection
                                        sectionType="members"
                                        role={role}
                                        label="Members"
                                        server={server}
                                    />
                                    <div className="space-y-[2px]">
                                        {members.map((member) => (
                                            <ServerMember
                                                key={member.id}
                                                member={member}
                                                server={server}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </SidebarItem>

                    <SidebarItem onExpand={onExpand} title={'Projects'} value={'projects'} icon='Command' >


                        <div className='flex flex-col'>

                            <Link href={`/workspace/${selectedServer?.id}/project`} className=' p-2 px-2 flex items-center gap-2 cursor-pointer hover:bg-muted-foreground/10  rounded-md font-semibold'>
                                <span className='text-sm'>
                                    Projects
                                </span>
                            </Link>



                            <div className='flex text-xs text-muted-foreground items-center justify-between cursor-pointer hover:bg-muted-foreground/10 p-2 rounded-md font-semibold'
                                onClick={() => { onOpen("createBoard", { serverId: server.id }) }}
                            >
                                New Project
                                <Plus className='w-4 h-4' />
                            </div>

                            <div className='flex flex-col gap-0 mt-2'>
                                {
                                    server?.boards?.map((board) => (
                                        <div
                                            key={board.id}
                                            className={`flex p-2 w-full justify-between dark:text-muted-foreground rounded-md  hover:bg-muted-foreground/10 ${board.id === boardId ? 'bg-slate-900/40' : ''}`}
                                        >
                                            <Link href={`/workspace/${server?.id}/board/${board.id}`} className='flex capitalize  w-[85%] flex-wrap'>
                                                <div className={`flex   dark:text-gray-200/60 text-slate-900  text-xs `}>
                                                    {board.title}
                                                </div>
                                            </Link>
                                            <Trash2
                                                className='h-4 w-4  text-gray-200/60 dark:text-muted-foreground cursor-pointer'
                                                onClick={() => { onOpen("deleteBoard", { board, orgId: params.orgId }) }}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </SidebarItem>

                    <SidebarItem onExpand={onExpand} title={'Documents'} value={'filemanage'} icon='File'>

                        <div className='flex flex-col' onClick={() => { console.log('first') }}>

                            {/* <div className='flex text-xs text-muted-foreground items-center justify-between cursor-pointer hover:bg-muted-foreground/10 p-2 rounded-md font-semibold'
                                onClick={() => { onOpen("addFile", { serverId: server.id }) }}
                            >
                                Add New
                                <Plus className='w-4 h-4' />
                            </div> */}

                            <div className='flex text-xs text-muted-foreground items-center justify-between cursor-pointer hover:bg-muted-foreground/10 p-2 rounded-md font-semibold'
                                onClick={() => router.push(`/workspace/${server.id}/file`)}
                            >
                                File Management

                            </div>

                            {/* <div className='flex text-xs text-muted-foreground items-center justify-between cursor-pointer hover:bg-muted-foreground/10 p-2 rounded-md font-semibold'
                                onClick={() => { onOpen("addFile", { serverId }) }}
                            >
                                Folders
                                <Plus className='w-4 h-4' />
                            </div> */}


                            <div className=''>
                                {/* {
                                    folders?.map((folder) => (
                                        <div key={folder.id} className={`flex items-center justify-between mb-2 py-2 pl-2 dark:text-muted-foreground rounded-md ml-2 hover:bg-slate-900/40  ${board.id === boardId ? 'bg-slate-900/40' : ''} `}>
                                            <Link href={`/org/${serverId}/file/${folder.id}`} className=' capitalize  '>
                                                <div className={`  dark:text-gray-200/60 text-slate-900   `}>
                                                    {folder.title}
                                                </div>
                                            </Link>
                                            <Trash2 className='h-4 w-4 mr-2 text-gray-200/60 dark:text-muted-foreground cursor-pointer' onClick={() => { onOpen("deleteBoard", { folder }) }} />
                                        </div>
                                    ))
                                } */}
                            </div>
                        </div>
                    </SidebarItem>

                    <SidebarItem onExpand={onExpand} title={'Management'} value={'management'} icon='Users' >

                        <div className='flex flex-col' onClick={() => { console.log('first') }}>

                            <div className='flex text-xs text-muted-foreground items-center justify-between cursor-pointer hover:bg-muted-foreground/10 p-2 rounded-md font-semibold'
                                onClick={() => router.push(`/workspace/${selectedServer?.id}/management/user`)}
                            >
                                Users

                            </div>

                            <div className='flex text-xs text-muted-foreground items-center justify-between cursor-pointer hover:bg-muted-foreground/10 p-2 rounded-md font-semibold'
                                onClick={() => router.push(`/workspace/${selectedServer?.id}/management/role`)}
                            >
                                Roles

                            </div>

                            <div className='flex text-xs text-muted-foreground items-center justify-between cursor-pointer hover:bg-muted-foreground/10 p-2 rounded-md font-semibold'
                                onClick={() => router.push(`/workspace/${selectedServer?.id}/management/permission`)}
                            >
                                Permissions

                            </div>


                            <div className=''>
                                {/* {
                                    folders?.map((folder) => (
                                        <div key={folder.id} className={`flex items-center justify-between mb-2 py-2 pl-2 dark:text-muted-foreground rounded-md ml-2 hover:bg-slate-900/40  ${board.id === boardId ? 'bg-slate-900/40' : ''} `}>
                                            <Link href={`/org/${serverId}/file/${folder.id}`} className=' capitalize  '>
                                                <div className={`  dark:text-gray-200/60 text-slate-900   `}>
                                                    {folder.title}
                                                </div>
                                            </Link>
                                            <Trash2 className='h-4 w-4 mr-2 text-gray-200/60 dark:text-muted-foreground cursor-pointer' onClick={() => { onOpen("deleteBoard", { folder }) }} />
                                        </div>
                                    ))
                                } */}
                            </div>
                        </div>
                    </SidebarItem>

                    <SidebarItem onExpand={onExpand} title={'Workflow'} value={'scrapeflow'} icon='LayoutDashboard' >
                        <div>

                            <Link
                                href={`/workspace/${selectedServer?.id}/workflow`}
                                className='text-xs ml-2 text-muted-foreground w-full flex items-center justify-between cursor-pointer font-semibold'
                            >
                                All Workflows

                                <span>
                                    <Goal size={16} />
                                </span>
                            </Link>

                            {params.workflowId && <TaskMenu />}



                        </div>
                    </SidebarItem>

                    <div className='p-2 -mb-2'>
                        <Link
                            href={`/workspace/${selectedServer?.id}/credentials`}
                            className={`p-2 px-2 flex items-center gap-2 cursor-pointer hover:bg-slate-900/40  rounded-md ${url.split('/')[3] === 'credentials' && 'bg-slate-900/40'}`}
                        >
                            <KeyIcon size={14} />
                            <span className='text-sm font-bold'>
                                Credentials
                            </span>
                        </Link>
                    </div>

                    <SidebarItem onExpand={onExpand} title={'Settings'} value={'setting'} icon='Cog' >

                        <div className='flex flex-col'>

                            <div className='flex text-xs text-muted-foreground items-center justify-between cursor-pointer hover:bg-muted-foreground/10 p-2 rounded-md font-semibold'
                                onClick={() => onOpen("createServer")}
                            >
                                New Workspace

                            </div>

                            <div className='flex text-xs text-muted-foreground items-center justify-between cursor-pointer hover:bg-muted-foreground/10 p-2 rounded-md font-semibold'
                                onClick={() => router.push(`/workspace/${selectedServer?.id}/setting/general`)}
                            >
                                General
                            </div>

                        </div>
                    </SidebarItem>



                </Accordion>



            </ScrollArea>

        </div>
    )
}

