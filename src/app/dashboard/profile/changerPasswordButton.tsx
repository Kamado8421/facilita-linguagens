'use client';

import { useState } from "react";
import FormChangePassword from "./formChangePassword";

export default function ChangerPasswordButton() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen && <FormChangePassword setIsOpen={setIsOpen}/>}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 p-1 pl-3 pr-3 rounded-md cursor-pointer font-semibold hover:bg-blue-400 text-white">
                Trocar minha senha
            </button>
        </>
    )
}