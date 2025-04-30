import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent, BubbleMenu, FloatingMenu, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ButtonIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { AppIcon } from '@/components/global/AppIcon'

export default function TipTap({ onChange, value }) {
    const [editorContent, setEditorContent] = useState('')
    const extensions = [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
        }),
    ]

    const editor = useEditor({
        extensions: extensions,
        content: value,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange(html)
        },
    })

    const MenuBar = ({ editor }) => {
        //const { editor } = useCurrentEditor()

        //console.log('editor', editor)

        if (!editor) {
            return null
        }

        return (
            <div className='flex gap-4 flex-wrap'>

                <ToggleGroup type="single" className='border rounded-md'>
                    <ToggleGroupItem
                        value="bold" aria-label="Toggle bold"
                        className={editor.isActive('bold') ? 'is-active' : ''}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                    >
                        <AppIcon className={'cursor-pointer'} name={'Bold'} size={16} onClick={() => editor.chain().focus().toggleBold().run()} />
                    </ToggleGroupItem>

                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                        <AppIcon className={'cursor-pointer'} name={'Italic'} size={16} onClick={() => editor.chain().focus().toggleItalic().run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="underline" aria-label="Toggle underline">
                        <AppIcon className={'cursor-pointer'} name={'Underline'} size={16} onClick={() => editor.chain().focus().toggleUnderline().run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
                        <AppIcon className={'cursor-pointer'} name={'Strikethrough'} size={16} onClick={() => editor.chain().focus().toggleStrike().run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Code" aria-label="Toggle Code">
                        <AppIcon className={'cursor-pointer'} name={'Code'} size={16} onClick={() => editor.chain().focus().toggleCodeBlock().run()} />
                    </ToggleGroupItem>

                </ToggleGroup>


                <ToggleGroup type="single" className='border rounded-md'>
                    <ToggleGroupItem value="h1" aria-label="Toggle h1" >
                        <AppIcon className={'cursor-pointer'} name={'Heading1'} size={16} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="h2" aria-label="Toggle h2">
                        <AppIcon className={'cursor-pointer'} name={'Heading2'} size={16} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="h3" aria-label="Toggle h3">
                        <AppIcon className={'cursor-pointer'} name={'Heading3'} size={16} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="h4" aria-label="Toggle h4">
                        <AppIcon className={'cursor-pointer'} name={'Heading4'} size={16} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="h5" aria-label="Toggle h5">
                        <AppIcon className={'cursor-pointer'} name={'Heading5'} size={16} onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} />
                    </ToggleGroupItem>
                </ToggleGroup>

                <ToggleGroup type="single" className='border rounded-md'>
                    <ToggleGroupItem value="Quote" aria-label="Toggle Quote">
                        <AppIcon className={'cursor-pointer'} name={'Quote'} size={16} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="ListOrdered" aria-label="Toggle ListOrdered" >
                        <AppIcon className={'cursor-pointer'} name={'ListOrdered'} size={16} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="List" aria-label="Toggle List">
                        <AppIcon className={'cursor-pointer'} name={'List'} size={16} onClick={() => editor.chain().focus().toggleBulletList().run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Pilcrow" aria-label="Toggle Pilcrow">
                        <AppIcon className={'cursor-pointer'} name={'Pilcrow'} size={16} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Minus" aria-label="Toggle Minus">
                        <AppIcon className={'cursor-pointer'} name={'Minus'} size={16} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Redo2" aria-label="Toggle Redo2">
                        <AppIcon className={'cursor-pointer'} name={'Redo2'} size={16} onClick={() => editor.chain().focus().redo().run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Undo2" aria-label="Toggle Undo2" className=''>
                        <AppIcon className={'cursor-pointer'} name={'Undo2'} size={16} onClick={() => editor.chain().focus().undo().run()} />
                    </ToggleGroupItem>
                </ToggleGroup>

                <ToggleGroup type="single" className='border rounded-md'>
                    <ToggleGroupItem value="RouteOff" aria-label="Toggle RouteOff">
                        <AppIcon className={'cursor-pointer'} name={'RouteOff'} size={16} onClick={() => editor.chain().focus().unsetAllMarks().run()} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="XCircle" aria-label="Toggle XCircle">
                        <AppIcon className={'cursor-pointer'} name={'XCircle'} size={16} onClick={() => editor.chain().focus().clearNodes().run()} />
                    </ToggleGroupItem>

                </ToggleGroup>

            </div>
        )
    }


    return (


        <div className='flex flex-col gap-2'>
            <MenuBar editor={editor} />
            {editorContent}
            <EditorContent
                editor={editor}
                className='p-2 focus-visible:outline-none focus-visible:ring-0 text-sm border rounded-md focus:outline-none min-h-[420px]'
                onChange={() => { console.log(editor.content) }}
            />
        </div>

    )
}
