import type { Request, Response } from "express";
import { alloyConversionService } from "./alloy-conversion.service.js";

export const alloyConversionController = {
  async list(_req: Request, res: Response) {
    const data = await alloyConversionService.listEntries();
    res.json({ success: true, data });
  },

  async create(req: Request, res: Response) {
    const data = await alloyConversionService.createEntry(req.body);
    res.status(201).json({ success: true, data });
  },
};
