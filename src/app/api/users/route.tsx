import { NextRequest } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body: {
            firstName: string,
            username: string,
            password: string,
            xp: number,
        } = await req.json();

        const user = await prisma.user.create({
            data: {
                firstName: body.firstName as string,
                username: body.username as string,
                xp: body.xp as number,
                password: body.password as string
            }
        })

        return Response.json(user, { status: 201 });


    } catch (error) {
        console.error('error', error)
        return Response.json({ message: 'ocorreu um erro ao criar o usuário' })
    }
}