'use client';

import { useEffect, useState } from "react";
import { fetchPerformanceData } from "./advancedInsight";
import GenreInsightBox from "./genresInsightBox";

export default function AdvancedInsightBox({ indexRanking }: { indexRanking: number }) {

    const [rightAnswers, setRightAnswers] = useState(0);
    const [errorAnswers, setErrorAnswers] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(-1);

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = rightAnswers / 100;
    const strokeOffset = circumference - (circumference * progress);

    useEffect(() => {
        (async () => {
            const res = await fetchPerformanceData();

            if (!res.success || !res.data) return;

            setRightAnswers(res.data.percentageCorrectAnswers);
            setErrorAnswers(res.data.percentageErrors);
            setTotalQuestions(res.data.totalQuestions);

        })()
    }, []);

    return (
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-md  mx-auto">
            <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">DESEMPENHO</h1>
                        <p className="text-gray-500 mt-2 text-sm md:text-base">
                            Afinidade ao responder questões
                        </p>
                    </div>

                    <div className="relative mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="relative w-32 h-32 md:w-40 md:h-40">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#2b7fff"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeOffset}
                                        transform="rotate(-90 50 50)"
                                        style={{ transition: "stroke-dashoffset 0.6s ease" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl md:text-3xl font-bold text-gray-800">{`${Math.floor(rightAnswers)}`}%</span>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-center text-lg font-semibold text-[#2b7fff]">
                            CONTINUTE A PROGREDIR!
                        </h2>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-[#2b7fff] rounded-md mr-3"></div>
                            <span className="text-sm text-[#2b7fff]">
                                <strong>Acertos:</strong> {rightAnswers}%
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-gray-400 rounded-md mr-3"></div>
                            <span className="text-sm text-gray-700">
                                <strong>Erros:</strong> {errorAnswers}%
                            </span>
                        </div>
                    </div>
                </div>

                <GenreInsightBox totalQuestions={totalQuestions} />

                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Posição no Ranking Geral
                    </h3>
                    <div className="bg-indigo-100 rounded-lg py-6 px-8 mb-6 text-center w-full max-w-[220px]">
                        <span className="text-4xl font-bold text-blue-500">{indexRanking || '-'}°</span>
                    </div>
                    <button className="w-full max-w-[220px] bg-blue-500 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition duration-200">
                        <a href="/dashboard/select-reading" target="_self">Iniciar Leitura</a>
                    </button>
                </div>
            </div>
        </section>
    )
}
