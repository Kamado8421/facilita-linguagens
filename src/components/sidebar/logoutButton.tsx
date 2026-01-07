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
            className="pl-5 pr-4 absolute bottom-5 left-1/2 -translate-x-1/2 w-[97%]"
        >
            <div className="border-1 border-gray-500 rounded-3xl flex p-3 justify-center ">
                <LogOutIcon color="black" />
                <span className="text-black font-bold ">Sair</span>
            </div>
        </button>
    );
}
