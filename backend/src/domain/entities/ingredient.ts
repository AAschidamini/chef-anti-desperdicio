export type IngredientUnit = "kg" | "g" | "l" | "ml" | "un";

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: IngredientUnit;
  minimumStock: number;
  expirationDate: string;
}
