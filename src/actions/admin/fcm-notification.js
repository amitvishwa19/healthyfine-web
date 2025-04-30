'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { v4 as uuidv4 } from 'uuid'
import { MemberRole } from "@prisma/client";
import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/db";
import { includes } from "lodash";
import { SendMail } from "@/app/(workspace)/workspace/[orgId]/(admin)/(management)/user/SendMail";
import { FcmNotify } from "@/utils/fcm";


const FcmNotification = z.object({
    token: z.string(),
    title: z.string(),
    body: z.optional(z.string()),
});

const handler = async (data) => {
    const { userId } = await useAuth()
    const { token, title, body } = data;
    let users


    try {

        const message = {
            "title": title,
            "body": body,
            //    "icon": "https://example.com/icon.png",
        }
        const data = {
            channelId: "38",
            channelName: "devlomatix",
            soundName: "raw",
            message: 'message',
            screen: 'Notification',
        }

        console.log('Sending Notification fcm-notification action')

        await FcmNotify(token, message, data)


    } catch (error) {
        console.log(error)
        return {
            error: "Failed to send fcm notification"
        }
    }

    //revalidatePath(`/org//${server.id}`)
    return { data: 'Notification sent' };

}


export const fcmNotification = createSafeAction(FcmNotification, handler);