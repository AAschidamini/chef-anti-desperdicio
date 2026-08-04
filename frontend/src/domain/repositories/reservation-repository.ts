import type {
  CreateReservationInput,
  Reservation,
} from "@/domain/entities/reservation";

export interface ReservationRepository {
  getAll(): Promise<Reservation[]>;
  create(input: CreateReservationInput): Promise<Reservation>;
  cancel(id: string): Promise<void>;
}
