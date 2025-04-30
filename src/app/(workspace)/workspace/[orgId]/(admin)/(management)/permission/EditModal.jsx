import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { useModal } from '@/hooks/useModal'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from '@/hooks/use-action'
import { permissionManagement } from '@/actions/admin/permission-management'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"


const formSchema = z.object({
    title: z.string().min(1, {
        message: "Permission title is required."
    }),
    description: z.optional(z.string()),
    status: z.string()
});

export function EditPermission({ open, values }) {

    const [loading, setLoading] = useState(false)
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "editPermission";
    const { permission } = data

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            status: ''
        },
        mode: "onChange",
    });
    const isLoading = form.formState.isSubmitting;



    useEffect(() => {
        if (permission) {
            form.setValue('title', permission.title)
            form.setValue('description', permission.description)
            form.setValue('status', permission.status ? 'true' : 'false')
        }
    }, [form, permission])



    const { execute } = useAction(permissionManagement, {
        onSuccess: (data) => {
            toast.success('Permission updated successfully')
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
        form.reset()
    }

    const onSubmit = async (values) => {
        setLoading(true)
        execute({ id: permission.id, title: values.title, description: values.description, status: values.status, type: 'editPermission' })
    }

    return (
        <Sheet open={isModalOpen} onOpenChange={handleOpenChange} >



            <SheetContent className="md:max-w-[485px] dark:text-[#d3e3fd] p-0 overflow-hidden">

                <SheetHeader className="pt-8 px-6 mb-10">
                    <SheetTitle className="text-xl text-center font-semibold">
                        Update Permission for your Organization
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
                                            Permission Title
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
                                            Permission Title
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

                            <div className='flex justify-end'>
                                <Button variant="outline" disabled={isLoading} >
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
