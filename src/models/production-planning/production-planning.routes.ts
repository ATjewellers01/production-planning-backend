import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { productionPlanningController } from "./production-planning.controller.js";
import {
  createProductionPlanningEntrySchema,
  updateProductionPlanningStatusSchema,
} from "./production-planning.validation.js";

export const productionPlanningRoutes = Router();

productionPlanningRoutes.get("/stats", asyncHandler(productionPlanningController.getStats));
productionPlanningRoutes.get("/stock-summary", asyncHandler(productionPlanningController.getStockBasedSummary));
productionPlanningRoutes.get("/", asyncHandler(productionPlanningController.list));
productionPlanningRoutes.patch(
  "/status",
  validate(updateProductionPlanningStatusSchema),
  asyncHandler(productionPlanningController.updateStatus),
);
productionPlanningRoutes.post(
  "/",
  validate(createProductionPlanningEntrySchema),
  asyncHandler(productionPlanningController.create),
);
