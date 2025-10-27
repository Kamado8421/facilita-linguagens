import Image from "next/image";

export default function TopBar() {
    return (
        <div className="w-full p-2 flex items-center justify-between pl-5 pr-5">
            <h1 className="font-semibold text-blue-500 text-[14px]">Projeto de Inovação <br /> IFMA - Campus Itapecuru Mirim</h1>
            <div className="flex gap-2.5 items-center">
                <div className="flex flex-col items-end">
                    <span><strong>Nome da Pessoa</strong></span>
                    <span className="text-gray-500">XP: XP usuário</span>
                </div>
                <Image
                    src="https://i.pinimg.com/236x/a8/da/22/a8da222be70a71e7858bf752065d5cc3.jpg"
                    alt=""
                    width={50}
                    height={50}
                    style={{ objectFit: "cover", borderRadius: '50%' }}
                />
            </div>
        </div>
    )
}