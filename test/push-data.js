const { PrismaClient } = require("@prisma/client")

const generos = [
    { name: "Conto" },
]

const prisma = new PrismaClient();

async function criarGeneros() {
    await prisma.textualGenre.createMany({
        data: generos
    });

    console.log(await prisma.textualGenre.findMany());
}

async function buscargenero() {
    console.log(await prisma.textualGenre.findMany());
}

const generoId = '66ae709f-489b-4358-af00-110624185aa8';

const textos = [
    {
        textualGenreId: generoId,
        title: 'Conto 1',
        content: 'Meu texto em string',
        author: undefined,
    },    {
        textualGenreId: generoId,
        title: 'Conto 2',
        content: 'Meu texto em string',
        author: undefined,
    },    {
        textualGenreId: generoId,
        title: 'Conto 3',
        content: 'Meu texto em string',
        author: undefined,
    },    {
        textualGenreId: generoId,
        title: 'Conto 4',
        content: 'Meu texto em string',
        author: undefined,
    },    {
        textualGenreId: generoId,
        title: 'Conto 5',
        content: 'Meu texto em string',
        author: undefined,
    }
]

/*
Padrão:
{
    textualGenreId: generoId,
    title: '',
    content: ``,
    author: undefined // se tiver autor: 'nome do autor',
}
*/

async function criarTextos() {
    await prisma.text.createMany({
        data: textos
    });

}

criarTextos();