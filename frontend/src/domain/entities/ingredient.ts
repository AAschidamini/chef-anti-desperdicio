export type IngredientUnit = "kg" | "g" | "l" | "ml" | "un";

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: IngredientUnit;
  expirationDate: string;
  minimumStock: number;
  category: string;
}

export type ExpirationStatus = "ok" | "expiring-soon" | "expired";

export function getExpirationStatus(
  expirationDate: string,
  warningDays = 3
): ExpirationStatus {
  const today = new Date();
  const expiration = new Date(expirationDate);
  const diffInDays = Math.ceil(
    (expiration.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays < 0) return "expired";
  if (diffInDays <= warningDays) return "expiring-soon";
  return "ok";
}
