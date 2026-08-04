import { randomUUID } from "crypto";
import type { Ingredient } from "../../domain/entities/ingredient";
import type { InventoryRepository } from "../../domain/repositories/inventory-repository";

function inDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

const ingredients: Ingredient[] = [
  {
    id: randomUUID(),
    name: "Tomate",
    category: "Legumes",
    quantity: 8,
    unit: "kg",
    minimumStock: 5,
    expirationDate: inDays(2),
  },
  {
    id: randomUUID(),
    name: "Leite",
    category: "Laticínios",
    quantity: 12,
    unit: "l",
    minimumStock: 6,
    expirationDate: inDays(-1),
  },
  {
    id: randomUUID(),
    name: "Arroz",
    category: "Grãos",
    quantity: 30,
    unit: "kg",
    minimumStock: 10,
    expirationDate: inDays(90),
  },
  {
    id: randomUUID(),
    name: "Frango",
    category: "Carnes",
    quantity: 15,
    unit: "kg",
    minimumStock: 8,
    expirationDate: inDays(1),
  },
];

export class InMemoryInventoryRepository implements InventoryRepository {
  async findAll(): Promise<Ingredient[]> {
    return ingredients;
  }
}
