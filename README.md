# NLW-AGENTS

**[PT]** Projeto desenvolvido durante um evento da **Rocketseat** utilizando Node.js, TypeScript, Fastify, Drizzle ORM, Zod e PostgreSQL.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Fastify** - Framework web de alta performance
- **Drizzle ORM** - ORM type-safe para TypeScript
- **PostgreSQL** - Banco de dados relacional com extensão pgvector
- **Zod** - Validação de schemas TypeScript-first
- **Docker** - Containerização do banco de dados
- **Biome** - Linter e formatter ultra-rápido

## 📂 Estrutura do Projeto

```
src/
├── db/
│   ├── schema/          # Schemas do banco de dados
│   ├── migrations/      # Migrações do Drizzle
│   ├── connection.ts    # Configuração da conexão
│   └── seed.ts         # Dados de seed
├── http/
│   └── routes/         # Rotas da API
├── env.ts              # Validação de variáveis de ambiente
└── server.ts           # Configuração do servidor
```

## ⚙️ Configuração

### 1. Pré-requisitos

- Node.js 18+
- Docker e Docker Compose

### 2. Instalação

```bash
# Clone o repositório
git clone git@github.com:alyssonbarrera/nlw-agents-server.git
cd nlw-agents-server

# Instale as dependências
npm install
```

### 3. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
```

### 4. Banco de Dados

```bash
# Inicie o PostgreSQL com Docker
docker-compose up -d

# Execute as migrações
npx drizzle-kit migrate

# Popule o banco com dados de seed
npm run db:seed
```

## 🏃 Executando o Projeto

```bash
# Desenvolvimento (com watch mode)
npm run dev

# Produção
npm start
```

O servidor estará disponível em `http://localhost:3333`

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm start` - Executa em modo produção
- `npm run db:seed` - Popula o banco com dados iniciais

## 🛠️ Padrões de Projeto

- **Repository Pattern** - Abstração do acesso aos dados
- **Environment Validation** - Validação de variáveis usando Zod
- **Type-safe API** - Integração Fastify + Zod para validação automática
- **Snake Case Convention** - Convenção de nomenclatura no banco de dados

## 📋 API Endpoints

- `GET /health` - Health check da aplicação
- `GET /rooms` - Lista as salas disponíveis

## 🐳 Docker

O projeto utiliza PostgreSQL com a extensão pgvector rodando em container Docker para funcionalidades de IA e vetorização.

---

## **[EN]** English Version

# NLW-AGENTS

Project developed during a **Rocketseat** event using Node.js, TypeScript, Fastify, Drizzle ORM, Zod, and PostgreSQL.

## 🚀 Technologies

- **Node.js** - JavaScript runtime
- **TypeScript** - JavaScript superset with static typing
- **Fastify** - High-performance web framework
- **Drizzle ORM** - Type-safe ORM for TypeScript
- **PostgreSQL** - Relational database with pgvector extension
- **Zod** - TypeScript-first schema validation
- **Docker** - Database containerization
- **Biome** - Ultra-fast linter and formatter

## 📂 Project Structure

```
src/
├── db/
│   ├── schema/          # Database schemas
│   ├── migrations/      # Drizzle migrations
│   ├── connection.ts    # Connection configuration
│   └── seed.ts         # Seed data
├── http/
│   └── routes/         # API routes
├── env.ts              # Environment variables validation
└── server.ts           # Server configuration
```

## ⚙️ Setup

### 1. Prerequisites

- Node.js 18+
- Docker and Docker Compose

### 2. Installation

```bash
# Clone the repository
git clone git@github.com:alyssonbarrera/nlw-agents-server.git
cd nlw-agents-server

# Install dependencies
npm install
```

### 3. Environment Variables

Create a `.env` file in the project root:

```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
```

### 4. Database

```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Run migrations
npx drizzle-kit migrate

# Seed the database
npm run db:seed
```

## 🏃 Running the Project

```bash
# Development (with watch mode)
npm run dev

# Production
npm start
```

Server will be available at `http://localhost:3333`

## 🔧 Available Scripts

- `npm run dev` - Run in development mode
- `npm start` - Run in production mode
- `npm run db:seed` - Populate database with initial data

## 🛠️ Project Patterns

- **Repository Pattern** - Data access abstraction
- **Environment Validation** - Variable validation using Zod
- **Type-safe API** - Fastify + Zod integration for automatic validation
- **Snake Case Convention** - Database naming convention

## 📋 API Endpoints

- `GET /health` - Application health check
- `GET /rooms` - List available rooms

## 🐳 Docker

The project uses PostgreSQL with pgvector extension running in Docker container for AI and vectorization features.
