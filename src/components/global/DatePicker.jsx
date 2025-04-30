'use client'
import React, { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalenderIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'


export function DatePicker({ value, onChange, className, placeholder = 'Select due date' }) {

    const [open, setOpen] = useState(false)


    const handleDateSelect = (d) => {
        //console.log('date picker date select', d)
        setOpen(!open)
        onChange(d)
        //onChange(d)
    }


    const handleOnOpenChange = () => {
        console.log('date picker handleOpenChange')
        setOpen(!open)

    }

    return (
        <Popover open={open} onOpenChange={handleOnOpenChange}  >
            <PopoverTrigger asChild>
                <Button
                    variant='ghost'
                    className={cn('w-full justify-start text-left font-normal px-2 dark:bg-slate-800 bg-slate-400', !value && 'dark:text-slate-400 text-slate-700')}
                >
                    <CalenderIcon size={16} className='mr-2' />
                    {value ? format(value, 'PPP') : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0"  >
                <Calendar
                    mode='single'
                    selected={new Date()}
                    onSelect={(date) => handleDateSelect(date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
