import type { Request, Response } from "express";
import { karigarIssueService } from "./karigar-issue.service.js";

export const karigarIssueController = {
  async list(_req: Request, res: Response) {
    const data = await karigarIssueService.listEntries();
    res.json({ success: true, data });
  },

  async create(req: Request, res: Response) {
    const data = await karigarIssueService.createEntry(req.body);
    res.status(201).json({ success: true, data });
  },
};
