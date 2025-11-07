"use server";

import prisma from "@/src/lib/prisma";

export async function createTextAction(_prevState: any, formData: FormData) {
    try {
        const title = formData.get("title")?.toString().trim();
        const content = formData.get("content")?.toString().trim();
        const author = formData.get("author")?.toString().trim();
        const textualGenreId = formData.get("textualGenreId")?.toString();

        if (!title || !content || !textualGenreId) {
            return { success: false, message: "Preencha todos os campos obrigatórios." };
        }

        await prisma.text.create({
            data: {
                title,
                content,
                author: author || null,
                textualGenreId,
            },
        });

        return { success: true, message: "Texto criado com sucesso!" };
    } catch (error) {
        console.error("Erro ao criar o texto:", error);
        return { success: false, message: "Erro ao criar o texto." };
    }
}
