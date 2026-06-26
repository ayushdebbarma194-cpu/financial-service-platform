import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { AuthenticatedRequest } from "../types";
import { sendSuccess, sendCreated } from "../utils/response";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, referralCode } = req.body;
      const result = await authService.register(name, email, password, referralCode);
      sendCreated(res, result, "Account created successfully");
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      sendSuccess(res, result, "Login successful");
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refreshToken(refreshToken);
      sendSuccess(res, tokens, "Token refreshed");
    } catch (error) {
      next(error);
    }
  }

  async logout(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { refreshToken } = req.body;
      await authService.logout(userId, refreshToken);
      sendSuccess(res, null, "Logged out successfully");
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { currentPassword, newPassword } = req.body;
      await authService.changePassword(userId, currentPassword, newPassword);
      sendSuccess(res, null, "Password changed successfully");
    } catch (error) {
      next(error);
    }
  }

  async me(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      sendSuccess(res, req.user, "User info");
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
