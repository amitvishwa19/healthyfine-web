import React from 'react'
import { Input } from '@/components/ui/input'
import { AuthSelector } from '@/components/global/AuthSelector'
import ThemeSwitcher from '@/components/global/ThemeSwitch'
import { Cross, Menu } from 'lucide-react'


export function TopNav() {
    return (
        <div className='h-14 dark:bg-[#071A2B] bg-gray-100'>
            <div className='h-14 bg-black/40'>
                <div className='flex items-center '>

                    <div className='p-2 md:hidden cursor-pointer'>
                        <Menu size={26} />
                    </div>
                    <div className="ml-auto flex items-center space-x-4 text-gray-600 ">
                        <div className=' rounded-md  '>
                            <div className='flex p-2 items-center px-2 '>
                                <div className="ml-auto flex items-center space-x-4 text-gray-600 ">
                                    <div className='hidden md:flex'>
                                        <Input
                                            type="search"
                                            placeholder="Search..."
                                            className="md:w-[100px] lg:w-[300px] focus-visible:ring-0 ring-0"
                                        />
                                    </div>
                                    <ThemeSwitcher />
                                    <AuthSelector />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


