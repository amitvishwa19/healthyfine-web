import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useModal } from '@/hooks/useModal'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from '@/hooks/use-action'
import { roleManagement } from '@/actions/admin/role-management'
import { permissionManagement } from '@/actions/admin/permission-management'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { userManagement } from '@/actions/admin/user-management'
import { fcmNotification } from '@/actions/admin/fcm-notification'
//import { fcmNotification } from '@/actions/admin/fcm-notification'


const formSchema = z.object({
    device_token: z.string(),
    title: z.string(),
    body: z.string(),
});

export function FcmNotification({ open, values }) {

    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "fcmNotificatin";
    const [roles, setRoles] = useState([])
    const [selectedRoles, setSelectedRoles] = useState([])
    const { user } = data
    const router = useRouter()



    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            device_token: "",
            title: "Notification test title",
            body: "Notification test body",
        }
    });


    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        if (user) {
            form.setValue('device_token', user.deviceToken)
            //form.setValue('title', user.email)
            //form.setValue('body', user.password)
        }
    }, [form, user, onOpen])

    const { execute } = useAction(fcmNotification, {
        onSuccess: (data) => {
            toast.success('Notification sent successfully', { id: 'fcm-notification' })
            setLoading(false)
            form.reset()
            onClose()
        },
        onError: (error) => {
            setLoading(false)
            console.log(error)
        }
    })



    const handleOpenChange = async () => {
        onClose()
        setSelectedRoles([])
        form.reset()
        router.refresh()
    }

    const onSubmit = async (values) => {
        setLoading(true)
        toast.loading('Sending notification', { id: 'fcm-notification' })
        execute({ title: values.title, body: values.body, token: values.device_token })
    }

    useEffect(() => {
        if (selectedRoles) {
            form.setValue('roles', selectedRoles.map((i) => i.id))
        }
    }, [form, selectedRoles])

    const selectRole = (i) => {
        const item = roles.find((e) => e.id === i)
        const aitem = selectedRoles?.find((e) => e.id === i)

        if (!aitem) {
            setSelectedRoles([...selectedRoles, item])
            form.setValue('roles', selectedRoles?.map((i) => i.id))
        }
    }

    const removeRole = (e, item) => {
        e.preventDefault()

        const remaining = selectedRoles.filter((i) => {
            return i.id !== item.id
        })

        form.setValue('roles', remaining?.map((i) => i.id))

        setSelectedRoles(remaining)

    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleOpenChange} >



            <DialogContent className="sm:max-w-[625px] dark:text-[#d3e3fd] p-0 overflow-hidden">

                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-xl text-center font-semibold flex justify-start">
                        FCM Notification
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4 px-6">


                            <FormField
                                control={form.control}
                                name="device_token"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Device Token
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows='4'
                                                disabled={loading}
                                                className=" shadow-none"  {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Message Title
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                disabled={loading}
                                                rows='6'
                                                className=" shadow-none"  {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="body"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Message Body
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={6}
                                                disabled={loading}
                                                className=" shadow-none"  {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs' />
                                    </FormItem>
                                )}
                            />



                            <div className='flex flex-wrap gap-1'>
                                <Label htmlFor="username" className="text-right justify-items-start">
                                    {/* Selected Permissions */}

                                </Label>
                                {
                                    selectedRoles?.map((item, index) => {
                                        return (
                                            <Button key={index} variant='outline' className='flex text-xs  mb-1 font-semibold items-center'>
                                                {item.title}
                                                <span className=' cursor-pointer ml-2' onClick={(e) => { removeRole(e, item) }}>
                                                    <Trash2 className='h-4 w-4' />
                                                </span>
                                            </Button>
                                        )
                                    })
                                }
                            </div>


                        </div>
                        <DialogFooter className=" bg-slate-900 p-2">

                            <Button variant="outline" disabled={isLoading} >
                                {
                                    loading && <Loader className='w-4 h-4 animate-spin mr-2' />
                                }

                                Send Notification
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
