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
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Permission title is required."
    }),
    description: z.optional(z.string()),
    status: z.string(),
    permissions: z.optional(z.array(z.string()))
});

export function EditRole({ open, values }) {

    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "editRole";
    const [permissions, setPermissions] = useState([])
    const [selectedPermissions, setSelectedPermissions] = useState([])
    const [loadingPermissions, setLoadingPermissions] = useState(true)
    const { role } = data
    const router = useRouter()




    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            status: 'true',
            permissions: []
        }
    });
    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        if (role) {
            setSelectedPermissions(role.permissions)
            form.setValue('title', role.title)
            form.setValue('description', role.description)
            form.setValue('status', role.status ? 'true' : 'false')
            form.setValue('permissions', role.permissions.map((i) => i.id))

        }
    }, [form, role, onOpen])

    const { execute: getPermissions, isLoading: permissionLoading } = useAction(permissionManagement, {
        onSuccess: (data) => {
            console.log(data)
            setPermissions(data.permissions)
            setLoadingPermissions(false)
        },
        onError: (error) => {
            setLoading(false)
            console.log(error)
        }
    })

    useEffect(() => {
        console.log('getting permissions')
        getPermissions({ type: 'getPermission' })
    }, [isOpen])


    const { execute } = useAction(roleManagement, {
        onSuccess: (data) => {
            toast.success('Role Updated successfully')
            handleOpenChange()
            setLoading(false)
        },
        onError: (error) => {
            setLoading(false)
            console.log(error)
        }
    })


    const handleOpenChange = async () => {
        onClose()
        setSelectedPermissions([])
        form.reset()
        router.refresh()
    }

    const onSubmit = async (values) => {
        setLoading(true)
        execute({ id: role.id, title: values.title, description: values.description, status: values.status, permissions: values.permissions, type: 'editRole' })
    }



    useEffect(() => {
        if (selectedPermissions) {
            form.setValue('permissions', selectedPermissions.map((i) => i.id))
        }
    }, [form, selectedPermissions])

    const selectPermission = (i) => {
        const item = permissions.find((e) => e.id === i)
        const aitem = selectedPermissions?.find((e) => e.id === i)

        if (!aitem) {
            setSelectedPermissions([...selectedPermissions, item])
            form.setValue('permissions', selectedPermissions?.map((i) => i.id))
        }
    }

    const removePermission = (e, item) => {
        e.preventDefault()
        console.log('remove')

        const remaining = selectedPermissions.filter((i) => {
            return i.id !== item.id
        })

        form.setValue('permissions', remaining?.map((i) => i.id))

        setSelectedPermissions(remaining)

    }

    return (
        <Sheet open={isModalOpen} onOpenChange={handleOpenChange} >



            <SheetContent className="md:max-w-[485px] dark:text-[#d3e3fd] p-0 overflow-hidden">

                <SheetHeader className="pt-8 px-6">
                    <SheetTitle className="text-xl text-center font-semibold">
                        Edit Role for your Organization
                    </SheetTitle>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Role Title
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
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Role Title
                                        </FormLabel>
                                        <FormControl>

                                            <Textarea
                                                name="description"
                                                rows='5'
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Status
                                        </FormLabel>
                                        <FormControl>

                                            <Select disabled={loading} onValueChange={field.onChange} defaultValue={field.value} className="col-span-3">
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent  >
                                                    <SelectItem value={'true'}>Active</SelectItem>
                                                    <SelectItem value={'false'}>Inactive</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="permissions"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Permissions
                                        </FormLabel>
                                        <FormControl>

                                            <Select disabled={permissions.length === 0 && true} onValueChange={selectPermission} className="col-span-3">
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select Permission" />
                                                </SelectTrigger>
                                                <SelectContent  >
                                                    <SelectGroup>

                                                        {
                                                            permissions.map((item, index) => {
                                                                //console.log(item)
                                                                return (
                                                                    <SelectItem key={index} value={item.id}>{item.title}</SelectItem>
                                                                )
                                                            })
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
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
                                    selectedPermissions?.map((item, index) => {
                                        return (
                                            <Button key={index} variant='outline' className='flex text-xs  mb-1 font-semibold items-center'>
                                                {item.title}
                                                <span className=' cursor-pointer ml-2' onClick={(e) => { removePermission(e, item) }}>
                                                    <Trash2 className='h-4 w-4' />
                                                </span>
                                            </Button>
                                        )
                                    })
                                }
                            </div>
                            <div className='flex justify-end'>
                                <Button variant="outline" disabled={isLoading} className='bg-blue-600 hover:bg-blue-800' >
                                    {
                                        loading && <Loader className='w-4 h-4 animate-spin mr-2' />
                                    }

                                    Update
                                </Button>
                            </div>

                        </div>

                    </form>
                </Form>

            </SheetContent>
        </Sheet>
    )
}
