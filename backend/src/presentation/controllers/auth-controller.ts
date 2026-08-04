import type { Request, Response } from "express";
import { AuthService } from "../../application/services/auth-service";
import { InMemoryUserRepository } from "../../infrastructure/repositories/in-memory-user-repository";

const authService = new AuthService(new InMemoryUserRepository());

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  },

  async login(req: Request, res: Response): Promise<void> {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  },

  async logout(_req: Request, res: Response): Promise<void> {
    res.status(204).send();
  },
};
