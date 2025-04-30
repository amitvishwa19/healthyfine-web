'use client'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useModal } from '@/hooks/useModal'
import { useSession } from 'next-auth/react'
import React from 'react'
import { ModalProvider } from './_provider/ModalProvider'

export default function FileLayout({ children, params }) {

    const { onOpen, refresh } = useModal()
    const { data: session } = useSession()
    const { orgId } = params


    return (
        <div className='p-2 flex flex-col '>
            <ModalProvider />

            <div className='mb-2'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className="text-md font-medium">FIle Management</h3>
                        <p className="text-xs text-muted-foreground mb-4">
                            All documents related with organization
                        </p>
                    </div>
                    <div className='flex ite  gap-4 mr-2'>



                        <Button size='sm' role='button' onClick={() => { onOpen("addFile", { orgId, userId: session.user.userId }) }} className='bg-blue-600 hover:bg-blue-800 text-white'>
                            Upload file
                        </Button>




                        <Button size='sm' role='button' onClick={() => { onOpen('addFolder', { orgId, userId: session.user.userId }) }} className='bg-blue-600 hover:bg-blue-800 text-white'>
                            Add folder
                        </Button>


                    </div>
                </div>
                <Separator />
            </div>

            <div className='flex grow '>
                {children}
            </div>
        </div>
    )
}
