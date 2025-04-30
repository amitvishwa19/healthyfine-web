'use client'
import { useAction } from '@/hooks/use-action';
import { useModal } from '@/hooks/useModal';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { DeleteIcon, Trash2Icon } from 'lucide-react';
import { deleteCredential } from '../action/delete-credential';
import { useParams } from 'next/navigation';

export function DeleteCredentialModal({ credential }) {

    const [confirmText, setConfirmText] = useState('')
    const { data: session } = useSession()
    const params = useParams()
    const [open, setOpen] = useState(false)




    const { execute } = useAction(deleteCredential, {
        onSuccess: (data) => {
            //console.log('data', data)
            toast.success(`Workflow ${data.name} deleted`, { id: data.id })
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const handleDeleteWOrkflow = (credential) => {
        toast.loading(`Credential ${credential.name} deleted`, { id: credential.id })
        execute({ id: credential.id, userId: session?.user?.userId, orgId: params.orgId })
    }

    const handleModalClose = () => {
        setConfirmText('')
        setOpen(!open)
    }


    return (
        <AlertDialog open={open} onOpenChange={handleModalClose}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost">
                    <Trash2Icon size={18} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-white'>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        credential {credential.name}.
                    </AlertDialogDescription>
                    <p className='text-sm text-muted-foreground'>

                        <span>If you are sure ,enter </span>
                        <b className='font-semibold text-white'>{credential.name}</b>
                        <span> to confirm</span>
                    </p>
                </AlertDialogHeader>

                <div>
                    <Input
                        className='text-white'
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                    />
                </div>

                <AlertDialogFooter className='flex items-center'>
                    <Button variant='' size='sm' onClick={() => {
                        handleModalClose()
                        setConfirmText('')
                    }}>Cancel</Button>

                    <AlertDialogAction
                        className='bg-red-600 hover:bg-red-800 text-white'
                        disabled={confirmText !== credential?.name}
                        onClick={() => {
                            handleDeleteWOrkflow(credential)
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
