'use client'
import React, { useRef, useState } from 'react'
import { Airplay, Camera, Check, Cloud, FileText, Loader, Trash2, } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { useAction } from '@/hooks/use-action'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useModal } from '@/hooks/useModal'
import { useRouter } from 'next/navigation'
import { BiCloudUpload } from 'react-icons/bi'
import axios from 'axios'
import { FaDropbox, FaGoogleDrive } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { round } from 'lodash'
import { uploadFile } from '../_action/upload_file'




export function FIleCreator({ organization, children, sideOffset, boards, setBoards }) {

    const [processing, setProcessing] = useState(false)
    const [formData, setFormData] = useState({ title: '', description: '', avatar: null })
    const [error, setError] = useState('asas')

    const [isDraggable, setIsDraggable] = useState(false)
    const inputRef = useRef(null)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [showProgress, setShowProgress] = useState(false)
    const [progress, setProgress] = useState(0)


    const closeRef = useRef(null)
    const router = useRouter();


    const { onOpen, onClose, isOpen, type, data } = useModal()
    const isModalOpen = isOpen && type === "addFile";
    const { orgId, userId } = data


    const { execute: uploadFiles, fieldErrors, isLoading } = useAction(uploadFile, {
        onSuccess: (data) => {
            console.log(data)
            handleOpenChange()
            toast.success(`Document ${data.name} uploaded successfully`)
        },
        onError: (error) => {
            //setProcessing(false)
            toast.error(error)
        }
    })

    const handleOpenChange = () => {
        router.refresh();
        setFormData({ title: '', description: '', avatar: null })
        setSelectedFiles([])
        setProgress(0)
        onClose()
    }

    const handleAreaClick = () => {
        inputRef.current.click()
    }

    const handleFileSelect = (e) => {
        const files = e.target.files
        //console.log('FIle Selected', e.target.files[0])


        if (files.length === 0) return
        for (let i = 0; i < files.length; i++) {
            const type = files[i].type.split('/')[0]
            if (!selectedFiles?.some((e) => e.name === files[i].name)) {
                setSelectedFiles((prevFIle) => [...prevFIle, files[i]])
            }
        }


    }

    function onDragOver(e) {
        e.preventDefault()
        setIsDraggable(true)
    }

    function onDragLeave(e) {
        e.preventDefault()
        setIsDraggable(false)
    }

    function onDrop(e) {
        e.preventDefault()
        setIsDraggable(false)
        const files = e.dataTransfer.files
        if (files.length === 0) return
        for (let i = 0; i < files.length; i++) {
            const type = files[i].type.split('/')[0]
            if (!selectedFiles?.some((e) => e.name === files[i].name)) {
                setSelectedFiles((prevFIle) => [...prevFIle, files[i]])
            }
        }
    }

    const removeFile = (index) => {
        setSelectedFiles((prevFile) => prevFile.filter((_, i) => i !== index))
    }



    const handleUploadFiles = async (e) => {
        e.preventDefault()



        selectedFiles.forEach(async (fileselectedFile) => {
            //console.log(fileselectedFile)
            let formData = new FormData()
            formData.append("file", fileselectedFile)
            const file = formData.get("file");
            const arrayBuffer = await file.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            uploadFiles({ orgId, userId, file: formData, type: file.type, name: file.name.split('.', 1).toString(), size: file.size })


            setProgress(100)
            //     console.log(file.name.split('.', 1))

        })

    }

    return (

        <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>

            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>

                </DialogHeader>


                <div className="">

                    <div className="flex flex-col ">

                        <div
                            className='flex flex-col gap-4 w-full border-2 border-sky-600 border-dashed h-[250px] rounded  cursor-pointer text-gray-200 items-center justify-center'
                            onClick={handleAreaClick}
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                        >
                            <BiCloudUpload size={80} />

                            {
                                isDraggable ?
                                    (
                                        <span className='text-sm text-slate-800 dark:text-slate-200'>
                                            Drop your file(s) here
                                        </span>
                                    ) :
                                    (
                                        <div className='items-center flex flex-col'>
                                            <span className='text-sm text-slate-800 dark:text-slate-200 '>
                                                Drag and drop image file or
                                                <span role='button' className=' cursor-pointer text-sky-600 font-semibold'> Browse</span>
                                            </span>
                                            <div className='text-xs text-muted-foreground'>SVG, PNG, JPG or GIF (Max size: 10MB)</div>
                                        </div>
                                    )
                            }



                            <Input
                                ref={inputRef}
                                id="width"
                                multiple
                                type="file"
                                placeholder='Board Title'
                                className="col-span-4 h-8 dark:text-white hidden"
                                value={formData.title}
                                onChange={(e) => { handleFileSelect(e) }}
                            />
                        </div>

                        <div className='flex flex-col gap-2 mt-2'>
                            {
                                selectedFiles?.map((file, index) => {

                                    const type = file.type.split('/')[0]
                                    return (
                                        <div key={index} className='flex w-full p-2 bg-gray-400 dark:bg-slate-900 rounded gap-2'>

                                            <div className='h-12 w-12 bg-white rounded relative flex items-center justify-center'>
                                                {
                                                    type === 'image' ?
                                                        (<img src={URL.createObjectURL(file)} alt={file.name} />) :
                                                        (<FileText size={40} className='text-sky-600' />)
                                                }
                                            </div>

                                            <div className='flex w-full items-center gap-2  justify-between'>
                                                <div className='flex flex-col '>
                                                    <div className='text-xs text-white/80'>{file.name}</div>
                                                    <div className='text-[10px] text-muted-foreground'>{(file.type)} / {round((file.size / 1048576), 2)} Mb</div>
                                                </div>
                                                <div className='text-xs text-slate-800 dark:text-gray-200'>
                                                    {progress} %
                                                </div>
                                                <div className='flex flex-col gap-2 flex-grow'>
                                                    <div className='flex w-full bg-white  rounded overflow-hidden'>
                                                        <div className={`flex  h-full bg-sky-800 p-[2px]`} style={{ width: `${progress}%` }} />
                                                    </div>
                                                </div>
                                                <div>
                                                    {
                                                        progress === 100 ?
                                                            (
                                                                <span className=' cursor-pointer font-semibold' >
                                                                    <Check size={14} className='text-sky-800 font-semibold' />
                                                                </span>
                                                            ) :
                                                            (
                                                                <span className=' cursor-pointer font-semibold' onClick={() => { removeFile(index) }}>
                                                                    <Trash2 size={14} className='text-sky-800 font-semibold' />
                                                                </span>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                    {/* <div className="grid grid-cols-4 items-center gap-2 mb-2">

                        <Input
                            id="width"
                            placeholder='Board Title'
                            className="col-span-4 h-8 mb-0 dark:text-white"
                            value={formData.title}
                            onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }}
                        />



                    </div> */}
                    {/* <div className="grid grid-cols-4 items-center gap-4">

                        <Textarea
                            id="width"
                            rows='6'
                            placeholder='Board Description'
                            className="col-span-4 h-8 dark:text-white"
                            value={formData.description}
                            onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
                        />
                    </div> */}

                    <div className="grid grid-cols-4 items-center gap-4 mt-2">
                        {
                            selectedFiles.length > 0 &&
                            <Button size='sm' variant='primary' className='col-span-4  bg-blue-600 hover:bg-blue-800 text-gray-300' disabled={isLoading} onClick={handleUploadFiles}>
                                {isLoading ? (<Loader className='h-4 w-4 mr-2 animate-spin' />) : 'Upload'}
                            </Button>
                        }

                    </div>

                </div>


            </DialogContent>
        </Dialog>
    )
}
