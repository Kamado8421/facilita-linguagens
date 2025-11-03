'use client';
import { redirect } from "next/navigation";
import { useUser } from "../contexts/UserContext";
import TopAuth from "@/src/components/top-auth";
import MainDashboard from "@/src/components/main-dashboard";

export default function LandingPage() {
  const { user, loading } = useUser();
  if (loading) return <div>Carregando...</div>;

  if (user) {
    return redirect('/dashboard');
  }

  if (!user) return (
    // faz a tela aqui dentro dessa div. O resto é configuração da página que fiz pra não ser acessada enqando o usuário tiver logado
    <div className="min-h-screen w-full bg-gradient-to-r from-[#1B70E2] to-[#3C7998] py-4 sm:py-8 text-white">
      <nav>
        <TopAuth/>
        <div className="flex justify-center sm:block gap-2 sm:gap-0 mb-4 sm:mb-0">
          <a href="/register" 
            className="font-bold text-center border rounded px-4 sm:px-6 py-2 sm:mr-5 sm:float-end sm:relative sm:bottom-13 text-sm sm:text-base">
            Cadastrar-se
          </a>
          <a href="/login" 
            className="bg-blue-800 font-bold text-center border rounded px-8 sm:px-14 py-2 sm:mr-10 sm:float-end sm:relative sm:bottom-13 text-sm sm:text-base">
            Entrar
          </a>
        </div>
      </nav>
      <main className="text-center mx-2 sm:mx-auto sm:w-full sm:flex sm:justify-center relative bottom-4 sm:bottom-0">
        <div className="mt-7 sm:flex sm:flex-col sm:items-center relative " >
          <div className="flex justify-center sm:w-full sm:flex sm:justify-center">
            <MainDashboard />
          </div>

          <div className="font-bold text-2xl sm:text-4xl mb-6 leading-8 sm:leading-13 tracking-wide sm:text-center">
            Sonhando com sua<br/>
            <strong className="text-green-400">APROVAÇÃO</strong> no maior Exame<br/>
            Nacional do <strong className="text-orange-400">Brasil?</strong>
          </div>

          <p className="tracking-wider leading-5 text-sm sm:text-base sm:text-center sm:max-w-2xl">
            Conheça agora o Facilita Linguagem, uma plataforma pensada em você que <br className="hidden sm:block" />
            deseja aprimorar suas habilidades de leitura e interpretação textual de forma <br className="hidden sm:block" />
            Gameficafa!!!
          </p>
          <div className="flex justify-center mt-8 sm:mt-10">
            <a href="/register" 
            className="bg-blue-800 font-bold text-center border rounded px-8 sm:px-17 py-3 sm:py-4 text-sm sm:text-base">
              Criar minha conta agora mesmo!
            </a>
          </div>
        </div> 
      </main>
      <footer className="opacity-60 font-bold text-xs text-center mt-16 sm:mt-24 px-2">
        FACILITA LINGUAGEM: Projeto de Inovação IFMA - Campus Itapecuru Mirim
      </footer>
    </div>
  )


}
