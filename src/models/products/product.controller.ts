import type { Request, Response } from "express";
import { productService } from "./product.service.js";

export const productController = {
  async list(_req: Request, res: Response) {
    const data = await productService.listProducts();
    res.json({ success: true, data });
  },

  async get(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const data = await productService.getProduct(id);
    res.json({ success: true, data });
  },

  async create(req: Request, res: Response) {
    const data = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const data = await productService.updateProduct(id, req.body);
    res.json({ success: true, data });
  },

  async remove(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const data = await productService.deleteProduct(id);
    res.json({ success: true, data });
  },
};
