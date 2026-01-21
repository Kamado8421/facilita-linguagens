'use server';

import { APP_DOMAIN, PLATAFORM_SECRET_KEY } from "@/src/constants";
import RenderRanking from "./render";
import { auth } from "@/src/lib/auth";
import { Zap, ChevronRight } from "lucide-react";

type RankingUser = {
    id: string;
    username: string;
    xp: number;
};

async function fetchRanking(): Promise<RankingUser[]> {
    const url = `${APP_DOMAIN}/api/ranking?key=${PLATAFORM_SECRET_KEY}`
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'Application/json'
        }
    });

    if (!res.ok) return [];
    return await res.json();
}

export default async function RankingPage() {
    const ranking = await fetchRanking();
    const session = await auth();
    const indexRanking = ranking.findIndex((user) => user.id === session?.user.id) + 1;

    return (
        <div className="m-3 sm:m-7 mt-8 sm:mt-6 max-w-5xl mx-auto">
            <header className="mb-16 sm:mb-20">
                <h1 className="text-3xl lg:text-4xl text-black font-bold mb-3">
                    Ranking de Nível 5
                </h1>
                <p className="text-gray-600 text-base sm:text-lg">
                    Veja quem está liderando o ranking da sua patente. Fique por dentro e evolua!
                </p>
            </header>

            {/* Top 3 colocados */}
            <div className="flex justify-center items-end gap-6 sm:gap-10 mb-16 sm:mb-21 pt-7">
                {/* Segundo lugar - PRETA */}
                <div className="relative right-2 sm:right-30 flex flex-col items-center">
                    <div className="bg-gray-100 to-gray-200 w-23 h-23 sm:w-26 sm:h-26 rounded-full flex items-center justify-center border-6 border-gray-300 shadow-lg">
                        <span className="text-gray-700 font-bold text-2xl sm:text-3xl">2º</span>
                    </div>
                    
                    <div className="mb-1.5">
                        <span className="bg-gray-100 text-gray-800 text-sm font-bold px-6 py-1.5 rounded-xl border border-gray-400 relative bottom-5">
                            2º
                        </span>
                    </div>
                    
                    <div className="absolute top-full w-full max-w-[130px] sm:max-w-[150px]">
                        <div className="mb-2 relative bottom-5">
                            <span className="font-bold text-gray-800 text-sm whitespace-nowrap block text-center">
                                Luciano Mendes
                            </span>
                        </div>
                        
                        <div className="relative bottom-6 bg-blue-200 rounded-2xl shadow-sm px-3 py-0.5 border border-blue-500">
                            <div className="flex items-center justify-center gap-1">
                                <Zap className="w-3 h-3 text-blue-600" />
                                <span className="font-bold text-sm text-blue-700">2.375 XP</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Primeiro lugar - OURO  */}
                <div className="relative bottom-7 flex flex-col items-center -mt-3 sm:-mt-6">
                    <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center border-6 border-yellow-300 shadow-lg -mt-1.5">
                        <span className="text-gray-800 font-bold text-2xl sm:text-3xl">1º</span>
                    </div>
                    
                    <div className="mb-1.5">
                        <span className="bg-yellow-100 text-yellow-800 text-sm font-bold px-6 py-1.5 rounded-xl border border-yellow-400 relative bottom-5">
                            1º
                        </span>
                    </div>
                    
                    <div className="absolute top-full w-full max-w-[140px] sm:max-w-[160px] -mt-1">
                        <div className="relative bottom-3 mb-1.5">
                            <span className="font-bold text-gray-900 text-sm whitespace-nowrap block text-center">
                                Lucas Ferreira
                            </span>
                        </div>
                        
                        <div className="relative bottom-4 bg-yellow-200 rounded-2xl shadow-sm px-3 py-0.5 border border-yellow-500">
                            <div className="flex items-center justify-center gap-1">
                                <Zap className="w-3 h-3 text-yellow-600" />
                                <span className="font-bold text-sm text-yellow-800">2.400 XP</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terceiro lugar - BRONZE */}
                <div className="relative left-22 sm:left-30 flex flex-col items-center">
                    <div className="bg-orange-200/75 w-22 h-22 sm:w-26 sm:h-26 rounded-full flex items-center justify-center border-6 border-orange-300 shadow-lg">
                        <span className="text-amber-600 font-bold text-2xl sm:text-3xl">3º</span>
                    </div>
                    
                    <div className="mb-1.5">
                        <span className="bg-amber-100 text-amber-600 text-sm font-bold px-6 py-1.5 rounded-xl border border-amber-700 relative bottom-5">
                            3º
                        </span>
                    </div>
                    
                    <div className="absolute top-full w-full max-w-[130px] sm:max-w-[150px]">
                        <div className="relative bottom-5 mb-2">
                            <span className="font-bold text-gray-800 text-sm whitespace-nowrap block text-center">
                                Maria Luiza
                            </span>
                        </div>
                        
                        <div className="relative bottom-6 bg-blue-200 rounded-2xl shadow-sm px-3 py-0.5 border border-blue-500">
                            <div className="flex items-center justify-center gap-1">
                                <Zap className="w-3 h-3 text-blue-600" />
                                <span className="font-bold text-sm text-blue-700">2.375 XP</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Espaço entre o pódio e a tabela */}
            <div className="mb-12 sm:mb-16"></div>

            {/* TABELA DE OUTROS COLOCADOS */}
            <div className="relative rounded-4xl shadow-sm bg-white border border-gray-500 mb-24">
                <ul className="flex absolute top-0 w-full text-gray-300 bg-gray-50 p-5.5 pb-3.5 border-b border-gray-500 rounded-t-4xl">
                    <li className="font-semibold text-gray-700 text-center flex-1 relative right-7">RANK</li>
                    <li className="font-semibold text-gray-700 text-center flex-1 relative right-10">ESTUDANTE</li>
                    <li className="font-semibold text-gray-700 text-center flex-4">TÍTULO ATUAL</li>
                    <li className="font-semibold text-gray-700 text-center flex-2 relative left-8">PONTUAÇÃO (XP)</li>
                </ul>

                <ul className="mt-18 pb-4 overflow-scroll">
    <li className="flex gap-4 p-4 border-b border-gray-100 items-center">
        <span className="flex-1 text-center font-bold text-lg text-gray-600 relative right-2">4º</span>
        <div className="flex-2 font-medium text-gray-900 flex items-center gap-2 relative right-5">
            <div className="w-11 h-11 rounded-full bg-blue-300 flex items-center justify-center border border-blue-200">
                {/*Imagem do perfil de usuário*/}
            </div>
            <span className="font-semibold text-gray-900">Gabriel Alencar</span>
        </div>
        <div className="flex flex-4 items-center justify-center relative right-15">
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-9 py-1.5 rounded-full border border-blue-300 min-w-[110px] text-center">
                Explorador
            </span>
        </div>
        <div className="flex-2 font-medium text-gray-600 flex items-center justify-center">
            2.100
        </div>
    </li>

    <li className="flex gap-4 p-4 border-b border-gray-100 items-center">
        <span className="flex-1 text-center font-bold text-lg text-gray-600 relative right-2">5º</span>
        <div className="flex-2 font-medium text-gray-900 flex items-center gap-2 relative right-5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-100 to-pink-300 flex items-center justify-center border border-pink-200">
            </div>
            <span className="font-semibold text-gray-900">Maria Fernanda</span>
        </div>
        <div className="flex flex-4 items-center justify-center relative right-15">
            <span className="bg-orange-100 text-orange-700 text-xs font-medium px-11 py-1.5 rounded-full border border-orange-300 min-w-[115px] text-center tracking-wider">
                Mestre
            </span>
        </div>
        <div className="flex-2 font-medium text-gray-600 flex items-center justify-center">
            1.993
        </div>
    </li>

    <li className="flex gap-4 p-4 border-b border-gray-100 items-center">
        <span className="flex-1 text-center font-bold text-lg text-gray-600 relative right-2">6º</span>
        <div className="flex-2 font-medium text-gray-900 flex items-center gap-2 relative right-5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center border border-green-200">
            </div>
            <span className="font-semibold text-gray-900">Carlos Silva</span>
        </div>
        <div className="flex flex-4 items-center justify-center relative right-15">
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-9 py-1.5 rounded-full border border-blue-300 min-w-[115px] text-center">
                Explorador
            </span>
        </div>
        <div className="flex-2 font-medium text-gray-600 flex items-center justify-center">
            1.850
        </div>
    </li>

    <li className="flex gap-4 p-4 border-b border-gray-100 items-center">
        <span className="flex-1 text-center font-bold text-lg text-gray-600 relative right-2">7º</span>
        <div className="flex-2 font-medium text-gray-900 flex items-center gap-2 relative right-5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-100 to-purple-300 flex items-center justify-center border border-purple-200">
            </div>
            <span className="font-semibold text-gray-900">Ana Santos</span>
        </div>
        <div className="flex flex-4 items-center justify-center relative right-15">
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-9 py-1.5 rounded-full border border-blue-300 min-w-[110px] text-center">
                Explorador
            </span>
        </div>
        <div className="flex-2 font-medium text-gray-600 flex items-center justify-center">
            1.750
        </div>
    </li>

    <li className="flex gap-4 p-4 border-b border-gray-100 items-center">
        <span className="flex-1 text-center font-bold text-lg text-gray-600 relative right-2">8º</span>
        <div className="flex-2 font-medium text-gray-900 flex items-center gap-2 relative right-5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-100 to-orange-300 flex items-center justify-center border border-orange-200">
            </div>
            <span className="font-semibold text-gray-900">Pedro Oliveira</span>
        </div>
        <div className="flex flex-4 items-center justify-center relative right-15">
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-9 py-1.5 rounded-full border border-blue-300 min-w-[110px] text-center">
                Explorador
            </span>
        </div>
        <div className="flex-2 font-medium text-gray-600 flex items-center justify-center">
            1.650
        </div>
    </li>

    <li className="flex gap-4 p-4 border-b border-gray-100 items-center">
        <span className="flex-1 text-center font-bold text-lg text-gray-600 relative right-2">9º</span>
        <div className="flex-2 font-medium text-gray-900 flex items-center gap-2 relative right-5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center border border-yellow-200">
            </div>
            <span className="font-semibold text-gray-900">João Pereira</span>
        </div>
        <div className="flex flex-4 items-center justify-center relative right-15">
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-9 py-1.5 rounded-full border border-blue-300 min-w-[110px] text-center">
                Explorador
            </span>
        </div>
        <div className="flex-2 font-medium text-gray-600 flex items-center justify-center">
            1.550
        </div>
    </li>

    <li className="flex gap-4 p-4 items-center">
        <span className="flex-1 text-center font-bold text-lg text-gray-600 relative right-2">10º</span>
        <div className="flex-2 font-medium text-gray-900 flex items-center gap-2 relative right-5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-100 to-red-300 flex items-center justify-center border border-red-200">
            </div>
            <span className="font-semibold text-gray-900">Fernanda Costa</span>
        </div>
        <div className="flex flex-4 items-center justify-center relative right-15">
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-9 py-1.5 rounded-full border border-blue-300 min-w-[110px] text-center">
                Explorador
            </span>
        </div>
        <div className="flex-2 font-medium text-gray-600 flex items-center justify-center">
            1.450
        </div>
    </li>
