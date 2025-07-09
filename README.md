# 🤖 NLW-AGENTS

**[PT]** Sistema inteligente de Q&A baseado em áudio desenvolvido durante um evento da **Rocketseat**. Uma aplicação que combina **transcrição de áudio**, **busca semântica** e **IA generativa** para criar experiências interativas de aprendizado.

## ✨ Funcionalidades

- 🎤 **Transcrição Automática** - Converte áudio em texto usando Gemini AI
- 🔍 **Busca Semântica** - Encontra conteúdo relevante através de embeddings
- 🤖 **Respostas Inteligentes** - Gera respostas contextualizadas com IA
- 📚 **Salas de Estudo** - Organiza conteúdo por temas ou assuntos
- ⚡ **Vetorização** - Armazena embeddings para busca ultra-rápida
- 🎯 **API RESTful** - Interface completa para integração

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript de alta performance
- **TypeScript** - Superset com tipagem estática
- **Fastify** - Framework web ultra-rápido
- **Drizzle ORM** - ORM type-safe para TypeScript
- **PostgreSQL + pgvector** - Banco vetorial para embeddings
- **Gemini AI** - IA do Google para transcrição e geração
- **Zod** - Validação de schemas TypeScript-first
- **Docker** - Containerização completa
- **Biome** - Linter e formatter moderno

## 🏗️ Arquitetura

O sistema processa áudio através de um pipeline inteligente:

1. **Upload de Áudio** → Transcrição via Gemini AI
2. **Geração de Embeddings** → Vetorização do texto
3. **Armazenamento** → Persistência no PostgreSQL + pgvector
4. **Busca Semântica** → Recuperação por similaridade
5. **Geração de Resposta** → IA contextualizada

## 📂 Estrutura do Projeto

```
src/
├── db/
│   ├── schema/
│   │   ├── rooms.ts         # Schema das salas de estudo
│   │   ├── questions.ts     # Schema das perguntas e respostas
│   │   ├── audio-chunks.ts  # Schema dos chunks de áudio com embeddings
│   │   └── index.ts         # Exportação dos schemas
│   ├── migrations/          # Migrações do Drizzle
│   ├── connection.ts        # Configuração da conexão
│   └── seed.ts             # Dados de seed para desenvolvimento
├── http/
│   └── routes/
│       ├── create-room.ts           # Criação de salas
│       ├── get-rooms.ts             # Listagem de salas
│       ├── upload-audio.ts          # Upload e processamento de áudio
│       ├── create-question.ts       # Perguntas com busca semântica
│       └── get-room-questions.ts    # Histórico de perguntas
├── services/
│   └── gemini.ts           # Integração com Gemini AI
├── env.ts                  # Validação de variáveis de ambiente
└── server.ts              # Configuração do servidor Fastify
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
# Configuração do servidor
PORT=3333

# Banco de dados PostgreSQL com pgvector
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents

# Chave da API do Gemini (obtenha em: https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=sua_chave_aqui
```

### 4. Banco de Dados

```bash
# Inicie o PostgreSQL com pgvector via Docker
docker-compose up -d

# Execute as migrações
npx drizzle-kit migrate

# Popule o banco com dados de seed (opcional)
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

- `npm run dev` - Executa em modo desenvolvimento com watch
- `npm start` - Executa em modo produção
- `npm run db:seed` - Popula o banco com dados iniciais
- `npm run db:generate` - Gera novas migrações
- `npm run db:migrate` - Executa migrações pendentes
- `npm run db:studio` - Abre o Drizzle Studio (GUI do banco)

## 🛠️ Padrões de Projeto

- **Repository Pattern** - Abstração do acesso aos dados
- **Environment Validation** - Validação de variáveis usando Zod
- **Type-safe API** - Integração Fastify + Zod para validação automática
- **Snake Case Convention** - Convenção de nomenclatura no banco de dados
- **Vector Similarity Search** - Busca semântica com pgvector
- **RAG Architecture** - Retrieval-Augmented Generation para respostas contextualizadas

## 📋 API Endpoints

### Salas (Rooms)
- `GET /health` - Health check da aplicação
- `GET /rooms` - Lista todas as salas com contagem de perguntas
- `POST /rooms` - Cria uma nova sala de estudo

### Áudio e Transcrição
- `POST /rooms/:roomId/audio` - Upload de áudio para transcrição e vetorização

### Perguntas e Respostas
- `GET /rooms/:roomId/questions` - Lista perguntas de uma sala
- `POST /rooms/:roomId/questions` - Cria pergunta com busca semântica e resposta IA

## 🎯 Como Funciona

### 1. Upload de Áudio
```bash
curl -X POST \
  http://localhost:3333/rooms/{roomId}/audio \
  -F "file=@audio.mp3"
