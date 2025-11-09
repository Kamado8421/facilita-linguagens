'use client';

import { script } from "./script";

export default function ExecScript() {

    return (
        <div className="ml-5 mt-5">
            <h1>Não clique!!</h1>
            <button
                onClick={script}
                className="p-5 mt-5 w-[200px] text-center bg-blue-500 text-white  rounded-md"
            >
                Executar Script
            </button>
        </div>
    )
}