import { PLATAFORM_SECRET_KEY } from "@/src/constants";
import { NextRequest } from "next/server";
import { prisma } from '@/src/lib/prisma';

const textos = [{
    id: '1',
    title: 'Texto de Exemplo 1',
    content: 'Este é o conteúdo do texto de exemplo 1.',
    genreId: ''
}]
export async function POST(req: NextRequest) {
    try {
        const body:{key:string,type:string|'random'} = await req.json();
        const PLATAFORM_KEY = body.key;


        if (PLATAFORM_KEY !== PLATAFORM_SECRET_KEY) {
            return Response.json({ message: 'Acesso Negado' }, { status: 400 });
        }

        if(body.type === 'random'){
            const genres = await prisma.textualGenre.findMany();
            const randomGenre = genres[Math.floor(Math.random()*genres.length)]
            const listTexts = textos.filter(text => text.genreId === randomGenre.id);
            const randomText = listTexts[Math.floor(Math.random()*listTexts.length)];
            const gameMatch = await prisma.gameMatch.create({
                data: {
                    idTextualGenre: randomGenre.id,
                    idText: randomText.id
                }
            })
            return Response.json(gameMatch, { status: 200 }); 
        }

    } catch (error) {
        console.error("Erro de leitura ->", error);
        return Response.json({ message: 'Erro interno' }, { status: 500 });
    }
}
