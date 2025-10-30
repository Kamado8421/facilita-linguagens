"use client";

import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => {
                let isExit = confirm("Tem certeza que deseja sair?");
                if (isExit) return signOut({ redirect: true, callbackUrl: "/" })
            }}
            className="flex items-center gap-1.5 pl-5 absolute bottom-5 left-1/2 -translate-x-1/2 w-full"
        >
            <LogOutIcon color="white" />
            <span className="text-white">Sair</span>
        </button>
    );
}
