'use client'
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import Appearance from './(modules)/appreance'
import General from './(modules)/general'
import Notification from './(modules)/notification'
import Auth from "./(modules)/auth";
import AppMenu from "./(modules)/menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { menus } from "@/constants/menus";



export default function SettingLayout({ children }) {
    const [module, setModule] = useState('general')
    const ico = 'Icons.google'
    const path = usePathname()



    useEffect(() => {
        console.log(path)
    }, [])

    return (
        <div>

            <div className="mt-2">
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="text-sm text-muted-foreground mb-2">
                    Manage app settings and set preferences.
                </p>
                <Separator />
            </div>

            <div className="flex space-y-4 lg:flex-row lg:space-x-12 lg:space-y-0 mt-2">


                <aside className=" ">

                    <ul className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 text-sm font-semibold gap-3 cursor-pointer p-2 text-muted-foreground">
                        {
                            menus.settingMenu.map((item, index) => {
                                return (
                                    <li key={index} id='general' onClick={(e) => { setModule('general') }}>
                                        <Link href={item.link}>
                                            <div className={cn("flex items-center gap-2", path === item.link ? 'text-blue-400' : null)} >
                                                {item.icon}
                                                {item.title}
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </aside>

                <div className="flex-1 ">

                    {children}

                </div>

            </div>

        </div>
    )
}
