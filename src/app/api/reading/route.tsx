// import { PLATAFORM_SECRET_KEY } from "@/src/constants";
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/src/lib/prisma";
// //import { promises as fs } from "fs";
// import path from "path";

// interface Texto {
//     id: string;
//     genreId: string;
//     title: string;
//     content?: string;
// }

// let textosCache: Texto[] | null = null;

// async function loadTextos(): Promise<Texto[] | null> {
//     if (textosCache) return textosCache;

//     const filePath = path.join(__dirname, "texts.json");
//     textosCache = [
//         {
//             id: "1-conto",
//             title: "Texto de Conto 1",
//             content: "Este é o conteúdo do texto de exemplo 1.",
//             genreId: "conto-id"
//         },
//         {
//             id: "2-conto",
//             title: "Texto de Conto 2",
//             content: "Este é o conteúdo do texto de exemplo 2.",
//             genreId: "conto-id"
//         },
//         {
//             id: "1-romance",
//             title: "Texto de romance 1",
//             content: "Este é o conteúdo do texto de exemplo 1.",
//             genreId: "romance-id"
//         },
//         {
//             id: "2-romance",
//             title: "Texto de romance 2",
//             content: "Este é o conteúdo do texto de exemplo 2.",
//             genreId: "romance-id"
//         },
//         {
//             id: "3-romance",
//             title: "Texto de Jornalismo 3",
//             content: "Este é o conteúdo do texto de exemplo 3.",
//             genreId: "romance-id"
//         }
//     ];

//     return textosCache;
// }

// export async function POST(req: NextRequest) {
//     try {
//         const { key, typeText } = await req.json();

//         // 🔐 Verificação de chave secreta
//         if (typeof key !== "string" || key !== PLATAFORM_SECRET_KEY) {
//             return NextResponse.json({ message: "Acesso negado" }, { status: 401 });
//         }

//         if (!typeText || typeof typeText !== "string") {
//             return NextResponse.json({ message: "Parâmetro inválido" }, { status: 400 });
//         }

//         const textos = await loadTextos();
//         let gameMatch = null;

//         if (typeText === "random") {
//             const genres = await prisma.textualGenre.findMany({
//                 select: { id: true },
//             });

//             if (genres.length === 0) {
//                 return NextResponse.json({ message: "Nenhum gênero disponível" }, { status: 404 });
//             }

//             const randomGenre = genres[Math.floor(Math.random() * genres.length)];
//             const listTexts = textos!.filter((t) => t.genreId === randomGenre.id);

//             if (listTexts.length === 0) {
//                 return NextResponse.json({ message: "Nenhum texto encontrado para o gênero" }, { status: 404 });
//             }

//             const randomText = listTexts[Math.floor(Math.random() * listTexts.length)];

//             gameMatch = await prisma.gameMatch.create({
//                 data: {
//                     idTextualGenre: randomGenre.id,
//                     idText: randomText.id,
//                 }
//             });
//         } else {
//             const textualGenre = await prisma.textualGenre.findUnique({
//                 where: { id: typeText },
//                 select: { id: true },
//             });

//             if (!textualGenre) {
//                 return NextResponse.json({ message: "Gênero não encontrado" }, { status: 404 });
//             }

//             const listTexts = textos!.filter((t) => t.genreId === textualGenre.id);

//             if (listTexts.length === 0) {
//                 return NextResponse.json({ message: "Nenhum texto encontrado para o gênero" }, { status: 404 });
//             }

//             const randomText = listTexts[Math.floor(Math.random() * listTexts.length)];

//             gameMatch = await prisma.gameMatch.create({
//                 data: {
//                     idTextualGenre: textualGenre.id,
//                     idText: randomText.id,
//                 },
//                 select: { id: true, idTextualGenre: true, idText: true },
//             });
//         }

//         return NextResponse.json(gameMatch, { status: 200 });
//     } catch (error) {
//         console.error("Erro no endpoint /gameMatch:", error);
//         return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
//     }
// }

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


