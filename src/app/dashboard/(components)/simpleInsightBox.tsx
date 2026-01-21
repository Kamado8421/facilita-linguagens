'use client';
import { useEffect, useState } from "react";
import { fetchSimpleInsight } from "./simpleInsight";
import { BookOpenCheck, Clock, FileChartColumnIncreasing, ChevronRight} from "lucide-react";

function formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const result = hrs !== 0? `${hrs}h ${mins}m`: `${mins}m ${secs}s`
    return result;
}
export default function SimpleInsightBox() {

    const [totalTextRead, setTotalTextRead] = useState('');
    const [countGenerExprore, setCountGenerExprore] = useState<'' | number>('');
    const [time,setTime] = useState('0h 0m');

    useEffect(() => {
        (async () => {
            const res = await fetchSimpleInsight();

            if (res.success) {
                setTotalTextRead(res.data?.totalTextRead.toString() || '');
                setCountGenerExprore(res.countGenerExprore || '');
                setTime(formatTime(res.data?.readingTimeSeconds || 0));
            }
        })()
    }, []);


    return (

        <section>
            {/* Frequência de leitura Não tem iteratividade ainda*/}
            <div className="mb-12 relative ">
                <h2 className="font-bold left-0 top-0 mb-3 text-xl tracking-tight">Frequência de leituras</h2>
                <div className="font-semibold text-blue-500 absolute right-0 top-0 mb-3 text-lg"> 12/30 dias</div>
                <div className="flex">
                    <span className="w-9 bg-blue-500 h-8  mr-0.5 rounded-l-2xl"></span>
                    <span className="w-9 bg-blue-500 h-8  mr-0.5"></span>
                    <span className="w-9 bg-blue-500 h-8  mr-0.5"></span>
                    <span className="w-9 bg-blue-500 h-8  mr-0.5"></span>
                    <span className="w-9 bg-red-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-red-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-blue-500 h-8  mr-0.5"></span>
                    <span className="w-9 bg-blue-500 h-8  mr-0.5"></span>
                    <span className="w-9 bg-blue-500 h-8  mr-0.5"></span>
                    <span className="w-9 bg-blue-500 h-8  mr-0.5"></span>
                    <span className="w-9 bg-blue-500 h-8  mr-0.5"></span>
                    <span className="w-9 bg-blue-500 h-8  mr-0.5"></span>
                    <span className="w-9 bg-red-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-blue-500 h-8  mr-0.5"></span>
                    <span className="w-9 bg-red-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-blue-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5"></span>
                    <span className="w-9 bg-gray-400 h-8  mr-0.5 rounded-r-2xl "></span>
                   
                </div>
            </div>
            <div className="grid gap-4 sm:gap-8 lg:gap-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center font-semibold mb-8">
            
                <div className="bg-white border-1 border-gray-300 rounded-3xl shadow-md hover:shadow-lg transition flex w-full max-w-sm mx-auto sm:w-68">
                    <div className="border-r-2 border-gray-200">
                        <div className="border-1 text-blue-600 bg-blue-200 m-5 p-3 h-16 w-16 rounded-4xl  ">
                            <BookOpenCheck size={38} strokeWidth={1}/>
                        </div>
                    </div>

                    <div className="border-gray-200 w-full mt-3">
                        <div className="mb-1">Textos lidos</div>
                        <div className="text-black text-4xl mb-1">{totalTextRead || '-'}</div>
                    </div>
                </div>

                <div className="bg-white border-1 border-gray-300 rounded-3xl shadow-md hover:shadow-lg transition flex w-full max-w-sm mx-auto sm:w-68">
                    <div className="border-r-2 border-gray-200">
                        <div className="border-1 text-pink-400 bg-pink-200 m-5 p-3 h-16 w-16 rounded-4xl  ">
                            <Clock size={38} strokeWidth={1}/>
                        </div>
                    </div>

                    <div className="border-gray-200 w-full mt-3">
                        <div className="mb-1">Tempo total</div>
                        <div className="text-black text-3xl mb-1">{time}</div>
                    </div>
                </div> 

                <div className="bg-white border-1 border-gray-300 rounded-3xl shadow-md hover:shadow-lg transition flex w-full max-w-sm mx-auto sm:w-68">
                    <div className="border-r-2 border-gray-200">
                        <div className="border-1 text-orange-600 bg-orange-200 m-5 p-3 h-16 w-16 rounded-4xl  ">
                            <BookOpenCheck size={38} strokeWidth={1}/>
                        </div>
                    </div>
                    <div className="border-gray-200 w-full mt-3">
                        <div className="mb-1">Gêneros Explorados</div>
                        <div className="text-black text-4xl mb-1">{countGenerExprore || '-'}</div>
                    </div>
                </div>
            </div>

            {/*Leituras Recentes e Nível --- Está como div, mas se necessário pode mover este elemento pra outro local e muda-lo para section*/}
            <div className="flex flex-col lg:flex-row gap-6 mb-7">
                <div className="border border-gray-300 rounded-3xl w-full h-full lg:flex-2 shadow-md">
                    <nav className="bg-white rounded-t-xl p-3 mb-1">
                        <div className="flex justify-between items-center">
                            <span className="text-black font-bold text-lg"> Leituras Recentes </span>
                            <span className="text-blue-500 font-medium">
                                <a href="" 
                                target="_self" 
                                className="hover:underline">
                                Ver todas
                                </a>
                            </span>
                        </div>
                    </nav>
                    
                    <div className="bg-white rounded-b-2xl p-5">
                        <ul className="space-y-3">
                            
                            <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 rounded-lg transition-colors">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 border border-blue-300 rounded-full p-2 text-blue-600 bg-blue-100 mr-3 relative bottom-1">
                                            <FileChartColumnIncreasing size={30} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="relative">
                                                <span 
                                                className="font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors cursor-default peer text-md block"
                                                title="O Sapo e o Boi - Fernando Alfredo"
                                                >
                                                O Sapo e o Boi - Fernando Alfredo
                                                </span>
                                                {/* Tooltip */}
                                                <div className="absolute z-50 invisible opacity-0 peer-hover:visible peer-hover:opacity-100 transition-all duration-150 bottom-full left-0 mb-2 w-72 px-3 py-2 bg-gray-800 text-gray-100 rounded-lg shadow-xl text-sm leading-relaxed border border-gray-700">
                                                "O Sapo e o Boi"<br/>
                                                <span className="text-blue-300">Autor: Fernando Alfredo</span>
                                                <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-800"></div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-600 mt-1 block">
                                                <strong>Gênero:</strong> conto
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    {/* Elemento verde - largura usada como referência */}
                                    <div className="bg-green-100 text-xs text-green-700 border border-green-500 rounded-full font-medium px-3 py-1 whitespace-nowrap w-[140px] text-center">
                                        ACERTOU A QUESTÃO
                                    </div>
                                    <a href="" 
                                    target="_self" 
                                    className="text-gray-500 hover:text-gray-700 text-xl p-1">
                                        <ChevronRight size={22} />
                                    </a>
                                </div>
                            </li>

                            <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 rounded-lg transition-colors">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start">
                                <div className="flex-shrink-0 border border-blue-300 rounded-full p-2 text-blue-600 bg-blue-100 mr-3 relative bottom-1">
                                    <FileChartColumnIncreasing size={30} />
                                </div>
                                <div className="min-w-0">
                                    <div className="relative">
                                    <span 
                                        className="font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors cursor-default peer text-md block"
                                        title="O Maquinário - Mariana Brandão"
                                    >
                                        O Maquinário - Mariana Brandão
                                    </span>
                                    <div className="absolute z-50 invisible opacity-0 peer-hover:visible peer-hover:opacity-100 transition-all duration-150 bottom-full left-0 mb-2 w-72 px-3 py-2 bg-gray-800 text-gray-100 rounded-lg shadow-xl text-sm leading-relaxed border border-gray-700">
                                        "O Maquinário"<br/>
                                        <span className="text-blue-300">Autor: Mariana Brandão</span>
                                        <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-800"></div>
                                    </div>
                                    </div>
                                    <span className="text-xs text-gray-600 mt-1 block">
                                    <strong>Gênero:</strong> conto
                                    </span>
                                </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                                <div className="bg-green-100 text-xs text-green-700 border border-green-500 rounded-full font-medium px-3 py-1 whitespace-nowrap w-[140px] text-center">
                                ACERTOU A QUESTÃO
                                </div>
                                <a href="" 
                                target="_self" 
                                className="text-gray-500 hover:text-gray-700 text-xl p-1">
                                <ChevronRight size={22} />
                                </a>
                            </div>
                            </li>

                            <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 rounded-lg transition-colors">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start">
                                <div className="flex-shrink-0 border border-pink-300 rounded-full p-2 text-pink-600 bg-pink-100 mr-3 relative bottom-1">
                                    <FileChartColumnIncreasing size={30} />
                                </div>
                                <div className="min-w-0">
                                    <div className="relative">
                                    <span 
                                        className="font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors cursor-default peer text-md block"
                                        title="Apenas um 'oi' - Raquel Sabrine"
                                    >
                                        Apenas um "oi" - Raquel Sabrine
                                    </span>
                                    <div className="absolute z-50 invisible opacity-0 peer-hover:visible peer-hover:opacity-100 transition-all duration-150 bottom-full left-0 mb-2 w-72 px-3 py-2 bg-gray-800 text-gray-100 rounded-lg shadow-xl text-sm leading-relaxed border border-gray-700">
                                        "Apenas um 'oi'"<br/>
                                        <span className="text-pink-300">Autor: Raquel Sabrine</span>
                                        <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-800"></div>
                                    </div>
                                    </div>
                                    <span className="text-xs text-gray-600 mt-1 block">
                                    <strong>Gênero:</strong> conto
                                    </span>
                                </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                                <div className="bg-red-100 text-xs text-red-700 border border-red-500 rounded-full font-medium px-3 py-1 whitespace-nowrap w-[140px] text-center">
                                ERROU A QUESTÃO
                                </div>
                                <a href="" 
                                target="_self" 
                                className="text-gray-500 hover:text-gray-700 text-xl p-1">
                                <ChevronRight size={22} />
                                </a>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white border border-gray-300 rounded-3xl shadow-md hover:shadow-lg w-full lg:w-96 flex flex-col h-full">
                        <span className="text-black text-md font-extrabold p-8 pl-10 pb-6"> Meu Nível </span>
                    <div className="px-5 pb-4 flex flex-col items-center flex-grow">
                        <div className="relative w-28 h-28 mx-auto mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                            <circle cx="56" cy="56" r="48" stroke="#f3f4f6" strokeWidth="6" fill="transparent" />
                            <circle 
                                cx="56" 
                                cy="56" 
                                r="48" 
                                stroke="#3b82f6" 
                                strokeWidth="12" 
                                fill="transparent" 
                                strokeDasharray="301.44"
                                strokeDashoffset="301.44 - (301.44 * 0.947)"
                                strokeLinecap="round"
                            />
                            </svg>
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-gray-800">5</span>
                                <span className="text-gray-500 text-xs font-semibold tracking-wider mt-1"> NÍVEL </span>
                            </div>
                        </div>
                        
                        <div className="text-center space-y-2 w-full">
                            <div className="text-lg font-bold text-gray-700">
                            5679 / 6000 XP
                            </div>
                            <div className="text-sm text-gray-600">
                            Faltam <span className="font-semibold text-gray-600">321 XP</span> para o nível 6
                            </div>
                        </div>
                    </div>
                    
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-yellow-300 p-4 font-bold text-lg text-center rounded-b-2xl"> BROCHE DE OURO </span>
                </div>
            </div>
        </section>
    );
}