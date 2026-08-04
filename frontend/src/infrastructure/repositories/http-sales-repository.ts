import type {
  SalesFilters,
  SalesRepository,
} from "@/domain/repositories/sales-repository";
import type { Sale } from "@/domain/entities/sale";
import { httpClient } from "@/infrastructure/http/http-client";

export class HttpSalesRepository implements SalesRepository {
  getAll(filters?: SalesFilters): Promise<Sale[]> {
    const params = new URLSearchParams();
    if (filters?.startDate) params.set("startDate", filters.startDate);
    if (filters?.endDate) params.set("endDate", filters.endDate);

    const query = params.toString();
    return httpClient.get<Sale[]>(`/sales${query ? `?${query}` : ""}`);
  }
}
