# Checklist - Artistfy

Use este checklist para garantir que tudo está configurado corretamente antes de executar o projeto.

## Pré-requisitos

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] npm instalado (`npm --version`)
- [ ] Conta no Spotify (gratuita)
- [ ] Editor de código (VS Code recomendado)

## Configuração Inicial

### 1. Credenciais Spotify
- [ ] Acessou https://developer.spotify.com/dashboard
- [ ] Criou uma aplicação no dashboard
- [ ] Copiou o Client ID
- [ ] Copiou o Client Secret

### 2. Variáveis de Ambiente
- [ ] Criou o arquivo `.env` na raiz do projeto
- [ ] Adicionou `SPOTIFY_CLIENT_ID=...`
- [ ] Adicionou `SPOTIFY_CLIENT_SECRET=...`
- [ ] Verificou que não há espaços extras nas credenciais

### 3. Dependências
- [ ] Executou `npm run install:all`
- [ ] Verificou que não houve erros na instalação
- [ ] Pasta `node_modules` criada na raiz
- [ ] Pasta `frontend/node_modules` criada

## Estrutura do Projeto

Verifique se estas pastas existem:

### Backend
- [ ] `api/lib/` (4 arquivos)
- [ ] `api/*.js` (4 arquivos de endpoint)

### Frontend
- [ ] `frontend/src/components/` (subpastas: albums, artist, common, layout, tracks)
- [ ] `frontend/src/pages/` (5 arquivos)
- [ ] `frontend/src/services/` (4 arquivos)
- [ ] `frontend/src/hooks/` (4 arquivos)
- [ ] `frontend/src/utils/` (4 arquivos)

### Configuração
- [ ] `.env` (com suas credenciais)
- [ ] `.gitignore`
- [ ] `vercel.json`
- [ ] `package.json` (raiz e frontend)

## Primeiro Teste

### 1. Executar em Desenvolvimento
```bash
npm run dev
```

Verifique:
- [ ] Backend iniciou na porta 5000
- [ ] Frontend iniciou na porta 3000
- [ ] Não há erros no console

### 2. Testar Backend (em outro terminal)
```bash
curl "http://localhost:5000/api/search-artist?q=coldplay"
```

Deve retornar:
- [ ] JSON com lista de artistas
- [ ] Status 200
- [ ] Sem mensagens de erro

### 3. Testar Frontend
Abra http://localhost:3000

- [ ] Página inicial carrega
- [ ] Barra de busca está visível
- [ ] Design está aplicado (cores do Spotify)

### 4. Testar Busca
Busque por "Taylor Swift" ou qualquer artista:

- [ ] Resultados aparecem
- [ ] Imagens carregam
- [ ] Ao clicar, vai para página do artista

### 5. Testar Detalhes do Artista
- [ ] Dados do artista aparecem
- [ ] Botões "Ver Faixas" e "Ver Álbuns" funcionam

### 6. Testar Faixas
- [ ] Lista de faixas carrega
- [ ] Gráficos aparecem
- [ ] Botão "Carregar Mais" funciona
- [ ] Botão "Exportar Excel" abre modal
- [ ] Botão "Exportar PDF" abre modal

### 7. Testar Exportação
- [ ] Exportar Excel gera arquivo .xlsx
- [ ] Exportar PDF abre diálogo de impressão
- [ ] Dados exportados estão corretos

## Possíveis Problemas

### Erro: "Credenciais do Spotify não configuradas"
Solução:
- [ ] Verificar se `.env` existe
- [ ] Verificar se as variáveis estão corretas
- [ ] Reiniciar o servidor

### Frontend não conecta com API
Solução:
- [ ] Verificar se backend está rodando
- [ ] Verificar porta 5000 está livre
- [ ] Checar `vite.config.js` (proxy configurado)

### Erro de CORS
Solução:
- [ ] Acessar via http://localhost:3000 (não 127.0.0.1)
- [ ] Verificar headers CORS nos endpoints da API

### Gráficos não aparecem
Solução:
- [ ] Verificar se `recharts` foi instalado
- [ ] Checar console do navegador por erros
- [ ] Recarregar a página

### Exportação não funciona
Solução:
- [ ] Verificar se `xlsx` foi instalado
- [ ] Permitir pop-ups no navegador (para PDF)
- [ ] Verificar permissões de download

## Deploy no Vercel (Opcional)

- [ ] Criar conta no Vercel
- [ ] Instalar Vercel CLI: `npm install -g vercel`
- [ ] Executar `vercel` na raiz do projeto
- [ ] Adicionar variáveis de ambiente no dashboard
- [ ] Testar URL de produção

## Qualidade do Código

- [ ] Sem erros no console do navegador
- [ ] Sem erros no terminal do backend
- [ ] Aplicação responsiva (testar mobile)
- [ ] Loading states funcionando
- [ ] Error handling funcionando

## Notas

- Guarde suas credenciais do Spotify em local seguro
- Nunca commite o arquivo `.env` para Git
- Para produção, use variáveis de ambiente do Vercel
- Consulte README.md para mais detalhes

## Pronto para Usar!

Se todos os itens acima estão marcados, o projeto está funcionando corretamente!

Para mais ajuda:
- [QUICK_START.md](QUICK_START.md) - Início rápido
- [README.md](README.md) - Documentação completa
- [docs/API.md](docs/API.md) - API docs
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) - Deploy guide
