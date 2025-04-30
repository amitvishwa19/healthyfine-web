import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { MemberRole, APPOINTMENTSTATUS } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid'
import { headers } from "next/headers";
import { decrypt } from "@/lib/auth";
import { orderBy } from "lodash";
import { data } from "autoprefixer";


export async function POST(req) {

    try {
        let user


        const headersList = headers()
        const accessToken = headersList.get('Authorization')
        const payload = await req.json();
        const { id, status } = payload.data
        console.log('payload', payload)

        const { userId } = await decrypt(accessToken)
        user = await db.user.findUnique({ where: { id: userId } })

        console.log(userId)

        if (!user) return NextResponse.json({ status: 401, message: 'Unauthorized access' })

        const appointment = await db.appointment.update({
            where: {
                id,
                patientId: userId,
            },
            data: {
                status: 'CANCELLED'
            }
        })



        //console.log('appointment', appointment)

        const appointments = await db.appointment.findMany({
            where: { patientId: user.id },
            include: {
                doctor: true
            },
            orderBy: {
                updatedAt: 'desc',
            },
        })

        console.log('appointments', appointments)
        return NextResponse.json({ status: 200, appointment: appointment, appointments: appointments })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, message: 'Internal server Error' })
    }
}