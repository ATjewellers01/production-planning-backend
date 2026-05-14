import type { Request, Response } from "express";
import { departmentReceiptService } from "./department-receipt.service.js";

export const departmentReceiptController = {
  async list(_req: Request, res: Response) {
    const data = await departmentReceiptService.listEntries();
    res.json({ success: true, data });
  },

  async create(req: Request, res: Response) {
    const data = await departmentReceiptService.createEntry(req.body);
    res.status(201).json({ success: true, data });
  },

  async scrapByKarat(_req: Request, res: Response) {
    const data = await departmentReceiptService.getScrapByKarat();
    res.json({ success: true, data });
  },
};
