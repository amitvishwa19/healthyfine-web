
import React from 'react'

export function Footer() {
    return (
        <div className=''>
            <div className='dark:bg-[#071A2B] bg-gray-200'>
                <div className='flex items-center p-4 text-xs'>
                    <div className='md:max-w-screen-3xl mx-auto flex item-center w-full justify-end'>


                        <div className='hidden md:block'>
                            <div className=' space-x-4 md:block md:w-auto flex item-center '>

                                <span>Version: {process.env.APP_VERSION}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
