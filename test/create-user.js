const usuario = {
    nome: 'Carlos',
    sobrenome: 'Pereira',
    senha: '123456',
    username: 'cp0129',
    xp: 5000
}

fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        firstName: `${usuario.nome} ${usuario.sobrenome}`,
        username: usuario.username,
        password: usuario.senha,
        xp: usuario.xp,
    }),
})
    .then((res) => res.json())
    .then((data) => {
        console.log('Resultado: ', data)
    });
