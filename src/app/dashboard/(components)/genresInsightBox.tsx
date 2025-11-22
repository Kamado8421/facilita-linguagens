'use client';

import { useEffect, useState } from "react";
import { fetchGenreProgress } from "./genresInsight";

type DataType = {
    id: string;
    genreName: string;
    percentage: number;
}

export default function GenreInsightBox({ totalQuestions }: { totalQuestions: number }) {

    const [data, setData] = useState<DataType[]>([]);
    const [message, setMessage] = useState('Calculando...');

    useEffect(() => {
        (async () => {

            if (totalQuestions < 0) return;

            const res = await fetchGenreProgress({ totalQuestions });

            if (res.success && res.data) {
                setData(res.data);
            } else {
                setMessage('Não foi possível recuperar suas informações.')
            }
        })()
    }, [totalQuestions]);

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center md:text-left">
                Progresso por Gênero
            </h3>
            <span className="text-[14px] text-gray-500">Relação de textos lidos.</span>
            <div className="space-y-4 mt-3 max-h-80 overflow-y-auto">
                {totalQuestions >= 0 && data.map((item) => (
                    <div key={item.id}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700 text-sm md:text-base">{item.genreName}</span>
                            <span className="text-gray-700 font-bold">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${item.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}

                {!data || data.length === 0 && <span>{message}</span>}
            </div>
        </div>
    )
}