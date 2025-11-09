export default function AdminPage() {
    return (
        <div className="flex gap-5 p-10 h-full w-full justify-center items-center flex-col">
            <h1 className="font-bold text-2xl">Painel Administrativo</h1>
            <a
                href="/admin/add-text"
                className="p-5 w-[250px] text-center bg-blue-500 text-white rounded-md"
            >
                Cadastrar Texto
            </a>
            <a
                href="/admin/add-genre"
                className="p-5 w-[250px] text-center bg-blue-500 text-white  rounded-md"
            >
                Cadastrar Gênero
            </a>
            <a
                href="/admin/exec-script"
                className="p-5 w-[250px] text-center bg-blue-500 text-white  rounded-md"
            >
                Executar Script
            </a>
        </div>
    )
}