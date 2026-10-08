'use client';
import Image from "next/image";
import Logo from '@/src/assets/logo.svg';
import LogoutButton from "./logoutButton";
import { BookMarkedIcon, CircleUserRoundIcon, HandshakeIcon, HomeIcon, TrophyIcon, LayoutDashboard, CircleStar, FileClock } from "lucide-react";
import { LucideIcon } from "lucide-react";
import TopBar from "@/src/components/topbar";
import MensageMotivational from "@/src/components/mensage-motivational";

type Route = {
    title: string;
    Icon: LucideIcon;
    path: string;
    target?: boolean;
};

export const MENU_ROUTES: Route[] = [
    { title: 'Dashboard', Icon: LayoutDashboard, path: '/dashboard' },
    { title: 'Histórico de Leitura', Icon: FileClock, path: '' },
    { title: 'Ranking', Icon: TrophyIcon, path: '/dashboard/ranking' },
  
    { title: 'Perfil', Icon: CircleUserRoundIcon, path: '/dashboard/profile' },
    { 
  title: 'Feedback',
  Icon: HandshakeIcon,
  path: 'https://docs.google.com/forms/d/e/1FAIpQLSevCvdFvI7NzHpmCvzsqreYMLB1XFJefjbfR6DjXVlWKoINkQ/viewform?usp=dialog',
  target: true
}
];

export default function Sidebar() {
    return (
        <div className="bg-white w-[310px] h-full top-0 left-0 flex-col items-center md:flex hidden relative">
            <div className="py-2"><TopBar/></div>
            <div className="h-px w-[90%] bg-white "></div>
            
            {/* Área do menu com scroll - ocupa espaço disponível */}
            <div className="p-4 pt-0 w-full flex-1 overflow-y-auto">
                <hr className="mb-4 mt-2 border-t-gray-200 "/>
                <ul>
                    {MENU_ROUTES.map(({ title, Icon, path, target }, i) => (
                        <li key={i} className=" border-1 border-gray-400 font-bold rounded-xl px-3 py-2 mb-2 hover:bg-blue-100 ">
                            <a href={path} target={target ? '_blank' : '_self'} className="flex text-gray-500 text-[15px] items-center gap-2 hover:text-blue-500">
                                <Icon size={18} />
                                <span className="truncate">{title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Área do rodapé FIXA - sem posicionamento absoluto */}
            <div className="w-full mt-auto pb-4">
                {/* Mensagem Motivacional - acima do LogoutButton */}
                <div className="px-4 mb-2">
                    <MensageMotivational/>
                </div>
                
                {/* LogoutButton - sem posicionamento absoluto */}
                <div className="px-4">
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}
