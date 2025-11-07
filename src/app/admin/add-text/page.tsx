"use client";

import { useState, useActionState, useEffect } from "react";
import { createTextAction } from "./textAction";
import { fetchGenres } from "../../dashboard/select-reading/fetchs";
import { GenreType } from "@/src/types";

type TextFormState = {
  success: boolean;
  message: string;
};

export default function TextsPage() {
  // --- Controle de login simples ---
  const [authenticated, setAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ user: "", password: "" });
  const [error, setError] = useState("");
  const [genres, setGenres] = useState<GenreType[]>([]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (credentials.user === "admin" && credentials.password === "admin") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Usuário ou senha incorretos.");
    }
  }

  const [state, formAction] = useActionState(createTextAction, { success: false, message: "" });

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    }
    loadGenres();
  }, []);

  // --- Tela de login ---
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm flex flex-col gap-3"
        >
          <h2 className="text-xl font-semibold text-center">Acesso Restrito</h2>

          <input
            type="text"
            placeholder="Usuário"
            className="border rounded-lg p-2"
            value={credentials.user}
            onChange={(e) => setCredentials({ ...credentials, user: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            className="border rounded-lg p-2"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  // --- Tela principal ---
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
