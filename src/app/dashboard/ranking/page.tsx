'use server';

import { APP_DOMAIN, PLATAFORM_SECRET_KEY } from "@/src/constants";
import RenderRanking from "./render";
import { auth } from "@/src/lib/auth";

async function fetchRanking() {

    const url = `${APP_DOMAIN}/api/ranking?key=${PLATAFORM_SECRET_KEY}`
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'Application/json'
        }
    });

    if(res.ok){
        return await res.json();
    }
}

export default async function RankingPage() {

    const ranking = await fetchRanking();
    const session = await auth();

    return (
        <div className="m-3 sm:m-7 mt-4 sm:mt-6">
            <header className="mb-4">
                <br />
                <h1 className="text-2xl sm:text-4xl text-blue-500 font-bold mb-3">Ranking Geral</h1>
                <p className="mb-1.5 text-gray-600 text-sm sm:text-base">
                    Mostre o quanto você está empenhado para as outras pessoas. Faça leituras e <br className="hidden sm:block" />
                    conquistes as melhores posições nos rankings
                </p>
            </header>

            <RenderRanking ranking={ranking} userId={session?.user.id!} />
        </div>
    );
}
