import type { Ingredient } from "../entities/ingredient";

export interface InventoryRepository {
  findAll(): Promise<Ingredient[]>;
}
