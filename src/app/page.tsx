'use client';
import { redirect } from "next/navigation";
import { useUser } from "../contexts/UserContext";

export default function LandingPage() {
  const { user, loading } = useUser();
  if (loading) return <div>Carregando...</div>;

  if (user) {
    return redirect('/dashboard');
  }

  if (!user) return (
    <div>
      Tela inicial
      <br />
      <a href="/register" className="text-red-400 underline">Fazer cadastro</a>
      <br />
      <a href="/login" className="text-red-400 underline">Fazer Login</a>
    </div>
  )


}
