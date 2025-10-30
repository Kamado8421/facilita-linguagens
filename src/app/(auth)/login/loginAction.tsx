"use server";
import { signIn } from "@/src/lib/auth";

export default async function loginAction(_prevState: any, formData: FormData) {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    return { success: false, message: "Preencha todos os campos." };
  }

  try {
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, message: "Usuário ou senha inválidos" };
    }

    console.log(result);

    return { success: true, message: "Tudo certo! Aguarde..." };
  } catch (err) {
    console.error("Erro no login:", err);
    return { success: false, message: "Usuário ou senha inválidos." };
  }
}
