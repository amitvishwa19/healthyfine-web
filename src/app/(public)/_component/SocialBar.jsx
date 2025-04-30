import { Github, Instagram, Linkedin, Youtube } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

export default function SocialBar() {
    const socialLinks = [
        {
            name: 'Github',
            icon: Github,
            link: ''
        },
        {
            name: 'Linkedin',
            icon: Linkedin,
            link: ''
        },
        {
            name: 'Youtube',
            icon: Youtube,
            link: 'https://www.youtube.com/channel/UCtMnflM5KJbtxSEOvfBU_-w'
        },
        {
            name: 'Instagram',
            icon: Instagram,
            link: 'https://www.instagram.com/amitvishwa19'
        }
    ]

    return (
        <div className='hidden md:flex fixed bottom-16 left-4 z-40 ' data-aos="fade-in">
            <div className='flex flex-col gap-6 items-center' data-aos="fade-right">
                {
                    socialLinks.map((item, index) => {
                        return (
                            <Link key={index} href={item.link} target='-' className='hover:-translate-y-2 transition duration-500 ease-in-out '>
                                <item.icon size={22} className=' cursor-pointer text-[#8892B0] hover:text-[#64FFDA]' />
                            </Link>
                        )
                    })
                }

                {/* <hr className='border-[1px] w-80 rounded-full text-[#8892B0] rotate-90' /> */}



                <div className='flex h-80 w-[1px] bg-white ' />

            </div>
        </div>
    )
}
