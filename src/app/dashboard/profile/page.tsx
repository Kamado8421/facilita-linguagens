import PopUp from "@/src/components/pop-up";
import { auth } from "@/src/lib/auth";
import Image from "next/image";
import ChangerPasswordButton from "./changerPasswordButton";

export default async function ProfilePage() {

    const session = await auth();

    return (
        <div className="w-full h-auto md:pl-5 md:pr-5">
            <div className="p-10 flex gap-10 items-center bg-white rounded-[50px] shadow-md mt-5">
                <Image
                    src={session?.user.profileUrl!}
                    alt="Foto de usuário"
                    width={150}
                    height={150}
                    style={{ borderRadius: '50%' }}
                    className="border-4 border-blue-500 p-1"
                />
                <div>
                    <h1 className="text-3xl mb-2"><strong>{session?.user.firstName}</strong></h1>
                    <span className="text-gray-500">Estudante dedicado aos gêneros textuais.</span>
                </div>
            </div>
            <div className="w-full flex gap-2.5 md:flex-row flex-col mt-5">
                <div className="bg-white rounded-[50px] p-2 pl-5 pr-5 flex items-center justify-between w-full shadow-md">
                    <span className="text-blue-500 font-semibold">E-mail:</span>
                    <span className="text-gray-500">Não informado</span>
                </div>
                <div className="bg-white rounded-[50px] p-3 pl-5 pr-5 flex items-center justify-between w-full shadow-md">
                    <span className="text-gray-500">Precisa trocar sua senha?</span>
                    <ChangerPasswordButton />
                </div>
            </div>
        </div>
    )

}