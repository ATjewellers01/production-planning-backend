import type { Request, Response } from "express";
import { productionPlanningService } from "./production-planning.service.js";

export const productionPlanningController = {
  async list(_req: Request, res: Response) {
    const data = await productionPlanningService.listEntries();
    res.json({ success: true, data });
  },

  async create(req: Request, res: Response) {
    const data = await productionPlanningService.createEntry(req.body);
    res.status(201).json({ success: true, data });
  },

  async updateStatus(req: Request, res: Response) {
    const data = await productionPlanningService.updateStatus(req.body);
    res.json({ success: true, data });
  },

  async getStats(_req: Request, res: Response) {
    const data = await productionPlanningService.getStats();
    res.json({ success: true, data });
  },

  async getStockBasedSummary(_req: Request, res: Response) {
    const data = await productionPlanningService.getStockBasedSummary();
    res.json({ success: true, data });
  },
};
