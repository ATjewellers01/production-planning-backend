import type { Request, Response } from "express";
import { productionOrderService } from "./production-order.service.js";

export const productionOrderController = {
  async list(_req: Request, res: Response) {
    const data = await productionOrderService.listProductionOrders();
    res.json({ success: true, data });
  },

  async get(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const data = await productionOrderService.getProductionOrder(id);
    res.json({ success: true, data });
  },

  async create(req: Request, res: Response) {
    const data = await productionOrderService.createProductionOrder(req.body);
    res.status(201).json({ success: true, data });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const data = await productionOrderService.updateProductionOrder(id, req.body);
    res.json({ success: true, data });
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const data = await productionOrderService.deleteProductionOrder(id);
    res.json({ success: true, data });
  },
};
