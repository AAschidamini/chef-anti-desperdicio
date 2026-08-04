"use client";

import { useCallback, useEffect, useState } from "react";
import type { Ingredient } from "@/domain/entities/ingredient";
import { inventoryService } from "@/application/services/inventory-service";

interface UseInventoryResult {
  ingredients: Ingredient[];
  expiringOrExpired: Ingredient[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useInventory(): UseInventoryResult {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIngredients = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await inventoryService.getAll();
      setIngredients(data);
    } catch {
      setError("Não foi possível carregar o estoque.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- setState ocorre após await dentro de fetchIngredients
    fetchIngredients();
  }, [fetchIngredients]);

  return {
    ingredients,
    expiringOrExpired: inventoryService.getExpiringOrExpired(ingredients),
    isLoading,
    error,
    refetch: fetchIngredients,
  };
}
