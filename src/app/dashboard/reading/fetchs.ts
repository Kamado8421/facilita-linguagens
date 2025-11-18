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

export async function fetchUpdateGameMatch(gameMatchId: string) {
    try {
        const gameMatch = await prisma.gameMatch.findFirst({
            where: {
                id: gameMatchId
            }
        });

        if (!gameMatch) {
            throw new Error('INVALID_GAME_MATCH_FOR_UPDATE');
        }

        const texts = await prisma.text.findMany({
            where: { textualGenreId: gameMatch.idTextualGenre },
            select: { id: true },
        });

        if (texts.length === 0) {
            return { success: false };
        }

        const randomText = texts[Math.floor(Math.random() * texts.length)];

        await prisma.gameMatch.update({
            where: {
                id: gameMatch.id
            },
            data: {
                idText: randomText.id
            }
        })

        return { success: true, textId: randomText.id }

    } catch (error) {
        console.log('Erro ao arualizar game match', error);
        return { success: false };
    }
}

export async function fetchFinishReading(gameMatchId: string, userXp: number) {
    try {
        await fetchDeleteGameMatch(gameMatchId);
        const session = await auth();

        console.log('Buscando ID de usuário')
        const user = await prisma.user.findUnique({
            where: {
                id: session?.user.id
            }
        })

        if (!user) throw new Error('Erro ao dá pontuação ao usuário.')

        const xp = user.xp + userXp;

        console.log('Atualizando xp para '+xp)
        const userUpdated = await prisma.user.update({
            where: {
                id: user.id
            },
            data: { xp }
        })

        return {
            success: true,
            xp: userXp
        }
    } catch (error) {
        console.log('Erro ao finalizar game match', error);
        return { success: false };
    }
}