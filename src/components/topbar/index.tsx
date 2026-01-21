"use client";

import Image from "next/image";
import MobileSidebar from "../mobile-sidebar";
import { URL_DEFAULT_PROFILE } from "@/src/constants";
import { Suspense, useEffect, useState } from "react";
import { fetchXp } from "./fetch";

export default function TopBar() {

    const [xp, setXp] = useState(0);
    const [firstName, setFirstName] = useState('Gabriel Rodrigues');
    const [profileUrl, setProfileUrl] = useState(URL_DEFAULT_PROFILE);

    useEffect(() => {
        (async () => {
            const res = await fetchXp();

            if (!res.success) {
                return;
            }

            setXp(res.xp || 0);
            setFirstName(res.firstName || 'Não encontrado!');
            setProfileUrl(res.image || URL_DEFAULT_PROFILE);

        })();
    }, []);

    return (
        <div className="w-full p-2 flex items-center justify-between pl-6 pr-5">
           
            <MobileSidebar />
            <Suspense fallback={<span>Buscando...</span>}>
                <div >
                    <div className="flex gap-2.5 items-center  ">
                        <a href="/dashboard/profile" target="_self" className="border-blue-500 border-3 rounded-4xl">
                            <Image
                                src={profileUrl}
                                alt="Profile Picture"
                                width={50}
                                height={50}
                                style={{ objectFit: "cover", borderRadius: '50%' }}
                            />
                        </a>
                        <div className="flex flex-col items-start">
                            <span><strong>{firstName}</strong></span>
                            {/*Experiência do jogador ainda em forma de XP, pois não foi delimitado XP por nível*/}
                            <span className="text-gray-400">XP: {xp}</span>
                        </div>
                    </div>
                    <h1 className="font-bold text-blue-500 text-[17px] md:flex hidden relative left-7 top-2  ">
                        Facilita Linguagens
                    </h1>
                </div>
            </Suspense>
        </div>
    )
}