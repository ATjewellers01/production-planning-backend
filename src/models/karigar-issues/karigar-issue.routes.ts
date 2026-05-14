import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { karigarIssueController } from "./karigar-issue.controller.js";
import { createKarigarIssueSchema } from "./karigar-issue.validation.js";

export const karigarIssueRoutes = Router();

karigarIssueRoutes.get("/", asyncHandler(karigarIssueController.list));
karigarIssueRoutes.post("/", validate(createKarigarIssueSchema), asyncHandler(karigarIssueController.create));
