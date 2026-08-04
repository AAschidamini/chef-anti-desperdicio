# Chef Anti-Desperdício

Sistema de administração de desperdício para restaurantes.

## Estrutura do projeto

```
chef-anti-desperdicio/
├── frontend/   # Next.js + TypeScript + Tailwind CSS (arquitetura em camadas)
└── backend/    # Node.js + Express + TypeScript (arquitetura em camadas)
```

Cada pasta é um projeto Node independente, com seu próprio `package.json`. Veja o README de cada uma para instruções detalhadas:

- [`frontend/README.md`](./frontend/README.md)
- [`backend/README.md`](./backend/README.md)

## Como rodar tudo localmente

Em dois terminais separados:

```bash
# Terminal 1 — backend (http://localhost:3001)
cd backend
npm install
cp .env.example .env
npm run dev
```

```bash
# Terminal 2 — frontend (http://localhost:3000)
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000/login` e entre com o usuário de demonstração:

- **E-mail:** `demo@chefantidesperdicio.com`
- **Senha:** `demo123`

## Páginas do frontend

| Página                 | Rota                | Descrição                                                     |
| ----------------------- | -------------------- | -------------------------------------------------------------- |
| Cadastro                 | `/cadastro`            | Cadastro de novos usuários                                      |
| Login                    | `/login`               | Autenticação de usuários                                        |
| Home                     | `/home`                | Painel inicial com resumo de vendas, reservas e estoque         |
| Histórico de vendas       | `/historico-vendas`    | Histórico de vendas realizadas                                  |
| Reservas                 | `/reservas`            | Criação e listagem de reservas de mesas                          |
| Estoque atual e validade   | `/estoque`             | Estoque atual e validade dos ingredientes                        |

## Arquitetura

Ambos os projetos seguem **arquitetura em camadas** (`domain` → `application` → `infrastructure` → `presentation`), detalhada em cada README. A ideia é que regras de negócio e entidades (`domain`/`application`) fiquem isoladas de detalhes de implementação (banco de dados, HTTP, UI), facilitando trocar tecnologia ou evoluir o projeto sem reescrever tudo.
