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
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { userManagement } from '@/actions/admin/user-management'


const formSchema = z.object({
    displayName: z.optional(z.string()),
    email: z.string().email(),
    password: z.string(),
    status: z.string(),
    emailVerified: z.string(),
    roles: z.optional(z.array(z.string()))
});

export function AddPost({ open, values }) {

    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "addPost";
    const [roles, setRoles] = useState([])
    const [selectedRoles, setSelectedRoles] = useState([])
    const { user } = data
    const router = useRouter()


    useEffect(() => {
        getRoles({ type: 'getRoles' })
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: "",
            email: "",
            password: '',
            status: 'false',
            emailVerified: 'false',
            roles: []
        }
    });
    const isLoading = form.formState.isSubmitting;

    // useEffect(() => {
    //     if (user) {
    //         setSelectedRoles(user.roles)
    //         form.setValue('displayName', user.displayName)
    //         form.setValue('email', user.email)
    //         form.setValue('password', user.password)
    //         form.setValue('status', user.status ? 'true' : 'false')
    //         form.setValue('emailVerified', user.emailVerified ? 'true' : 'false')
    //         // form.setValue('permissions', role.permissions.map((i) => i.id))

    //     }
    // }, [form, user, onOpen])

    const { execute: getRoles } = useAction(roleManagement, {
        onSuccess: (data) => {
            setRoles(data.roles)
        },
        onError: (error) => {
            setLoading(false)

        }
    })

    const { execute } = useAction(userManagement, {
        onSuccess: (data) => {
            toast.success('User Updated successfully')
            handleOpenChange()
            setLoading(false)
        },
        onError: (error) => {
            setLoading(false)
            toast.error(error)
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
        execute({ displayName: values.displayName, email: values.email, status: values.status, emailVerified: values.emailVerified, roles: values.roles, type: 'addUser' })
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



            <DialogContent className="min-w-['60%'] dark:text-[#d3e3fd] p-0 overflow-hidden">

                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-xl text-center font-semibold flex justify-start">
                        Add New Post for your Organization
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4 px-6">

                            <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Body
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows='6'
                                                disabled={loading}
                                                className=" shadow-none"  {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs' />
                                    </FormItem>
                                )}
                            />



                        </div>
                        <DialogFooter className=" bg-slate-900 p-2">

                            <Button variant="outline" disabled={isLoading} >
                                {
                                    loading && <Loader className='w-4 h-4 animate-spin mr-2' />
                                }

                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
