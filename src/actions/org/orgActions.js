'use server'
//import useAuth from "@/hooks/useAuth"
//import { db } from "@/lib/db"

export async function getServerInfo() {
    try {
        console.log('getServerInfo server action')
        const cookieValue = JSON.parse(cookie?.value)
        const userId = cookieValue.id
        //const { userId } = await useAuth()

        // const server = await db.server.findFirst({
        //     where: {
        //         userId
        //     }
        // })

        // const servers = await db.server.findMany({
        //     where: {
        //         userId
        //     }
        // })

        return { servers: 'servers', server: 'server' };

    } catch (error) {
        return ({ error: error });
    }
}