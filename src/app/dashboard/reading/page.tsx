"use client";

import { CircleArrowLeft, PauseIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import Logo from "@/src/assets/logo.svg";
import { useState, useEffect, useRef } from "react";
import Button from "@/src/components/button";

export default function ReadingPage() {
    const [clock, setClock] = useState("00:00:00");
    const [paused, setPaused] = useState(false);
    const [seconds, setSeconds] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Atualiza o contador de tempo
    useEffect(() => {
        if (!paused) {
            intervalRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [paused]);

    // Formata o relógio
    useEffect(() => {
        const h = Math.floor(seconds / 3600)
            .toString()
            .padStart(2, "0");
        const m = Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, "0");
        const s = Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

        setClock(`${h}:${m}:${s}`);
    }, [seconds]);

    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-200 overflow-y-auto">
            {/* NAVBAR */}
            <nav className="bg-blue-500 w-full flex items-center justify-between sticky top-0 p-4 text-white shadow-md">
                <button>
                    <CircleArrowLeft size={30} />
                </button>

                <div className="flex items-center gap-3.5">
                    <Image src={Logo} width={150} alt="Logo" />
                </div>

                <div className="flex items-center gap-3 text-lg font-semibold">
                    {clock}
                    <button
                        className="bg-white/20 hover:bg-white/30 rounded-full p-2"
                        onClick={() => setPaused((prev) => !prev)}
                    >
                        {paused ? <PlayIcon /> : <PauseIcon />}
                    </button>
                </div>
            </nav>  

            {/* CONTEÚDO */}
            <main className="flex flex-col justify-start items-center py-10 px-4">
                <div className="bg-white shadow-lg rounded-lg w-full md:w-[60%] lg:w-[50%] p-10">
                    <h1 className="text-2xl font-bold text-blue-500 mt-5 text-center">
                        Nome do Texto
                    </h1>
                    <span className="text-gray-500 mb-8 block text-center">
                        Gênero Textual
                    </span>

                    <div className="space-y-5 text-justify text-gray-800 leading-relaxed">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                            veritatis soluta culpa exercitationem praesentium numquam ut,
                            voluptatibus impedit in rem maxime dolor accusantium quo dignissimos
                            reprehenderit quibusdam, optio ex itaque.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                            veritatis soluta culpa exercitationem praesentium numquam ut,
                            voluptatibus impedit in rem maxime dolor accusantium quo dignissimos
                            reprehenderit quibusdam, optio ex itaque.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                            veritatis soluta culpa exercitationem praesentium numquam ut,
                            voluptatibus impedit in rem maxime dolor accusantium quo dignissimos
                            reprehenderit quibusdam, optio ex itaque.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                            veritatis soluta culpa exercitationem praesentium numquam ut,
                            voluptatibus impedit in rem maxime dolor accusantium quo dignissimos
                            reprehenderit quibusdam, optio ex itaque.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                            veritatis soluta culpa exercitationem praesentium numquam ut,
                            voluptatibus impedit in rem maxime dolor accusantium quo dignissimos
                            reprehenderit quibusdam, optio ex itaque.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                            veritatis soluta culpa exercitationem praesentium numquam ut,
                            voluptatibus impedit in rem maxime dolor accusantium quo dignissimos
                            reprehenderit quibusdam, optio ex itaque.
                        </p>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg w-full md:w-[60%] lg:w-[50%] p-10 mt-2">
                    <span>Finalizou sua leitura?</span>
                    <br /><br />
                    <Button title="Marcar como concluída" />
                </div>
            </main>
        </div>
    );
}
