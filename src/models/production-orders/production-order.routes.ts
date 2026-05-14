import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { productionOrderController } from "./production-order.controller.js";
import {
  createProductionOrderSchema,
  productionOrderIdParamSchema,
  updateProductionOrderSchema,
} from "./production-order.validation.js";

export const productionOrderRoutes = Router();

productionOrderRoutes.get("/", asyncHandler(productionOrderController.list));
productionOrderRoutes.get(
  "/:id",
  validate(productionOrderIdParamSchema),
  asyncHandler(productionOrderController.get),
);
productionOrderRoutes.post(
  "/",
  validate(createProductionOrderSchema),
  asyncHandler(productionOrderController.create),
);
productionOrderRoutes.patch(
  "/:id",
  validate(updateProductionOrderSchema),
  asyncHandler(productionOrderController.update),
);
productionOrderRoutes.delete(
  "/:id",
  validate(productionOrderIdParamSchema),
  asyncHandler(productionOrderController.remove),
);
