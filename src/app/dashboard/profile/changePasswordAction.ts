'use server'
import {prisma} from "@/src/lib/prisma";
import bcrypt from "bcrypt";

export default async function changePasswordAction(_prevState: any, formData: FormData,userId: string) {
    const password = formData.get("password")?.toString().trim();
    const confirmPassword = formData.get("confirm-password")?.toString().trim();

    if (!password || !confirmPassword) {
        return { success: false, message: "Preencha todos os campos." };
    }

    try { if (password !== confirmPassword) {
            return { success: false, message: "As senhas não coincidem." };
        }
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

    if (!user) {
        return { success: false, message: "Usuário não encontrado." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
        where: { id: userId},
        data: {password: hashedPassword}})


        return { success: true, message: "Senha alterada com sucesso!" };
    } catch (error) {
        console.error("Erro ao trocar a senha:", error);
        return { success: false, message: "Erro ao trocar a senha. Tente novamente mais tarde." };
    }
}
