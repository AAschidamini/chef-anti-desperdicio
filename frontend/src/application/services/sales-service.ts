import type {
  SalesFilters,
  SalesRepository,
} from "@/domain/repositories/sales-repository";
import type { Sale } from "@/domain/entities/sale";
import { HttpSalesRepository } from "@/infrastructure/repositories/http-sales-repository";

export class SalesService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async getHistory(filters?: SalesFilters): Promise<Sale[]> {
    const sales = await this.salesRepository.getAll(filters);
    return sales.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getTotalRevenue(sales: Sale[]): number {
    return sales
      .filter((sale) => sale.status === "completed")
      .reduce((sum, sale) => sum + sale.total, 0);
  }
}

export const salesService = new SalesService(new HttpSalesRepository());
