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
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Permission title is required."
    }),
    description: z.optional(z.string()),
    status: z.string(),
    permissions: z.optional(z.array(z.string()))
});

export function AddRole({ open, values }) {

    const [loading, setLoading] = useState(true)
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "addRole";
    const [permissions, setPermissions] = useState([])
    const [selectedPermissions, setSelectedPermissions] = useState([])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            status: 'true',
            permissions: []
        }
    });
    //const isLoading = form.formState.isSubmitting;

    const { execute: getPermissions, isLoading } = useAction(permissionManagement, {
        onSuccess: (data) => {
            //console.log('getting permission', data.permissions, isLoading)
            setLoading(isLoading)
            setPermissions(data.permissions)
        },
        onError: (error) => {
            setLoading(false)
            console.log(error)
        }
    })

    useEffect(() => {
        getPermissions({ type: 'getPermission' })
    }, [])


    const { execute } = useAction(roleManagement, {
        onSuccess: (data) => {
            console.log(data)
            toast.success('Role created successfully', { id: 'createRole' })
            handleOpenChange()
            setLoading(false)
        },
        onError: (error) => {
            toast.error('Error creating role', { id: 'createRole' })
            console.log(error)
        }
    })


    const handleOpenChange = async () => {
        onClose()
        setSelectedPermissions([])
        form.reset()
    }

    const onSubmit = async (values) => {
        //setLoading(true)
        toast.loading('Creating Role', { id: 'createRole' })
        execute({ title: values.title, description: values.description, status: values.status, permissions: values.permissions, type: 'addRole' })
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
        }
    }

    const removePermission = (e, item) => {
        e.preventDefault()
        console.log('remove')

        const remaining = selectedPermissions.filter((i) => {
            return i.id !== item.id
        })
        //setFormData({ ...formData, permissions: remaining })
        setSelectedPermissions(remaining)

    }

    return (
        <Sheet open={isModalOpen} onOpenChange={handleOpenChange} >



            <SheetContent className="md:max-w-[485px] dark:text-[#d3e3fd] p-0 overflow-hidden">

                <SheetHeader className="pt-8 px-6 mb-10">
                    <SheetTitle className="text-xl text-center font-semibold">
                        Create Role for your Organization
                    </SheetTitle>

                    <SheetDescription className='text-xs'>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>

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
                                            Role Description
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

                                            <Select disabled={loading} onValueChange={field.onChange} defaultValue={field.value} className="">
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent  >
                                                    <SelectItem value={'true'}>Active</SelectItem>
                                                    <SelectItem selected value={'false'}>Inactive</SelectItem>
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

                                            <Select disabled={loading} onValueChange={selectPermission} className="col-span-3">
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder={permissions.length > 0 ? 'Select Permission' : 'No permissions to assign'} />
                                                </SelectTrigger>
                                                <SelectContent  >
                                                    <SelectGroup>
                                                        {/* <SelectItem >Select Permissions</SelectItem> */}
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

                            <div className='flex justify-end w-full'>
                                <Button variant="outline" disabled={isLoading} className='bg-blue-600 hover:bg-blue-800 w-full'>
                                    {
                                        loading && <Loader className='w-4 h-4 animate-spin mr-2' />
                                    }

                                    Create
                                </Button>
                            </div>

                        </div>

                    </form>
                </Form>

            </SheetContent>
        </Sheet>
    )
}
