import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { alloyConversionController } from "./alloy-conversion.controller.js";
import { createAlloyConversionEntrySchema } from "./alloy-conversion.validation.js";

export const alloyConversionRoutes = Router();

alloyConversionRoutes.get("/", asyncHandler(alloyConversionController.list));
alloyConversionRoutes.post("/", validate(createAlloyConversionEntrySchema), asyncHandler(alloyConversionController.create));
