'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { v4 as uuidv4 } from 'uuid'
import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/db";
import { includes, orderBy } from "lodash";
import { slugify } from "@/utils/functions";


const ContentManagement = z.object({
    id: z.optional(z.string()),
    title: z.optional(z.string()),
    slug: z.optional(z.string()),
    description: z.optional(z.string()),
    body: z.optional(z.string()),
    type: z.string(),
    inputList: z.optional(z.array(z.object({ id: z.optional(z.string()), type: z.string(), title: z.string(), display: z.boolean() })))
});

const handler = async (data) => {
    const { userId } = await useAuth()
    const { id, title, description, type, inputList } = data;
    let contents, content, contentFields

    //console.log(data)

    try {
        //console.log('getting all content-type', type)

        if (type === 'getContents') {
            contents = await db.content.findMany({
                where: { userId },
                include: {
                    contentFields: true
                }
            })
        }


        // const val = await db.content.findMany({
        //     where: { userId },
        //     include: {
        //         contentFields: true
        //     }
        // })


        //console.log(val)


        if (type === 'addContent') {
            content = await db.content.create({
                data: {
                    userId,
                    title,
                    slug: slugify(title),
                    description
                }
            })



            // const contentItem = await db.contentItem.create({
            //     data: {
            //         contentId: content.id,
            //         type: 'text',
            //         key: 'title',
            //         value: title

            //     }
            // })

        }

        if (type === 'editContent') {
            await db.content.update({
                where: { id },
                data: {
                    title,
                    description
                }
            })
            await db.contentField.deleteMany({
                where: {
                    contentId: id,
                },
            })


            console.log('inputList', inputList)

            inputList.forEach(async (item) => {




                await db.contentField.create({
                    data: {
                        contentId: id,
                        type: item.type,
                        title: item.title,
                        display: item.display
                    }
                })



                // if (item.id) {
                //     await db.contentField.update({
                //         where: {
                //             id: item.id,
                //         },
                //         data: {
                //             contentId: id,
                //             type: item.type,
                //             title: item.title,
                //         }
                //     })
                // }
            });



        }

        if (type === 'deleteContent') {
            const deleteContent = await db.content.delete({
                where: {
                    id
                },
            })
        }


        // contents = await db.content.findMany({
        //     where: { userId },
        //     include: {
        //         contentFields: true
        //     }
        // })

    } catch (error) {
        console.log(error)
        return {
            error: "Failed to create content"
        }
    }

    revalidatePath(`/admin//content`)
    return { data: { contents: contents } };

}


export const contentManagement = createSafeAction(ContentManagement, handler);