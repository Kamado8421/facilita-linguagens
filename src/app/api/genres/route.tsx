import { PLATAFORM_SECRET_KEY } from "@/src/constants";
import prisma from "@/src/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const query = req.nextUrl.searchParams;
        const PLATAFORM_KEY = query.get('key');

        if (PLATAFORM_KEY !== PLATAFORM_SECRET_KEY) {
            return Response.json({ message: 'Acesso Negado' }, { status: 400 });
        }

        const genres = await prisma.textualGenre.findMany();

        return Response.json(genres, { status: 200 });

    } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
        return new Response("Erro interno do servidor", { status: 500 });
    }
}