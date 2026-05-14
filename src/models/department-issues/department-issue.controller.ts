import type { Request, Response } from "express";
import { departmentIssueService } from "./department-issue.service.js";

export const departmentIssueController = {
  async list(_req: Request, res: Response) {
    const data = await departmentIssueService.listEntries();
    res.json({ success: true, data });
  },

  async create(req: Request, res: Response) {
    const data = await departmentIssueService.createEntry(req.body);
    res.status(201).json({ success: true, data });
  },
};
