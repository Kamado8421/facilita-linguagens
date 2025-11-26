"use server";

import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";

export async function fetchXp() {
    try {

        const session = await auth();

        if (!session?.user) {
            return { success: false, xp: null }
        }

        const info = await prisma.user.findUnique({
            where: {
                id: session.user.id
            },
            select: { xp: true, firstName: true, profileUrl: true }
        })

        if (!info) {
            return { success: false, xp: null }
        }

        return {
            success: true,
            xp: info.xp,
            firstName: info.firstName,
            image: info.profileUrl
        }
    } catch (error) {
        console.log('Erro ao buscar XP - TOPBAR', error);
        return { success: false, xp: null }
    }
}