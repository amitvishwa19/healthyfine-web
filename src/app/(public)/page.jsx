'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { DM_Mono } from 'next/font/google'
import heroImage from '@/assets/images/hero/hero-thumb.png'



const textFont = DM_Mono({
    subsets: ['latin'],
    weight: ['300', '400', '500']
})

export default function HomePage() {

    return (
        <div>
            <div className=''>

                <div>
                    <div className='absolute inset-0  min-h-screen flex flex-row'>
                        <div className='bg-[#031B33] h-screen  w-[50%] flex flex-col items-center justify-center p-10' >

                            <h2 className='text-sky-600'>WISH YOUR HAPPY LIFE!</h2>

                            <span className='text-[48px] font-extrabold'>
                                Protect Your
                                <span className='mx-2 text-[#dceaa2] translate-x-4 rotate-45' >
                                    Health
                                </span>
                                <br />
                                and Love Be Happy
                            </span>

                            <p className=''>
                                Completely e-enable covalent functionalities and market positioning infomediaries. Interactively initiate exceptional
                            </p>

                        </div>
                        <div className='bg-[#082340] h-screen w-[50%] relative ' >

                            <div className='absolute bottom-0 '>
                                <Image src={heroImage} alt='' />
                            </div>
                        </div>
                    </div>
                </div>


                <div className='h-[2500px]'>





                </div>





                <div>


                </div>

            </div>

        </div>
    )
}
