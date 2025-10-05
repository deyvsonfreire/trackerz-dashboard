# 🚀 Trackerz - Marketing Intelligence Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-green?style=for-the-badge&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
</div>

## 📋 Visão Geral

O **Trackerz** é uma plataforma completa de marketing intelligence que centraliza e analisa dados de múltiplas fontes para fornecer insights acionáveis sobre performance de campanhas digitais, leads, vendas e ROI. A aplicação integra dados de campanhas pagas, Google Analytics, Google My Business, CRM, email marketing, telefonia e redes sociais em dashboards interativos e relatórios automatizados.

### 🎯 Objetivo Principal
Fornecer uma visão unificada e em tempo real de todos os indicadores de marketing digital, permitindo otimização contínua de campanhas e maximização do ROI.

### 👥 Público-Alvo
- **C-Level**: Visão estratégica e ROI geral
- **Gerentes de Marketing**: Performance de campanhas e otimização
- **Analistas**: Análises detalhadas e insights
- **Equipe de Vendas**: Qualidade de leads e conversões

---

## 🏗️ Arquitetura da Aplicação

### **Stack Tecnológico**
- **Frontend**: Next.js 15.5.4 (App Router)
- **Backend**: Node.js 22+ (obrigatório)
- **Banco de Dados**: PostgreSQL 15+ (Supabase)
- **Package Manager**: Yarn (preferencial)
- **Porta de Desenvolvimento**: 4017
- **Autenticação**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Styling**: Tailwind CSS 4.0
- **Charts**: Recharts + D3.js
- **TypeScript**: 5.0+

### **Integrações Principais**
1. **Meta Marketing API** (Facebook/Instagram Ads)
2. **Google Ads API**
3. **Google Analytics 4 Data API**
4. **Google Business Profile API**
5. **YouTube Data API v3**
6. **RD Station Marketing API**
7. **RD Station CRM API**
8. **RD Station Conversas API**
9. **3CX Phone System API**
10. **Exact Sales API**
11. **Irroba E-commerce API**

---

## 🚀 Configuração do Ambiente

### **Pré-requisitos**
- Node.js v22.0.0 ou superior (obrigatório)
- Yarn 1.22.0 ou superior
- Conta no Supabase
- Contas nas plataformas de marketing (Meta, Google, RD Station, etc.)

### **Verificação do Ambiente**
```bash
# Verificar versão do Node.js
node --version # deve retornar v22.x.x

# Verificar Yarn
yarn --version # deve retornar 1.22.x ou superior
```

### **Instalação**
```bash
# Clonar o repositório
git clone <repository-url>
cd trackerz-nextjs

# Instalar dependências
yarn install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Executar em desenvolvimento
yarn dev
```

### **Scripts Disponíveis**
```bash
# Desenvolvimento
yarn dev          # Inicia servidor de desenvolvimento na porta 4017
yarn dev:turbo    # Inicia com Turbopack (mais rápido)

# Produção
yarn build        # Build para produção
yarn start        # Inicia servidor de produção
yarn lint         # Executa ESLint
```

---

## 🔧 Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# ===========================================
# SUPABASE CONFIGURATION
# ===========================================
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# ===========================================
# GOOGLE APIS CONFIGURATION
# ===========================================
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_ANALYTICS_PROPERTY_ID=your_ga4_property_id
GOOGLE_ADS_CUSTOMER_ID=your_google_ads_customer_id
GOOGLE_ADS_DEVELOPER_TOKEN=your_google_ads_developer_token
GOOGLE_BUSINESS_PROFILE_ACCOUNT_ID=your_gbp_account_id
YOUTUBE_API_KEY=your_youtube_api_key

# ===========================================
# META MARKETING API CONFIGURATION
# ===========================================
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
META_ACCESS_TOKEN=your_meta_access_token
META_AD_ACCOUNT_ID=your_meta_ad_account_id

