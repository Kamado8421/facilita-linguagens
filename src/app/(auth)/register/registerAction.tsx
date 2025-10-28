"use server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";

export default async function registerAction(_prevState: any, formData: FormData) {
    try {

        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const passwordConfirm = formData.get("passwordConfirm") as string;
    
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        if (user) {
            return { message: "Nome de usuário já está em uso.", success: false };
        }
        if (password !== passwordConfirm) {
            return { message: "As senhas não coincidem.", success: false };
        }
        const userCreated = await prisma.user.create({
            data : {
                firstName: firstName + " " + lastName,
                username,
                password: await bcrypt.hash(password, 10),              
            }
        });
        return{ message: "Usuário cadastrado com sucesso!", success: true, user: {...userCreated,password:undefined}  };

    } catch (error) {
        console.error("Erro no Cadastro de usuário ->", error);
        return { message: "Ocorreu um erro inesperado, tente novamente mais tarde.", success: false };
    }
}