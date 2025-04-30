'use client'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CogIcon, ShieldIcon } from 'lucide-react'
import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from '@/components/global/CustomFormField'
import { FormFieldType } from '@/utils/types'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'


const formSchema = z.object({
    username: z.string().min(3).max(20),
    description: z.string(),
})

export default function SettingLayout({ children }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            description: ''
        }
    })

    const onSubmit = (values) => {
        console.log('Form Submit', values)
    }

    return (
        <div className='flex flex-1 flex-col h-full w-full p-4'>
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <h1 className='text-xl font-bold'>Settings</h1>
                    <p className='text-xs text-muted-foreground'>Manage your workspace settings</p>
                </div>
                {/* <CreateCredentialModal /> */}
            </div>
            <div className='h-full py-6 space-y-8 gap-4'>
                <Alert>
                    <div className=' flex items-center gap-4'>
                        <ShieldIcon size={60} color='green' className='text-green-600 h-6 w-6 stroke-public_primary_color mb-2' />
                        <div>
                            <AlertTitle>Encryption</AlertTitle>
                            <AlertDescription className='text-xs text-muted-foreground'>All data is securely encrypted, ensuring your data remains safe</AlertDescription>
                        </div>
                    </div>
                </Alert>

                {/* <Suspense fallback={<Skeleton className={'h-[300px] w-full'} />}> */}

                {/* </Suspense> */}
            </div>

            {/* <div className='flex flex-col space-y-8'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="username"
                            label="Username"
                            description={'This is your public display name.'}
                            placeholder="shadcn"

                        />

                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.TEXTAREA}
                            name="description"
                            label="Description"
                            description={'This is your public display name.'}
                            placeholder="shadcn"
                        />


                        <Button>Submit</Button>

                    </form>
                </Form>


            </div> */}
            {children}
        </div >
    )
}
