import type { Request, Response } from "express";
import { metalStockService } from "./metal-stock.service.js";

export const metalStockController = {
  async list(_req: Request, res: Response) {
    const data = await metalStockService.listEntries();
    res.json({ success: true, data });
  },

  async create(req: Request, res: Response) {
    const data = await metalStockService.createEntry(req.body);
    res.status(201).json({ success: true, data });
  },
};
