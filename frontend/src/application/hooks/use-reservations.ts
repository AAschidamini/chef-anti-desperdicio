"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  CreateReservationInput,
  Reservation,
} from "@/domain/entities/reservation";
import { reservationService } from "@/application/services/reservation-service";

interface UseReservationsResult {
  reservations: Reservation[];
  isLoading: boolean;
  error: string | null;
  createReservation: (input: CreateReservationInput) => Promise<void>;
  cancelReservation: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useReservations(): UseReservationsResult {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await reservationService.getUpcoming();
      setReservations(data);
    } catch {
      setError("Não foi possível carregar as reservas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- setState ocorre após await dentro de fetchReservations
    fetchReservations();
  }, [fetchReservations]);

  const createReservation = useCallback(
    async (input: CreateReservationInput) => {
      await reservationService.create(input);
      await fetchReservations();
    },
    [fetchReservations]
  );

  const cancelReservation = useCallback(
    async (id: string) => {
      await reservationService.cancel(id);
      await fetchReservations();
    },
    [fetchReservations]
  );

  return {
    reservations,
    isLoading,
    error,
    createReservation,
    cancelReservation,
    refetch: fetchReservations,
  };
}
