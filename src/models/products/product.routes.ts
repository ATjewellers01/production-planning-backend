import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { productController } from "./product.controller.js";
import {
  createProductSchema,
  productIdParamSchema,
  updateProductSchema,
} from "./product.validation.js";

export const productRoutes = Router();

productRoutes.get("/", asyncHandler(productController.list));
productRoutes.get("/:id", validate(productIdParamSchema), asyncHandler(productController.get));
productRoutes.post("/", validate(createProductSchema), asyncHandler(productController.create));
productRoutes.patch("/:id", validate(updateProductSchema), asyncHandler(productController.update));
productRoutes.delete("/:id", validate(productIdParamSchema), asyncHandler(productController.remove));
