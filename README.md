# ☕ Debug Café API

**Debug Café API** é o backend que alimenta o aplicativo de delivery **Debug Café**. Desenvolvido com foco em escalabilidade e segurança, este servidor utiliza tecnologias modernas como **Node.js**, **NestJS**, **Prisma** e autenticação JWT.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: para um backend rápido e eficiente.
- **NestJS**: framework modular para organização e escalabilidade.
- **Express**: camada leve para manipulação de rotas e middlewares.
- **Prisma**: ORM poderoso para gerenciamento de banco de dados.
- **bcrypt**: para criptografia segura de senhas.
- **JSON Web Token (JWT)**: para autenticação baseada em token.

## 📂 Estrutura do Projeto

- **/prisma**: gerenciamento do schema e migrações do banco de dados.
- **/src**
  - **address**: gerenciamento de endereços de usuários.
  - **auth**: gerenciamento de autenticação e middleware de proteção.
  - **category**: gerenciamento de categorias de produtos no menu.
  - **credit-card**: gerenciamento de cartões de crédito de usuários.
  - **order**: gerenciamento de pedidos e status.
  - **order-feedbacl**: gerenciamento de avaliações de pedidos.
  - **product**: gerenciamento de produtos disponíveis no menu.
  - **user**: criação e edição de usuários.

## 🔧 Configuração

### 1. Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **PostgreSQL** (ou outro banco de dados suportado pelo Prisma)

### 2. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (altere a URL do banco com seus dados):

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/debug_cafe
JWT_SECRET=sua_chave_secreta
```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/ycarlosedu/debug-cafe-server.git
```

2. Acesse o diretório:

```bash
cd debug-cafe-server
```

3. Instale as dependências:

```bash
npm install
```

4. Configure o Prisma:

```bash
npx prisma migrate dev
```

5. Popular banco de dados com seeds:

```bash
npx prisma db seed
```

6. Inicie o servidor:

```bash
npm run start:dev
```

7. Ver banco de dados no Prisma Studio:

```bash
npx prisma studio
```

## 📄 Licença

Este projeto é licenciado sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 💌 Contato

Criado por [Carlos Silva](https://www.linkedin.com/in/silvacarlosoliveira/). Entre em contato para dúvidas ou sugestões!
