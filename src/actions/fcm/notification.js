// 'use server'
// import { z } from "zod";
// import { createSafeAction } from "@/utils/CreateSafeAction";
// import { db } from "@/lib/db";
// import { google } from 'googleapis'

// const FcmNotification = z.object({
//     msg: z.string(),
// });

// const handler = async (data) => {

//     try {
//         const serviceAccount = require('../../../fcm_service_account.json')
//         var MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
//         var SCOPES = [MESSAGING_SCOPE];
//         var access_token;

//         console.log('Sending Notification')


//         var jwtClient = new google.auth.JWT(
//             serviceAccount.client_email,
//             null,
//             serviceAccount.private_key,
//             SCOPES,
//             null
//         );

//         jwtClient.authorize(function (err, tokens) {
//             if (err) {
//                 reject(err);
//                 return;
//             }

//             const token = tokens.access_token


//             console.log(token)
//             //return tokens
//         });


//     } catch (error) {
//         console.log(error.message)
//         return {
//             error: "Fail to send notification"
//         }
//     }

//     //revalidatePath('/')
//     return { data: 'Notification sent' };

// }


// export const fcmNotification = createSafeAction(FcmNotification, handler);