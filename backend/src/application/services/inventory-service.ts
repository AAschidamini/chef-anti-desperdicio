import type { Ingredient } from "../../domain/entities/ingredient";
import type { InventoryRepository } from "../../domain/repositories/inventory-repository";

export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async getInventory(): Promise<Ingredient[]> {
    const ingredients = await this.inventoryRepository.findAll();
    return ingredients.sort(
      (a, b) =>
        new Date(a.expirationDate).getTime() -
        new Date(b.expirationDate).getTime()
    );
  }
}
