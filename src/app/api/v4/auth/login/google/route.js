
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { MemberRole } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid'

export async function POST(req) {

    try {

        console.log('Google Login')

        const secretKey = process.env.APP_SECRET;
        const key = new TextEncoder().encode(secretKey);
        const payload = await req.json();
        const { uid, email, provider, displayName, avatar, location, deviceToken } = payload
        let user
        let server

        console.log(payload)


        user = await db.user.findUnique({
            where: { email: email },
        })



        if (!user) {
            user = await db.user.create({
                data: {
                    uid,
                    email,
                    provider,
                    displayName,
                    avatar,
                    deviceToken,
                    Credit: {
                        create: {
                            value: 0
                        }
                    }
                }
            })

            if (user) {
                server = await db.server.create({
                    data: {
                        userId: user?.id,
                        name: user?.displayName,
                        inviteCode: uuidv4(),
                        selected: true,
                        channels: {
                            create: [{ name: 'general', userId: user?.id }]
                        },
                        members: {
                            create: [
                                {
                                    userId: user?.id,
                                    role: MemberRole.ADMIN
                                }
                            ]
                        }
                    }
                })
            }
        } else {
            user = await db.user.update({
                where: { email: email },
                data: { uid, provider, displayName, avatar, deviceToken }
            })
        }

        const accessToken = await new SignJWT({ userId: user.id }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("24h").sign(key);
        const refreshToken = await new SignJWT({ userId: user.id }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("10d").sign(key);

        user = await db.user.update({
            where: { id: user.id },
            data: { accessToken, refreshToken }
        })

        if (user) {
            const profile = await db.profile.upsert({
                where: { userId: user.id, },
                update: {
                    userId: user.id,
                    type: 'profile',
                    location
                },
                create: {
                    userId: user.id,
                    type: 'profile',
                    location
                },
            })
        }

        user = await db.user.findUnique({
            where: { id: user.id },
            include: {
                roles: {
                    include: {
                        permissions: true
                    }
                },
                servers: {
                    orderBy: {
                        createdAt: "asc",
                    },
                    include: {
                        members: {
                            include: {
                                user: {
                                    include: {
                                        profile: true
                                    }
                                }
                            },
                            orderBy: {
                                role: "asc",
                            }
                        },
                        channels: {
                            orderBy: {
                                createdAt: "asc",
                            },
                        }
                    },
                },
                profile: true
            }
        })

        //console.log(user)


        return NextResponse.json({ status: 200, user: user })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, message: 'Internal Error', user: null })
    }

}