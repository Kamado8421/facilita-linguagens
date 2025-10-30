'use client';

import TopAuth from "@/src/components/top-auth";
import { CircleUserRound } from "lucide-react";
import { useActionState } from "react";
import registerAction from "./registerAction";
import SuperScreen from "@/src/components/super-screen";

export default function Register() {
  const [state, formAction, isPending] = useActionState(registerAction, {
    message: "",
    success: false,
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[hsl(209,61%,45%)] to-[#4390d8] py-4 sm:py-8">
      <TopAuth />

      <form
        action={formAction}
        method="post"
        className="bg-gray-50 h-auto mx-4 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-86 my-4 sm:my-8 border-3 border-blue-500 border-double rounded-2xl"
      >
        <header className="flex flex-col justify-center items-center mt-6 sm:mt-8">
          <CircleUserRound
            color="#4390D8"
            size={80}
            className="w-14 h-14 sm:w-20 sm:h-20"
          />
          <h1 className="font-bold text-blue-500 text-xl sm:text-3xl mt-4 text-center px-2">
            Crie sua conta
          </h1>
        </header>

        <section className="flex flex-col justify-center items-center px-3 sm:px-8">
          <ul className="text-black w-full">
            <li className="bg-gray-300 w-72 sm:w-86 p-3 sm:p-2 flex justify my-3 mx-auto">
              <input
                type="text"
                name="username"
                placeholder="Crie um nome de usuário"
                required
                className="w-full bg-transparent outline-none"
              />
            </li>
            <li className="bg-gray-300 w-72 sm:w-86 p-3 sm:p-2 flex justify my-3 mx-auto">
              <input
                type="text"
                name="firstName"
                placeholder="Primeiro nome"
                required
                className="w-full bg-transparent outline-none"
              />
            </li>
            <li className="bg-gray-300 w-72 sm:w-86 p-3 sm:p-2 flex justify my-3 mx-auto">
              <input
                type="text"
                name="lastName"
                placeholder="Sobrenome"
                required
                className="w-full bg-transparent outline-none"
              />
            </li>
            <li className="bg-gray-300 w-72 sm:w-86 p-3 sm:p-2 flex justify my-3 mx-auto">
              <input
                type="password"
                name="password"
                placeholder="Crie sua senha"
                required
                minLength={6}
                className="w-full bg-transparent outline-none"
              />
            </li>
            <li className="bg-gray-300 w-72 sm:w-86 p-3 sm:p-2 flex justify my-3 mx-auto">
              <input
                type="password"
                name="passwordConfirm"
                placeholder="Confirme sua senha"
                required
                minLength={6}
                className="w-full bg-transparent outline-none"
              />
            </li>
          </ul>

          {/* Mensagens de erro/sucesso */}
          {state?.message && (
            <p
              className={`text-center text-sm sm:text-base mt-2 font-medium ${
                state.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {state.message}
            </p>
          )}

          {state.success && (
            <SuperScreen>
                <h1 className="text-white text-3xl font-bold">Parabéns!!</h1>
                <br />
                <span className="text-white">Você acaba de criar sua conta no <strong>Facilita Linguagens</strong></span>
                <br />
                <a href="/login" className="p-2 pl-3 pr-3 bg-blue-600 text-white font-semibold rounded-md">Clique aqui e entre nela</a>
            </SuperScreen>
          )}

          <footer className="bg-white w-full text-center py-4 sm:py-6 rounded-t-2xl grid mt-4">
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isPending}
                className="bg-blue-500 w-72 sm:w-86 p-3 sm:p-2 font-bold text-white rounded-2xl mb-2 hover:bg-blue-600 disabled:opacity-50"
              >
                {isPending ? "Cadastrando..." : "Cadastrar-me"}
              </button>
            </div>

            <a href="/login" target="_self" className="text-xs sm:text-base">
              Já possui uma conta?
            </a>
            <a
              href="/login"
              target="_self"
              className="text-blue-500 font-bold mt-2 underline text-xs sm:text-base"
            >
              Entrar em minha conta
            </a>
          </footer>
        </section>
      </form>
    </div>
  );
}
