# Movie-App

**Movie-App** é um site para explorar filmes, séries e atores. Os usuários podem criar uma conta, fazer login, pesquisar filmes e séries, e adicionar itens à sua watchlist pessoal.

## 🌐 Acesse o Site em Produção

O site está disponível no link abaixo:  
[🔗 Acesse o site](https://movie-app-delta-tan.vercel.app/)


## Funcionalidades

- **Cadastro e Login de Usuários**: Crie uma conta ou faça login para acessar suas funcionalidades personalizadas.
- **Pesquisa de Filmes, Séries e Atores**: Pesquise e explore informações sobre filmes, séries e atores utilizando a API do TMDb.
- **Watchlist**: Adicione filmes e séries à sua watchlist para acompanhar os que deseja assistir.
- **Detalhes de Filmes e Séries**: Veja sinopses, trailers, avaliações e muito mais, tudo acessado por meio da API do TMDb.

## Tecnologias Utilizadas

- **Frontend**: React
- **API de Dados**: TMDb (The Movie Database)
- **Banco de Dados**: Supabase (para autenticação e armazenamento de dados)
- **Autenticação**: JWT (JSON Web Tokens) para login e autenticação
- **Estilização**: CSS, styled-components

## Como Funciona

A aplicação utiliza a **API do TMDb** para buscar informações sobre filmes, séries e atores. A autenticação dos usuários é feita via **Supabase**, que também armazena a watchlist do usuário.

### Endpoints da API do TMDb

Aqui estão alguns dos principais endpoints utilizados na aplicação:

1. **Buscar filmes**: `/search/movie`
2. **Buscar séries**: `/search/tv`
3. **Buscar atores**: `/search/person`
4. **Detalhes do filme**: `/movie/{movie_id}`
5. **Detalhes da série**: `/tv/{tv_id}`

Para mais informações sobre os endpoints, consulte a [documentação da API do TMDb](https://www.themoviedb.org/documentation/api).

## Instalação

### Requisitos

- **Node.js** (v22 ou superior)
- **NPM**
- Banco de dados configurado Supabase

### Passos para rodar o projeto localmente

1. Clone o repositório:

    ```sh
   git clone https://github.com/GabrielHenrique16y/Movie_app.git
   cd Movie_app
    ```

2. Instale as dependências:

    ```sh
    npm install
    ```

3. Inicie o projeto:

    ```sh
    npm run dev
    ```

4. Acesse o site em http://localhost:5173.

## 🙋‍♂️ Autor

Feito por **Gabriel Henrique Jenuino**.  
Este site foi criado como um projeto de estudo e pode ser utilizado como referência para futuras implementações.
