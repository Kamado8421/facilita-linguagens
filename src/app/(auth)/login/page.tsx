'use client';

import TopAuth from "@/src/components/top-auth";
import { CircleUserRound } from "lucide-react";
import { useActionState, useEffect } from "react";
import loginAction from "./loginAction";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username')

  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    message: "",
  });

  // Redireciona se o login for bem-sucedido
  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        router.push("/dashboard"); // ajuste para onde quiser levar o usuário
      }, 1200);
    }
  }, [state.success, router]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#1B70E2] to-[#3C7998] py-4 sm:py-8">
      <TopAuth />

      <form
        action={formAction}
        method="POST"
        className="bg-gray-50 h-auto mx-4 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-86 my-4 sm:my-8 border-3 border-blue-500 border-double rounded-2xl"
      >
        <header className="flex flex-col justify-center items-center mt-6 sm:mt-8">
          <CircleUserRound
            color="#4390D8"
            size={80}
            className="w-14 h-14 sm:w-20 sm:h-20"
          />
          <h1 className="font-bold text-blue-500 text-xl sm:text-3xl mt-4 text-center px-2">
            Entrar na conta
          </h1>
        </header>

        <section className="flex flex-col justify-center items-center px-3 sm:px-8">
          <ul className="text-black w-full">
            <li className="bg-gray-300 w-72 sm:w-86 p-3 sm:p-2 flex justify my-3 mx-auto">
              <input
                type="text"
                name="username"
                defaultValue={username || ''}
                placeholder="Nome de usuário"
                required
                className="w-full bg-transparent outline-none"
              />
            </li>
            <li className="bg-gray-300 w-72 sm:w-86 p-3 sm:p-2 flex justify my-3 mx-auto">
              <input
                type="password"
                name="password"
                placeholder="Sua senha"
                required
                className="w-full bg-transparent outline-none"
              />
            </li>
          </ul>

          {/* Mensagem de erro/sucesso */}
          {state.message && (
            <p
              className={`text-center text-sm sm:text-base mt-2 font-medium ${
                state.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {state.message}
            </p>
          )}

          <footer className="bg-white w-full text-center py-4 sm:py-6 rounded-t-2xl grid mt-4">
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isPending}
                aria-disabled={isPending || state.success}
                className="bg-blue-500 w-72 sm:w-86 p-3 sm:p-2 font-bold text-white rounded-2xl mb-2 hover:bg-blue-600 disabled:opacity-50"
              >
                {isPending ? "Entrando..." : "Entrar"}
              </button>
            </div>

            <a href="/register" className="text-xs sm:text-base">
              Não possui uma conta?
            </a>
            <a
              href="/register"
              className="text-blue-500 font-bold mt-2 underline text-xs sm:text-base"
            >
              Criar minha conta
            </a>
          </footer>
        </section>
      </form>
      <br />
      <br />
    </div>
  );
}
