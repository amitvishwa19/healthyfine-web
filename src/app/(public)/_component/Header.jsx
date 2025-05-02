'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AuthSelector } from '@/components/global/AuthSelector'
import appLogo from '@/assets/images/logo/logo.png'

export default function Header() {


    const url = usePathname()
    const [scrolling, setScrolling] = useState(false);
    const [offset, setOffset] = useState(0);

    const myRef = useRef();

    const handleScroll = (e) => {
        const scroll = window.scrollY

        //console.log('scrolled', scroll)
        //setScrolling(true)
        if (scroll > 50) {
            setScrolling(true)
        } else {
            setScrolling(false)
        }


    }

    useEffect(() => {
        // document.body.addEventListener('scroll', handleScroll, true);
        // return () => document.body.removeEventListener('scroll', handleScroll);

        window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const navItems = [
        { title: 'Home', link: '/' },
        { title: 'About', link: '/about' },
        { title: 'Article', link: '/article' },
        { title: 'Contact', link: '/contact' },
    ]


    return (
        <div className={`header-area ${scrolling && 'bg-[#041C33]'}  flex flex-row items-center justify-between p-6`}>
            <div className="header-logo">
                <Link href="/">
                    <Image className="img-fluid" src={appLogo} alt="" height={40} />
                </Link>
            </div>
            {/* <div className="main-menu">
                <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
                    <div className="mobile-logo-wrap">
                        <a href="index.html"><img alt="image" src="images/logo.svg" /></a>
                    </div>
                </div>


            </div> */}

            <div className="nav-right d-flex jsutify-content-end align-items-center ">
                <div className='hidden md:flex items-center'>




                    <div className={`flex gap-10 items-center text-white`}>

                        {
                            navItems.map((item, index) => {
                                return (
                                    <Link key={index} href={item.link}
                                        className={` ${url === item.link && 'text-[#0495FF]'} hover:text-[#0495FF]`}>
                                        {item.title}
                                    </Link>
                                )
                            })
                        }


                    </div>



                </div>
                <div className="sidebar-button mobile-menu-btn cursor-pointer ">
                    <span></span>
                </div>
            </div>

            <div className='flex flex-row items-center gap-x-4'>
                <div className='px-8 py-4 bg-[#0495FF] rounded-full'>
                    <Link href={''}>Book Appointment</Link>
                </div>

                <AuthSelector name={false} classname={' hover:text-[#0495FF]'} />
            </div>
        </div>
    )
}
