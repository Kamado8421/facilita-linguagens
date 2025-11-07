const ranking = [
    {id: '1-0-0', username: 'biel24', xp: 1500},
    {id: '2-0-0', username: 'ryan55', xp: 1200},
    {id: '3-0-0', username: 'luhdev', xp: 1000},
] 

export default function RankingPage() {
    return (
        <div className="m-3 sm:m-7 mt-4 sm:mt-6">
            <header className="mb-4">
                <br />
                <h1 className="text-2xl sm:text-4xl text-blue-500 font-bold mb-3">Ranking Geral</h1>
                <p className="mb-1.5 text-gray-600 text-sm sm:text-base">
                    Mostre o quanto você está empenhado para as outras pessoas. Faça leituras e <br className="hidden sm:block" />
                    conquistes as melhores posições nos rankings
                </p>
            </header>
            <main>
                <br />
                <br />
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-2">
                    <div className="bg-gray-50 text-green-600 py-2 w-full sm:w-62 sm:mr-2.5 rounded-2xl text-center font-bold text-sm sm:text-base">
                        Sua posição: 10°
                    </div>
                    <div className="bg-blue-500 text-white py-2 w-full sm:w-62 rounded-2xl text-center font-bold text-sm sm:text-base">
                        <a href="" target="_self">Iniciar leitura</a>
                    </div>
                </div>
                <div className="h-72 sm:h-89 overflow-scroll border border-blue-500 rounded-lg sm:border-0 sm:rounded-none">
                    <div className="bg-blue-500 text-center text-white font-bold py-2 text-sm sm:text-base">
                        Dedicação Honrosa - Melhores Colocados
                    </div>
                    <div className="font-bold relative">
                        <ul>
                            <li className="bg-gray-400 py-3 px-4 sm:px-6">
                                <span className="static mr-4 sm:mr-8">1°</span>
                                <span className="">user</span>
                                <span className="font-normal absolute right-3 sm:right-7">XP: y</span>
                            </li>

                            <li className="bg-white py-3 px-4 sm:px-6">
                               <span className="static mr-4 sm:mr-8">2°</span>
                                <span className="">user</span>
                                <span className="font-normal absolute right-3 sm:right-7">XP: y</span>
                            </li>

                            <li className="bg-gray-400 py-3 px-4 sm:px-6">
                                <span className="static mr-4 sm:mr-8">3°</span>
                                <span className="">user</span>
                                <span className="font-normal absolute right-3 sm:right-7">XP: y</span>
                            </li>
                        </ul>
                        <div className="bg-orange-600 text-white text-center py-3 px-4 text-sm sm:text-base">
                            <span>Zona de conforto</span>
                        </div>
                        <ul>
                            <li className="bg-gray-400 py-3 px-4 sm:px-6">
                               <span className="static mr-3 sm:mr-6">50°</span>
                                <span className="">user</span>
                                <span className="font-normal absolute right-3 sm:right-7">XP: y</span>
                            </li>

                            <li className="bg-white py-3 px-4 sm:px-6">
                                <span className="static mr-3 sm:mr-6">51°</span>
                                <span className="">user</span>
                                <span className="font-normal absolute right-3 sm:right-7">XP: y</span>
                            </li>

                            <li className="bg-gray-400 py-3 px-4 sm:px-6">
                               <span className="static mr-3 sm:mr-6">52°</span>
                                <span className="">user</span>
                                <span className="font-normal absolute right-3 sm:right-7">XP: y</span>
                            </li>

                            <li className="bg-white py-3 px-4 sm:px-6">
                                <span className="static mr-3 sm:mr-6">53°</span>
                                <span className="">user</span>
                                <span className="font-normal absolute right-3 sm:right-7">XP: y</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>    
    );
}
