'use client';

import DashboardBoxIcon from "@/src/components/dashboard-box-icons";
import MainPageIconBook from "@/src/components/main-page-icon-book";
import MainPageIconClock from "@/src/components/main-page-icon-clock";
import MainPageIconTag from "@/src/components/main-page-icon-tag";
import { DivideSquare } from "lucide-react";

export default function Dashboard() {

  return (
    <div>
      <main className="pt-9 pl-20">
        <section className="flex text-center font-extrabold">
          <div className="bg-white w-70 rounded-2xl m-3 p-4 ">
            <div className="translate-x-22">
              <DashboardBoxIcon icon="book" />
            </div>
            <div className="mb-3">Textos lidos</div>
            <div className="text-blue-700 text-4xl mb-3">24</div>
            <div className="font-normal">Total de textos completos</div>
          </div>

          <div className="bg-white w-70 rounded-2xl m-3 p-4 ">
            <div className="translate-x-21">
              <DashboardBoxIcon icon="clock" />
            </div>
            <div className="mb-3">Tempo de leitura</div>
            <div className="text-blue-800 text-4xl mb-3">18h 22m</div>
            <div className="font-normal">
              Tempo total dedicado à <br />
              leitura
            </div>
          </div>

          <div className="bg-white w-70 rounded-2xl m-3 p-4 ">
            <div className="translate-x-20">
              <DashboardBoxIcon icon="tag" />
            </div>
            <div className="mb-3">Genero Explorado</div>
            <div className="text-blue-700 text-4xl mb-3">7</div>
            <div className="font-normal">
              Diferentes gêneros <br />
              textuais estudados
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl  p-8 max-w-4xl w-full">
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">DESEMPENHO</h1>
                <p className="text-gray-500 mt-2">Afinidade ao responder questões</p>
              </div>

              <div className="relative mb-8">
                <div className="flex justify-center mb-4">
                  <div className="relative w-40 h-40">
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
                        stroke="#4f46e5"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset="56.6"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-gray-800">80%</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-green-600">Excelente desempenho!</h2>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex gap-4 ">
                  <div className="flex items-start justify rounded-lg p-3">
                    <div className="w-8 h-8 bg-green-500 rounded-md mr-4"></div>
                    <div className="text-right">
                      <span className="text-sm text-green-600 mr-1">Acertos:</span>
                      <span className="text-lg font-bold text-green-700">80%</span>
                    </div>
                  </div>

                  <div className="flex items-start justify rounded-lg p-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-md mr-4"></div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600 mr-1">Restante:</span>
                      <span className="text-lg font-bold text-gray-700">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Progresso por Gênero</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">Conto</span>
                    <span className="text-gray-700 font-bold">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-[75%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">Crônica</span>
                    <span className="text-gray-700 font-bold">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-[60%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">Fábula</span>
                    <span className="text-gray-700 font-bold">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-[90%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">Artigo de Opinião</span>
                    <span className="text-gray-700 font-bold">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-[45%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">Reportagem</span>
                    <span className="text-gray-700 font-bold">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-[30%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">Carta Argumentativa</span>
                    <span className="text-gray-700 font-bold">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-[20%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Posição no Ranking Geral</h3>
                <div className="bg-indigo-100 rounded-lg py-6 mb-6">
                  <span className="text-4xl font-bold text-indigo-700">10°</span>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
                  <a href="/dashboard/select-reading" target="_self">Iniciar Leitura</a>
                </button>
              </div>
            </div>
          </div>
        </section>
        <br /><br />
      </main>
    </div>
  );

}