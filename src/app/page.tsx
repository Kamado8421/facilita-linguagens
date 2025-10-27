'use client';
import { redirect } from "next/navigation";
import { useUser } from "../contexts/UserContext";

export default function LandingPage() {
  const { user, loading } = useUser();
  if (loading) return <div>Carregando</div>;

  if (user) {
    return redirect('/dashboard');
  }

  if (!user) return (
    <div>
      Tela inicial
    </div>
  )


}
