"use client";

import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => {
                const isExit = confirm("Tem certeza que deseja sair?");
                if (isExit) return signOut({ redirect: true, callbackUrl: "/" })
            }}
            className="w-full"
        >
            <div className="border-1 border-gray-400 rounded-3xl flex px-3 py-2 justify-center w-full hover:bg-gray-50 transition-colors">
                <LogOutIcon size={18} color="black" className="flex-shrink-0"/>
                <span className="text-black font-bold text-sm ml-2 truncate">Sair</span>
            </div>
        </button>
    );
}