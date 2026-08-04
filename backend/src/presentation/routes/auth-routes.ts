import { Router } from "express";
import { authController } from "../controllers/auth-controller";
import { asyncHandler } from "../middlewares/async-handler";

export const authRoutes = Router();

authRoutes.post("/register", asyncHandler(authController.register));
authRoutes.post("/login", asyncHandler(authController.login));
authRoutes.post("/logout", asyncHandler(authController.logout));
