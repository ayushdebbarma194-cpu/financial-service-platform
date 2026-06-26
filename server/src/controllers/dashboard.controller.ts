import { Response, NextFunction } from "express";
import { dashboardService } from "../services/dashboard.service";
import { AuthenticatedRequest } from "../types";
import { sendSuccess } from "../utils/response";

export class DashboardController {
  async getDashboard(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const dashboard = await dashboardService.getDashboard(userId);
      sendSuccess(res, dashboard, "Dashboard data");
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const profile = await dashboardService.getProfile(userId);
      sendSuccess(res, profile, "Profile data");
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { name, phone } = req.body;
      const profile = await dashboardService.updateProfile(userId, { name, phone });
      sendSuccess(res, profile, "Profile updated");
    } catch (error) {
      next(error);
    }
  }

  async getAnnouncements(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const page = parseInt(String(req.query.page)) || 1;
      const limit = parseInt(String(req.query.limit)) || 10;
      const result = await dashboardService.getAnnouncements(page, limit);
      sendSuccess(res, result.announcements, "Announcements", 200, result.meta);
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController = new DashboardController();
