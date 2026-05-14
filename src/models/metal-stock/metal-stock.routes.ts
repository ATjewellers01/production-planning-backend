import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { metalStockController } from "./metal-stock.controller.js";
import { createMetalStockEntrySchema } from "./metal-stock.validation.js";

export const metalStockRoutes = Router();

metalStockRoutes.get("/", asyncHandler(metalStockController.list));
metalStockRoutes.post("/", validate(createMetalStockEntrySchema), asyncHandler(metalStockController.create));
