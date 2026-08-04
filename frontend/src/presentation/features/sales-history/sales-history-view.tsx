"use client";

import { useSalesHistory } from "@/application/hooks/use-sales-history";
import { Card } from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import type { Sale } from "@/domain/entities/sale";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("pt-BR");
}

const statusTone: Record<Sale["status"], "success" | "danger" | "warning"> = {
  completed: "success",
  cancelled: "danger",
  refunded: "warning",
};

const statusLabel: Record<Sale["status"], string> = {
  completed: "Concluída",
  cancelled: "Cancelada",
  refunded: "Reembolsada",
};

export function SalesHistoryView() {
  const { sales, totalRevenue, isLoading, error } = useSalesHistory();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Histórico de Vendas
          </h1>
          <p className="text-sm text-neutral-500">
            Consulte todas as vendas realizadas.
          </p>
        </div>
        <Card className="px-4 py-3">
          <p className="text-xs text-neutral-500">Total faturado</p>
          <p className="text-lg font-semibold text-neutral-900">
            {formatCurrency(totalRevenue)}
          </p>
        </Card>
      </div>

      {isLoading && <p className="text-sm text-neutral-500">Carregando vendas...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!isLoading && !error && sales.length === 0 && (
        <Card className="text-sm text-neutral-500">
          Nenhuma venda registrada ainda.
        </Card>
      )}

      {sales.length > 0 && (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Data</th>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Itens</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-4 py-3 text-neutral-600">
                    {formatDate(sale.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-neutral-900">
                    {sale.customerName}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {sale.items.length} item(ns)
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-900">
                    {formatCurrency(sale.total)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone[sale.status]}>
                      {statusLabel[sale.status]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
