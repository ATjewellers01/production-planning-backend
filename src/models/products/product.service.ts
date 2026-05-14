import { HttpError } from "../../utils/http-error.js";
import { productRepository } from "./product.repository.js";
import type { CreateProductInput, UpdateProductInput } from "./product.validation.js";

export const productService = {
  listProducts() {
    return productRepository.findAll();
  },

  async getProduct(id: string) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new HttpError(404, "Product not found");
    }
    return product;
  },

  async createProduct(input: CreateProductInput) {
    const existing = await productRepository.findBySku(input.sku);
    if (existing) {
      throw new HttpError(409, "SKU already exists");
    }

    if (Number(input.netWeight) > Number(input.grossWeight)) {
      throw new HttpError(422, "Net weight cannot be greater than gross weight");
    }

    return productRepository.create(input);
  },

  async updateProduct(id: string, input: UpdateProductInput) {
    const current = await productRepository.findById(id);
    if (!current) {
      throw new HttpError(404, "Product not found");
    }

    const grossWeight = input.grossWeight ?? current.grossWeight;
    const netWeight = input.netWeight ?? current.netWeight;
    if (Number(netWeight) > Number(grossWeight)) {
      throw new HttpError(422, "Net weight cannot be greater than gross weight");
    }

    const updated = await productRepository.update(id, input);
    return updated;
  },

  async deleteProduct(id: string) {
    const deleted = await productRepository.delete(id);
    if (!deleted) {
      throw new HttpError(404, "Product not found");
    }
    return deleted;
  },
};
