"use client";

import { useCallback, useEffect, useState } from "react";
import type { Sale } from "@/domain/entities/sale";
import type { SalesFilters } from "@/domain/repositories/sales-repository";
import { salesService } from "@/application/services/sales-service";

interface UseSalesHistoryResult {
  sales: Sale[];
  totalRevenue: number;
  isLoading: boolean;
  error: string | null;
  refetch: (filters?: SalesFilters) => Promise<void>;
}

export function useSalesHistory(
  initialFilters?: SalesFilters
): UseSalesHistoryResult {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = useCallback(async (filters?: SalesFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await salesService.getHistory(filters);
      setSales(data);
    } catch {
      setError("Não foi possível carregar o histórico de vendas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- setState ocorre após await dentro de fetchSales
    fetchSales(initialFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    sales,
    totalRevenue: salesService.getTotalRevenue(sales),
    isLoading,
    error,
    refetch: fetchSales,
  };
}
