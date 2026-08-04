import type { Request, Response } from "express";
import { SalesService } from "../../application/services/sales-service";
import { InMemorySalesRepository } from "../../infrastructure/repositories/in-memory-sales-repository";

const salesService = new SalesService(new InMemorySalesRepository());

export const salesController = {
  async getHistory(req: Request, res: Response): Promise<void> {
    const { startDate, endDate } = req.query;
    const sales = await salesService.getSalesHistory({
      startDate: typeof startDate === "string" ? startDate : undefined,
      endDate: typeof endDate === "string" ? endDate : undefined,
    });
    res.status(200).json(sales);
  },
};
