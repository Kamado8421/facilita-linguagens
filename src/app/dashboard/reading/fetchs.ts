'use server';
import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";

export async function fetchValidateGameMatch(gameMatchId: string) {
    try {
        const gameMatch = await prisma.gameMatch.findFirst({
            where: {
                id: gameMatchId
            }
        });

        if (gameMatch) {
            const txt = await prisma.text.findFirst({
                where: {
                    id: gameMatch.idText
                }
            });

            const genre = await prisma.textualGenre.findFirst({
                where: {
                    id: gameMatch.idTextualGenre
                }
            })

            return {
                text: { ...txt },
                genre: genre,
                success: true
            }
        }

        console.log("Game match não encontrado");
        return { success: false };
    } catch (error) {
        console.error("Erro ao validar game match:", error);
        return { success: false };
    }
}

export async function fetchDeleteGameMatch(gameMatchId: string) {
    try {
        await prisma.gameMatch.delete({
            where: {
                id: gameMatchId
            }
        });
        return { success: true };
    } catch (error) {
        console.log('Erro ao deletar game match', error);
        return { success: false };
    }
}

export async function fetchFinishReading(gameMatchId: string){
    try {
        await fetchDeleteGameMatch(gameMatchId);
        const session = await auth();

        const randomXp = Math.floor(Math.random() * (25 - 10 + 1)) + 10;

        const user = await prisma.user.update({
            where: {
                id: session?.user.id!
            }, 
            data: {
                xp: randomXp
            }
        })

        return {
            success: true,
            xp: user.xp
        }
    } catch (error) {
        console.log('Erro ao finalizar game match', error);
        return { success: false };
    }
}