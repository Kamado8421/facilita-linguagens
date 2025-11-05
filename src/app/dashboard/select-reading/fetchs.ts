'use server';
import { APP_DOMAIN, PLATAFORM_SECRET_KEY } from "@/src/constants";

export async function fetchGenres() {
  const url = `${APP_DOMAIN}/api/genres?key=${PLATAFORM_SECRET_KEY}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  return [];
}

export async function fetchCreateGameMatch(typeText: 'random' | string) {
  const url = `${APP_DOMAIN}/api/reading`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key: PLATAFORM_SECRET_KEY,
      typeText
    }),
    cache: 'no-store'
  });

  if (response.ok) {
    const data: {
      id: string,
      idText: string,
      idTextualGenre: string,
      createdAt: string | any
    } = await response.json();
    return { success: true, data };
  }

  return { success: false };

}


