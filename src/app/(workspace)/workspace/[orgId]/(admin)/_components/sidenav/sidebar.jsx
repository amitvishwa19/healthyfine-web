import React from 'react'
import { adminSidebaData } from '@/utils/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import logo from '@/assets/images/devlomatix_dark.png'
import Image from 'next/image'
import { AppIcon } from '@/components/global/AppIcon'

export function Sidebar() {
  const path = usePathname()





  return (
    <div className='hidden md:flex min-h-full   dark:bg-[#071A2B] bg-gray-100'>

      <div className="flex flex-col space-y-2 w-full">

        <div className='flex h-14 items-center justify-center bg-black/20 '>
          <Link href={'/'}>
            <Image src={logo} height={30} alt='applogo' />
          </Link>
        </div>

        <div className="px-1 py-2">
          {
            adminSidebaData.map((block, index) => {
              return (
                <div key={index} className='mb-4'>
                  <h3 className="mb-1 px-4 text-md font-semibold tracking-tight">
                    {block.title}
                  </h3>
                  <ul>
                    <div>
                      {
                        block.modules.map((module, index) => {
                          return (
                            <li key={index} className='ml-8 '>
                              <span className={cn('flex items-center p-2', module.link === path ? 'text-blue-400' : null)}>
                                <AppIcon name={module.icon} size={18} />

                                <Link href={module.link} className={cn("ml-2 text-sm font-semibold text-muted-foreground", module.link === path ? 'text-blue-400' : null)}>{module.title}</Link>
                              </span>
                            </li>
                          )
                        })
                      }
                    </div>
                  </ul>
                </div>
              )
            })
          }


        </div>


      </div>

    </div>
  )
}



