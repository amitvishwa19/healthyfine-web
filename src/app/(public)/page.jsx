'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { DM_Mono } from 'next/font/google'
import SocialBar from './_component/SocialBar'
import EmailBar from './_component/EmailBar'
import HomeBannerArea from './_component/HomeBannerArea'
import Solutions from './_component/Solutions'
import Approach from './_component/Approach'
import { Clock, User, CalendarDays, ArrowUpRight, Phone } from "lucide-react";

const textFont = DM_Mono({
    subsets: ['latin'],
    weight: ['300', '400', '500']
})

export default function HomePage() {

    return (
        <div className=''>

            <div className=''>

                <HomeBannerArea />


                <div className='flex flex-row items-center justify-evenly p-20'>


                    <div className='bg-[#031B33] hover:bg-[#0495FF] duration-300 ease-in-out text-white  w-[30%] items-center rounded-xl h-[400px]'>

                        <div className='p-6 flex w-full items-center justify-evenly font-semibold text-xl'>
                            <h2>Schedule Hours</h2>
                            <Clock size={30} color='#dceaa2' />
                        </div>

                        <div className='h-[1px] bg-white/20' />

                        <div className=' flex w-full '>
                            <ul className='flex flex-col w-full gap-4 h-full items-center justify-evenly  text-sm p-8'>
                                <li className='flex flex-row items-center justify-between w-full border border-transparent border-dotted border-b-white/50  pb-4'>
                                    <p>Mon-Thus</p>
                                    <p>09.00-06.00</p>
                                </li>
                                <li className='flex flex-row items-center justify-between  w-full border border-transparent border-dotted border-b-white/50  pb-4'>
                                    <p>Fri</p>
                                    <p>09.00-06.00</p>
                                </li>
                                <li className='flex flex-row items-center justify-between  w-full border border-transparent border-dotted border-b-white/50  pb-4'>
                                    <p>Sat</p>
                                    <p>09.00-06.00</p>
                                </li>
                                <li className='flex flex-row items-center justify-between  w-full'>
                                    <p>Sun</p>
                                    <p>09.00-06.00</p>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className='hover:bg-[#031B33] bg-[#0495FF] duration-300 ease-in-out text-white  w-[30%] items-center rounded-xl h-[400px] relative'>

                        <div className='p-6 flex w-full items-center justify-evenly font-semibold text-xl'>
                            <h2>Find Doctors</h2>
                            <User size={30} color='#dceaa2' />
                        </div>

                        <div className='h-[1px] bg-white/20' />

                        <div className=' flex w-full '>
                            <ul className='flex flex-col w-full gap-4 h-full items-center justify-evenly p-10 text-md'>
                                <li className='flex flex-row items-center justify-between border-dotted border-white w-full '>
                                    <p>Mon-Thus</p>
                                    <p>09.00-06.00</p>
                                </li>
                                <li className='flex flex-row items-center justify-between  w-full'>
                                    <p>Fri</p>
                                    <p>09.00-06.00</p>
                                </li>
                                <li className='flex flex-row items-center justify-between  w-full'>
                                    <p>Sat</p>
                                    <p>09.00-06.00</p>
                                </li>
                                <li className='flex flex-row items-center justify-between  w-full'>
                                    <p>Sun</p>
                                    <p>09.00-06.00</p>
                                </li>
                            </ul>
                        </div>

                        <div className='px-4 py-2 mx-6 border border-white rounded-full  flex gap-2 w-[40%] cursor-pointer absolute bottom-6 left-4'>
                            Click Here
                            <ArrowUpRight size={24} />
                        </div>

                    </div>

                    <div className='bg-[#dceaa2] hover:bg-[#0495FF] duration-300 ease-in-out hover:text-white text-[#031B33]  w-[30%] items-center rounded-xl h-[400px] relative'>

                        <div className='p-6 flex w-full items-center justify-evenly font-semibold text-xl '>

                            <h2>Appointment</h2>
                            <CalendarDays />
                        </div>

                        <div className='h-[1px] bg-white/20' />

                        <div className='font-light p-2 text-sm'>
                            <div className=' flex w-full p-4 '>
                                Completely enable covalent functionalitie infomediaries interactively
                            </div>

                            <div className='flex mx-6'>
                                <div className='p-2 bg-black rounded-full mr-6'>
                                    <div className='p-2  rounded-full border border-[#dceaa2]'>
                                        <Phone size={24} color='#fff' />
                                    </div>
                                </div>
                                <div>
                                    <p>Call us any time</p>
                                    <span className='text-sm'>(+91) 9712340450 </span>
                                </div>
                            </div>
                        </div>

                        <div className='px-4 py-2 mx-6 border border-white rounded-full  flex gap-2 w-[40%] cursor-pointer absolute bottom-6 left-4'>
                            Click Here
                            <ArrowUpRight size={24} />
                        </div>

                    </div>

                </div>

                <div>
                    <div>
                        About Healthyfine
                    </div>
                    <div>
                        <div>
                            Delivering Quality Health?s Care for Generations
                        </div>
                    </div>
                </div>

                <SocialBar />
                <EmailBar />
            </div>

        </div >
    )
}
