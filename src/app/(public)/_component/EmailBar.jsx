import Link from 'next/link'
import React from 'react'

export default function EmailBar() {
    return (
        <div className='hidden md:flex fixed bottom-16 -right-[74px] z-40 ' data-aos="fade-left" >
            <div className='flex flex-col gap-10 items-center'>

                <Link href={''} className='hover:-translate-y-2 hover:text-[#64FFDA] transition duration-500 ease-in-out rotate-90 mb-16 tracking-widest'>
                    info@devlomatix.online
                </Link>

                {/* <hr className='border-[1px] w-80 rounded-full text-[#8892B0]' /> */}



                <div className='flex h-80 w-[1px] bg-white ' />

            </div>
        </div>
    )
}
