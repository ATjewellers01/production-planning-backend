import type { Request, Response } from "express";
import { userService } from "./user.service.js";

export const userController = {
  async list(_req: Request, res: Response) {
    const data = await userService.listUsers();
    res.json({ success: true, data });
  },

  async get(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const data = await userService.getUser(id);
    res.json({ success: true, data });
  },

  async create(req: Request, res: Response) {
    const data = await userService.createUser(req.body);
    res.status(201).json({ success: true, data });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const data = await userService.updateUser(id, req.body);
    res.json({ success: true, data });
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const data = await userService.deleteUser(id);
    res.json({ success: true, data });
  },
};
