import { PLATAFORM_SECRET_KEY } from "@/src/constants";
import { NextRequest } from "next/server";
import { prisma } from '@/src/lib/prisma';

export async function GET(req: NextRequest) {
   try {
      const query = req.nextUrl.searchParams;
      const PLATAFORM_KEY = query.get('key');
      const userId = query.get('userId')

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

      // Ordenar os usuários por XP em ordem decrescente
      const ranking = users.sort((a: any, b: any) => b.xp - a.xp);


      if (userId) {
         const user = await prisma.user.findFirst({
            where: {
               id: userId
            }
         });

         if (user) {
            return Response.json({
               id: user.id,
               username: user.username,
               xp: user.xp,
               index: ranking.findIndex(u => u.id === userId) + 1
            }, { status: 200 });
         }

         return Response.json({ message: 'User not Found' }, { status: 404 });
      }

      return Response.json(ranking, { status: 200 });
   } catch (error) {
      console.error("Erro no Ranking ->", error);
      return Response.json({ message: 'Erro interno' }, { status: 500 });
   }
}
