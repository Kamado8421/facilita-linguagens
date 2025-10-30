'use client';
import TopAuth from "@/src/components/top-auth";
import {CircleUserRound} from "lucide-react";

export default function Register() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-[hsl(209,61%,45%)] to-[#4390d8] py-4 sm:py-8">
            <TopAuth/>
            <form action="" method="post" className="bg-gray-50 h-auto mx-4 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-86 my-4 sm:my-8 border-3 border-blue-500 border-double rounded-2xl">
                <header className="flex flex-col justify-center items-center mt-6 sm:mt-8">
                    <CircleUserRound color="#4390D8" size={80} className="w-14 h-14 sm:w-20 sm:h-20" />
                    <h1 className="font-bold text-blue-500 text-xl sm:text-3xl mt-4 text-center px-2">
                        Crie sua conta
                    </h1>
                </header>

                <section className="flex flex-col justify-center items-center px-3 sm:px-8">

                    <ul className="text-black w-full">
                        <li className="bg-gray-300 w-72 sm:w-86 p-3 sm:p-2 flex justify my-3 mx-auto">
                            <button className="w-full">
                                <input  type="text"  placeholder="Crie um nome de usuário" className="w-full bg-transparent outline-none"/>
                            </button>
                        </li>
                        <li className="bg-gray-300 w-72 sm:w-86 p-3 sm:p-2 flex justify my-3 mx-auto">
                            <button className="w-full">
                                <input  type="password"  name="Password-Confirm"  id="Password-Confirm"  placeholder=" Primeiro nome" className="w-full bg-transparent outline-none"/>
                            </button>
                        </li>
                        <li className="bg-gray-300 w-72 sm:w-86 p-3 sm:p-2 flex justify my-3 mx-auto">
                            <button className="w-full">
                                <input  type="password"  name="Password-Confirm"  id="Password-Confirm"  placeholder=" Sobrenome" className="w-full bg-transparent outline-none"/>
                            </button>
                        </li>
                        <li className="bg-gray-300 w-72 sm:w-86 p-3 sm:p-2 flex justify my-3 mx-auto">
                            <button className="w-full">
                                <input  type="password"  name="Password-Confirm"  id="Password-Confirm"  placeholder=" Crie sua senha" className="w-full bg-transparent outline-none"/>
                            </button>
                        </li>
                        <li className="bg-gray-300 w-72 sm:w-86 p-3 sm:p-2 flex justify my-3 mx-auto">
                            <button className="w-full">
                                <input  type="password"  name="Password-Confirm"  id="Password-Confirm"  placeholder=" Confirme sua senha" className="w-full bg-transparent outline-none"/>
                            </button>
                        </li>
                    </ul>
                    
                    <footer className="bg-white w-full text-center py-4 sm:py-6 rounded-t-2xl grid ">

                        <div className="flex justify-center">
                            <button className=" bg-blue-500 w-72 sm:w-86 p-3 sm:p-2 font-bold text-white rounded-2xl mb-2">
                                <input type="submit" value="Cadastrar-me" />
                            </button>
                        </div>

                        <a href="" target="_self" className="text-xs sm:text-base">
                            Já possui uma conta?
                        </a>
                        <a href="" target="_self" className="text-blue-500 font-bold mt-2 underline text-xs sm:text-base">
                            Entrar em minha conta
                        </a>
                    </footer>

                </section>
            </form>
        </div>
    )
}