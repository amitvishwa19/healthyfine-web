'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { db } from "@/lib/db";
import useAuth from "@/hooks/useAuth";

const GetOrgData = z.object({
    userId: z.string(),
});

const handler = async (data) => {

    const { userId } = data
    let server
    let servers


    console.log('GetOrgData action', userId)


    try {

        server = await db.server.findFirst({
            where: {
                userId
            },
            include: {
                channels: {
                    include: {
                        messages: true
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                boards: {
                    where: {
                        status: true
                    },
                    include: {
                        lists: {
                            include: {
                                cards: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                members: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        role: "desc",
                    }
                },

            }
        })

        servers = await db.server.findMany({
            where: {
                members: {
                    some: {
                        userId
                    }
                }
            },
            include: {
                channels: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                boards: {
                    where: {
                        status: true
                    },
                    include: {
                        lists: {
                            include: {
                                cards: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                members: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        role: "desc",
                    }
                },

            }
        })

        //console.log('get_org_data-server', server)

        //console.log('get_org_data-all-servers', servers)


    } catch (error) {

        return {
            message: "Failed to fetch servers", error
        }
    }

    //revalidatePath(`/org/${orgId}`)
    return { data: { servers: servers, server: server } };

}


export const getOrgData = createSafeAction(GetOrgData, handler);