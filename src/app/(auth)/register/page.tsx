'use client';
import TopAuth from "@/src/components/top-auth";
import {CircleUserRound} from "lucide-react";

export default function RegisterPage() {
    return (
        <div className = "h-auto w-full bg-gradient-to-r from-[hsl(209,61%,45%)] to-[#4390d8] min-h-auto max-h-auto min-w-auto max-w-auto ">
            <TopAuth/>
            <form action="" method="post" style={{marginBottom:70}} className=" mb-94 bg-gray-50 h-auto mx-76 my-0.5 border-3 border-blue-500 border-double rounded-2xl">
                <header className=" flex  flex-col justify-center items-center mt-8" >
                    <CircleUserRound  color="#4390D8" size={80}/>
                    <h1 className="font-bold text-blue-500 text-3xl" >
                        Crie sua conta
                    </h1>
                </header>

                <section className=" flex  flex-col justify-center items-center">

                    <ul className="text-black ">
                        <li className="bg-gray-300 w-86 p-2 flex justify my-3">
                            <button>
                                <input type="text" placeholder="Crie um nome de usuário"/>
                            </button>
                        </li>
                        <li className="bg-gray-300 w-86 p-2 flex justify my-3">
                            <button>
                                <input type="text" placeholder="Primeiro nome"/>
                            </button>
                        </li>
                        <li className="bg-gray-300 w-86 p-2 flex justify my-3">
                            <button>
                                <input type="text" placeholder="Sobrenome"/>
                            </button>
                        </li>
                        <li className="bg-gray-300 w-86 p-2 flex justify my-3">
                            <button>
                                <input type="password" name="Password-Create" id="password-Create" placeholder="Crie sua senha"/>
                            </button>
                        </li>
                        <li className="bg-gray-300 w-86 p-2 flex justify my-3">
                            <button>
                                <input type="password" name="Password-Confirm" id="Password-Confirm" placeholder="Confirme sua senha"/>
                            </button>
                        </li>
                    </ul>
                    
                    <footer className=" bg-white w-full grid text-center py-4 rounded-b-2xl">

                        <button className="bg-blue-500 mx-51 p-2 font-bold text-white rounded-2xl mb-2" >
                            <input type="submit" value="Cadastrar-me" />
                        </button>

                        <a href="">
                            Já possui uma conta?
                        </a>
                        <a href="" className=" text-blue-500 font-bold mt-2 underline">
                            Entrar em minha conta
                        </a>
                    </footer>

                </section>
            </form><br/>
        </div>
       
    )
}