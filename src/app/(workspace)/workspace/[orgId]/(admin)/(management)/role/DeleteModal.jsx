import React, { useEffect, useState } from 'react'


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { useModal } from '@/hooks/useModal'


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from '@/hooks/use-action'
import { permissionManagement } from '@/actions/admin/permission-management'
import { roleManagement } from '@/actions/admin/role-management'


const formSchema = z.object({
    title: z.string().min(1, {
        message: "Permission title is required."
    }),
    description: z.optional(z.string()),
    status: z.string()
});

export function DeleteRole({ open, values }) {

    const [loading, setLoading] = useState(false)
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "deleteRole";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            status: 'true'
        }
    });
    const isLoading = form.formState.isSubmitting;

    const { execute } = useAction(roleManagement, {
        onSuccess: (data) => {
            console.log(isLoading)
            //setUsers(data.users)
            toast.success('Role Deleted successfully')
            handleOpenChange()
            setLoading(false)
        },
        onError: (error) => {
            setLoading(false)
            console.log(error)
        }
    })

    const handleOnSubmit = () => {
        setLoading(true)
        execute({ id: data.id, type: 'deleteRole' })
    }


    const handleOpenChange = async () => {
        onClose()
    }



    return (
        <Dialog open={isModalOpen} onOpenChange={handleOpenChange} >

            <DialogContent className="sm:max-w-[625px] dark:text-[#d3e3fd] p-0 overflow-hidden">

                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-semibold">
                        Delete Role for your Organization
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the role?<br />
                        This  action cannot be undone!
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className=" bg-slate-900 p-2">

                    <Button variant="primary" disabled={isLoading} onClick={handleOnSubmit}>
                        {
                            loading && <Loader className='w-4 h-4 animate-spin mr-2' />
                        }

                        Delete
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
