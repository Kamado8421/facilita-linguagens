const { PrismaClient } = require("@prisma/client")

const generos = [
    { name: "Poema" },
    { name: "Argumentativo" },
    { name: "Crônica" },
    { name: "Prosa" },
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

const generoId = 'a4459abf-b70c-4488-899b-2a6e0d6de1f2';

const textos = [
    {
        textualGenreId: generoId,
        title: 'Um conto de um dev',
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

criarTextos()