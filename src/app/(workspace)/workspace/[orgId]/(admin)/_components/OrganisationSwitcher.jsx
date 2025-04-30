import React, { useContext, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import axios from '@/utils/axios';
import { Power } from 'lucide-react';
import defaultAvatar from "@/assets/images/default_avatar.png";
import { CldUploadButton } from 'next-cloudinary';
import { Textarea } from '@/components/ui/textarea';
import { Icon } from '@/components/global/Icon'
import { toast } from 'sonner';
import { useAuth } from '@/providers/AuthProvider';
import { redirect, useRouter } from 'next/navigation';
import { useAction } from '@/hooks/use-action';
import { logoutUser } from '@/app/(auth)/_action/logout';


export function OrganisationSwitcher() {
    const [open, setOpen] = React.useState(false)
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
    const [selectedOrg, setSelectedOrg] = React.useState({})
    const [orgs, setOrgs] = useState([])
    const [loading, setLoading] = useState(false)
    const [orgData, setOrgData] = useState({ title: '', description: '' })
    const { handleUserLogout, user, roles, organizations, handleUserOrganizations, test } = useAuth()
    const route = useRouter()

    useEffect(() => {
        setOrgs(organizations)
    }, [user])




    const getOrganization = async () => {
        try {
            await axios.get('/api/v1/user/org')
                .then((res) => {
                    console.log(res.data.data)
                    setOrgs(res.data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const createNewOrganization = async () => {
        try {
            console.log('Create new organization')
            setLoading(true)
            await axios.post('/api/v1/user/org', orgData)
                .then((res) => {
                    handleUserOrganizations()
                    setOrgs([...orgs, res.data.data])
                    toast.success('Organization created successfully')
                })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            setShowNewTeamDialog(false)
            setOrgData({ title: '', description: '' })
        }
    }

    const uploadPhoto = (result) => {
        //setFormData({ ...formData, feature_image: result?.info?.secure_url })
    }

    const handleModalClose = () => {
        setShowNewTeamDialog(false)
        setOrgData({ title: '', description: '' })
    }

    const handleOnOrgSelect = async (item) => {
        //console.log('org selected', item)
        test()
        //route.replace(`/org/${item.id}`)
        // try {
        //     await axios.post('/api/v1/user/org/default', item)
        //         .then((res) => {
        //             handleUserOrganizations()
        //         })
        // } catch (error) {
        //     console.log(error)
        // }

        // setSelectedOrg(item)
        // setOpen(false)
    }

    const { execute } = useAction(logoutUser, {
        onSuccess: (data) => {
            console.log('Logout success', data)
            setOpen(false)
            toast.success('You are successfully logout from App')
        },
        onError: (error) => {

        }
    })

    const userLogout = async () => {
        console.log('UserLogout')
        execute({ user: user })
    }

    return (
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog} className=''>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a team"
                        className=" justify-between outline-none"
                    >
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src={user?.avatar || defaultAvatar.src}
                                alt={'avatar'}
                            />
                            <AvatarFallback>{user?.displayName?.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        {selectedOrg?.title || user?.displayName || user?.email}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[300px] p-0 mr-2">
                    <Command>

                        <CommandList>
                            <CommandInput placeholder="Search Organization..." />
                            <CommandEmpty>No team found.</CommandEmpty>

                            <CommandGroup >

                                <div className='flex items-center mb-2'>
                                    <Avatar className="mr-2 h-8 w-8">
                                        <AvatarImage
                                            src={user?.avatar || defaultAvatar.src}
                                            alt={'avatar'}
                                        />
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        {user?.displayName}
                                        <span className='text-xs text-muted-foreground'> {user?.email}</span>
                                    </div>
                                </div>

                                {
                                    orgs?.length > 0 && <span className='text-xs text-muted-foreground mt-2 mx-2'>
                                        Organizations
                                    </span>
                                }

                                {orgs?.map((item, index) => (
                                    <CommandItem key={index} onSelect={() => { handleOnOrgSelect(item) }} className={`text-sm ${item.default ? 'bg-[#1E293Ba]' : null}`} >
                                        <Avatar className="mr-2 h-5 w-5">
                                            <AvatarImage src={item.avatar || defaultAvatar.src} alt={'avatar'} />
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>
                                        <div className='capitalize text-sm'>
                                            {item.title}
                                        </div>
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                item?.active
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>

                        </CommandList>

                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false)
                                            setShowNewTeamDialog(true)
                                        }}
                                    >
                                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                                        Create Organization
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>

                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem onSelect={() => { userLogout() }}>
                                        <Power className="mr-2 h-5 w-5" />
                                        Logout
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>

                    </Command>
                </PopoverContent>
            </Popover>



            <DialogContent className='dark:text-[#d3e3fd]'>
                <DialogHeader>
                    <div className='flex  justify-between'>
                        <div>
                            <DialogTitle>Create Organization</DialogTitle>
                            <DialogDescription>
                                Add a new organization to manage workflow.
                            </DialogDescription>
                        </div>
                        {/* <div>
                            <CldUploadButton options={{ maxFiles: 1 }} onUpload={uploadPhoto} uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}>
                                <img src={defaultImage.src} alt="" className='h-16 rounded-md' />
                            </CldUploadButton>
                        </div> */}
                    </div>
                </DialogHeader>
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Organization name</Label>
                            <Input value={orgData.title} onChange={(e) => { setOrgData({ ...orgData, title: e.target.value }) }} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Organization Description</Label>
                            <Textarea rows='4' value={orgData.description} onChange={(e) => { setOrgData({ ...orgData, description: e.target.value }) }} />
                        </div>

                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" size='sm' onClick={() => handleModalClose()}>
                        Cancel
                    </Button>
                    <Button type="submit" size='sm' onClick={() => { createNewOrganization() }} >
                        {loading && (
                            <Icon name={'Loader'} size={16} className={' animate-spin mr-2'} />
                        )}
                        Create Organization
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
