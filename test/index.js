const { GoogleGenAI } = require("@google/genai");

const apiKey = '';
const ai = new GoogleGenAI({apiKey});

const text = `Uma vez houve três dias de festa no céu; todos os bichos lá foram; mas nos dois primeiros dias o cágado não pôde ir, por andar muito devagar. Quando os outros vinham de volta, ele ia no meio do caminho. No último dia, mostrando ele grande vontade de ir, a garça se ofereceu para levá-los nas costas. O cágado aceitou, e montou-se; mas a malvada ia sempre perguntando se ele ainda via a terra, e quando o cágado disse que não avistava mais a terra, ela o largou no ar e o pobre veio rolando e dizendo:
“Léu, léu, léu, Se eu desta escapar, Nunca mais bodas ao céu...”
E também: “Arredem-se, pedras, paus, senão vos quebrareis.” As pedras e paus se afastaram, e ele caiu; porém todo arrebentado. Deus teve pena e juntou os pedacinhos e deu-lhe de novo a vida em paga da grande vontade que ele teve de ir ao céu. Por isso é que o cágado tem o casco em forma de remendos.
(Monteiro Lobato. Histórias da Tia Nastácia)
O conto popular O cágado e a festa no céu é da região de Sergipe e conta com um único personagem principal, o cágado. Nesse caso, a história procura explicar para o leitor uma característica presente no mundo real - o fato do cágado ter o casco em formato de gomos.
Assim como grande parte dos contos populares, não se sabe bem quem é o autor da história uma vez que ela é transmitida de forma oral, sendo contada de geração em geração.
Apesar de terem nascido na tradição oral e permanecido vivos graças aos contadores de histórias, muitos desses contos - inclusive O cágado e a festa no céu - foram sendo também registrado em livros.
No caso da história do cágado, há um rápido despertar de interesse do leitor, que se identifica rapidamente com o conteúdo porque ele mistura realidade e ficção. O casco do cágado, por exemplo, é sabido que tem formato remendado - elemento do mundo real. O conto, por sua vez, ficcionaliza a razão desse formato ao contar a história de uma festa no céu e de uma garça maldosa.
`

const prompt = `
Você é um especialista em linguagens, literatura e interpretação de textos. 
Seu papel é ajudar alunos a se prepararem para o ENEM de forma acessível e prática.

Ao receber um texto, você deve:
1. Ler e compreender o conteúdo.
2. Criar uma única pergunta de interpretação ou linguagem no estilo do ENEM, mas simples o suficiente para alunos em fase inicial de estudo.
3. Gerar três alternativas de resposta (claras e curtas).
4. Indicar qual delas é a correta.

Regras obrigatórias:
- Sempre responda somente em formato JSON.
- Nunca altere a estrutura ou os nomes das chaves.
- Não adicione explicações, comentários ou texto fora do JSON.
- As perguntas e alternativas devem estar escritas em português do Brasil (pt-BR).
- O valor de "correctAnswer" deve ser o índice (0, 1 ou 2) da alternativa correta.

Estrutura de resposta JSON obrigatória:
(OBS: NÃO USE FORMATAÇÃO MARKDOWN)

{
  "question": "Sua questão aqui",
  "alternatives": ["alternativa 1", "alternativa 2", "alternativa 3"],
  "correctAnswer": 0
}

TEXT para resposta: ${text}
`

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(JSON.parse((response.text.toString().replace('json', '').replace('`', '').trim())));
}

main();