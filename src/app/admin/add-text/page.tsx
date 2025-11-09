"use client";

import { useState, useActionState, useEffect } from "react";
import { createTextAction } from "./textAction";
import { fetchGenres } from "../../dashboard/select-reading/fetchs";
import { GenreType } from "@/src/types";

export default function TextsPage() {
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [state, formAction] = useActionState(createTextAction, { success: false, message: "" });

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    }
    loadGenres();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Texto</h1>

      <form
        action={formAction}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg flex flex-col gap-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Título *</label>
          <input
            name="title"
            type="text"
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Conteúdo *</label>
          <textarea
            name="content"
            rows={5}
            className="w-full border rounded-lg p-2 resize-none"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Autor</label>
          <input
            name="author"
            type="text"
            className="w-full border rounded-lg p-2"
            placeholder="Opcional"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gênero Textual *</label>
          <select
            name="textualGenreId"
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Selecione um gênero</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
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
    </div>
  );
}
