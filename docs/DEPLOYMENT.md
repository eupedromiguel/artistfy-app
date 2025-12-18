# Guia de Deploy - Artistfy

## Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Credenciais da [Spotify API](https://developer.spotify.com/dashboard)
3. Git instalado
4. Node.js 18+ instalado

## Configuração Local

### 1. Instalar dependências

```bash
npm run install:all
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Preencha com suas credenciais do Spotify:

```env
SPOTIFY_CLIENT_ID=seu_client_id
SPOTIFY_CLIENT_SECRET=seu_client_secret
```

### 3. Rodar localmente

```bash
npm run dev
```

A API estará disponível em `http://localhost:5000/api`
O frontend estará disponível em `http://localhost:3000`

## Deploy no Vercel

### Método 1: Via CLI

1. Instale o Vercel CLI:

```bash
npm install -g vercel
```

2. Faça login:

```bash
vercel login
```

3. Deploy:

```bash
vercel
```

4. Configure as variáveis de ambiente no dashboard do Vercel:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`

### Método 2: Via GitHub

1. Faça push do código para o GitHub

2. Importe o projeto no Vercel:
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Selecione seu repositório
   - Configure as variáveis de ambiente

3. Deploy automático:
   - Toda vez que fizer push para a branch principal, o Vercel fará deploy automaticamente

## Variáveis de Ambiente (Produção)

No dashboard do Vercel, adicione:

- `SPOTIFY_CLIENT_ID` - Seu Client ID do Spotify
- `SPOTIFY_CLIENT_SECRET` - Seu Client Secret do Spotify

## Verificando o Deploy

Após o deploy, verifique:

1. Frontend carregando: `https://seu-dominio.vercel.app`
2. API funcionando: `https://seu-dominio.vercel.app/api/artist?id=ARTISTA_ID`

## Configuração de Domínio Customizado

1. No dashboard do Vercel, vá em "Settings" → "Domains"
2. Adicione seu domínio customizado
3. Configure os registros DNS conforme instruções do Vercel

## Monitoramento

- Logs: Dashboard do Vercel → Deployments → Logs
- Analytics: Dashboard do Vercel → Analytics
- Funções: Dashboard do Vercel → Functions

## Limites do Plano Free

- 100GB de bandwidth
- Execuções serverless ilimitadas
- Timeout de 10s por função
- 100 deployments por dia

## Troubleshooting

### API retorna erro 500

- Verifique se as variáveis de ambiente estão configuradas corretamente
- Verifique os logs no dashboard do Vercel

### Timeout nas funções

- As funções do plano free têm limite de 10s
- Endpoints foram otimizados para não ultrapassar esse limite

### Build falha

- Verifique se todas as dependências estão no `package.json`
- Execute `npm run build` localmente para verificar erros

## Atualizando o Projeto

```bash
git add .
git commit -m "mensagem"
git push
```

O Vercel fará deploy automaticamente.
