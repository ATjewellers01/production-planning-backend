import { Router } from "express";
import { departmentReceiptController } from "./department-receipt.controller.js";
import { createDepartmentReceiptSchema } from "./department-receipt.validation.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const departmentReceiptRoutes = Router();

// Scrap metal totals by karat (for Alloy Conversion stock cards)
departmentReceiptRoutes.get("/scrap-by-karat", asyncHandler(departmentReceiptController.scrapByKarat));

// List all receipts
departmentReceiptRoutes.get("/", asyncHandler(departmentReceiptController.list));

// Create new receipt
departmentReceiptRoutes.post(
  "/", 
  validate(createDepartmentReceiptSchema), 
  asyncHandler(departmentReceiptController.create)
);
