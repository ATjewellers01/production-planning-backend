import type { Request, Response } from "express";
import { masterDropdownRepository } from "./master-dropdown.repository.js";

export const masterDropdownController = {
  async list(_req: Request, res: Response) {
    const rows = await masterDropdownRepository.findAll();
    res.json({ success: true, data: rows });
  },

  async create(req: Request, res: Response) {
    const { storageLocation, karigarName, authorizedBy } = req.body;
    const [row] = await masterDropdownRepository.create({ storageLocation, karigarName, authorizedBy });
    res.status(201).json({ success: true, data: row });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ success: false, message: "Missing dropdown id" });
      return;
    }

    const { storageLocation, karigarName, authorizedBy } = req.body;
    const [row] = await masterDropdownRepository.update(id, { storageLocation, karigarName, authorizedBy });
    if (!row) { res.status(404).json({ success: false, message: "Not found" }); return; }
    res.json({ success: true, data: row });
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ success: false, message: "Missing dropdown id" });
      return;
    }

    const [row] = await masterDropdownRepository.delete(id);
    if (!row) { res.status(404).json({ success: false, message: "Not found" }); return; }
    res.json({ success: true, data: row });
  },
};
