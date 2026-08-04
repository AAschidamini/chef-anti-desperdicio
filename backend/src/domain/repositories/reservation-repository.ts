import type { Reservation } from "../entities/reservation";

export interface ReservationRepository {
  findAll(): Promise<Reservation[]>;
  findById(id: string): Promise<Reservation | null>;
  create(reservation: Reservation): Promise<Reservation>;
  update(reservation: Reservation): Promise<Reservation>;
}
