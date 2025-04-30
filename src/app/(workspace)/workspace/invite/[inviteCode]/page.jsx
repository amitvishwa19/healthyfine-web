'use server'
import useAuth from '@/hooks/useAuth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation'
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/options';



export default async function InviteCodePage({ params }) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.userId;

    console.log('getting session server side', session?.user?.userId)


    if (!userId) {
        return redirect('/')
    }

    if (!params.inviteCode) {
        return redirect("/");
    }




    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    userId: session?.user?.userId
                }
            }
        }
    });

    console.log('existingServer', existingServer)





    if (existingServer) {
        return redirect(`/workspace/${existingServer.id}`);
    }

    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            members: {
                create: [
                    {
                        userId: session?.user?.userId,
                    }
                ]
            }
        }
    });

    //console.log('server', server)

    if (server) {
        return redirect(`/workspace/${server.id}`);
    }


    return null;
}
