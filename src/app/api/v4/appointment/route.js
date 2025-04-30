import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { MemberRole } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid'
import { headers } from "next/headers";
import { decrypt } from "@/lib/auth";
import { orderBy } from "lodash";
import { data } from "autoprefixer";
import moment from "moment";


export async function GET(req, { params }) {
    try {

        const headersList = headers()
        const accessToken = headersList.get('Authorization')
        const { userId } = await decrypt(accessToken)


        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) return NextResponse.json({ status: 401, message: 'Unauthorized access' })

        const appointments = await db.appointment.findMany({
            where: { patientId: userId },
            include: {
                doctor: true,
                patient: true
            },
            orderBy: {
                updatedAt: 'desc',
            },
        })


        return NextResponse.json({ status: 200, appointments: appointments })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, message: 'Internal server error' })
    }
}

export async function POST(req) {

    try {
        let user
        let appointment

        const headersList = headers()
        const accessToken = headersList.get('Authorization')
        const payload = await req.json();
        const { date, slot, time, note, type, selectedDoctor, patient } = payload.data
        //console.log('payload', payload.data)

        const { userId } = await decrypt(accessToken)
        user = await db.user.findUnique({ where: { id: userId } })

        console.log(userId)

        if (!user) return NextResponse.json({ status: 401, message: 'Unauthorized access' })

        const checkAppointment = await db.appointment.findFirst({
            where: {
                patientId: patient,
                doctorId: selectedDoctor,
                time: time.time,
            }
        })


        //console.log('checkAppointment', checkAppointment)

        if (checkAppointment) return NextResponse.json({ status: 400, message: 'Appointment for this time slot already exists' })



        appointment = await db.appointment.create({
            data: {
                patientId: patient,
                doctorId: selectedDoctor,
                date: new Date(date.date),
                slot: slot.slot,
                note,
                time: time.time,
                type,
                status: 'PENDING',
                uid: Math.floor(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000).toString()
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

        //console.log('appointments', appointments)
        return NextResponse.json({ status: 200, appointment: appointment, 'appointments': appointments })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, message: 'Internal server Error' })
    }
}