'use client';

import { useActionState } from "react";
import changePasswordAction from "./changePasswordAction";
import Button from "@/src/components/button";
import PopUp from "@/src/components/pop-up";

export default function FormChangePassword({ setIsOpen }: { setIsOpen: (value: boolean) => void }) {
    const [state, formAction, isPending] = useActionState(changePasswordAction, null);

    return (
        <PopUp>
            <h1 className="text-[18px] font-semibold">Trocar Senha</h1>
            <span className="text-gray-500">Informe sua nova senha abaixo</span>

            <form action={formAction} className="mt-3 w-full">
                <input
                    type="password"
                    name="password"
                    placeholder="Nova senha"
                    required
                    className="w-full outline-none bg-gray-200 p-2 rounded-md mb-2"
                />
                <input
                    type="password"
                    name="confirm-password"
                    placeholder="Confirme sua nova senha"
                    required
                    className="w-full outline-none bg-gray-200 p-2 rounded-md mb-3"
                />


                {state?.message && (
                    <p className={`text-sm mb-2 ${state.success ? "text-green-600" : "text-red-600"}`}>
                        {state.message}
                    </p>
                )}

                <Button
                    disabled={isPending}
                    title={isPending ? "Alterando..." : "Alterar minha senha"}
                />
            </form>
        </PopUp>
    );
}
