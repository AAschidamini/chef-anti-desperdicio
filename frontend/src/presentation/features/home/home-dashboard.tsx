"use client";

import { useAuth } from "@/application/context/auth-context";
import { useSalesHistory } from "@/application/hooks/use-sales-history";
import { useReservations } from "@/application/hooks/use-reservations";
import { useInventory } from "@/application/hooks/use-inventory";
import { Card } from "@/presentation/components/ui/card";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function HomeDashboard() {
  const { user } = useAuth();
  const { sales, totalRevenue } = useSalesHistory();
  const { reservations } = useReservations();
  const { expiringOrExpired } = useInventory();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">
          Bem-vindo{user ? `, ${user.name}` : ""}
        </h1>
        <p className="text-sm text-neutral-500">
          Visão geral do restaurante hoje.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-neutral-500">Faturamento total</p>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">
            {formatCurrency(totalRevenue)}
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            {sales.length} venda(s) registrada(s)
          </p>
        </Card>

        <Card>
          <p className="text-sm text-neutral-500">Próximas reservas</p>
          <p className="mt-2 text-2xl font-semibold text-neutral-900">
            {reservations.length}
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            reserva(s) agendada(s)
          </p>
        </Card>

        <Card>
          <p className="text-sm text-neutral-500">Ingredientes em alerta</p>
          <p className="mt-2 text-2xl font-semibold text-amber-600">
            {expiringOrExpired.length}
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            próximos do vencimento ou vencidos
          </p>
        </Card>
      </div>
    </div>
  );
}
