import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { departmentIssueController } from "./department-issue.controller.js";
import { createDepartmentIssueEntrySchema } from "./department-issue.validation.js";

export const departmentIssueRoutes = Router();

departmentIssueRoutes.get("/", asyncHandler(departmentIssueController.list));
departmentIssueRoutes.post(
  "/",
  validate(createDepartmentIssueEntrySchema),
  asyncHandler(departmentIssueController.create),
);
