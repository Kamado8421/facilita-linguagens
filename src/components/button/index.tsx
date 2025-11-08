import { CSSProperties } from "react";

export default function Button({ style, title, bgColor, action, disabled = false, titleLoading='Aguarde...', loading=false }: { loading?: boolean, titleLoading?: string, style?: CSSProperties, disabled?: boolean, bgColor?: string; title: string, action?: () => void }) {
    return (
        <button
            onClick={() => action ? action() : null}
            disabled={disabled}
            className={`rounded-md w-full p-2 pl-3 pr-3 text-white font-semibold ${bgColor ? `bg-[${bgColor}]` : 'bg-blue-500'} cursor-pointer`}
            style={style}
            >
            {loading ? titleLoading : title}
        </button>
    )
}
