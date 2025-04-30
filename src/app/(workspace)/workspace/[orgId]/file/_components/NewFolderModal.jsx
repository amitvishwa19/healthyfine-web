'use client'
import { useModal } from '@/hooks/useModal';
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAction } from '@/hooks/use-action';
import { createFolder } from '@/actions/org/files/create_folder';
import { useSession } from 'next-auth/react';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';


export default function NewFolderModal() {
    const { onOpen, onClose, isOpen, type, data } = useModal()
    const isModalOpen = isOpen && type === "addFolder";
    const [fileName, setFileName] = useState('')
    const { data: session } = useSession()
    const { orgId, userId } = data
    const [processing, setProcessing] = useState(false)

    const handleOpenChange = () => {
        onClose()
        setFileName('')
        setProcessing(false)
    }

    const { execute } = useAction(createFolder, {
        onSuccess: (data) => {
            console.log(data)
            toast.success(`New folder ${data.name} created successfully`)
            handleOpenChange()
        },
        onerror: (error) => {
            handleOpenChange()
        }
    })

    const handleFolderCreation = () => {
        //console.log('Add Folder', data)
        execute({ orgId, userId, name: fileName })
        setProcessing(true)
        //onClose()
        setFileName('')
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>

            <DialogContent className="sm:max-w-[425px] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Create Folder</DialogTitle>
                    <DialogDescription>
                        Add new folder.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">

                    <Label htmlFor="name" className="text-left">
                        Folder Name
                    </Label>
                    <Input id="name" value={fileName} onChange={(e) => { setFileName(e.target.value) }} />

                </div>
                <DialogFooter>
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={handleFolderCreation}
                        className='bg-blue-600 hover:bg-blue-800'
                        disabled={processing}
                    >
                        {processing && <Loader className='mr-2 animate-spin' size={16} />}
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
