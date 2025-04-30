import React from 'react'
import { resend } from '@/lib/resend'
import { Button, Html } from "@react-email/components";




export async function SendMail(type, email) {
    try {
        if (type === 'addUser') {


            await resend.emails.send({
                from: 'Devlomatix <noreply@devlomatix.online>',
                to: email,
                subject: 'Hello world from resend',
                react: NewUser
            });


        }


        if (type === 'deleteUser') {
            await resend.emails.send({
                from: 'Devlomatix <noreply@devlomatix.online>',
                to: [email],
                subject: 'Dear User you are removed form Devlomatix',
                react: <NewUser />
            });
        }











    } catch (error) {
        console.log(error)
    }


}




function NewUser() {
    return (
        <Html>
            New User Added
        </Html>
    );
}