'use client'
import React, { useState, useContext, useEffect } from 'react'
import { BiSun } from "react-icons/bi";
import { BiMoon } from "react-icons/bi";
import { AppContext } from '@/providers/AppProvider';
import { cn } from '@/lib/utils';


export default function ThemeSwitcher({ className }) {

    const [light, setLight] = useState(true)
    const { theme, themeToggle } = useContext(AppContext)


    useEffect(() => {
        theme === 'light' ? setLight(true) : setLight(false)
    }, [theme])

    return (

        <span className='' onClick={themeToggle} style={{ cursor: 'pointer' }}>
            {
                light ? <BiMoon size={20} className={cn(className)} /> : <BiSun size={20} className={cn(className, 'dark:text-white')} />
            }
        </span>

    )
}
