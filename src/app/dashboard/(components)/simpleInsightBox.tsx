'use client';
import { useEffect, useState } from "react";
import { fetchSimpleInsight } from "./simpleInsight";

export default function SimpleInsightBox() {

    const [totalTextRead, setTotalTextRead] = useState('');
    const [countGenerExprore, setCountGenerExprore] = useState<'' | number>('');

    useEffect(() => {
        (async () => {
            const res = await fetchSimpleInsight();

            if (res.success) {
                setTotalTextRead(res.data?.totalTextRead.toString() || '');
                setCountGenerExprore(res.countGenerExprore || '');
            }
        })()
    }, []);


    return (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-center font-extrabold mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                    {/* <DashboardBoxIcon icon="book" /> */}
                </div>
                <div className="mb-1">Textos lidos</div>
                <div className="text-blue-700 text-4xl mb-1">{totalTextRead || '-'}</div>
                <div className="font-normal text-gray-600">Total de textos completos</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                    {/* <DashboardBoxIcon icon="clock" /> */}
                </div>
                <div className="mb-1">Tempo de leitura</div>
                <div className="text-blue-800 text-4xl mb-1">18h 22m</div>
                <div className="font-normal text-gray-600">
                    Tempo total dedicado à <br /> leitura
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                <div className="flex justify-center mb-3">
                    {/* <DashboardBoxIcon icon="tag" /> */}
                </div>
                <div className="mb-1">Gêneros Explorados</div>
                <div className="text-blue-700 text-4xl mb-1">{countGenerExprore || '-'}</div>
                <div className="font-normal text-gray-600">
                    Diferentes gêneros <br /> textuais estudados
                </div>
            </div>
        </section>
    );
}