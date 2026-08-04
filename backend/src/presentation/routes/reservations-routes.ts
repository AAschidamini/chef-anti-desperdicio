import { Router } from "express";
import { reservationsController } from "../controllers/reservations-controller";
import { asyncHandler } from "../middlewares/async-handler";

export const reservationsRoutes = Router();

reservationsRoutes.get("/", asyncHandler(reservationsController.list));
reservationsRoutes.post("/", asyncHandler(reservationsController.create));
reservationsRoutes.patch("/:id/cancel", asyncHandler(reservationsController.cancel));
