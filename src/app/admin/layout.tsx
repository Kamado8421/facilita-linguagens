"use client";
import { useState } from "react";
import ValidateAdmin from "./exec-script/validateAdmin";

export default function TextsPage({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const [authenticated, setAuthenticated] = useState(false);
    const [credentials, setCredentials] = useState({ user: "", password: "" });
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        if (await ValidateAdmin(credentials)) {
            setAuthenticated(true);
            setError("");
        } else {
            setError("Usuário ou senha incorretos.");
        }
    }

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

    return (
        <>
            {children}
        </>
    );
}
