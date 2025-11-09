"use server";

import prisma from "@/src/lib/prisma";

export async function createGenreAction(_prevState: any, formData: FormData) {
    try {
        const genre = formData.get("genrename")?.toString().trim();

        if (!genre) {
            return { success: false, message: "Preencha todos os campos obrigatórios." };
        }

        await prisma.textualGenre.create({
            data: {
                name: genre
            }
        })

        return { success: true, message: "Gênero criado com sucesso!" };
    } catch (error) {
        console.error("Erro ao criar o Gênero:", error);
        return { success: false, message: "Erro ao criar o Gênero." };
    }
}
