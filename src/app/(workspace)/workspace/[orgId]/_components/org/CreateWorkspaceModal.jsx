import { useModal } from '@/hooks/useModal'
import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { UnsplashImagePicker } from '@/components/global/UnsplashImagePicker'
import { useAction } from '@/hooks/use-action'
import { createServer } from '../../../_action/server/create_server'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import UploadZone from '@/components/global/UploadZone'
import { fileToUrl } from '@/utils/functions'
import { uploadFileToVercel } from '../../../_action/upload_file_to_vercel'
import { OrgContext } from '@/providers/OrgProvider'
import { useRouter } from 'next/navigation'


export default function CreateWorkspaceModal() {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null)
    const [data, setData] = useState({ name: '', imageUrl: '' })
    const [selectedFiles, setSelectedFiles] = useState(null)
    const { data: session } = useSession()
    const { onOpen, onClose, isOpen, type } = useModal()
    const isModalOpen = isOpen && type === "createServer";
    const { updateLoading, updateServer, updateServers } = useContext(OrgContext)
    const [fileSelected, setFileSelected] = useState(false)

    const { execute, isLoading } = useAction(createServer, {
        onSuccess: (data) => {
            console.log('data', data)
            //updateLoading(false)
            updateServer(data.server)
            updateServers(data.servers)
            handleOpenChange()
            router.push(`/workspace/${data?.server?.id}`)
            toast.success(`Organizational workspace ${data?.server?.name} created successfully`, { id: 'new-org' })
        },
        onError: (error) => {
            setProcessing(false)
            updateLoading(false)
            toast.error(error)
        }
    })

    const { execute: fileToVercel } = useAction(uploadFileToVercel, {
        onSuccess: (data) => {
            console.log('data', data)
            setData({ ...data, imageUrl: data.url })
        },
    })


    const handleOpenChange = () => {
        setFileSelected(false)
        setSelectedFiles(null)
        onClose()
        setData({ name: '', imageUrl: '' })
    }

    const handleCreateOrgSpace = async () => {

        if (data.name.length == 0) return toast.error('Give your Organizational workspace a name')
        if (!fileSelected) return toast.error('Please select a avatar or upload a custom image')

        let formData = new FormData()
        formData.append("file", selectedFiles)

        console.log('data', data)
        toast.loading('Creating new organizational workspace', { id: 'new-org' })
        execute({ ...data, userId: session.user.userId, file: formData })
    }

    return (
        <Sheet open={isModalOpen} onOpenChange={handleOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create new Organizational Workspace</SheetTitle>
                    <SheetDescription className='text-xs text-muted-foreground'>
                        Manage all your workspace.Give your organization a personality with a name and an image. You can always change it later.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4 mt-6">

                    {/* <div>
                        <UnsplashImagePicker
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage}
                            onClick={(img) => {
                                setData({ ...data, imageUrl: img.full })
                                console.log('img.full', img.full)
                                setFileSelected(true)
                            }}
                        />
                    </div> */}


                    <div className='text-center text-muted-foreground my-2'>
                        <div className='mb-4'>
                            Upload a custom image for your workspace identity
                        </div>
                        <UploadZone onClick={(e) => { console.log('Image selected...........', e) }} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} multiple={true} setFileSelected={setFileSelected} />
                    </div>

                    <div>
                        <Input
                            disabled={isLoading}
                            placeholder='Your organization workspace name'
                            value={data.name}
                            onChange={e => setData({ ...data, name: e.target.value })}
                            className='text-white'
                        />
                    </div>

                    <div>
                        <Button
                            disabled={isLoading}
                            variant='outline'
                            size=''
                            className='w-full bg-sky-600 hover:bg-sky-800 text-white'
                            onClick={() => handleCreateOrgSpace()}
                        >
                            Create Your Organization Space
                        </Button>
                    </div>


                </div>
            </SheetContent>
        </Sheet>
    )
}
