import { Router } from "express";
import { salesController } from "../controllers/sales-controller";
import { asyncHandler } from "../middlewares/async-handler";

export const salesRoutes = Router();

salesRoutes.get("/", asyncHandler(salesController.getHistory));
