import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from "@/components/ui/button"

export default function Category() {
    return (
        <div className=" absolute inset-0 p-2 ">
            <div>

                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className="text-lg font-medium">Categories</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Manage all categories of app
                        </p>
                    </div>
                    {/* <Crud /> */}
                    {/* <Button variant='outline' size='sm' >Add Article</Button> */}


                </div>
                <Separator />
            </div>
            <div className='grid lg:grid-cols-8 gap-4'>
                <div className='col-span-4 py-4 flex flex-col gap-2'>
                    <div className='border'>

                    </div>
                </div>

                <div className='col-span-4 py-4 flex flex-col gap-2'>
                    asdasdas
                </div>
            </div>
        </div>
    )
}
