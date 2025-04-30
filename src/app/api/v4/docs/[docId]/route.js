import { NextResponse } from "next/server"
import { headers } from 'next/headers'
import { SignJWT, jwtVerify } from "jose";
import { decrypt } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(req, { params }) {
    try {
        const { docId } = params
        const headersList = headers()
        const accessToken = headersList.get('Authorization')
        const { userId } = await decrypt(accessToken)
        let document

        const user = await db.user.findUnique({
            where: { id: userId },
        })

        if (user) {
            document = await db.document.delete({
                where: { id: docId }
            })

        } else {
            NextResponse.json({ status: 401, message: 'Unauthorized access' })
        }

        //console.log('User from access token', user)


        return NextResponse.json(document)
    } catch (error) {
        return NextResponse.json({ status: 500, message: 'Internal server Error' })
    }
}