# ===========================================
# RD STATION APIS CONFIGURATION
# ===========================================
RD_STATION_CLIENT_ID=your_rd_station_client_id
RD_STATION_CLIENT_SECRET=your_rd_station_client_secret
RD_STATION_MARKETING_ACCESS_TOKEN=your_rd_marketing_token
RD_STATION_CRM_ACCESS_TOKEN=your_rd_crm_token
RD_STATION_CONVERSAS_ACCESS_TOKEN=your_rd_conversas_token

# ===========================================
# TELEPHONY INTEGRATION
# ===========================================
THREE_CX_API_URL=your_3cx_api_url
THREE_CX_USERNAME=your_3cx_username
THREE_CX_PASSWORD=your_3cx_password

# ===========================================
# SALES INTEGRATION
# ===========================================
EXACT_SALES_API_URL=your_exact_sales_api_url
EXACT_SALES_API_KEY=your_exact_sales_api_key
IRROBA_API_URL=your_irroba_api_url
IRROBA_API_KEY=your_irroba_api_key

# ===========================================
# APPLICATION SETTINGS
# ===========================================
NEXTAUTH_URL=http://localhost:4017
NEXTAUTH_SECRET=your_nextauth_secret
NODE_ENV=development
```

---

## 📊 Dashboards e Funcionalidades

### **1. Dashboard Executivo (C-Level)**
- **KPIs Principais**: ROAS, Revenue, CAC, LTV
- **Gráficos**: Revenue vs Investment, ROAS por Canal, Funil de Conversão
- **Filtros**: Período, Plataforma, Localização
- **Atualizações**: Tempo real para KPIs críticos

### **2. Dashboard de Performance de Campanhas**
- **Tabela Interativa**: Campanhas ativas com ações rápidas
- **Métricas**: CTR, CPC, CPA, ROAS, Impressões, Alcance
- **Gráficos**: CTR por Plataforma, Budget Pacing, Performance Temporal
- **Funcionalidades**: Pausar/Ativar, Editar, Duplicar campanhas

### **3. Dashboard de Audiência e Segmentação**
- **Análise Demográfica**: Heatmap Idade x Gênero
- **Distribuição Geográfica**: Mapa interativo
- **Jornada do Cliente**: Sankey Diagram
- **Segmentação**: Criação de segmentos personalizados

### **4. Dashboard Financeiro**
- **Análise de ROI**: ROAS por Canal, LTV por Segmento
- **Controle de Budget**: Budget vs Gasto Real, Projeções
- **Alertas**: Budget 80%/100% utilizado, ROAS abaixo da meta

### **5. Dashboard de Leads e CRM**
- **Funil de Vendas**: Visualização completa do pipeline
- **Qualificação de Leads**: Score automático e manual
- **Análise de Conversão**: Taxa por fonte e campanha
- **Gestão de Oportunidades**: Acompanhamento detalhado

### **6. Dashboard de Telefonia**
- **Métricas de Chamadas**: Volume, duração, origem
- **Análise de Atendimento**: Taxa de atendimento, tempo de espera
- **Integração 3CX**: Dados em tempo real
- **ROI de Chamadas**: Conversões por canal telefônico

### **7. Dashboard de Email Marketing**
- **Performance de Campanhas**: Taxa de abertura, cliques, conversões
- **Segmentação**: Análise por lista e segmento
- **Automações**: Performance de fluxos automatizados
- **A/B Testing**: Resultados de testes comparativos

### **8. Dashboard de Redes Sociais Orgânicas**
- **Engajamento**: Likes, comentários, compartilhamentos
- **Alcance Orgânico**: Impressões e alcance por post
- **Análise de Conteúdo**: Performance por tipo de conteúdo
- **Crescimento**: Evolução de seguidores e engajamento

### **9. Dashboard de Vendas e Faturamento**
- **Métricas de Vendas**: Volume, ticket médio, conversões
- **Análise de Faturamento**: Receita por canal e período
- **Previsões**: Projeções baseadas em histórico
- **Comissões**: Cálculo automático por vendedor

---

## 🎨 Componentes e UI

### **Componentes Base**
- `Layout` - Layout principal com header e sidebar
- `Card` - Container base para conteúdo
- `Button` - Botões com variantes e estados
- `Input`, `Select`, `Textarea` - Formulários
- `Modal`, `Tooltip` - Elementos de interface

### **Componentes de Dados**
- `KPICard` - Cards de indicadores principais
- `MetricCard` - Cards de métricas detalhadas
- `DataTable` - Tabelas interativas com filtros
- `FilterPanel` - Painel de filtros avançados
- `ExportButton` - Exportação de dados

### **Componentes de Feedback**
- `AlertBanner` - Alertas e notificações
- `StatusIndicator` - Indicadores de status
- `ProgressBar` - Barras de progresso
- `Spinner` - Loading states

### **Componentes de Charts**
- `LineChart`, `BarChart` - Gráficos básicos
- `FunnelChart` - Funil de conversão
- `GaugeChart` - Medidores circulares
- `Heatmap` - Mapas de calor
- `SankeyChart` - Fluxos de dados
- `ScatterPlot` - Gráficos de dispersão
- `BoxPlot` - Análise estatística
- `MapChart` - Mapas geográficos

---

## 🔌 Integrações de APIs

### **Meta Marketing API**
```typescript
// Configuração automática de campanhas
const metaAPI = new MetaMarketingAPI({
  appId: process.env.META_APP_ID,
  appSecret: process.env.META_APP_SECRET,
  accessToken: process.env.META_ACCESS_TOKEN
});

