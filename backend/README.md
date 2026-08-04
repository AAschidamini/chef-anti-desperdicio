# Chef Anti-Desperdício — Backend

API em Node.js + Express + TypeScript, seguindo a mesma **arquitetura em camadas** do frontend.

## Como executar

```bash
npm install
cp .env.example .env
npm run dev
```

A API sobe em `http://localhost:3001` (porta configurável via `.env`).

Usuário de demonstração já cadastrado (em memória):

- **E-mail:** `demo@chefantidesperdicio.com`
- **Senha:** `demo123`

## Arquitetura em camadas

```
src/
├── server.ts / app.ts   # Bootstrap do Express (middlewares globais, montagem das rotas).
├── presentation/         # Camada HTTP: rotas, controllers e middlewares (erro, autenticação, async handler).
├── application/          # Casos de uso: services com a regra de negócio e DTOs de entrada.
├── domain/                 # Entidades, erros de domínio e contratos (interfaces) de repositório.
└── infrastructure/         # Implementações concretas dos repositórios (hoje em memória) e configuração de ambiente.
```

- **`domain`** não depende de nenhuma outra camada. Define `User`, `Sale`, `Reservation`, `Ingredient` e os contratos que os repositórios precisam implementar.
- **`infrastructure`** implementa esses contratos. Atualmente usa repositórios **em memória** (`InMemoryUserRepository`, etc.) com dados de exemplo, prontos para serem substituídos por uma implementação com banco de dados (ex.: Postgres/Prisma, MongoDB) sem alterar nenhuma outra camada.
- **`application`** contém a regra de negócio (`AuthService`, `SalesService`, `ReservationService`, `InventoryService`), recebendo repositórios do domínio via injeção no construtor.
- **`presentation`** expõe a API HTTP: `controllers` chamam os services, `routes` mapeiam URLs para controllers, e `middlewares` tratam erros, 404 e autenticação via JWT.

## Endpoints disponíveis

| Método | Rota                          | Descrição                                  |
| ------ | ------------------------------ | -------------------------------------------- |
| POST   | `/api/auth/register`            | Cadastro de usuário                          |
| POST   | `/api/auth/login`                | Login (retorna usuário + token JWT)          |
| POST   | `/api/auth/logout`               | Logout                                       |
| GET    | `/api/sales`                     | Histórico de vendas (aceita `startDate`/`endDate`) |
| GET    | `/api/reservations`               | Lista de reservas                            |
| POST   | `/api/reservations`               | Cria uma reserva                             |
| PATCH  | `/api/reservations/:id/cancel`    | Cancela uma reserva                          |
| GET    | `/api/inventory`                  | Estoque atual e validade dos ingredientes    |
| GET    | `/health`                         | Health check                                 |

Para trocar a fonte de dados (ex.: adicionar um banco), crie uma nova implementação da interface correspondente em `domain/repositories` dentro de `infrastructure/repositories` e injete-a no `application/services` — as camadas de `presentation` e `domain` não precisam mudar.
