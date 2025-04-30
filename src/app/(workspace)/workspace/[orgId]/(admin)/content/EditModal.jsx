import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader, Minus, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useModal } from '@/hooks/useModal'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from '@/hooks/use-action'
import { useRouter } from 'next/navigation'
import { contentManagement } from '@/actions/admin/content-management'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"


const formSchema = z.object({
    title: z.string(),
    description: z.string(),
});

export function EditContent({ open, values }) {

    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "editContent";
    const { content } = data
    const router = useRouter()
    const [inputList, setInputList] = useState([{ type: '', title: '', display: false }])
    const [input, setInput] = useState({ type: '', title: '' })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        }
    });

    //console.log(content?.contentFields.length)

    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        if (content) {
            form.setValue('title', content.title)
            form.setValue('description', content.description)

            if (content?.contentFields.length >= 1) {
                console.log(content?.contentFields)
                const val = content?.contentFields.map((i) => ({ id: i.id, type: i.type, title: i.title, display: i.display }))
                setInputList(val)
                //console.log('Content have contentFields', val)
            }
        }
    }, [form, content])


    const { execute } = useAction(contentManagement, {
        onSuccess: (data) => {
            console.log(data)
            toast.success('Content updated successfully')
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
        form.reset()
        router.refresh()
        setInputList([{ type: '', title: '' }])
    }

    const onSubmit = async (values) => {

        setLoading(true)
        execute({ id: content.id, title: values.title, description: values.description, inputList, type: 'editContent' })

        //console.log(inputList)
    }

    const handleFieldChange = (e, index, type) => {


        const item = { type: '', title: '', display: false }
        const list = [...inputList]

        if (type === 'select') {
            list[index]['type'] = e
        }

        if (type === 'input') {
            list[index]['title'] = e.target.value
        }

        if (type === 'display') {
            list[index]['display'] = e
        }

        setInputList(list)
    }

    const handleAddField = (e) => {
        e.preventDefault()
        setInputList([...inputList, { type: '', title: '' }])
    }

    const handleRemoveField = (e, index) => {
        e.preventDefault()
        const list = [...inputList]
        list.splice(index, 1)
        setInputList(list)
    }

    return (


        <Sheet open={isModalOpen} onOpenChange={handleOpenChange}>

            <SheetContent className="min-w-[800px] dark:text-[#d3e3fd]  p-4">
                <SheetHeader>
                    <SheetTitle>Edit content model</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="">
                            <div className="space-y-4 mb-4">

                                <FormField
                                    control={form.control}
                                    name="title"
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
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className=" text-xs font-bold text-slate-800 dark:text-gray-400"                                        >
                                                Description
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    disabled={loading}
                                                    rows='4'
                                                    className=" shadow-none"  {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className='text-xs' />
                                        </FormItem>
                                    )}
                                />


                                <div className='py-4 flex flex-col gap-2'>
                                    <h2 className='text-sm'>Add Feilds to content</h2>
                                    <div className='flex flex-row text-sm my-2'>
                                        <div className='w-[20%] text-center'>Type</div>
                                        <div className='w-[55%] text-center'>Title</div>
                                        <div className='w-[10%] text-center'>Display</div>
                                        <div className='w-[15%] text-center'>Action</div>
                                    </div>
                                    {
                                        inputList.map((item, index) => {
                                            return (

                                                <div key={index} className='flex flex-row gap-2 items-center'>

                                                    <Select onValueChange={e => handleFieldChange(e, index, 'select')} defaultValue={item.type}>
                                                        <SelectTrigger className="w-[20%]">
                                                            <SelectValue placeholder="Select data type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Data Type</SelectLabel>
                                                                <SelectItem value="text">Text</SelectItem>
                                                                <SelectItem value="number">Number</SelectItem>
                                                                <SelectItem value="boolean">Boolean</SelectItem>
                                                                <SelectItem value="json">Json</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <Input
                                                        value={item.title}
                                                        placeholder="Field Name"
                                                        onChange={e => handleFieldChange(e, index, 'input')}
                                                        className='w-[55%]'
                                                    />
                                                    <div className='w-[10%] flex justify-center'>
                                                        <Checkbox id="terms" onCheckedChange={(e) => { handleFieldChange(e, index, 'display') }} checked={item.display} />
                                                    </div>



                                                    <div className='flex row w-[15%] gap-2 justify-center'>
                                                        {
                                                            (inputList.length !== 1) &&
                                                            <Button variant="outline" onClick={(e) => { handleRemoveField(e, index) }}  >
                                                                <Minus size={16} />
                                                            </Button>
                                                        }
                                                        {
                                                            inputList.length - 1 == index &&
                                                            <Button variant="outline" onClick={(e) => { handleAddField(e) }}  >
                                                                <Plus size={16} />
                                                            </Button>
                                                        }
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }

                                </div>

                            </div>


                            <Button variant="outline" disabled={isLoading} className=' justify-end'>
                                {
                                    loading && <Loader className='w-4 h-4 animate-spin mr-2' />
                                }
                                Save
                            </Button>

                        </form>
                    </Form>
                </div>

            </SheetContent>
        </Sheet>
    )
}
