import { PLATAFORM_SECRET_KEY } from "@/src/constants";
import { NextRequest } from "next/server";
import { prisma } from '@/src/lib/prisma';

export async function GET(req: NextRequest) {
   try {
      const query = req.nextUrl.searchParams;
      const PLATAFORM_KEY = query.get('key');

      if (PLATAFORM_KEY !== PLATAFORM_SECRET_KEY) {
         return Response.json({ message: 'Acesso Negado' }, { status: 400 });
      }

      const users = await prisma.user.findMany({
         select: {
            id: true,
            username: true,
            xp: true
         }
      });


      const ranking = users.sort((a: any, b: any) => b.xp - a.xp);

      return Response.json({ ranking: ranking }, { status: 200 });
   } catch (error) {
      console.error("Erro no Ranking ->", error);
      return Response.json({ message: 'Erro interno' }, { status: 500 });
   }
}
