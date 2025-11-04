// 'use client';
// import { ListIcon } from "lucide-react";
// import { useState } from "react";
// import { MENU_ROUTES } from "../sidebar"; 

// export default function MobileSidebar() {

//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <>
//             <button className="flex md:hidden bg-blue-500 p-1.5 rounded-md"><ListIcon color="white" size={18} /></button>

//             <div className="fixed top-0 z-50 left-0 h-screen w-screen items-end flex bg-[#0000007d]">
//                 <div className="w-full flex flex-col bg-blue-500 h-auto max-h-[60%] overflow-y-auto rounded-t-2xl">
//                     ....
//                 </div>
//             </div>

//         </>
//     )
// }

'use client';
import { ListIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // 👈 animações suaves

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
                            <h2 className="text-white text-lg font-bold mb-4">Menu</h2>

                            {/* Exemplo de itens */}
                            <ul className="space-y-3 text-white font-semibold">
                                <li className="hover:text-blue-200 cursor-pointer">Início</li>
                                <li className="hover:text-blue-200 cursor-pointer">Perfil</li>
                                <li className="hover:text-blue-200 cursor-pointer">Configurações</li>
                                <li className="hover:text-blue-200 cursor-pointer">Sair</li>
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
