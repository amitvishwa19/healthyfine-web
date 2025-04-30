'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { v4 as uuidv4 } from 'uuid'
import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/db";
import { includes, orderBy } from "lodash";
import { slugify } from "@/utils/functions";


const ContactForm = z.object({
    name: z.optional(z.string()),
    company: z.optional(z.string()),
    email: z.optional(z.string()),
    phone: z.optional(z.string()),
    messahe: z.optional(z.string()),
});

const handler = async (data) => {
    const { userId } = await useAuth()
    const { name, company, email, phone, message } = data;

    try {

        const inquiry = await db.contactForm.create({
            data
        })


    } catch (error) {
        console.log(error)
        return {
            error: "Failed to create content"
        }
    }


    return { data: { result: 'contents' } };

}


export const contactForm = createSafeAction(ContactForm, handler);