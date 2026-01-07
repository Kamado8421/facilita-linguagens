'use client';
import Image from "next/image";
import Logo from '@/src/assets/logo.svg';
import LogoutButton from "./logoutButton";
import { BookMarkedIcon, CircleUserRoundIcon, HandshakeIcon, HomeIcon, TrophyIcon, LayoutDashboard, CircleStar,FileClock } from "lucide-react";
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
    { title: 'Histórico de Leitura', Icon: FileClock, path: '' }, //Não há página de Histórico ainda. Antigo diretório desse path: '/dashboard/select-reading'
    { title: 'Ranking', Icon: TrophyIcon, path: '/dashboard/ranking' },
    { title: 'Conquistas', Icon: CircleStar, path: '' }, //Não há página de conquistas ainda. Antigo diretório desse path: '/dashboard/ranking'
    { title: 'Perfil', Icon: CircleUserRoundIcon, path: '/dashboard/profile' },
    
    //Feedback ---- { title: 'Feedback', Icon: HandshakeIcon, path: 'https://forms.gle/BH6YJmzirzTqCutn9', target: true }, 
];

export default function Sidebar() {
    return (
        <div className="bg-white w-[350px] h-full top-0 left-0 flex-col items-center md:flex hidden">
            <TopBar/>
            <div className="h-px w-[90%] bg-white "></div>
            <div className="p-5 pt-0 w-full ">
                <hr className="mb-5 mt-3 border-t-gray-200 "/>
                <ul>
                    {MENU_ROUTES.map(({ title, Icon, path, target }, i) => (
                        <li key={i} className=" border-1 border-gray-400  font-bold  rounded-2xl px-3 py-2 mb-2   hover:bg-blue-100 ">
                            <a href={path} target={target ? '_blank' : '_self'} className="flex text-gray-500 text-[18px] items-center gap-2 hover:text-blue-500">
                                <Icon />
                                <span>{title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {/*Mensagem motivacional ùnica */}
                <MensageMotivational/>
            </div>
            <div className="relative flex-1 w-full pl-5">
                <LogoutButton />
            </div>
        </div>
    );
}
