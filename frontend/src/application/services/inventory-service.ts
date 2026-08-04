import type { InventoryRepository } from "@/domain/repositories/inventory-repository";
import type { Ingredient } from "@/domain/entities/ingredient";
import { getExpirationStatus } from "@/domain/entities/ingredient";
import { HttpInventoryRepository } from "@/infrastructure/repositories/http-inventory-repository";

export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async getAll(): Promise<Ingredient[]> {
    const ingredients = await this.inventoryRepository.getAll();
    return ingredients.sort(
      (a, b) =>
        new Date(a.expirationDate).getTime() -
        new Date(b.expirationDate).getTime()
    );
  }

  getExpiringOrExpired(ingredients: Ingredient[]): Ingredient[] {
    return ingredients.filter((ingredient) => {
      const status = getExpirationStatus(ingredient.expirationDate);
      return status === "expiring-soon" || status === "expired";
    });
  }
}

export const inventoryService = new InventoryService(
  new HttpInventoryRepository()
);
