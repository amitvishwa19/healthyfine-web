

import React, { Suspense } from 'react'
import { Alert, AlertDescription, AlertTitle, } from "@/components/ui/alert"
import { ShieldIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { GetCredentials } from './action/get-credentials'
import { UserCredentials } from './components/UserCredentials'
import { Button } from '@/components/ui/button'
import CreateCredentialModal from './components/CreateCredentialModal'
import { QueryProvider } from '@/providers/QueryProvider'


export default function CredentialsPage() {

    return (

        <div className='flex flex-1 flex-col h-full w-full p-2'>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-bold'>Credentials</h1>
                    <p className='text-xs text-muted-foreground'>Manage your credetials</p>
                </div>
                <CreateCredentialModal />
            </div>
            <div className='h-full py-6 space-y-8'>
                <Alert>
                    <ShieldIcon size={40} className='text-green-600 h-4 w-4 stroke-public_primary_color mb-2' />
                    <AlertTitle>Encryption</AlertTitle>
                    <AlertDescription className='text-xs text-muted-foreground'>All data is securely encrypted, ensuring your data remains safe</AlertDescription>
                </Alert>

                {/* <Suspense fallback={<Skeleton className={'h-[300px] w-full'} />}> */}
                <UserCredentials />
                {/* </Suspense> */}
            </div>
        </div>

    )
}


