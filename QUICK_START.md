# Guia de Início Rápido - Artistfy

## Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Credenciais da Spotify API

## Passo 1: Obter Credenciais do Spotify

1. Acesse [Spotify for Developers](https://developer.spotify.com/dashboard)
2. Faça login com sua conta Spotify
3. Clique em "Create app"
4. Preencha as informações:
   - **App name:** Artistfy (ou qualquer nome)
   - **App description:** Aplicação de pesquisa de artistas
   - **Redirect URI:** http://localhost:3000 (não será usado, mas é obrigatório)
   - Aceite os termos
5. Após criar, acesse "Settings"
6. Copie o **Client ID** e **Client Secret**

## Passo 2: Configurar o Projeto

1. Clone ou baixe o projeto

2. Instale todas as dependências:
```bash
npm run install:all
```

3. Configure as variáveis de ambiente:
```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

4. Edite o arquivo `.env` e adicione suas credenciais:
```env
SPOTIFY_CLIENT_ID=seu_client_id_aqui
SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
```

## Passo 3: Executar em Desenvolvimento

Execute o comando:
```bash
npm run dev
```

Isso irá iniciar:
- Backend (API): http://localhost:5000
- Frontend: http://localhost:3000

## Passo 4: Testar a Aplicação

1. Abra http://localhost:3000 no navegador
2. Busque por um artista (ex: "Coldplay", "Taylor Swift")
3. Clique em um artista
4. Navegue pelas faixas ou álbuns
5. Teste a exportação em Excel e PDF

## Estrutura do Projeto

```
artistfy/
├── api/                    # Backend (Serverless Functions)
│   ├── lib/               # Código compartilhado
│   └── *.js              # Endpoints
├── frontend/              # Frontend React
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── pages/        # Páginas
│   │   ├── services/     # API clients
│   │   └── utils/        # Utilitários
│   └── package.json
├── docs/                  # Documentação
├── .env                   # Variáveis de ambiente
└── package.json          # Root package
```

## Comandos Disponíveis

```bash
# Instalar todas as dependências
npm run install:all

# Desenvolvimento (backend + frontend)
npm run dev

# Apenas backend
npm run dev:api

# Apenas frontend
cd frontend && npm run dev

# Build do frontend
npm run build
```

## Funcionalidades Implementadas

- Busca de artistas
- Visualização de dados do artista
- Listagem de faixas com paginação
- Listagem de álbuns com paginação
- Gráficos interativos (Recharts)
- Exportação para Excel
- Exportação para PDF
- Cache de token automático
- Batch deduplicado para gravadoras
- Progressive loading

## Troubleshooting

### Erro: "Credenciais do Spotify não configuradas"
- Verifique se o arquivo `.env` existe na raiz do projeto
- Verifique se as credenciais estão corretas

### Frontend não conecta com a API
- Verifique se o backend está rodando na porta 5000
- Verifique o proxy no `vite.config.js`

### Erro de CORS
- Certifique-se de que está acessando via http://localhost:3000
- Verifique se o backend está configurando os headers CORS corretamente

## Próximos Passos

- Consulte [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) para fazer deploy no Vercel
- Consulte [docs/API.md](docs/API.md) para documentação completa da API
- Leia o [README.md](README.md) para entender a arquitetura

## Suporte

Para problemas ou dúvidas:
1. Verifique os logs do console (F12 no navegador)
2. Verifique os logs do terminal onde a API está rodando
3. Consulte a documentação do Spotify API
