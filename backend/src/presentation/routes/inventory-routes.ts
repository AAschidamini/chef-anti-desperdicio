import { Router } from "express";
import { inventoryController } from "../controllers/inventory-controller";
import { asyncHandler } from "../middlewares/async-handler";

export const inventoryRoutes = Router();

inventoryRoutes.get("/", asyncHandler(inventoryController.list));
