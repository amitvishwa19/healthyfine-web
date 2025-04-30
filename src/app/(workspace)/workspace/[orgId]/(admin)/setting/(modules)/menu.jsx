import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectLabel,
    SelectGroup,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Icons } from '@/components/ui/icons'
import toast from 'react-hot-toast'



const formSchema = z.object({
    block: z.string({ required_error: "Please select an Menu block to display." }),
    title: z.string()
        .min(2, { message: "Menu Title must be at least 2 characters." })
        .max(20, { message: "Menu Title must not be longer than 30 characters." }),
    description: z.string().max(160).min(4),
})


const defaultValues = {
    title: "", description: "", icon: "", link: "",
}

export default function AppMenu() {
    const [progress, setProgress] = useState(50)
    const [loading, setLoading] = useState(false)
    const [newBlock, setNewBlock] = useState(true)
    const [menuBlocks, setMenuBlocks] = useState([])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: "onChange",
    })

    const getMenuBlocks = async () => {
        try {
            const res = await axios.get('/api/admin/menu')
                .then((data) => {
                    setMenuBlocks(data.data.data)
                })
        } catch (error) {
            console.log('Error while getting menublock data')
        }
    }

    const blockSelection = (data) => {
        console.log('Block selection', data)
        data === 'new' ? setNewBlock(true) : setNewBlock(false)
    }

    async function onSubmit(data) {
        return console.log(data)
        try {
            setLoading(true)
            const res = await axios.post('/api/admin/menu', data)
                .then((data) => {
                    toast.success('New Menu Block added successfully')
                    getMenuBlocks()
                    //console.log(data.data.data)
                    form.reset()
                })
        } catch (error) {
            if (error.code === "ERR_BAD_RESPONSE") {
                return toast.error('Duplicate Menu Block')
            }
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    function onChange() {

    }


    useEffect(() => {
        getMenuBlocks();
    }, [])


    return (
        <div>

            <div className="space-y-6">

                <div>
                    <h3 className="text-lg font-medium">Menu</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        This will manage the admin side menu.
                    </p>
                    <Separator />
                </div>



                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            {/* Menu Block */}
                            <FormField
                                control={form.control}
                                name="block"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Menu Block</FormLabel>
                                        <Select disabled={loading} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className=''>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a menu block" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent onChange={() => { console.log('dasd') }} >


                                                <SelectItem defaultValue key={'new'} value={'new'}  >New menu block</SelectItem>
                                                {
                                                    menuBlocks.map((item, index) => {
                                                        return (
                                                            <SelectItem key={item._id} value={item.title}>{item.title}</SelectItem>
                                                        )
                                                    })
                                                }


                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Menu  Title */}
                            <FormField
                                disabled={loading}
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Title for Menu Block' {...field} />
                                        </FormControl>
                                        <FormMessage className='text-xs' />
                                    </FormItem>
                                )}
                            />


                            {/* Menu Description */}
                            <FormField
                                disabled={loading}
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea disabled={loading} placeholder='Tell us a little bit about this Menu block'
                                                className="resize-none focus-visible:outline-none focus-visible:ring-0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="icon"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Icon</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Icon name for icon' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Link to navigate '  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button disabled={loading} type="submit" >
                                {loading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Add Menu
                            </Button>
                        </form>
                    </Form>
                </div>

            </div>
        </div>
    )
}
