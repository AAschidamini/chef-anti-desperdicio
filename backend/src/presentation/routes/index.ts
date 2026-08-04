import { Router } from "express";
import { authRoutes } from "./auth-routes";
import { salesRoutes } from "./sales-routes";
import { reservationsRoutes } from "./reservations-routes";
import { inventoryRoutes } from "./inventory-routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/sales", salesRoutes);
apiRouter.use("/reservations", reservationsRoutes);
apiRouter.use("/inventory", inventoryRoutes);
