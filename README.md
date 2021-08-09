# Hivelabs API
## Api de usuários

Tabela de conteúdos
=================
<!--ts-->
   * [Pré-requisitos](#Pré-requisitos)
   * [Instalação](#Instalação)
   * [Tecnologias](#Tecnologias)
<!--te-->

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/)

[Docker](https://www.docker.com/)

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Instalação

```bash
# Clone este repositório
$ git clone <https://github.com/caions/Test-Hivelabs.git>

# Instale as dependências
$ npm install ou yarn install

# Rode as migrations para criar a tabela 'user' no banco de dados
$ yarn typeorm migration:run

# Crie uma imagem do banco postgres
docker run --name hivelabs_testevaga -e POSTGRES_PASSWORD=docker -p 5434:5432 -d postgres

# No seu gerenciador de banco de dados crie uma conexão com a porta 5434

# Gere a documentação da api com o swagger
$ yarn doc ou npm run doc

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server ou yarn dev:server

# O servidor inciará na porta:3333 - acesse e teste a api na rota
# <http://localhost:3333/doc>
```

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js]
- [TypeScript]
- [TypeOrm]
- [Express]
- [Swagger-autogen]
