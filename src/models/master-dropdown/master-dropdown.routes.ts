import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { masterDropdownController } from "./master-dropdown.controller.js";

export const masterDropdownRoutes = Router();

masterDropdownRoutes.get("/", asyncHandler(masterDropdownController.list));
masterDropdownRoutes.post("/", asyncHandler(masterDropdownController.create));
masterDropdownRoutes.put("/:id", asyncHandler(masterDropdownController.update));
masterDropdownRoutes.delete("/:id", asyncHandler(masterDropdownController.remove));
