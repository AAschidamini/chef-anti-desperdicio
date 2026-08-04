import type { Ingredient } from "@/domain/entities/ingredient";

export interface InventoryRepository {
  getAll(): Promise<Ingredient[]>;
}
