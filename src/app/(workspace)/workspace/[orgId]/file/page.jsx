'use client'

import { File, FilePlus, FileText, FileX, FolderPlus, Trash2, Image as ImageIcon, Share } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, } from "@/components/ui/context-menu"
import axios from 'axios'
import { getFiles } from '@/actions/org/files/get_files'
import { useAction } from '@/hooks/use-action'
import { deleteFiles } from '@/actions/org/files/delete_File'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/useModal'
import { ActionTooltip } from '@/components/global/ActionTooltip'
import { useSession } from 'next-auth/react'
import { getFolders } from './_action/get_folders'
import { getDocuments } from './_action/get_documents'
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { FaFileImage, FaFileExcel, FaFileWord, FaFilePdf, FaFile } from "react-icons/fa";
import { DocumentViewer } from 'react-documents'

export default function FilePage({ params }) {
    const [documents, setDOcuments] = useState([])
    const { orgId } = params
    const router = useRouter()
    const { onOpen, refresh } = useModal()
    const { data: session } = useSession()
    const [folders, setFolders] = useState([])

    useEffect(() => {
        //getDocuments({ data: '' })
        getDocs({ userId: session?.user?.userId })
    }, [refresh])



    const { execute: getFOlders } = useAction(getFolders, {
        onSuccess: (data) => {
            //console.log('folders', data)
            setFolders(data)
        },
        onError: (error) => {
            toast.error(error)
        }
    })


    const { execute: getDocs } = useAction(getDocuments, {
        onSuccess: (data) => {
            setDOcuments(data)
            //console.log(data)
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: deleteCocument } = useAction(deleteFiles, {
        onSuccess: (data) => {
            //console.log(data)
            //router.refresh()
            setDOcuments(data.documents)
            toast.success(`${data.document.name} deleted successfully`)
        },
        onError: (error) => {
            //setProcessing(false)
            toast.error(error)
        }
    })

    const handleDeleteDoc = (documentId, url) => {
        deleteCocument({ documentId, orgId, userId: session.user.userId, url })
    }


    return (
        <div className=' p-2  flex flex-col w-full'>


            {/* {
                folders.map((folder, index) => {
                    return (
                        <div key={index}>
                            {folder.name}
                        </div>
                    )
                })
            } */}


            {
                documents.length === 0 ? (
                    <div className='text-sm  text-slate-800 dark:text-gray-200 flex-1 flex flex-col items-center justify-center gap-4'>
                        <FileX size={40} />
                        <div>
                            No Document found
                            <span className='ml-2 cursor-pointer text-blue-600' onClick={() => { onOpen("addFile", { orgId, userId: session.user.userId }) }}>
                                Upload file
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className='flex gap-4 flex-wrap p-2 overflow-hidden'>
                        {
                            documents?.map((document, index) => {
                                return (

                                    <ContextMenu key={document.id} >
                                        <ContextMenuTrigger
                                            className=''
                                            onClick={() => {
                                                console.log('folder click')
                                            }}
                                        >


                                            <div className='flex flex-col gap-2 items-center justify-center mx-2'>
                                                <div
                                                    className='flex h-[60px] w-[60px] items-center justify-center rounded-md border border-dashed text-sm cursor-pointer bg-auto bg-no-repeat'
                                                    draggable={true}
                                                // style={{ backgroundImage: `url(${document?.url})`, backgroundSize: 'auto', backgroundSize: '75%' }}
                                                >


                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <div>
                                                                {document.type.includes('image') && <FaFileImage size={64} />}
                                                                {document.type.includes('application') && <FaFile size={64} />}
                                                                {document.type.includes('text') && <FaFile size={64} />}
                                                            </div>
                                                        </DialogTrigger>
                                                        <DialogContent className="h-[600px] ">
                                                            <DialogHeader>
                                                                <DialogTitle className='text-white text-sm'>
                                                                    {document?.name.split('.', 1)}
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    {/* Make changes to your profile here. Click save when you're done. */}
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                {/* <Image height={600} width={600} src={document.url} alt={document.name} /> */}
                                                                <DocumentViewer
                                                                    queryParams="hl=Nl"
                                                                    url={document.url}


                                                                >

                                                                </DocumentViewer>
                                                            </div>

                                                        </DialogContent>
                                                    </Dialog>



                                                </div>
                                                {/* <Image height={100} width={100} src={document.url} alt={document.name} /> */}
                                                <span className='flex text-xs w-16  flex-wrap text-center  justify-center  break-all  '>
                                                    {document?.name.split('.', 1)}
                                                </span>
                                            </div>

                                        </ContextMenuTrigger>

                                        <ContextMenuContent className="w-48">
                                            <ContextMenuItem
                                                inset
                                                className='flex items-center justify-between'
                                                onClick={() => { handleDeleteDoc(document.id, document.url) }}
                                            >
                                                <span>Delete</span>
                                                <Trash2 size={16} />
                                            </ContextMenuItem>
                                            <ContextMenuItem
                                                className='flex items-center justify-between'
                                                inset
                                            >
                                                <span> Share</span>
                                                <Share size={16} />
                                            </ContextMenuItem>
                                        </ContextMenuContent>
                                    </ContextMenu>
                                    // <div key={folder.id} className='bg-gray-400 aspect-video h-20 w-20 text-wrap text-sm rounded flex justify-center overflow-clip p-2'>
                                    //     {folder.name}
                                    // </div>

                                )
                            })
                        }
                    </div>
                )
            }


        </div >
    )
}
