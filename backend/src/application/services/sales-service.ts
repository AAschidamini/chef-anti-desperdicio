import type { Sale } from "../../domain/entities/sale";
import type {
  SalesFilters,
  SalesRepository,
} from "../../domain/repositories/sales-repository";

export class SalesService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async getSalesHistory(filters?: SalesFilters): Promise<Sale[]> {
    const sales = await this.salesRepository.findAll(filters);
    return sales.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}
