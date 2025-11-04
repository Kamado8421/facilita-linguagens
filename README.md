# Facilita Linguagem - Documentação
Aqui está algumas orientações:
## Download do Repositório
Para instalar o projeto use no teminal de vocês (escolham aonde rodar esse comando, se na área de trabalho e outra pasta...)
```bash
git clone https://github.com/Kamado8421/facilita-linguagens.git
```
⚠️ Se ocorrer algum erro de autenticação, busquem no YouTube como configurar chave ssh no github pelo Windows ou Linux e me avisem.
(É uma chave que garantem que você podem fazer alterações no projeto). Se for um erro diferente, me mandem.

## Instalar Dependências
Esse comando gera uma pasta chamada `node_modules`
```bash
npm install
```

## Configuração do Prisma
Primeiro, renomeie o arquivo `env.exemple` para `.env`. Após, execute esses comandos:
Crie uma Client do prisma

```bash 
npx prisma generate
```
Para subir/criar as tabelas do banco de dados:
```bash 
npx prisma migrate dev --name init
```
se esse comando der erro, use:
```bash 
npx prisma migrate dev 
```
Após ele, aparecerá uma linha para digitar um nome, escreva o nome da sua branch.

## Rodar o projeto
```bash
npm run dev
```

## Comando do Prisma Studio
Comando para rodar aquela interface de navegador do banco de dados
```bash
npx prisma studio
```
