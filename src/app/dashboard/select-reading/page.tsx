'use client';

import Button from "@/src/components/button";
import { useState } from "react";

const genres = [
    { id: '1', name: 'Conto' },
    { id: '2', name: 'Crônica' },
    { id: '3', name: 'Poema' },
    { id: '4', name: 'Artigo de Opinião' },
    { id: '5', name: 'Carta' },
];

export default function SelectReadingPage() {
    const [selectTypeText, setSelectTypeText] = useState<'random-genre' | 'specific-genre'>('random-genre');
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    const handleStartReading = () => {
        if (selectTypeText === 'specific-genre' && !selectedGenre) {
            alert("Por favor, selecione um gênero textual.");
            return;
        }

        if (selectTypeText === 'random-genre') {
            const randomGenre = genres[Math.floor(Math.random() * genres.length)];
            console.log("Gênero aleatório selecionado:", randomGenre);
        } else {
            console.log("Gênero específico selecionado:", selectedGenre);
        }
    };

    return (
        <div className="w-full h-full p-10">
            <h1 className="text-3xl font-bold text-blue-500 mb-3">Faça sua Leitura</h1>
            <span className="text-gray-500">Escolha abaixo quais gêneros textuais devem aparecer para você</span>

            <div className="md:w-[55%] mt-10">
                <div className="mb-10 flex md:flex-row flex-col items-center justify-between gap-3">
                    <button
                        onClick={() => {
                            setSelectTypeText('random-genre');
                            setSelectedGenre(null);
                        }}
                        className={`p-4 ${selectTypeText === 'random-genre' ? 'bg-blue-700' : 'bg-gray-600'} font-bold text-white w-full rounded-md`}
                    >
                        Gêneros Aleatórios
                    </button>
                    <button
                        onClick={() => setSelectTypeText('specific-genre')}
                        className={`p-4 ${selectTypeText === 'specific-genre' ? 'bg-blue-700' : 'bg-gray-600'} font-bold text-white w-full rounded-md`}
                    >
                        Gênero Específico
                    </button>
                </div>

                {selectTypeText === 'specific-genre' && (
                    <select
                        className="w-full p-3 rounded-2xl border-2 border-black bg-white mb-5"
                        value={selectedGenre ?? ''}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option value="" disabled>
                            Selecione um gênero textual
                        </option>
                        {genres.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                )}

                <Button
                    title="Iniciar Leitura"
                    style={{ padding: 15 }}
                    action={handleStartReading}
                />
            </div>
        </div>
    );
}