// Sincronização de dados a cada 15 minutos
await metaAPI.syncCampaigns();
await metaAPI.syncAdSets();
await metaAPI.syncAds();
```

### **Google Analytics 4**
```typescript
// Relatórios personalizados
const ga4API = new GoogleAnalytics4API({
  propertyId: process.env.GOOGLE_ANALYTICS_PROPERTY_ID,
  credentials: googleCredentials
});

// Métricas em tempo real
const realTimeData = await ga4API.getRealtimeReport({
  dimensions: ['country', 'deviceCategory'],
  metrics: ['activeUsers', 'conversions']
});
```

### **RD Station CRM**
```typescript
// Sincronização de leads
const rdCRM = new RDStationCRM({
  accessToken: process.env.RD_STATION_CRM_ACCESS_TOKEN
});

// Webhook para atualizações em tempo real
app.post('/webhook/rd-station', rdCRM.handleWebhook);
```

---

## 📈 Análises Avançadas

### **Machine Learning**
- **Predição de Performance**: Algoritmos para prever ROI de campanhas
- **Otimização de Budget**: Distribuição automática baseada em performance
- **Detecção de Anomalias**: Identificação automática de padrões anômalos
- **Segmentação Inteligente**: Clustering automático de audiências

### **Análise de Atribuição**
- **Modelos de Atribuição**: First-click, Last-click, Linear, Time-decay
- **Jornada Completa**: Tracking cross-device e cross-platform
- **Análise de Touchpoints**: Impacto de cada ponto de contato
- **ROI por Canal**: Atribuição precisa de conversões

### **Análise de Coorte**
- **Retenção de Clientes**: Análise por período de aquisição
- **LTV por Coorte**: Valor vitalício por grupo
- **Comportamento Temporal**: Padrões de engajamento ao longo do tempo

---

## 🔔 Alertas e Notificações

### **Alertas Inteligentes**
- **Budget**: 80% e 100% do orçamento utilizado
- **Performance**: ROAS abaixo da meta definida
- **Anomalias**: Detecção automática de padrões anômalos
- **Oportunidades**: Sugestões de otimização automática

### **Canais de Notificação**
- **In-App**: Notificações dentro da plataforma
- **Email**: Relatórios automáticos e alertas críticos
- **Slack**: Integração com canais de equipe
- **WhatsApp**: Alertas urgentes via API

---

## 📊 Relatórios Automatizados

### **Relatórios Diários**
- **Performance Geral**: KPIs principais do dia anterior
- **Alertas**: Campanhas que precisam de atenção
- **Oportunidades**: Sugestões de otimização

### **Relatórios Semanais**
- **Análise Comparativa**: Performance vs. semana anterior
- **Tendências**: Identificação de padrões semanais
- **Recomendações**: Ações para a próxima semana

### **Relatórios Mensais**
- **ROI Consolidado**: Análise completa do mês
- **Análise de Coorte**: Comportamento de clientes adquiridos
- **Planejamento**: Sugestões para o próximo mês

---

## 🔒 Segurança e Autenticação

### **Autenticação**
- **Supabase Auth**: Sistema robusto de autenticação
- **OAuth 2.0**: Integração com Google, Meta, RD Station
- **MFA**: Autenticação de dois fatores opcional
- **Session Management**: Controle avançado de sessões

### **Autorização**
- **RBAC**: Role-Based Access Control
- **Permissões Granulares**: Controle por dashboard e funcionalidade
- **Auditoria**: Log completo de ações dos usuários

### **Segurança de Dados**
- **Criptografia**: Dados sensíveis criptografados
- **API Rate Limiting**: Proteção contra abuso
- **CORS**: Configuração segura de origens
- **Environment Variables**: Secrets nunca expostos no código

---

## 🚀 Deploy e Produção

### **Vercel (Recomendado)**
```bash
# Deploy automático
vercel --prod

