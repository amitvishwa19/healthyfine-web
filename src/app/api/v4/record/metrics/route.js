import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { decrypt } from "@/lib/auth";
import { db } from "@/lib/db";
import { orderBy } from "lodash";

export async function GET(req, { params }) {

    try {

        console.log('Health Metics data')
        const headersList = headers()
        const accessToken = headersList.get('Authorization')
        const { userId } = await decrypt(accessToken)
        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) return NextResponse.json({ status: 401, message: 'Unauthorized access' })


        const records = await db.healthMetric.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                date: 'desc'
            }
        })

        const items = await db.healthMetricItem.findMany({
            orderBy: {
                order: 'asc'
            }
        })

        //console.log(items)


        return NextResponse.json({ status: 200, records: records, items: items })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, message: 'Internal Error', user: null })
    }
}

export async function POST(req, { params }) {

    try {

        const headersList = headers()
        const accessToken = headersList.get('Authorization')
        const payload = await req.json();
        const { val1, val2, val3, val4 } = payload
        console.log('Add Record', payload)

        const { userId } = await decrypt(accessToken)
        const user = await db.user.findUnique({ where: { id: userId } })

        if (!user) return NextResponse.json({ status: 401, message: 'Unauthorized access' })

        const record = await db.healthMetric.create({
            data: {
                userId: userId,
                healthMetricItemId: payload.item.id,
                title: payload.item.title,
                slug: payload.item.slug,
                suffix: payload.item.suffix,
                val1: payload.data.val1,
                val2: payload.data.val2,
                val3: payload.data.val3,
                val4: payload.data.val4,
                date: payload?.data?.timestamp
            }
        })






        return NextResponse.json({ status: 200, record: record })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, message: 'Internal Error' })
    }
}