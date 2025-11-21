'use server';

import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";

export async function fetchSimpleInsight() {

    try {
        const session = await auth();

        const data = await prisma.insights.findUnique({
            where: {
                userId: session?.user.id
            }
        });

        const countGenerExprore = await prisma.insightsGenres.count({
            where: {
                userId: session?.user.id
            }
        });

        return {
            data,
            countGenerExprore,
            success: true
        }
    } catch (error) {
        console.log('Erro ao buscar insits', error);
        return { success: false }
    }


}