# Configurar variáveis de ambiente no dashboard da Vercel
# Configurar domínio customizado
# Configurar SSL automático
```

### **Docker**
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 4017
CMD ["yarn", "start"]
```

### **Configurações de Produção**
- **CDN**: Otimização de assets estáticos
- **Caching**: Redis para cache de dados de APIs
- **Monitoring**: Sentry para error tracking
- **Analytics**: Vercel Analytics integrado

---

## 🧪 Testes

### **Testes Unitários**
```bash
yarn test          # Jest + React Testing Library
yarn test:watch    # Modo watch
yarn test:coverage # Relatório de cobertura
```

### **Testes E2E**
```bash
yarn test:e2e      # Playwright
yarn test:e2e:ui   # Interface visual
```

### **Testes de Performance**
```bash
yarn lighthouse    # Lighthouse CI
yarn test:load     # Testes de carga
```

---

## 📚 Documentação Adicional

### **Guias de Configuração**
- [Configuração do Google Analytics 4](./docs/google-analytics-setup.md)
- [Configuração do Meta Marketing API](./docs/meta-marketing-setup.md)
- [Configuração do RD Station](./docs/rd-station-setup.md)
- [Configuração do Supabase](./docs/supabase-setup.md)

### **Guias de Desenvolvimento**
- [Criando Novos Dashboards](./docs/creating-dashboards.md)
- [Adicionando Novas Integrações](./docs/adding-integrations.md)
- [Customizando Componentes](./docs/customizing-components.md)

---

## 🤝 Contribuição

### **Padrões de Código**
- **ESLint**: Configuração Next.js + TypeScript
- **Prettier**: Formatação automática
- **Husky**: Git hooks para qualidade
- **Conventional Commits**: Padrão de commits

### **Pull Requests**
1. Fork do repositório
2. Criar branch feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit das mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abrir Pull Request

---

## 📞 Suporte

### **Contatos**
- **Email**: suporte@trackerz.com
- **Slack**: #trackerz-support
- **Documentação**: https://docs.trackerz.com

### **Issues**
- **Bug Reports**: Use o template de bug report
- **Feature Requests**: Use o template de feature request
- **Dúvidas**: Use as Discussions do GitHub

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🏆 Créditos

Desenvolvido com ❤️ pela equipe Trackerz

**Stack Principal:**
- [Next.js](https://nextjs.org/) - Framework React
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Recharts](https://recharts.org/) - Biblioteca de gráficos
- [Lucide React](https://lucide.dev/) - Ícones

---

<div align="center">
  <strong>🚀 Trackerz - Transformando dados em insights acionáveis</strong>
</div>
