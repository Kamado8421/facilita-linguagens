'use client';

import { useEffect, useState } from "react";
import { fetchIndexRanking } from "./fetchIndexRanking";
import SimpleInsightBox from "./(components)/simpleInsightBox";
import AdvancedInsightBox from "./(components)/advancedInsightBox";

export default function Dashboard() {

  const [indexRanking, setIndexRanking] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchIndexRanking();
      setIndexRanking(data?.index || null);
    })()

  }, []);

  return (
    <div className="min-h-screen">
      <main className="pt-9 px-4 md:px-12">

        <SimpleInsightBox />

        {/* <section className="bg-white rounded-2xl p-6 md:p-8 shadow-md max-w-7xl mx-auto">
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
                        strokeDasharray="283"
                        strokeDashoffset={100}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl md:text-3xl font-bold text-gray-800">80%</span>
                    </div>
                  </div>
                </div>
                <h2 className="text-center text-lg font-semibold text-green-600">
                  Excelente desempenho!
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-md mr-3"></div>
                  <span className="text-sm text-green-700">
                    <strong>Acertos:</strong> 80%
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-400 rounded-md mr-3"></div>
                  <span className="text-sm text-gray-700">
                    <strong>Restante:</strong> 20%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center md:text-left">
                Progresso por Gênero
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Conto", value: 75 },
                  { label: "Crônica", value: 60 },
                  { label: "Fábula", value: 90 },
                  { label: "Artigo de Opinião", value: 45 },
                  { label: "Reportagem", value: 30 },
                  { label: "Carta Argumentativa", value: 20 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-700 text-sm md:text-base">{item.label}</span>
                      <span className="text-gray-700 font-bold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
        </section> */}

        <AdvancedInsightBox indexRanking={indexRanking!}/>

        <div className="h-16" />
      </main>
    </div>
  );
}

