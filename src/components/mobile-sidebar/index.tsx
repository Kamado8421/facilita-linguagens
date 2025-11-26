'use client';
import { ListIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ROUTES } from "../sidebar";
import Button from "../button";
import { signOut } from "next-auth/react";

export default function MobileSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Botão de abrir menu */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex md:hidden bg-blue-500 p-2 rounded-md  relative"
            >
                <ListIcon color="white" size={20} />
            </button>

            {/* Overlay + Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 flex items-end bg-[#0000007d]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(false)} // fecha ao clicar no overlay
                    >
                        {/* Conteúdo do menu */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="w-full flex flex-col bg-blue-500 h-auto max-h-[60%] overflow-y-auto rounded-t-2xl p-6"
                            onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
                        >
                            <h2 className="text-white text-center text-lg font-bold mb-4">Menu</h2>

                            {/* Exemplo de itens */}
                            <ul className="space-y-3 text-white font-semibold flex flex-col items-center">

                                {MENU_ROUTES.map(({ title, Icon, path }, i) => (
                                    <i
                                        className="bg-[#ffffff18] w-[94%] p-2 rounded-md flex items-center gap-5"
                                        key={i}><Icon /><a href={path}>{title}</a></i>
                                ))}
                                <Button
                                    title="Sair"
                                    action={() => {
                                        const isExit = confirm("Tem certeza que deseja sair?");
                                        if (isExit) return signOut({ redirect: true, callbackUrl: "/" })
                                    }}
                                    style={{ color: 'white', backgroundColor: '#ffffff18' }}
                                />
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
