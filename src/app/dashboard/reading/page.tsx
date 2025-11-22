"use client";

import { CircleArrowLeft, PauseIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import Logo from "@/src/assets/logo.svg";
import { useState, useEffect, useRef } from "react";
import Button from "@/src/components/button";
import { useSearchParams, redirect } from "next/navigation";
import {
    addTextReaded,
    fetchDeleteGameMatch,
    fetchFinishReading,
    fetchQuestionText,
    fetchUpdateGameMatch,
    fetchValidateGameMatch
} from "./fetchs";
import FinishReadingScreen from "./finishReading";

type QuestionType = {
    textId: string;
    id: string;
    statement: string;
    alternativeA: string;
    alternativeB: string;
    correctAlternative: "a" | "b";
};

export default function ReadingPage() {
    const searchParams = useSearchParams();
    const gameMatchId = searchParams.get("game-match-id");

    const [loading, setLoading] = useState(true);
    const [invalidGameMatch, setInvalidGameMatch] = useState(false);

    const [content, setContent] = useState("");
    const [genre, setGenre] = useState("");
    const [title, setTitle] = useState("");

    const [seconds, setSeconds] = useState(0);
    const [clock, setClock] = useState("00:00:00");
    const [paused, setPaused] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const [textId, setTextId] = useState("");
    const [genreId, setGenreId] = useState("");
    const [isQuestionPage, setIsQuestionPage] = useState(false);

    const [question, setQuestion] = useState<QuestionType | null>(null);
    const [answer, setAnswer] = useState<"a" | "b" | "">("");

    const [sessionXp, setSessionXp] = useState(0);
    const [finishReading, setFinishReading] = useState(false);

    const [skipCount, setSkipCount] = useState(0);

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            if (!gameMatchId) {
                setInvalidGameMatch(true);
                setLoading(false);
                return;
            }

            const res = await fetchValidateGameMatch(gameMatchId);

            if (!res.success) {
                setInvalidGameMatch(true);
                setLoading(false);
                return;
            }

            setContent(res.text?.content!);
            setGenre(res.genre?.name!);
            setTitle(res.text?.title!);
            setTextId(res.text?.id!);

            setGenreId(res.genre?.id!);

            setPaused(false);
            setInvalidGameMatch(false);

            await loadQuestion();

            setLoading(false);
        };

        load();
    }, [gameMatchId, textId]);

    async function loadQuestion() {
        if (!gameMatchId) return;

        const res = await fetchQuestionText(gameMatchId);

        if (res.success) {
            setQuestion(res.question!);
        } else {
            setQuestion(null);
        }
    }

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
        const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");

        setClock(`${h}:${m}:${s}`);
    }, [seconds]);

    function addReadingXp() {
        const xp = Math.floor(Math.random() * (12 - 5 + 1)) + 5;
        setSessionXp((prev) => prev + xp);
        return xp;
    }

    function addQuestionXp() {
        setSessionXp((prev) => prev + 3);
    }

    async function finalizarPartida() {
        addReadingXp();

        await fetchFinishReading(gameMatchId!, sessionXp);
        setPaused(true);
        setFinishReading(true);
    }

    async function pularTexto(autoSkip = false) {
        if (skipCount >= 3 && !autoSkip) {
            alert("Limite de 3 pulos atingido!");
            return;
        }

        const res = await fetchUpdateGameMatch(gameMatchId!);

        if (res.success) {
            setTextId(res.textId!);
            autoSkip ? null : setSkipCount((p) => p + 1);
            await loadQuestion();
            return;
        }

        alert("Não há mais textos para esta partida.");
        setFinishReading(true);
    }

    async function responderQuestao() {
        if (!answer) return alert("Escolha uma resposta.");

        const answerOk = answer === question?.correctAlternative;

        if (answerOk) {
            addQuestionXp();
            alert("Você acertou!");
        } else {
            alert("Você errou 😥");
        }

        //await pularTexto(true);
        const res = await fetchUpdateGameMatch(gameMatchId!);

        setTextId(res.textId!);
        
        await addTextReaded(genreId, answerOk);
        setIsQuestionPage(false);
        setAnswer("");
    }

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Carregando...</div>;
    }

    if (invalidGameMatch) {
        return (
            <div className="fixed inset-0 bg-blue-500 flex flex-col items-center justify-center">
                <Image src={Logo} width={200} alt="Logo" />
                <h1 className="text-white text-3xl font-bold mt-5 mb-5">Partida inválida 😥</h1>
                <Button
                    title="Criar nova partida"
                    style={{backgroundColor: 'blue', maxWidth: '300px'}}
                    action={() => redirect("/dashboard/select-reading")}
                />
            </div>
        );
    }

    if (finishReading) {
        return (
            <FinishReadingScreen
                genre={genre}
                minutes={clock}
                title={title}
                xp={sessionXp}
            />
        );
    }

    return (
        <div className="fixed inset-0 bg-gray-200 overflow-y-auto">

            {/* NAV */}
            <nav className="bg-blue-500 p-4 flex justify-between items-center top-0 sticky text-white">
                <button
                    onClick={async () => {
                        setPaused(true);

                        if (confirm("Deseja sair sem receber XP?")) {
                            await fetchDeleteGameMatch(gameMatchId!);
                            redirect("/dashboard");
                        } else {
                            setPaused(false);
                        }
                    }}
                >
                    <CircleArrowLeft size={32} />
                </button>

                <Image src={Logo} width={150} alt="Logo" />

                <div className="flex items-center gap-3 text-lg">
                    {clock}
                    <button
                        className={`${paused ? 'bg-yellow-500' : 'bg-white/20'} p-2 rounded-full`}
                        onClick={() => setPaused((p) => !p)}
                    >
                        {paused ? <PlayIcon /> : <PauseIcon />}
                    </button>
                </div>
            </nav>

            {/* TEXTO */}
            {!isQuestionPage && (
                <main className="flex flex-col items-center p-6">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">

                        <h1 className="text-2xl font-bold text-blue-500 text-center">{title}</h1>
                        <p className="text-gray-500 text-center mb-6">- {genre} -</p>

                        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {paused ? "Pausado" : content}
                        </div>
                    </div>

                    {/* AÇÕES */}
                    <div className="bg-white shadow-lg rounded-lg p-8 mt-6 w-full max-w-2xl text-center">
                        <p className="mb-4 text-start">O que deseja fazer?</p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center">

                            <Button title="Finalizar leitura"
                                action={finalizarPartida}
                                style={{ backgroundColor: "#ff060680" }}
                            />

                            <Button title="Responder questões"
                                action={() => setIsQuestionPage(true)}
                            />

                            <Button title={`Pular ${skipCount}/3`}
                                action={pularTexto}
                                style={{
                                    backgroundColor: "transparent",
                                    borderWidth: 2,
                                    borderColor: "#7b7b7b",
                                    color: "#7b7b7b"
                                }}
                            />
                        </div>
                    </div>
                </main>
            )}

            {/* QUESTÕES */}
            {isQuestionPage && (
                <main className="flex flex-col items-center p-6">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">

                        <h1 className="text-2xl font-bold text-blue-500 text-center">
                            Responda a pergunta:
                        </h1>

                        <p className="mt-6 text-gray-600">{question?.statement}</p>

                        <div className="mt-6 space-y-4">
                            <label className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="answer"
                                    value="a"
                                    onChange={() => setAnswer("a")}
                                    className="w-5 h-5"
                                />
                                <span><strong>A -</strong> {question?.alternativeA}</span>
                            </label>

                            <label className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="answer"
                                    value="b"
                                    onChange={() => setAnswer("b")}
                                    className="w-5 h-5"
                                />
                                <span><strong>B -</strong> {question?.alternativeB}</span>
                            </label>

                            <Button title="Responder" action={responderQuestao} />
                        </div>

                    </div>
                </main>
            )}

        </div>
    );
}
