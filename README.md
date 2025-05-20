# API de Gerenciamento Financeiro

Este projeto é uma API para gerenciamento financeiro pessoal, com funcionalidades básicas para cadastro de usuário, autenticação, controle de transações financeiras e geração de relatórios financeiros.

---

## Funcionalidades Principais (MVP)

### Usuário

- **POST /register**  
  Cadastro de usuário.

- **POST /login**  
  Login do usuário e geração de token JWT para autenticação.

- **PUT /login/:id**  
  Alterar nome do usuário.

- **DELETE /login/:id**  
  Deletar conta do usuário.

- **Middleware de autenticação**  
  Garante segurança nas rotas protegidas.

---

### Transações

- **POST /transactions**  
  Criar uma transação (entrada ou saída).

- **GET /transactions**  
  Listar todas as transações do usuário autenticado.

- **GET /transactions/:id**  
  Obter detalhes de uma transação específica.

- **PUT /transactions/:id**  
  Atualizar uma transação existente.

- **DELETE /transactions/:id**  
  Deletar uma transação.

---

#### Campos de uma transação

- 
- Valor  
- Tipo (Entrada ou Saída)  
- Categoria  
- Data  
- Descrição (opcional)  

---

### Resumo Financeiro

- **GET /summary**  
  Retorna um resumo financeiro do usuário, incluindo:  
  - Saldo atual  
  - Total de entradas, saídas e gastos por categoria  
  - Entrada e saída com maior valor  

---

### Filtros e Relatórios

- **GET /transactions?month=YYYY-MM**  
  Filtra transações por ano e mês.

- **GET /transactions?type=Entrada**  
  Filtra transações por tipo.

- **GET /transactions?category=Alimentação**  
  Filtra transações por categoria.

---

## Tecnologias Utilizadas

- Node.js  
- Express  
- Sequelize (ORM para banco de dados relacional)  
- JWT para autenticação  

---

## Testes com Insomnia

Para garantir o funcionamento correto da API, foram realizados testes utilizando o Insomnia, ferramenta que permite simular requisições HTTP de forma prática.  

Com o Insomnia, foram testados todos os endpoints principais, incluindo:  
- Cadastro e autenticação de usuários (POST /register, POST /login)  
- Criação, listagem, atualização e exclusão de transações  
- Filtragem de transações por data, tipo e categoria  
- Geração do resumo financeiro  

Esses testes garantem que as respostas da API estejam corretas, com tratamento adequado de erros e autenticação segura via token JWT.
