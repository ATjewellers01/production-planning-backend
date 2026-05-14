import { productRepository } from "../products/product.repository.js";
import { HttpError } from "../../utils/http-error.js";
import { productionOrderRepository } from "./production-order.repository.js";
import type {
  CreateProductionOrderInput,
  UpdateProductionOrderInput,
} from "./production-order.validation.js";

export const productionOrderService = {
  listProductionOrders() {
    return productionOrderRepository.findAll();
  },

  async getProductionOrder(id: string) {
    const order = await productionOrderRepository.findById(id);
    if (!order) {
      throw new HttpError(404, "Production order not found");
    }
    return order;
  },

  async createProductionOrder(input: CreateProductionOrderInput) {
    const existing = await productionOrderRepository.findByOrderNumber(input.orderNumber);
    if (existing) {
      throw new HttpError(409, "Order number already exists");
    }

    if (input.productId) {
      const product = await productRepository.findById(input.productId);
      if (!product) {
        throw new HttpError(422, "Selected product does not exist");
      }
    }

    return productionOrderRepository.create(input);
  },

  async updateProductionOrder(id: string, input: UpdateProductionOrderInput) {
    const current = await productionOrderRepository.findById(id);
    if (!current) {
      throw new HttpError(404, "Production order not found");
    }

    if (input.productId) {
      const product = await productRepository.findById(input.productId);
      if (!product) {
        throw new HttpError(422, "Selected product does not exist");
      }
    }

    const updated = await productionOrderRepository.update(id, input);
    return updated;
  },

  async deleteProductionOrder(id: string) {
    const deleted = await productionOrderRepository.delete(id);
    if (!deleted) {
      throw new HttpError(404, "Production order not found");
    }
    return deleted;
  },
};