```

O sistema:
- Transcreve o áudio usando Gemini AI
- Gera embeddings do texto transcrito
- Armazena no banco com vetores para busca

### 2. Fazer Pergunta
```bash
curl -X POST \
  http://localhost:3333/rooms/{roomId}/questions \
  -H "Content-Type: application/json" \
  -d '{"question": "Qual o conceito de X?"}'
```

O sistema:
- Gera embeddings da pergunta
- Busca chunks similares (threshold > 0.7)
- Gera resposta contextualizada com IA
- Armazena pergunta e resposta

## 🔍 Tecnologias de IA

### Gemini AI Integration
- **Transcrição**: `gemini-2.5-flash` para converter áudio em texto
- **Embeddings**: `text-embedding-004` para vetorização semântica
- **Respostas**: `gemini-2.5-flash` para geração contextualizada

### Busca Vetorial
- **pgvector**: Extensão PostgreSQL para operações vetoriais
- **Dimensões**: 768 dimensões por embedding
- **Similaridade**: Cosseno similarity com threshold de 0.7
- **Limite**: Top 5 chunks mais similares para contexto

## 🐳 Docker

O projeto utiliza **PostgreSQL 17** com a extensão **pgvector** para operações vetoriais de alta performance. A configuração inclui:

- Banco de dados preparado para embeddings
- Extensão pgvector habilitada automaticamente
- Dados persistentes para desenvolvimento

## 📊 Banco de Dados

### Schema Principal

```sql
-- Salas de estudo
rooms {
  id: UUID (PK)
  name: TEXT
  description: TEXT?
  created_at: TIMESTAMP
}

-- Chunks de áudio processados
audio_chunks {
  id: UUID (PK)
  room_id: UUID (FK → rooms.id)
  transcription: TEXT
  embeddings: VECTOR(768)
  created_at: TIMESTAMP
}

-- Perguntas e respostas
questions {
  id: UUID (PK)
  room_id: UUID (FK → rooms.id)
  question: TEXT
  answer: TEXT?
  created_at: TIMESTAMP
}
```

## 🎨 Exemplo de Uso

1. **Crie uma sala de estudo**
2. **Faça upload de áudios** (aulas, palestras, podcasts)
3. **Faça perguntas** sobre o conteúdo
4. **Receba respostas contextualizadas** baseadas no áudio

---

## **[EN]** English Version

# 🤖 NLW-AGENTS

Intelligent audio-based Q&A system developed during a **Rocketseat** event. An application that combines **audio transcription**, **semantic search**, and **generative AI** to create interactive learning experiences.

## ✨ Features

- 🎤 **Automatic Transcription** - Converts audio to text using Gemini AI
- 🔍 **Semantic Search** - Finds relevant content through embeddings
- 🤖 **Intelligent Answers** - Generates contextualized responses with AI
- 📚 **Study Rooms** - Organizes content by topics or subjects
- ⚡ **Vectorization** - Stores embeddings for ultra-fast search
- 🎯 **RESTful API** - Complete interface for integration

## 🚀 Technologies

- **Node.js** - High-performance JavaScript runtime
- **TypeScript** - Superset with static typing
- **Fastify** - Ultra-fast web framework
- **Drizzle ORM** - Type-safe ORM for TypeScript
- **PostgreSQL + pgvector** - Vector database for embeddings
- **Gemini AI** - Google's AI for transcription and generation
- **Zod** - TypeScript-first schema validation
- **Docker** - Complete containerization
- **Biome** - Modern linter and formatter

## 🏗️ Architecture

The system processes audio through an intelligent pipeline:

1. **Audio Upload** → Transcription via Gemini AI
2. **Embedding Generation** → Text vectorization
3. **Storage** → Persistence in PostgreSQL + pgvector
4. **Semantic Search** → Similarity-based retrieval
5. **Response Generation** → Contextualized AI

## 📂 Project Structure

```
src/
├── db/
│   ├── schema/
│   │   ├── rooms.ts         # Study rooms schema
│   │   ├── questions.ts     # Questions and answers schema
│   │   ├── audio-chunks.ts  # Audio chunks with embeddings schema
│   │   └── index.ts         # Schema exports
│   ├── migrations/          # Drizzle migrations
│   ├── connection.ts        # Connection configuration
│   └── seed.ts             # Seed data for development
├── http/
│   └── routes/
│       ├── create-room.ts           # Room creation
│       ├── get-rooms.ts             # Room listing
│       ├── upload-audio.ts          # Audio upload and processing
│       ├── create-question.ts       # Questions with semantic search
│       └── get-room-questions.ts    # Question history
├── services/
│   └── gemini.ts           # Gemini AI integration
├── env.ts                  # Environment variables validation
└── server.ts              # Fastify server configuration
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
# Server configuration
PORT=3333

