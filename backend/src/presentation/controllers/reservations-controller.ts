import type { Request, Response } from "express";
import { ReservationService } from "../../application/services/reservation-service";
import { InMemoryReservationRepository } from "../../infrastructure/repositories/in-memory-reservation-repository";

const reservationService = new ReservationService(
  new InMemoryReservationRepository()
);

export const reservationsController = {
  async list(_req: Request, res: Response): Promise<void> {
    const reservations = await reservationService.listReservations();
    res.status(200).json(reservations);
  },

  async create(req: Request, res: Response): Promise<void> {
    const reservation = await reservationService.createReservation(req.body);
    res.status(201).json(reservation);
  },

  async cancel(req: Request, res: Response): Promise<void> {
    const reservation = await reservationService.cancelReservation(req.params.id);
    res.status(200).json(reservation);
  },
};
