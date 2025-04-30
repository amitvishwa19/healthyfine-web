'use client'
import { useModal } from '@/hooks/useModal';
import React, { useCallback, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea';
import { useAction } from '@/hooks/use-action';
//import { createWorkflow } from '../_actions/create-workflow';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createCredential, CreateCredentials } from '../action/create-credential';
import { Loader } from 'lucide-react';
import { symmetricDecrypt } from '@/lib/encryption';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
    name: z.string().min(2),
    value: z.string()
})



export default function CreateCredentialModal() {
    const [open, setOpen] = useState(false)
    const { data: session } = useSession()

    const params = useParams()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            value: '',
        },
    })


    const handleOnOpenChange = () => {
        form.reset()
        setOpen(!open)
    }

    const { execute, isLoading } = useAction(createCredential, {
        onSuccess: (data) => {
            console.log('data', data)
            toast.success(`Credential ${data.name} created successfully`, { id: 'cred' })
            setOpen(false)

            //console.log('@@symmetricDecrypt', symmetricDecrypt(data.value))
        },
        onError: (error) => {
            toast.error('Error while creating credential', { id: 'cred' })
        }
    })




    const onSubmit = useCallback((values) => {
        //console.log(values)
        toast.loading('Creating credential', { id: 'cred' })
        execute({ name: values.name, value: values.value, userId: session?.user?.userId, orgId: params.orgId })
    }, [])


    return (
        <Dialog open={open} onOpenChange={handleOnOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Create Credential
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] text-white">
                <DialogHeader>
                    <DialogTitle>Create Credential</DialogTitle>
                    <DialogDescription className='text-xs text-muted-foreground '>
                        Start creating credential
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name (required)</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription className='text-muted-foreground/50'>
                                        Enter a unique and descriptive name for credential.
                                        The name will be use to identify credential.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Textarea rows='4'  {...field} />
                                    </FormControl>
                                    <FormDescription className='text-muted-foreground/50'>
                                        Enter a vale associated with credential name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            size='sm'
                            className='bg-blue-600 hover:bg-blue=800 text-white w-full'
                            disabled={isLoading}
                        >
                            {isLoading && <Loader size={14} className='mr-2 animate-spin' />}
                            Create
                        </Button>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