</ul>
            </div>

            {/*Sua colocação no ranking FIXADO na tela*/}
            <div className="fixed bottom-5 left-55 right-0 z-50">
                <div className="mx-auto max-w-5xl px-4">
                    <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-4xl shadow-xl px-6 py-1">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center min-w-[80px] px-7">
                                <span className="text-white/90 text-xs font-semibold mb-0.5">Sua posição</span>
                                <span className="text-white text-2xl font-bold">2º</span>
                            </div>

                            <div className="h-15 w-px bg-white/30 mx-3"></div>

                            <div className="flex items-center gap-3 flex-1 ml-3">
                                <div className="w-13 h-13 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-sm"></div>
                                
                                <div className="flex-1">
                                    <h3 className="text-white text-base font-bold">
                                        Você (Luciano Mendes)
                                    </h3>
                                    <div className="flex items-center gap-1.5 mt-0.5 text-white text-sm">
                                        <span className="">Explorador</span>
                                        <span>-</span>
                                        <span className="">2.375 XP</span>
                                    </div>
                                </div>
                            </div>

                            {/* Barra de progresso  */}
                            <div className="flex-1 max-w-sm ml-26">
                                <div className="mb-1.5">
                                    <p className="text-white/90 text-sm font-medium">
                                        Faltam <strong>126 XP</strong> para ultrapassar <span>#1°</span>
                                    </p>
                                </div>
                                
                                <div className="w-2/3 h-2.5 bg-black/40 rounded-full overflow-hidden relative left-7">
                                    <div 
                                        className="h-full bg-white rounded-full"
                                        style={{ width: '87%' }}
                                    ></div>
                                </div>
                            </div>

                            <div className="min-w-[160px]">
                                <button className="w-50 bg-white text-blue-600 font-bold py-3 px-6 rounded-3xl shadow-lg flex items-center text-left gap-2 relative">
                                    <span className="text-sm">Iniciar Leitura</span>
                                    <span className="absolute right-2"><ChevronRight/></span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}