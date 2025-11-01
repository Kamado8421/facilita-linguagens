"use server";

import { auth } from "@/src/lib/auth";
import Image from "next/image";
import MobileSidebar from "../mobile-sidebar";

export default async function TopBar() {

    const session = await auth();

    return (
        <div className="w-full p-2 flex items-center justify-between pl-5 pr-5">
            <h1 className="font-semibold text-blue-500 text-[14px] md:flex hidden">Projeto de Inovação <br /> IFMA - Campus Itapecuru Mirim</h1>
            <MobileSidebar />
            <div className="flex gap-2.5 items-center">
                <div className="flex flex-col items-end">
                    <span><strong>{session?.user.firstName}</strong></span>
                    <span className="text-gray-500">XP: {session?.user.xp}</span>
                </div>
                <Image
                    src={session?.user.profileUrl!}
                    alt=""
                    width={50}
                    height={50}
                    style={{ objectFit: "cover", borderRadius: '50%' }}
                />
            </div>
        </div>
    )
}