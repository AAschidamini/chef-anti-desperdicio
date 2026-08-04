import type { ReservationRepository } from "@/domain/repositories/reservation-repository";
import type {
  CreateReservationInput,
  Reservation,
} from "@/domain/entities/reservation";
import { httpClient } from "@/infrastructure/http/http-client";

export class HttpReservationRepository implements ReservationRepository {
  getAll(): Promise<Reservation[]> {
    return httpClient.get<Reservation[]>("/reservations");
  }

  create(input: CreateReservationInput): Promise<Reservation> {
    return httpClient.post<Reservation>("/reservations", input);
  }

  async cancel(id: string): Promise<void> {
    await httpClient.patch<void>(`/reservations/${id}/cancel`);
  }
}
