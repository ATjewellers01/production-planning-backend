import { Router } from "express";
import { requireAdmin } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { userController } from "./user.controller.js";
import { createUserSchema, updateUserSchema, userIdParamSchema } from "./user.validation.js";

export const userRoutes = Router();

userRoutes.use(requireAdmin);

userRoutes.get("/", asyncHandler(userController.list));
userRoutes.get("/:id", validate(userIdParamSchema), asyncHandler(userController.get));
userRoutes.post("/", validate(createUserSchema), asyncHandler(userController.create));
userRoutes.patch("/:id", validate(updateUserSchema), asyncHandler(userController.update));
userRoutes.delete("/:id", validate(userIdParamSchema), asyncHandler(userController.remove));
