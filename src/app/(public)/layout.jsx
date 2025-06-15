'use client'
import React, { useEffect, useState } from 'react'
import { TopNav } from './_component/TopNav'
import { BottomNav } from './_component/BottomNav'
import AppLoader from '@/components/global/AppLoader'
import { ScrollArea } from '@/components/ui/scroll-area'
//import background from '@/assets/images/banner-bg.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import "@/css/public.css";
import Header from './_component/Header'
import Footer from './_component/Footer'
import Particles from '@/components/magicui/particles'
import { Unbounded, Inter, Poppins } from "next/font/google";


const unbounded = Unbounded({ subsets: ["latin"] });
const font = Unbounded({ subsets: ["latin"] });


export default function PublicLayout({ children }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AOS.init();

    }, [])


    return (
        <div className={`${font.className} flex  flex-col  min-h-screen bg-white`} >



            <div className='fixed top-0 right-0 left-0 z-10 bg-[#ffffff0d]  '>
                <Header />

            </div>
            <div className='flex flex-grow overflow-y-auto' >
                <ScrollArea className='flex-1 rounded-sm '>
                    {children}
                    <div className=''>


                    </div>
                </ScrollArea>
            </div>

        </div>
    )
}
