"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Logo from "@/src/assets/logo.svg";
import { useEffect, useState } from "react";
import Button from "@/src/components/button";
import { redirect } from "next/navigation";
import { Star, Timer } from "lucide-react";

export default function FinishReadingScreen(props: {
  title: string;
  author?: string;
  genre: string;
  xp: number;
  minutes: string;
}) {
  const { title, author, genre, xp, minutes } = props;
  const [displayXp, setDisplayXp] = useState(0);
  const controls = useAnimation();

  // Animação de contagem de XP
  useEffect(() => {
    let start = 0;
    const end = xp;
    const duration = 1500; // ms
    const increment = end / (duration / 30); // atualiza a cada 30ms

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplayXp(Math.round(start));
    }, 30);

    controls.start({ scale: [1, 1.2, 1], transition: { duration: 0.3 } });
  }, [xp, controls]);

  return (
    <div className="fixed top-0 left-0 flex flex-col justify-center items-center z-50 w-screen h-screen bg-blue-500 text-white overflow-y-auto">
      {/* Logo e título */}
      <Image src={Logo} width={180} alt="Logo" className="mb-8" />
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-3"
      >
        🎉 Parabéns!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white/90 mb-6 text-center text-lg"
      >
        Você finalizou o texto <strong>{title}</strong>
        {author ? ` de ${author}` : ""}, gênero <strong>{genre}</strong>.
      </motion.p>

      {/* Caixa de resultados */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        {/* XP */}
        <motion.div
          animate={controls}
          className="bg-white text-blue-600 rounded-2xl shadow-xl px-10 py-6 flex flex-col items-center"
        >
          <Star size={40} className="text-yellow-400 mb-2" />
          <span className="text-3xl font-bold">{displayXp} XP</span>
          <span className="text-sm text-blue-400">Ganho de experiência</span>
        </motion.div>

        {/* Tempo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white text-blue-600 rounded-2xl shadow-xl px-10 py-6 flex flex-col items-center"
        >
          <Timer size={40} className="text-blue-400 mb-2" />
          <span className="text-3xl font-bold">{minutes}</span>
          <span className="text-sm text-blue-400">Tempo total</span>
        </motion.div>
      </div>

      {/* Botão */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          action={() => redirect("/dashboard/ranking")}
          title="Continuar"
          style={{
            backgroundColor: "white",
            color: "#1D4ED8",
            fontWeight: "600",
            padding: "10px 30px",
            borderRadius: "12px",
          }}
        />
      </motion.div>
    </div>
  );
}