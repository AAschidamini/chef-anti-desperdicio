"use client";

import { useInventory } from "@/application/hooks/use-inventory";
import { Card } from "@/presentation/components/ui/card";
import { Badge } from "@/presentation/components/ui/badge";
import { getExpirationStatus } from "@/domain/entities/ingredient";
import type { ExpirationStatus } from "@/domain/entities/ingredient";

const statusTone: Record<ExpirationStatus, "success" | "warning" | "danger"> = {
  ok: "success",
  "expiring-soon": "warning",
  expired: "danger",
};

const statusLabel: Record<ExpirationStatus, string> = {
  ok: "Ok",
  "expiring-soon": "Vence em breve",
  expired: "Vencido",
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR");
}

export function InventoryView() {
  const { ingredients, expiringOrExpired, isLoading, error } = useInventory();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Estoque e Validade
          </h1>
          <p className="text-sm text-neutral-500">
            Acompanhe a quantidade e a validade dos ingredientes.
          </p>
        </div>
        {expiringOrExpired.length > 0 && (
          <Badge tone="warning">
            {expiringOrExpired.length} ingrediente(s) em alerta
          </Badge>
        )}
      </div>

      {isLoading && (
        <p className="text-sm text-neutral-500">Carregando estoque...</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!isLoading && !error && ingredients.length === 0 && (
        <Card className="text-sm text-neutral-500">
          Nenhum ingrediente cadastrado ainda.
        </Card>
      )}

      {ingredients.length > 0 && (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Ingrediente</th>
                <th className="px-4 py-3 font-medium">Categoria</th>
                <th className="px-4 py-3 font-medium">Quantidade</th>
                <th className="px-4 py-3 font-medium">Estoque mínimo</th>
                <th className="px-4 py-3 font-medium">Validade</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {ingredients.map((ingredient) => {
                const status = getExpirationStatus(ingredient.expirationDate);
                return (
                  <tr key={ingredient.id}>
                    <td className="px-4 py-3 text-neutral-900">
                      {ingredient.name}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {ingredient.category}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {ingredient.quantity} {ingredient.unit}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {ingredient.minimumStock} {ingredient.unit}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {formatDate(ingredient.expirationDate)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={statusTone[status]}>
                        {statusLabel[status]}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
