import { LogOutIcon } from "lucide-react";

export default function LogoutButton(props: {titulo: string, algo: string} ) {
    return (
        <button className="flex items-center gap-1.5 pl-5  absolute bottom-5 left-1/2 -translate-x-1/2 w-full">
            <LogOutIcon color="white" />
            <span className="text-white">{props.titulo} - {props.algo}</span>
        </button>
    )
}