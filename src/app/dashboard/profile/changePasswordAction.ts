'use server'
import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";

export default async function changePasswordAction(_prevState: any, formData: FormData) {
    const password = formData.get("password")?.toString().trim();
    const confirmPassword = formData.get("confirm-password")?.toString().trim();

    if (!password || !confirmPassword) {
        return { success: false, message: "Preencha todos os campos." };
    }

    try {
        if (password !== confirmPassword) {
            return { success: false, message: "As senhas não coincidem." };
        }

        const session = await auth();

        if (session?.user.id) {
            const user = await prisma.user.findUnique({
                where: { id: session.user.id }
            })

            if (!user) {
                return { success: false, message: "Usuário não encontrado." };
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.update({
                where: { id: session.user.id },
                data: { password: hashedPassword }
            })

            return { success: true, message: "Senha alterada com sucesso!" };
        }

        return { success: false, message: "Seu acesso foi negado para esse serviço." };


    } catch (error) {
        console.error("Erro ao trocar a senha:", error);
        return { success: false, message: "Erro ao trocar a senha. Tente novamente mais tarde." };
    }
}
