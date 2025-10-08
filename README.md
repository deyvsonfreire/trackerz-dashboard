# 🚀 Trackerz - Marketing Intelligence Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-green?style=for-the-badge&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
</div>

## 📋 Visão Geral

O **Trackerz** é uma plataforma de marketing intelligence que centraliza e analisa dados de múltiplas fontes para fornecer insights sobre a performance de campanhas digitais.

### 🎯 Objetivo
Fornecer uma visão unificada e em tempo real dos indicadores de marketing, permitindo a otimização de campanhas e a maximização do ROI.

---

## 🏗️ Arquitetura

### **Stack Tecnológico**
- **Frontend**: Next.js 15.5.4 (App Router)
- **Backend**: Node.js 22+
- **Banco de Dados**: PostgreSQL (via Supabase)
- **Package Manager**: Yarn
- **Autenticação**: Supabase Auth
- **Styling**: Tailwind CSS

---

## 🚀 Configuração do Ambiente

### **Pré-requisitos**
- Node.js v22.0.0 ou superior (obrigatório)
- Yarn 1.22.0 ou superior
- Conta no Supabase

### **Instalação**
```bash
# 1. Clone o repositório
git clone <repository-url>
cd trackerz-nextjs

# 2. Instale as dependências
yarn install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
```
Preencha o arquivo `.env.local` com as chaves do seu projeto Supabase e outras APIs que desejar integrar.

### **Execução**
```bash
# Iniciar o servidor de desenvolvimento
yarn dev
```
A aplicação estará disponível em `http://localhost:4017`.

---

## 🤝 Contribuição

### **Padrões de Código**
- **ESLint**: Para análise estática de código.
- **Prettier**: Para formatação de código.
- **Conventional Commits**: Para padronização de mensagens de commit.

### **Pull Requests**
1.  Faça um fork do repositório.
2.  Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`).
3.  Faça o commit das suas alterações (`git commit -m 'feat: Adiciona nova funcionalidade'`).
4.  Envie para a sua branch (`git push origin feature/nova-funcionalidade`).
5.  Abra um Pull Request.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
