import { ExecuteWorkflow } from "@/app/(workspace)/workspace/[orgId]/workflow/_actions/executeWorkflow"
import { TaskRegistry } from "@/app/(workspace)/workspace/[orgId]/workflow/lib/tasks/registry"
import { ExecutionPhaseStatus, ExecutionStatus, ExecutionStatusTrigger } from "@/app/(workspace)/workspace/[orgId]/workflow/types/types"
import { db } from "@/lib/db"
import { WORKFLOWSTATUS } from "@prisma/client"
import parser from "cron-parser"
// import { parse } from "next/dist/build/swc"
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        console.log('@@execute')
        const authHeader = req.headers.get('authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' })
        }

        const secret = authHeader.split(' ')[1]



        if (secret !== process.env.API_SECRET) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' })
        }

        const { searchParams } = new URL(req.url)
        const workflowId = searchParams.get('workflowId')

        if (!workflowId) {
            return NextResponse.json({ status: 400, message: 'Bad Request' })
        }

        console.log('@@workflowId', workflowId)



        const workflow = await db.workflow.findUnique({
            where: { id: workflowId }
        })

        //console.log('@@workflow', workflow)

        if (!workflow) {
            return NextResponse.json({ status: 400, message: 'Bad Request' })
        }

        // console.log('@@workflow', workflow)

        const executionPlan = JSON.parse(workflow.executionPlan)


        try {
            const cron = parser.parseExpression(workflow.cron, { utc: true })
            const nextRun = cron.next().toDate()


            console.log('@@nextRun', nextRun)

            const execution = await db.workflowExecution.create({
                data: {
                    workflowId,
                    userId: workflow.userId,
                    definition: workflow.defination,
                    status: ExecutionStatus.PENDING,
                    startedAt: new Date(),
                    trigger: ExecutionStatusTrigger.CRON,
                    phases: {
                        create: executionPlan.flatMap((phase) => {
                            return phase.nodes.flatMap((node) => {
                                return {
                                    userId: workflow.userId,
                                    status: ExecutionPhaseStatus.CREATED,
                                    number: phase.phase,
                                    node: JSON.stringify(node),
                                    name: TaskRegistry[node.data.type].label
                                }
                            })
                        })
                    }
                }
            })

            await ExecuteWorkflow(execution.id, 'cm40zvdfn0000uvq8svpcojzg', 'orgId', workflowId, nextRun)
            return NextResponse.json({ status: 200, message: 'success' })


        } catch (error) {
            return NextResponse.json({ status: 500, message: 'Internal server error' })
        }


    } catch (error) {
        console.log('@@error:', error.message)
        return NextResponse.json({ status: 500, message: 'Internal server Error', error: error.message })
    }
}