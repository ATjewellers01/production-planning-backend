import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { authController } from "./auth.controller.js";

export const authRoutes = Router();

authRoutes.post("/login", asyncHandler(authController.login));
authRoutes.get("/me", requireAuth, asyncHandler(authController.me));
