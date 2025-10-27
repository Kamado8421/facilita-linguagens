'use client';

import Image from "next/image"

import Logo from '@/src/assets/logo.svg';
import LogoutButton from "./logoutButton";

const routes = [
    {}
]

export default function Sidebar() {
    return (
        <div className="bg-blue-500 w-[350px] h-full top-0 left-0 flex flex-col items-center">
            <Image src={Logo} alt="Logo - Facilita Linguagens" width={150} className="mt-2.5" />
            <div className="h-px w-[90%] bg-white mt-2"></div>
            <div className=" p-5">vamos botar os links...</div>
            <div className="relative flex-1 w-full pl-5">
                <LogoutButton titulo="Alguma cooida" algo="algo" />                
            </div>
        </div>  
    )
}