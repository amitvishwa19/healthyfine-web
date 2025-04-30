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
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"



const formSchema = z.object({
    displayName: z.optional(z.string()),
    status: z.string(),
    emailVerified: z.string(),
    roles: z.optional(z.array(z.string()))
});

export function EditUser({ open, values }) {

    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "editUser";
    const [roles, setRoles] = useState([])
    const [selectedRoles, setSelectedRoles] = useState([])
    const { user } = data
    const router = useRouter()


    useEffect(() => {
        console.log('getting roles')
        getRoles({ type: 'getRoles' })
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: "",
            email: "",
            status: 'true',
            roles: []
        }
    });
    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        if (user) {
            setSelectedRoles(user.roles)
            form.setValue('displayName', user.displayName)
            form.setValue('email', user.email)
            form.setValue('status', user.status ? 'true' : 'false')
            form.setValue('emailVerified', user.emailVerified ? 'true' : 'false')
            // form.setValue('permissions', role.permissions.map((i) => i.id))

        }
    }, [form, user, onOpen])

    const { execute: getRoles } = useAction(roleManagement, {
        onSuccess: (data) => {
            setRoles(data.roles)
        },
        onError: (error) => {
            setLoading(false)
            console.log(error)
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
        execute({ id: user.id, displayName: values.displayName, email: values.email, status: values.status, emailVerified: values.emailVerified, roles: values.roles, type: 'editUser' })
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
        <Sheet open={isModalOpen} onOpenChange={handleOpenChange} >



            <SheetContent className="md:max-w-[485px] dark:text-[#d3e3fd] p-0 overflow-hidden">

                <SheetHeader className="pt-8 px-6 mb-10">
                    <SheetTitle className="text-xl text-center font-semibold ">
                        Edit User for your Organization
                    </SheetTitle>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4 px-6">

                            <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Display Name
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
                                            Email
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

                            {/* <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Password
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
                            /> */}


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
                                name="emailVerified"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Email Verified?
                                        </FormLabel>
                                        <FormControl>

                                            <Select disabled={loading} onValueChange={field.onChange} defaultValue={field.value} className="col-span-3">
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent  >
                                                    <SelectItem value={'true'}>Verified</SelectItem>
                                                    <SelectItem value={'false'}>Pending</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='text-xs' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="roles"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Roles
                                        </FormLabel>
                                        <FormControl>

                                            <Select disabled={loading} onValueChange={selectRole} className="col-span-3">
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select Role" />
                                                </SelectTrigger>
                                                <SelectContent  >
                                                    <SelectGroup>

                                                        {
                                                            roles.map((item, index) => {
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

                            <div className='flex justify-end'>
                                <Button variant="outline" disabled={isLoading} className='w-full bg-blue-600 hover:bg-blue-800'>
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
