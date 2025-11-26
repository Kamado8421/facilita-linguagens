'use server';
import { auth } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";
import { getUnreadTexts } from "@/src/app/api/reading/route";

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

        const session = await auth();

        const gameMatch = await prisma.gameMatch.findFirst({
            where: {
                id: gameMatchId
            }
        });

        if (!gameMatch) {
            throw new Error('INVALID_GAME_MATCH_FOR_UPDATE');
        }

        await prisma.textRead.upsert({
            where: {
                userId_textId: {
                    userId: session?.user.id!,
                    textId: gameMatch.idText
                }
            },
            update: {},
            create: {
                textId: gameMatch.idText,
                userId: session?.user.id!
            },
        })

        /*const texts = await prisma.text.findMany({
            where: { textualGenreId: gameMatch.idTextualGenre },
            select: { id: true },
        });*/
        const texts = await getUnreadTexts({genreId:gameMatch.idTextualGenre,userId:session?.user.id!});

        if (texts.length === 0) {
            return { success: false, finish: true };
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
       // await fetchFinishReading(gameMatchId, 0);                       
        return { success: false, finish: true };
    }
}

export async function fetchFinishReading(gameMatchId: string, userXp: number, seconds: number) {
    try {
        await fetchDeleteGameMatch(gameMatchId);
        const session = await auth();

        const user = await prisma.user.findUnique({
            where: {
                id: session?.user.id
            }
        })

        if (!user) throw new Error('Erro ao dá pontuação ao usuário.')

        const xp = user.xp + userXp;

        const userUpdated = await prisma.user.update({
            where: {
                id: user.id
            },
            data: { xp }
        })
        await prisma.insights.update({
            where: { userId: userUpdated.id},
            data: {
                readingTimeSeconds: {
                    increment: seconds 
                }
            }
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

export async function fetchQuestionText(gameMatchId: string) {
    try {

        const gameMatch = await prisma.gameMatch.findFirst({
            where: {
                id: gameMatchId
            }
        });

        const question = await prisma.question.findFirst({
            where: {
                textId: gameMatch?.idText
            }
        })

        if (!gameMatch || !question) {
            throw new Error('Erro ao buscar questões')
        }

        return { success: true, question }


    } catch (error) {
        console.log('Erro ao buscar questões das perguntas', error);
        return { success: false };
    }
}


export async function addTextReaded(genreId: string, answerOk: boolean) {
    const session = await auth();

    if (!session?.user?.id) {
        return { success: false, error: "Usuário não autenticado" };
    }

    try {
        const userId = session.user.id;

        await prisma.insights.upsert({
            where: { userId },
            create: {
                userId,
                totalTextRead: 1,
            },
            update: {
                totalTextRead: {
                    increment: 1,
                },
                correctAnswers: {
                    increment: answerOk ? 1 : 0
                }
            }
        });

        await prisma.insightsGenres.upsert({
            where: {
                userId_genreId: {
                    userId,
                    genreId,
                }
            },
            create: {
                userId,
                genreId,
                totalTextRead: 1,
            },
            update: {
                totalTextRead: {
                    increment: 1
                }
            }
        });

        return { success: true };

    } catch (error) {
        console.error("Erro ao adicionar total de texto", error);
        return { success: false };
    }
}
