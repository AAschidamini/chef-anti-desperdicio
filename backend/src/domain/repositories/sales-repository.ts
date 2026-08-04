import type { Sale } from "../entities/sale";

export interface SalesFilters {
  startDate?: string;
  endDate?: string;
}

export interface SalesRepository {
  findAll(filters?: SalesFilters): Promise<Sale[]>;
}
