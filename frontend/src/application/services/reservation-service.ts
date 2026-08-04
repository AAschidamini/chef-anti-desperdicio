import type { ReservationRepository } from "@/domain/repositories/reservation-repository";
import type {
  CreateReservationInput,
  Reservation,
} from "@/domain/entities/reservation";
import { HttpReservationRepository } from "@/infrastructure/repositories/http-reservation-repository";

export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async getUpcoming(): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.getAll();
    return reservations.sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime()
    );
  }

  create(input: CreateReservationInput): Promise<Reservation> {
    return this.reservationRepository.create(input);
  }

  cancel(id: string): Promise<void> {
    return this.reservationRepository.cancel(id);
  }
}

export const reservationService = new ReservationService(
  new HttpReservationRepository()
);
