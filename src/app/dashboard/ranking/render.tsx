export default function RenderRanking({ ranking, userId }: { ranking: { id: string, username: string, xp: number }[], userId: string }) {

    const sortedRanking = [...ranking].sort((a, b) => b.xp - a.xp);

    let topList = [];
    let bottomList = [];

    if (sortedRanking.length > 20) {
        // Caso A → Mais de 20
        topList = sortedRanking.slice(0, 20);
        bottomList = sortedRanking.slice(20);
    } else {
        // Caso B → 20 ou menos → divide no meio
        const half = Math.ceil(sortedRanking.length / 2);
        topList = sortedRanking.slice(0, half);
        bottomList = sortedRanking.slice(half);
    }
    return (

        <main>
            <br />
            <br />

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-2">
                <div className="bg-gray-50 text-green-600 py-2 w-full sm:w-62 sm:mr-2.5 rounded-2xl text-center font-bold text-sm sm:text-base">
                    Sua posição: 10°
                </div>
                <div className="bg-blue-500 text-white py-2 w-full sm:w-62 rounded-2xl text-center font-bold text-sm sm:text-base">
                    <a href="/dashboard/select-reading" target="_self">Iniciar leitura</a>
                </div>
            </div>

            {/* Container Rolável */}
            <div className="h-72 sm:h-89 overflow-scroll border border-blue-500 rounded-lg sm:border-0 sm:rounded-none">

                {/* Título Honrosa */}
                <div className="bg-blue-500 text-center text-white font-bold py-2 text-sm sm:text-base">
                    Dedicação Honrosa - Melhores Colocados
                </div>

                <ul className="font-bold relative">
                    {topList.map((item, index) => (
                        <li
                            key={item.id}
                            className={`${userId === item.id ? 'bg-green-200' : index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"} py-3 px-4 sm:px-6`}
                        >
                            <span className="static mr-4 sm:mr-8">{index + 1}°</span>
                            <span>{item.username}</span>
                            <span className="font-normal absolute right-3 sm:right-7">XP: {item.xp}</span>
                        </li>
                    ))}
                </ul>

                {/* Título Conforto */}
                <div className="bg-orange-600 text-white text-center py-3 px-4 text-sm sm:text-base">
                    <span className="font-bold">Zona de conforto</span>
                </div>

                <ul className="font-bold relative">
                    {bottomList.map((item, i) => (
                        <li
                            key={item.id}
                            className={`${userId === item.id ? 'bg-green-200' : i % 2 === 0 ? "bg-gray-300" : "bg-gray-200"} py-3 px-4 sm:px-6`}
                        >
                            <span className="static mr-3 sm:mr-6">
                                {topList.length + i + 1}°
                            </span>
                            <span>{item.username}</span>
                            <span className="font-normal absolute right-3 sm:right-7">XP: {item.xp}</span>
                        </li>
                    ))}
                </ul>

            </div>
        </main>

    )
}