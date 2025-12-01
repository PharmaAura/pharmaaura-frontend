# PharmaAura - Frontend

Frontend moderno e responsivo para a plataforma de e-commerce farmacêutico PharmaAura. Desenvolvido com React, Vite e Tailwind CSS, oferecendo uma experiência de usuário fluida e intuitiva.

## 🚀 Funcionalidades

### 👤 Usuário
- **Autenticação**: Login e Registro de novos usuários.
- **Catálogo de Produtos**: Visualização de produtos em grid com filtros.
- **Detalhes do Produto**: Página dedicada com informações detalhadas e controle de quantidade.
- **Carrinho de Compras**: Adição/remoção de itens e ajuste de quantidades.
- **Checkout**: Processo simplificado de finalização de compra com endereço e método de entrega.
- **Meus Pedidos**: Histórico de pedidos e status atual.
- **Rastreamento**: Acompanhamento em tempo real do status do pedido.

### 🛡️ Admin
- **Gestão de Produtos**: Criação, edição e remoção de produtos no catálogo.
- **Dashboard**: Visão geral (preparado para expansão).

## 🛠️ Tecnologias Utilizadas

- **Core**: React, Vite
- **Roteamento**: React Router v7
- **Estilização**: Tailwind CSS
- **Formulários**: React Hook Form
- **Estado Global**: Context API
- **HTTP Client**: Axios
- **Notificações**: React Hot Toast

## 📸 Preview de Utilização

O layout segue um design limpo e moderno:
- **Sidebar Fixa**: Navegação rápida sempre acessível à esquerda.
- **Design Responsivo**: Adaptável a dispositivos móveis e desktops.
- **Feedback Visual**: Loaders, toasts de sucesso/erro e transições suaves.

## 📦 Como Inicializar Localmente

Siga os passos abaixo para rodar o projeto em sua máquina.

### Pré-requisitos
- Node.js (v18 ou superior)
- Backend da API rodando (padrão: `http://localhost:3000`)

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/danbasco/pharmaaura-frontend.git
   cd pharmaaura-frontend
   ```

2. **Acesse a pasta do frontend e instale as dependências**
   ```bash
   cd frontend
   npm install
   ```

3. **Configuração de Ambiente**
   Crie um arquivo `.env` na pasta `frontend` com a URL da sua API:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador**
   O projeto estará rodando em `http://localhost:5173` (ou outra porta indicada no terminal).

## 📝 Estrutura do Projeto

- `src/components`: Componentes reutilizáveis (Botões, Cards, Inputs).
- `src/pages`: Páginas da aplicação (Home, Login, Carrinho, etc).
- `src/contexts`: Gerenciamento de estado (AuthContext).
- `src/services`: Integração com a API.
- `src/layouts`: Estruturas de layout (Sidebar, Header).