'use server'
export const slugify = (str) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}



import { put } from '@vercel/blob'
export async function fileToUrl(files) {
    let formData = new FormData()
    formData.append("file", files)
    const file = formData.get("file");


    console.log('file', file)

    // const blob = await put('files.name', formData.get('file'), {
    //     access: 'public'
    // })

    //console.log('blob', blob.url)

    //console.log(formData)

    return 'url'
}