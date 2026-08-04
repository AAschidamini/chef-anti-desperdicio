import type { Sale } from "@/domain/entities/sale";

export interface SalesFilters {
  startDate?: string;
  endDate?: string;
}

export interface SalesRepository {
  getAll(filters?: SalesFilters): Promise<Sale[]>;
}
