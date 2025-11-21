'use server';

import { APP_DOMAIN, PLATAFORM_SECRET_KEY } from "@/src/constants";
import { auth } from "@/src/lib/auth";

export async function fetchIndexRanking() {
    try {
        const session = await auth();

        const url = `${APP_DOMAIN}/api/ranking?key=${PLATAFORM_SECRET_KEY}&userId=${session?.user.id}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const data = await res.json() as { index: number };
            return data;
        }

        return null;
    } catch (error) {
        console.error('Erro ao buscar index de ranking ',error);
        return null;
    }

}