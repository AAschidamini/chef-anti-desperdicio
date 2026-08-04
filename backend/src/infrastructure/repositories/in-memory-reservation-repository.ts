import { randomUUID } from "crypto";
import type { Reservation } from "../../domain/entities/reservation";
import type { ReservationRepository } from "../../domain/repositories/reservation-repository";

function inDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

const reservations: Reservation[] = [
  {
    id: randomUUID(),
    customerName: "Carlos Souza",
    customerPhone: "(11) 91234-5678",
    partySize: 4,
    date: inDays(1),
    time: "20:00",
    tableNumber: 5,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    customerName: "Fernanda Lima",
    customerPhone: "(11) 98765-4321",
    partySize: 2,
    date: inDays(2),
    time: "19:30",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

export class InMemoryReservationRepository implements ReservationRepository {
  async findAll(): Promise<Reservation[]> {
    return reservations;
  }

  async findById(id: string): Promise<Reservation | null> {
    return reservations.find((reservation) => reservation.id === id) ?? null;
  }

  async create(reservation: Reservation): Promise<Reservation> {
    reservations.push(reservation);
    return reservation;
  }

  async update(reservation: Reservation): Promise<Reservation> {
    const index = reservations.findIndex((item) => item.id === reservation.id);
    if (index >= 0) {
      reservations[index] = reservation;
    }
    return reservation;
  }
}
