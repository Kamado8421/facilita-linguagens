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


    } catch (error) {
        console.error("Erro no Cadastro de usuário ->", error);
        return { message: "Ocorreu um erro inesperado, tente novamente mais tarde.", success: false };
    }
}