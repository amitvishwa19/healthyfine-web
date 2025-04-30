'use client'
import React from 'react'
import MobileToggleMenu from './MobileToggleMenu'
import { AuthSelector } from '@/components/global/AuthSelector'
import { useSelector } from 'react-redux'
import ThemeSwitcher from '@/components/global/ThemeSwitch'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useParams, usePathname } from 'next/navigation'
import { Key } from 'lucide-react'

export function TopNav() {
    const title = useSelector((state) => state.org.topnavTitle)
    const server = useSelector((state) => state.org.server)
    const params = useParams()
    const pathName = usePathname()
    const paths = pathName === '/' ? [''] : pathName.split('/')

    //console.log('@@path', paths)

    return (
        <div className='bg-black/20 min-h-12 p-0 flex items-center justify-between'>
            <div>
                <div className='ml-2'>
                    <MobileToggleMenu />
                </div>
                <div className='px-2 hidden md:flex items-center gap-2'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            {paths.map((path, index) => (
                                < div key={index} className='flex items-center gap-2 text-xs'>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={`${path}`} className=' capitalize'>
                                            {path === '' ? 'dashboard' : path}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {index !== paths.length - 1 && <BreadcrumbSeparator />}
                                </div>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <div className=' justify-end mr-4'>
                <div className='flex flex-row gap-4 items-center'>
                    <ThemeSwitcher className='text-white' />
                    <AuthSelector />
                </div>
            </div>
        </div>
    )
}
