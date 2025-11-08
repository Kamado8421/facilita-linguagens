"use client";

import { CircleArrowLeft, PauseIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import Logo from "@/src/assets/logo.svg";
import { useState, useEffect, useRef } from "react";
import Button from "@/src/components/button";
import { useSearchParams, redirect } from "next/navigation";
import { fetchDeleteGameMatch, fetchFinishReading, fetchValidateGameMatch } from "./fetchs";
import FinishReadingScreen from "./finishReading";

function InvalidGameMatch() {
    return (
        <div className="fixed top-0 left-0 flex justify-center flex-col items-center z-50 w-screen h-screen bg-blue-500 overflow-y-auto">
            <Image src={Logo} width={200} alt="Logo" className="m-10" />
            <h1 className="text-3xl font-bold text-white mb-4">Ops! 😥</h1>
            <span className="text-gray-900 mb-3">
                Parece que a leitura que você tentou iniciar não é válida!
            </span>
            <div>
                <Button
                    action={() => redirect("/dashboard/select-reading")}
                    title="Criar uma partida válida"
                    style={{ backgroundColor: "blue" }}
                />
            </div>
        </div>
    );
}

export default function ReadingPage() {
    const [clock, setClock] = useState("00:00:00");
    const [paused, setPaused] = useState(true);
    const [seconds, setSeconds] = useState(0);

    const [invalidGameMatch, setInvalidGameMatch] = useState(false);
    const [loading, setLoading] = useState(true);

    const [content, setContent] = useState("");
    const [genre, setGenre] = useState("");
    const [title, setTitle] = useState("");

    const searchParams = useSearchParams();
    const gameMatchId = searchParams.get("game-match-id");

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [finishReading, setFinishReading] = useState(false);
    const [xp, setXp] = useState(0);

    useEffect(() => {
        const validateGameMatch = async () => {
            if (!gameMatchId) {
                setInvalidGameMatch(true);
                setLoading(false);
                return;
            }

            const res = await fetchValidateGameMatch(gameMatchId);

            if (res.success) {
                setContent(res.text?.content ?? "");
                setGenre(res.genre?.name ?? "");
                setTitle(res.text?.title ?? "");
                setPaused(false);
                setInvalidGameMatch(false);
            } else {
                setInvalidGameMatch(true);
            }

            setLoading(false);
        };

        validateGameMatch();
    }, [gameMatchId]);


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


    useEffect(() => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
        const s = Math.floor(seconds % 60).toString().padStart(2, "0");

        setClock(`${h}:${m}:${s}`);
    }, [seconds]);


    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 text-lg text-gray-700">
                Carregando leitura...
            </div>
        );
    }


    if (finishReading) {
        return (
            <FinishReadingScreen
                genre={genre}
                minutes={clock}
                title={title}
                xp={xp}
            />
        )
    }

    if (invalidGameMatch) {
        return <InvalidGameMatch />;
    }

    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-200 overflow-y-auto">

            <nav className="bg-blue-500 w-full flex items-center justify-between sticky top-0 p-4 text-white shadow-md">
                <button onClick={async () => {
                    setPaused(true);
                    if (confirm('Deseja parar a leitura? Você não ganhará seus XPs ao sair.')) {
                        await fetchDeleteGameMatch(gameMatchId!);
                        redirect('/dashboard')
                    } else {
                        setPaused(false);
                    }
                }}>
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

            <main className="flex flex-col justify-start items-center py-10 px-4">
                <div className="bg-white shadow-lg rounded-lg w-full md:w-[60%] lg:w-[50%] p-10">
                    <h1 className="text-2xl font-bold text-blue-500 mt-5 text-center">
                        {title}
                    </h1>
                    <span className="text-gray-500 mb-8 block text-center">
                        - {genre} -
                    </span>

                    <div className="space-y-5 text-justify text-gray-800 leading-relaxed">
                        <pre className="font-serif text-center">{paused ? 'Pausado':content}</pre>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg w-full md:w-[60%] lg:w-[50%] p-10 mt-2">
                    <span>Finalizou sua leitura?</span>
                    <br />
                    <br />
                    <Button title="Marcar como concluída" action={async () => {
                        const data = await fetchFinishReading(gameMatchId!);
                        setXp(data.xp!)
                        setPaused(true);
                        setFinishReading(true);
                    }} />
                </div>
            </main>
        </div>
    );
}
