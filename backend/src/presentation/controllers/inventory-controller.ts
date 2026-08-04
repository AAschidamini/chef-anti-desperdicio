import type { Request, Response } from "express";
import { InventoryService } from "../../application/services/inventory-service";
import { InMemoryInventoryRepository } from "../../infrastructure/repositories/in-memory-inventory-repository";

const inventoryService = new InventoryService(new InMemoryInventoryRepository());

export const inventoryController = {
  async list(_req: Request, res: Response): Promise<void> {
    const ingredients = await inventoryService.getInventory();
    res.status(200).json(ingredients);
  },
};
