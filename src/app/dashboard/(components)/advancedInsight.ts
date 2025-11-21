'use server';

import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";

export async function fetchPerformanceData() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return {
                success: false,
                message: "Usuário não autenticado."
            };
        }

        const insight = await prisma.insights.findFirst({
            where: { userId: session.user.id }
        });

        if (!insight) {
            return {
                success: true,
                data: {
                    totalQuestions: 0,
                    totalCorrectAnswers: 0,
                    percentageCorrectAnswers: 0,
                    percentageErrors: 0,
                }
            };
        }

        const totalQuestions = insight.totalTextRead ?? 0;
        const totalCorrectAnswers = insight.correctAnswers ?? 0;

        const percentageCorrectAnswers =
            totalQuestions > 0
                ? Number(((totalCorrectAnswers / totalQuestions) * 100).toFixed(2))
                : 0;

        const percentageErrors =
            totalQuestions > 0
                ? Number((100 - percentageCorrectAnswers).toFixed(2))
                : 0;

        return {
            success: true,
            data: {
                totalQuestions,
                totalCorrectAnswers,
                percentageCorrectAnswers,
                percentageErrors
            }
        };

    } catch (error) {
        console.error("Erro no fetchPerformanceData():", error);

        return {
            success: false,
            message: "Erro ao buscar dados de performance.",
        };
    }
}
