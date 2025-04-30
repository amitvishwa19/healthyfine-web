import React, { useState } from 'react'
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

export function AddPermission({ open, values }) {

    const [loading, setLoading] = useState(false)
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "addPermission";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            status: 'true'
        }
    });
    const isLoading = form.formState.isSubmitting;

    const { execute } = useAction(permissionManagement, {
        onSuccess: (data) => {
            console.log(isLoading)
            //setUsers(data.users)
            toast.success('Permission created successfully', { id: 'createPermission' })
            handleOpenChange()
            setLoading(false)
        },
        onError: (error) => {
            //setLoading(false)
            toast.error('Error creating permission, Permission already exist', { id: 'createPermission' })
            console.log(error.message)
        }
    })


    const handleOpenChange = async () => {
        onClose()
        form.reset()
    }

    const onSubmit = async (values) => {
        toast.loading('Creating Permission', { id: 'createPermission' })
        execute({ title: values.title, description: values.description, status: values.status, type: 'addPermission' })
    }

    return (
        <Sheet open={isModalOpen} onOpenChange={handleOpenChange} >



            <SheetContent className="md:max-w-[485px] dark:text-[#d3e3fd] p-0 overflow-hidden">

                <DialogHeader className="pt-8 px-6 mb-10">
                    <DialogTitle className="text-xl text-center font-semibold">
                        Create Permission for your Organization
                    </DialogTitle>
                </DialogHeader>

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
                                                className=" shadow-none ring-1"  {...field}
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
                                                className='shadow-none ring-1'
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
                                    <FormItem className=''>
                                        <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                            Status
                                        </FormLabel>
                                        <FormControl >

                                            <Select disabled={loading} onValueChange={field.onChange} defaultValue={field.value} className="shadow-none ring-1 ">
                                                <SelectTrigger className="flex w-full">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent className='flex w-full'>
                                                    <SelectItem value={'true'}>Active</SelectItem>
                                                    <SelectItem selected value={'false'}>Inactive</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='text-xs' />
                                    </FormItem>
                                )}
                            />


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