# PostgreSQL database with pgvector
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents

# Gemini API key (get at: https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=your_key_here
```

### 4. Database

```bash
# Start PostgreSQL with pgvector via Docker
docker-compose up -d

# Run migrations
npx drizzle-kit migrate

# Seed the database (optional)
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

- `npm run dev` - Run in development mode with watch
- `npm start` - Run in production mode
- `npm run db:seed` - Populate database with initial data
- `npm run db:generate` - Generate new migrations
- `npm run db:migrate` - Run pending migrations
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## 🛠️ Project Patterns

- **Repository Pattern** - Data access abstraction
- **Environment Validation** - Variable validation using Zod
- **Type-safe API** - Fastify + Zod integration for automatic validation
- **Snake Case Convention** - Database naming convention
- **Vector Similarity Search** - Semantic search with pgvector
- **RAG Architecture** - Retrieval-Augmented Generation for contextualized responses

## 📋 API Endpoints

### Rooms
- `GET /health` - Application health check
- `GET /rooms` - List all rooms with question count
- `POST /rooms` - Create a new study room

### Audio and Transcription
- `POST /rooms/:roomId/audio` - Audio upload for transcription and vectorization

### Questions and Answers
- `GET /rooms/:roomId/questions` - List questions from a room
- `POST /rooms/:roomId/questions` - Create question with semantic search and AI response

## 🎯 How It Works

### 1. Audio Upload
```bash
curl -X POST \
  http://localhost:3333/rooms/{roomId}/audio \
  -F "file=@audio.mp3"
```

The system:
- Transcribes audio using Gemini AI
- Generates embeddings from transcribed text
- Stores in database with vectors for search

### 2. Ask Question
```bash
curl -X POST \
  http://localhost:3333/rooms/{roomId}/questions \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the concept of X?"}'
```

The system:
- Generates embeddings for the question
- Searches similar chunks (threshold > 0.7)
- Generates contextualized response with AI
- Stores question and answer

## 🔍 AI Technologies

### Gemini AI Integration
- **Transcription**: `gemini-2.5-flash` to convert audio to text
- **Embeddings**: `text-embedding-004` for semantic vectorization
- **Responses**: `gemini-2.5-flash` for contextualized generation

### Vector Search
- **pgvector**: PostgreSQL extension for vector operations
- **Dimensions**: 768 dimensions per embedding
- **Similarity**: Cosine similarity with 0.7 threshold
- **Limit**: Top 5 most similar chunks for context

## 🐳 Docker

The project uses **PostgreSQL 17** with **pgvector** extension for high-performance vector operations. The configuration includes:

- Database prepared for embeddings
- pgvector extension enabled automatically
- Persistent data for development

## 📊 Database

### Main Schema

```sql
-- Study rooms
rooms {
  id: UUID (PK)
  name: TEXT
  description: TEXT?
  created_at: TIMESTAMP
}

-- Processed audio chunks
audio_chunks {
  id: UUID (PK)
  room_id: UUID (FK → rooms.id)
  transcription: TEXT
  embeddings: VECTOR(768)
  created_at: TIMESTAMP
}

-- Questions and answers
questions {
  id: UUID (PK)
  room_id: UUID (FK → rooms.id)
  question: TEXT
  answer: TEXT?
  created_at: TIMESTAMP
}
```

## 🎨 Usage Example

1. **Create a study room**
2. **Upload audio files** (classes, lectures, podcasts)
3. **Ask questions** about the content
4. **Get contextualized answers** based on the audio
