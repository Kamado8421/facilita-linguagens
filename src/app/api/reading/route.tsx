import { PLATAFORM_SECRET_KEY } from "@/src/constants";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { key, typeText } = await req.json();

        if (typeof key !== "string" || key !== PLATAFORM_SECRET_KEY) {
            return NextResponse.json({ message: "Acesso negado" }, { status: 401 });
        }

        if (!typeText || typeof typeText !== "string") {
            return NextResponse.json({ message: "Parâmetro inválido" }, { status: 400 });
        }

        let selectedGenreId: string | null = null;
        let selectedTextId: string | null = null;

        if (typeText === "random") {
            const genres = await prisma.textualGenre.findMany({
                select: { id: true },
            });

            if (genres.length === 0) {
                return NextResponse.json({ message: "Nenhum gênero disponível" }, { status: 404 });
            }

            const randomGenre = genres[Math.floor(Math.random() * genres.length)];

            const texts = await prisma.text.findMany({
                where: { textualGenreId: randomGenre.id },
                select: { id: true },
            });

            if (texts.length === 0) {
                return NextResponse.json({ message: "Nenhum texto encontrado para o gênero" }, { status: 404 });
            }

            const randomText = texts[Math.floor(Math.random() * texts.length)];

            selectedGenreId = randomGenre.id;
            selectedTextId = randomText.id;
        } else {
            const genre = await prisma.textualGenre.findUnique({
                where: { id: typeText },
                select: { id: true },
            });

            if (!genre) {
                return NextResponse.json({ message: "Gênero não encontrado" }, { status: 404 });
            }

            const texts = await prisma.text.findMany({
                where: { textualGenreId: genre.id },
                select: { id: true },
            });

            if (texts.length === 0) {
                return NextResponse.json({ message: "Nenhum texto encontrado para o gênero" }, { status: 404 });
            }

            const randomText = texts[Math.floor(Math.random() * texts.length)];

            selectedGenreId = genre.id;
            selectedTextId = randomText.id;
        }

        const gameMatch = await prisma.gameMatch.create({
            data: {
                idTextualGenre: selectedGenreId!,
                idText: selectedTextId!,
            },
            select: { id: true, idTextualGenre: true, idText: true, createdAt: true },
        });

        return NextResponse.json(gameMatch, { status: 201 });
    } catch (error) {
        console.error("Erro no endpoint /gameMatch:", error);
        return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
    }
}


