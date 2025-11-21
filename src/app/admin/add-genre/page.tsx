"use client";

import { useState, useActionState, useEffect } from "react";
import { fetchGenres } from "../../dashboard/select-reading/fetchs";
import { GenreType } from "@/src/types";
import { createGenreAction } from "./textAction";

export default function GenrePage() {
    const [genres, setGenres] = useState<GenreType[]>([]);
    const [state, formAction] = useActionState(createGenreAction, { success: false, message: "" });

    useEffect(() => {
        const loadGenres = async () => {
            const data = await fetchGenres();
            setGenres(data);
        }
        loadGenres();
    }, [state]);


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <h1 className="text-2xl font-bold mb-6">Cadastro de Gênero Textual</h1>

            <form
                action={formAction}
                className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg flex flex-col gap-4"
            >
                <div>
                    <label className="block text-sm font-medium mb-1">Nome do Gênero *</label>
                    <input
                        name="genrename"
                        type="text"
                        className="w-full border rounded-lg p-2"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg"
                >
                    Salvar
                </button>

                {state.message && (
                    <p className={`text-center text-sm ${state.success ? "text-green-600" : "text-red-500"}`}>
                        {state.message}
                    </p>
                )}
            </form>

            <div className="mt-5 bg-white shadow-md rounded-2xl p-6 w-full max-w-lg flex flex-col gap-4">
                <strong>{genres.length} Gêneros Cadastrados <a href="/admin/add-text" className="text-blue-500 underline">(Cadastrar novo Texto)</a></strong>

                <ul>
                    {genres.map(({name}, i) => <li>{i+1} - {name}</li>)}
                </ul>
            </div>

        </div>
    );
}
