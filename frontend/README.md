# Chef Anti-Desperdício — Frontend

Frontend em [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS, seguindo uma **arquitetura em camadas**.

## Como executar

```bash
npm install
cp .env.example .env.local
npm run dev
```

A aplicação abre em [http://localhost:3000](http://localhost:3000) e espera o backend rodando em `http://localhost:3001` (configurável via `NEXT_PUBLIC_API_URL`).

## Arquitetura em camadas

O código de aplicação vive em `src/` e é dividido em quatro camadas, com dependência sempre "de fora para dentro" (a UI depende do domínio, o domínio não depende de nada):

```
src/
├── app/              # Rotas do Next.js (App Router). Só roteamento/layout — sem lógica de negócio.
├── presentation/      # Componentes React: UI genérica, layout e telas de cada feature.
├── application/       # Casos de uso: hooks, services e contexto de autenticação.
├── domain/             # Entidades e contratos (interfaces) de repositório. Não depende de mais nada.
└── infrastructure/     # Implementações concretas: cliente HTTP, repositórios HTTP e configuração de ambiente.
```

- **`domain`** define o que existe no negócio (`User`, `Sale`, `Reservation`, `Ingredient`) e os contratos (`AuthRepository`, `SalesRepository`, ...) que a infraestrutura precisa cumprir.
- **`infrastructure`** implementa esses contratos falando com a API REST do backend (`HttpAuthRepository`, `HttpSalesRepository`, ...).
- **`application`** orquestra regras de negócio do lado do cliente (`AuthService`, `SalesService`, ...) e expõe hooks React (`useAuth`, `useSalesHistory`, `useReservations`, `useInventory`) para a camada de apresentação consumir.
- **`presentation`** contém somente componentes React: UI genérica (`Button`, `Input`, `Card`, `Badge`), layout (`Sidebar`, `Header`, `AuthGuard`) e as telas de cada feature (`auth`, `home`, `sales-history`, `reservations`, `inventory`).

Para trocar a fonte de dados (ex.: usar GraphQL em vez de REST), basta criar uma nova implementação da interface em `domain/repositories` e injetá-la no `application/services` correspondente — nenhuma outra camada precisa mudar.

## Páginas pré-criadas

| Rota                 | Descrição                                              |
| --------------------- | ------------------------------------------------------- |
| `/login`               | Autenticação de usuários                                 |
| `/cadastro`            | Cadastro de novos usuários                                |
| `/home`                | Painel inicial com resumo de vendas, reservas e estoque   |
| `/historico-vendas`    | Histórico de vendas realizadas                            |
| `/reservas`            | Criação e listagem de reservas                             |
| `/estoque`             | Estoque atual e validade dos ingredientes                  |

As rotas `/home`, `/historico-vendas`, `/reservas` e `/estoque` ficam protegidas por `AuthGuard` e usam o layout com sidebar (`(dashboard)`), enquanto `/login` e `/cadastro` usam o layout centralizado (`(auth)`).
