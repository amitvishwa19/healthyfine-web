"use client";
import React from 'react'

import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export default function EmojiPicker({ onChange }) {

    const { resolvedTheme } = useTheme();


    return (
        <Popover>
            <PopoverTrigger>
                <Smile
                    className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                />
            </PopoverTrigger>
            <PopoverContent
                side="right"
                sideOffset={40}
                className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
            >

                <Picker
                    className='bg-red-200'
                    theme={resolvedTheme}
                    data={data}
                    onEmojiSelect={(emoji) => onChange(emoji.native)}
                />
            </PopoverContent>
        </Popover>
    )
}
