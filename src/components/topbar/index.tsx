"use client";

import Image from "next/image";
import MobileSidebar from "../mobile-sidebar";
import { URL_DEFAULT_PROFILE } from "@/src/constants";
import { Suspense, useEffect, useState } from "react";
import { fetchXp } from "./fetch";

export default function TopBar() {

    const [xp, setXp] = useState(0);
    const [firstName, setFirstName] = useState('...');
    const [profileUrl, setProfileUrl] = useState('');

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
        <div className="w-full p-2 flex items-center justify-between pl-5 pr-5">
            <h1 className="font-semibold text-blue-500 text-[14px] md:flex hidden">Projeto de Inovação <br /> IFMA - Campus Itapecuru Mirim</h1>
            <MobileSidebar />
            <Suspense fallback={<span>Buscando...</span>}>
                <div className="flex gap-2.5 items-center">
                    <div className="flex flex-col items-end">
                        <span><strong>{firstName}</strong></span>
                        <span className="text-gray-500">XP: {xp}</span>
                    </div>
                    <a href="/dashboard/profile" target="_self">
                        <Image
                            src={profileUrl}
                            alt=""
                            width={50}
                            height={50}
                            style={{ objectFit: "cover", borderRadius: '50%' }}
                        />
                    </a>
                </div>
            </Suspense>
        </div>
    )
}