'use client'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAction } from '@/hooks/use-action'
import { Loader } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
// import { toast } from 'sonner'
// import Editor from '../../_components/editor'
// import { privacyPolicy } from '@/actions/setting/privacy-policy'
// import JoditEditor from 'jodit-react';

export default function TermConditionPage() {
    // const [data, setData] = useState('')
    // const formRef = useRef(null)
    // const [prosessing, setProcessing] = useState(false)
    // const [loading, setLoading] = useState(false)
    // const editor = useRef(null);
    // const [content, setContent] = useState('');

    // const { execute, isLoading } = useAction(privacyPolicy, {
    //     onSuccess: (data) => {
    //         console.log(data)
    //         setData(data.res.value)
    //         setContent(data.res.value)
    //         setProcessing(false)

    //         if (data.type === 'post') {
    //             toast.success('Privacy policy saved')
    //         }
    //     },
    //     onError: () => {
    //         setProcessing(false)
    //     },
    // })

    // useEffect(() => {
    //     execute({ type: 'get', key: 'privacy-policy' })
    // }, [])


    // const saveTerms = () => {

    //     setProcessing(true)
    //     execute({ type: 'post', key: 'privacy-policy', value: content })
    // }

    // const handleOnChange = async () => {

    // }


    // const config = {
    //     readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    //     placeholder: 'Start typings...',
    //     height: '600px',
    //     style: {
    //         //background: '#27272E',
    //         color: '#000',
    //     },
    //     theme: 'summer'
    // }

    return (
        <div className='mt-4'>
            <div className='flex justify-between'>
                <div className=''>
                    <h3 className="text-lg font-medium">Privacy & Policy</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                        Privacy & Policy of this app
                    </p>
                </div>

                <div className=' '>
                    <Button disabled={prosessing} size='sm' variant='outline' onClick={() => { saveTerms() }}>
                        {prosessing && <Loader className='w-4 h-4 mr-2 animate-spin' />}
                        Save
                    </Button>
                </div>
            </div>
            <Separator />

            <div className='mt-10'>
                {/* {!loading && <Editor value={data} onChange={(e) => { setData(e) }} />} */}
                <div className='mt-6'>
                    {/* {!loading && <Editor value={content} onChange={(e) => { setContent(e) }} />} */}

                    {/* <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}

                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { }}
                    /> */}
                </div>


            </div>

        </div >
    )
}
