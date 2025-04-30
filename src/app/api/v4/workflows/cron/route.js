import { db } from "@/lib/db"
import { WORKFLOWSTATUS } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const now = new Date()
        const workflows = await db.workflow.findMany({
            select: { id: true },
            where: {
                status: WORKFLOWSTATUS.PUBLISHED,
                cron: { not: null },
                nextRunAt: { lte: now }
            }
        })

        console.log('@@@@ workflows to run', workflows.length)

        for (const workflow of workflows) {
            triggerWorkflow(workflow.id)
        }

        // return new NextResponse(null, { status: 200 })

        return NextResponse.json({ status: 200, workflowsToRun: workflows.length })
    } catch (error) {
        return NextResponse.json({ status: 500, message: 'Internal server Error', error: error.message })
    }
}

function triggerWorkflow(workflowId) {
    const triggerApiUrl = `${process.env.APP_URL}/api/v4/workflows/execute?workflowId=${workflowId}`

    fetch(triggerApiUrl, {
        headers: {
            Authorization: `Bearer ${process.env.API_SECRET}`
        },
        cache: 'no-store',
        //signal: AbortSignal.timeout(50000)
    }).catch((err) => console.error(`Error trigring workflow with id ${workflowId}`, ':Error=>'.err.message))
}