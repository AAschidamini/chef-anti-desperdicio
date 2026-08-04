import { randomUUID } from "crypto";
import type { Reservation } from "../../domain/entities/reservation";
import type { ReservationRepository } from "../../domain/repositories/reservation-repository";
import { NotFoundError } from "../../domain/errors/app-error";
import type { CreateReservationDto } from "../dtos/reservation-dto";

export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async listReservations(): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.findAll();
    return reservations.sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime()
    );
  }

  async createReservation(data: CreateReservationDto): Promise<Reservation> {
    return this.reservationRepository.create({
      id: randomUUID(),
      status: "pending",
      createdAt: new Date().toISOString(),
      ...data,
    });
  }

  async cancelReservation(id: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new NotFoundError("Reserva não encontrada.");
    }

    return this.reservationRepository.update({
      ...reservation,
      status: "cancelled",
    });
  }
}
