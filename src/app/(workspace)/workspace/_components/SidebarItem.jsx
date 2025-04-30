'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AppIcon } from '@/components/global/AppIcon'
import { cn } from '@/lib/utils'



export function SidebarItem({ title, children, value, icon, isActive, onExpand }) {
    const [expanded, setExpanded] = useState(false)

    const handleOnExpand = (value) => {
        console.log('Sidebar item open', 'value:', value, 'expanded:', expanded)
        onExpand(value)
        setExpanded(!expanded)
        console.log(JSON.stringify(expanded))
        //console.log('value', value)
    }

    return (
        <AccordionItem className='border-none rounded-md' value={value} open>
            <AccordionTrigger
                onClick={() => { handleOnExpand(value) }}
                className={cn('flex item-ccenter gap-x-2 p-0 mt-2 mx-1.5 hover:bg-nuteral-500/10 transition text-start no-underline hover:no-underline rounded-t-md ', expanded && 'bg-slate-900/40')}
            >
                <div className={cn('hover:bg-slate-900/40 px-2 py-2 w-full rounded-md font-semibold text-md flex items-center gap-2')} >
                    <AppIcon name={icon} size={14} />
                    {title}
                </div>
            </AccordionTrigger>
            <AccordionContent className={`gap-x-2 mx-[6px] p-2 px-4 bg-slate-900/40 text-xs rounded-b-md`}>
                {children}
            </AccordionContent>
        </AccordionItem>
    )
}
