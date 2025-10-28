import { PLATAFORM_SECRET_KEY } from "@/src/constants";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const PLATAFORM_KEY = query.get('key');

    if(PLATAFORM_KEY !== PLATAFORM_SECRET_KEY){
        return Response.json({message: 'Acesso Negado'}, {status: 400})
    }

    // Vamos botar a lógica de ranqueamento pra entregar a lista para o front-end
    /*
        vai ser simples, só retornar uma lista de uma lista/array de objetos do tipo:
        
        [
            {
                username: string,
                id: string,
                xp: number
            },
        ] 

        a lista deve ser ordenada do maior xp para o menor.
        Vamos ter que adicionar uns usuários fakes no banco pra testar.
    */


    return Response.json({message: 'Ranking...'}, {status: 200})
}