'use client';
import Image from "next/image";
import Logo from '@/src/assets/logo.svg';
import LogoutButton from "./logoutButton";
import { BookMarkedIcon, CircleUserRoundIcon, HandshakeIcon, HomeIcon, TrophyIcon } from "lucide-react";
import { LucideIcon } from "lucide-react";

type Route = {
    title: string;
    Icon: LucideIcon;
    path: string;
};

export const MENU_ROUTES: Route[] = [
    { title: 'Início', Icon: HomeIcon, path: '/dashboard' },
    { title: 'Perfil', Icon: CircleUserRoundIcon, path: '/dashboard/profile' },
    { title: 'Leitura', Icon: BookMarkedIcon, path: '/dashboard/select-reading' },
    { title: 'Campanha', Icon: TrophyIcon, path: '/dashboard/ranking' },
    { title: 'Fazer Feedback', Icon: HandshakeIcon, path: '/' },

];

export default function Sidebar() {
    return (
        <div className="bg-blue-500 w-[350px] h-full top-0 left-0 flex-col items-center md:flex hidden">
            <Image src={Logo} alt="Logo - Facilita Linguagens" width={150} className="mt-2.5" />
            <div className="h-px w-[90%] bg-white mt-2"></div>
            <div className="p-5 w-full">
                <ul>
                    {MENU_ROUTES.map(({ title, Icon, path }, i) => (
                        <li key={i} className="hover:bg-blue-400 p-2 rounded-md mb-2">
                            <a href={path} className="flex text-white text-[18px] items-center gap-2">
                                <Icon />
                                <span>{title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="relative flex-1 w-full pl-5">
                <LogoutButton />
            </div>
        </div>
    );
}
