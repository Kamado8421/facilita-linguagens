'use server';

import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";

export async function fetchGenreProgress({ totalQuestions }: { totalQuestions: number }) {
    try {
        const session = await auth();

        if (!session?.user) {
            return { success: false };
        }

        const infoGenre = await prisma.insightsGenres.findMany({
            where: { userId: session.user.id },
            select: {
                genreId: true,
                totalTextRead: true
            }
        });

        if (infoGenre.length === 0) return { success: true, data: [] };

        const genreIds = infoGenre.map(g => g.genreId);

        const genres = await prisma.textualGenre.findMany({
            where: { id: { in: genreIds } },
        });

        const genreMap = new Map(genres.map(g => [g.id, g.name]));

        const data = infoGenre.map(ig => ({
            id: ig.genreId,
            genreName: genreMap.get(ig.genreId) ?? "Gênero Indisponível",
            percentage: totalQuestions > 0
                ? parseInt(`${(ig.totalTextRead / totalQuestions) * 100}`)
                : 0

        }));

        return { success: true, data };

    } catch (error) {
        console.error("Erro ao buscar progresso de gênero:", error);
        return { success: false };
    }
}
