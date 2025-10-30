const ranking = [
    {id: '1-0-0', username: 'biel24', xp: 1500},
    {id: '2-0-0', username: 'ryan55', xp: 1200},
    {id: '3-0-0', username: 'luhdev', xp: 1000},
] 

// a lista de ranking que o backend envia é nesse mesmo formato (do maior xp ao menor)
// vai ser necessário trabalhar com renderização de lista usando 
// o método .map();. Ele funciona igual um for(), é um laço de repetição
// que percorre cada item da lista e renderiza uma tag html

export default function RankingPage() {
    return <div>Ranking Page</div>;
}