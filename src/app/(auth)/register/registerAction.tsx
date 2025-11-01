"use server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { URLS_PROFILE_DEFAULT } from "@/src/constants";

export default async function registerAction(
  _prevState: any,
  formData: FormData
) {
  try {
    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const username = formData.get("username")?.toString().trim();
    const password = formData.get("password")?.toString();
    const passwordConfirm = formData.get("passwordConfirm")?.toString();

    if (!firstName || !lastName || !username || !password || !passwordConfirm) {
      return { message: "Preencha todos os campos.", success: false };
    }

    if (password.length < 6) {
      return {
        message: "A senha deve ter pelo menos 6 caracteres.",
        success: false,
      };
    }

    if (password !== passwordConfirm) {
      return { message: "As senhas não coincidem.", success: false };
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return { message: "Nome de usuário já está em uso.", success: false };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const ulrRandom = URLS_PROFILE_DEFAULT[Math.floor(Math.random() * URLS_PROFILE_DEFAULT.length)];
      
    const userCreated = await prisma.user.create({
      data: {
        profileUrl: ulrRandom,
        firstName: firstName + " " + lastName,
        username,
        password: hashedPassword,
      },
    });

    return {
      message: "Usuário cadastrado com sucesso!",
      success: true,
      user: { ...userCreated, password: undefined },
    };
  } catch (error) {
    console.error("Erro no Cadastro de usuário ->", error);
    return {
      message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
      success: false,
    };
  }
}
