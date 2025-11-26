"use server";

import prisma from "@/src/lib/prisma";

export async function createTextAction(_prevState: unknown, formData: FormData) {
  try {
    const title = formData.get("title")?.toString().trim();
    const content = formData.get("content")?.toString().trim();
    const author = formData.get("author")?.toString().trim();
    const textualGenreId = formData.get("textualGenreId")?.toString();

    const statement = formData.get("statement")?.toString().trim();
    const alternativeA = formData.get("alternativeA")?.toString().trim();
    const alternativeB = formData.get("alternativeB")?.toString().trim();
    const correctAlternative = formData.get("correctAlternative")?.toString();

    if (!title || !content || !textualGenreId || !alternativeA || !alternativeB || !correctAlternative || !statement) {
      return { success: false, message: "Preencha todos os campos obrigatórios." };
    }

    if (correctAlternative !== "a" && correctAlternative !== "b") {
      return { success: false, message: "A alternativa correta deve ser 'a' ou 'b'." };
    }

    await prisma.text.create({
      data: {
        title,
        content,
        author: author || null,
        textualGenreId,
        question: {
          create: {
            alternativeA,
            alternativeB,
            statement,
            correctAlternative, // enum
          },
        },
      },
    });

    return { success: true, message: "Texto e questão criados com sucesso!" };
  } catch (error) {
    console.error("Erro ao criar o texto:", error);
    return { success: false, message: "Erro ao criar o texto." };
  }
}

