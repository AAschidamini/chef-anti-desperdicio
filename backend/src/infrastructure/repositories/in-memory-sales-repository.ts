import { randomUUID } from "crypto";
import type { Sale } from "../../domain/entities/sale";
import type {
  SalesFilters,
  SalesRepository,
} from "../../domain/repositories/sales-repository";

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

const sales: Sale[] = [
  {
    id: randomUUID(),
    createdAt: daysAgo(0),
    customerName: "Maria Silva",
    items: [
      { productId: "p1", productName: "Risoto de Cogumelos", quantity: 2, unitPrice: 42 },
      { productId: "p2", productName: "Suco Natural", quantity: 2, unitPrice: 12 },
    ],
    total: 108,
    status: "completed",
  },
  {
    id: randomUUID(),
    createdAt: daysAgo(1),
    customerName: "João Pereira",
    items: [
      { productId: "p3", productName: "Feijoada Completa", quantity: 1, unitPrice: 55 },
    ],
    total: 55,
    status: "completed",
  },
  {
    id: randomUUID(),
    createdAt: daysAgo(2),
    customerName: "Ana Costa",
    items: [
      { productId: "p4", productName: "Salada Caesar", quantity: 3, unitPrice: 28 },
    ],
    total: 84,
    status: "cancelled",
  },
];

export class InMemorySalesRepository implements SalesRepository {
  async findAll(filters?: SalesFilters): Promise<Sale[]> {
    return sales.filter((sale) => {
      if (filters?.startDate && sale.createdAt < filters.startDate) return false;
      if (filters?.endDate && sale.createdAt > filters.endDate) return false;
      return true;
    });
  }
}
