import type { InventoryRepository } from "@/domain/repositories/inventory-repository";
import type { Ingredient } from "@/domain/entities/ingredient";
import { httpClient } from "@/infrastructure/http/http-client";

export class HttpInventoryRepository implements InventoryRepository {
  getAll(): Promise<Ingredient[]> {
    return httpClient.get<Ingredient[]>("/inventory");
  }
}
