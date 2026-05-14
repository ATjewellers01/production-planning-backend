import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { HttpError } from "../../utils/http-error.js";
import { userService } from "../users/user.service.js";

export const authController = {
  async login(req: Request, res: Response) {
    const { userId, password } = req.body as { userId: string; password: string };

    if (!userId || !password) {
      throw new HttpError(400, "userId and password are required");
    }

    const user = await userService.verifyCredentials(userId, password);
    if (!user) {
      throw new HttpError(401, "Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.userId, name: user.name, role: user.role, pageAccess: user.pageAccess },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any },
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          userId: user.userId,
          name: user.name,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber,
          profileImage: user.profileImage,
          pageAccess: user.pageAccess,
        },
      },
    });
  },

  async me(req: Request, res: Response) {
    res.json({ success: true, data: req.jwtUser });
  },
};
