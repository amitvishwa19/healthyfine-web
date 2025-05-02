'use client'
import React from 'react'
import Image from 'next/image'
import heroImage from '@/assets/images/hero/hero-thumb.png'
import circleImage from '@/assets/images/hero/circle.png'
import gridImage from '@/assets/images/hero/grid.png'
import { ArrowUpRight } from "lucide-react";

export default function HomeBannerArea() {



    return (
        <div>
            <div className=' min-h-screen flex flex-row hero-content'>

                <div className='bg-[#031B33] h-screen  w-[50%] flex flex-col items-center justify-center p-10' >

                    <div data-aos="fade-right" >
                        <h2 className='text-sky-600'>WISH YOUR HAPPY LIFE!</h2>

                        <h1 className='text-[48px] font-extrabold'>
                            Protect Your
                            <span className='mx-2  translate-x-4 rotate-45' >
                                Health
                            </span>
                            <br />
                            and Love Be Happy
                        </h1>

                        <p className='mt-4'>
                            Completely e-enable covalent functionalities and market positioning infomediaries. Interactively initiate exceptional
                        </p>

                        <div className='px-8 py-4 rounded-full bg-[#0495FF] mt-6 flex flex-row items-center gap-4 justify-center cursor-pointer'>
                            Discover More

                            <span>
                                <ArrowUpRight size={24} />
                            </span>
                        </div>

                    </div>

                </div>

                <div className='bg-[#082340] h-screen w-[50%] relative '   >


                    <div className='absolute bottom-0 top-[106px] left-0 right-20  w-full' style={{ backgroundImage: `url(${gridImage.src}) `, }}>

                    </div>

                    <div className='absolute top-60 -right-10 hero-circle '>
                        <Image src={circleImage} alt='' className='' />
                    </div>


                    <div className='absolute bottom-0 ' data-aos="fade-left ">
                        <Image src={heroImage} alt='' />
                    </div>

                </div>

            </div>
        </div>
    )
}
