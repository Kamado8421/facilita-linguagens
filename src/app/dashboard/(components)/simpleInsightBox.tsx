'use client';
import { useEffect, useState } from "react";
import { fetchSimpleInsight } from "./simpleInsight";
import { BookOpenCheck, Clock } from "lucide-react";

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
            <div className="mb-10 relative ">
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
                    <span className="w-9 bg-gray-400 h-8  mr-0.5 rounded-r-2xl "></span>
                   
                </div>
            </div>
            <div className="grid gap-4 sm:gap-8 lg:gap-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center font-semibold mb-8">
            
                <div className="bg-white rounded-3xl shadow-md hover:shadow-lg transition flex w-full max-w-sm mx-auto sm:w-68">
                    <div className="border-r-2 border-gray-200">
                        <div className="border-1 text-blue-600 bg-blue-200 m-5 p-3 h-16 w-16 rounded-4xl ">
                            <BookOpenCheck size={38} strokeWidth={1}/>
                        </div>
                    </div>

                    <div className="border-gray-200 w-full mt-3">
                        <div className="mb-1">Textos lidos</div>
                        <div className="text-black text-4xl mb-1">{totalTextRead || '-'}</div>
                    </div>
                </div>
                <div className="bg-white rounded-3xl shadow-md hover:shadow-lg transition flex w-full max-w-sm mx-auto sm:w-68">
                    <div className="border-r-2 border-gray-200">
                        <div className="border-1 text-pink-400 bg-pink-200 m-5 p-3 h-16 w-16 rounded-4xl ">
                            <Clock size={38} strokeWidth={1}/>
                        </div>
                    </div>

                    <div className="border-gray-200 w-full mt-3">
                        <div className="mb-1">Tempo total</div>
                        <div className="text-black text-3xl mb-1">{time}</div>
                    </div>
                </div> 
                <div className="bg-white rounded-3xl shadow-md hover:shadow-lg transition flex w-full max-w-sm mx-auto sm:w-68">
                    <div className="border-r-2 border-gray-200">
                        <div className="border-1 text-orange-600 bg-orange-200 m-5 p-3 h-16 w-16 rounded-4xl ">
                            <BookOpenCheck size={38} strokeWidth={1}/>
                        </div>
                    </div>
                    <div className="border-gray-200 w-full mt-3">
                        <div className="mb-1">Gêneros Explorados</div>
                        <div className="text-black text-4xl mb-1">{countGenerExprore || '-'}</div>
                    </div>
                </div>


            </div>
        </section>
    );
}