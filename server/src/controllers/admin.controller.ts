import { Request, Response, NextFunction } from "express";
import { adminService } from "../services/admin.service";
import { AuthenticatedRequest } from "../types";
import { sendSuccess, sendCreated, sendNoContent } from "../utils/response";

export class AdminController {
  async getStats(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const stats = await adminService.getStats();
      sendSuccess(res, stats, "Platform statistics");
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const page = parseInt(String(req.query.page)) || 1;
      const limit = parseInt(String(req.query.limit)) || 20;
      const search = req.query.search ? String(req.query.search) : undefined;
      const result = await adminService.getUsers(page, limit, search);
      sendSuccess(res, result.users, "Users list", 200, result.meta);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = String(req.params.userId);
      const user = await adminService.getUserById(userId);
      sendSuccess(res, user, "User details");
    } catch (error) {
      next(error);
    }
  }

  async toggleUserStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = String(req.params.userId);
      const user = await adminService.toggleUserStatus(userId);
      sendSuccess(res, user, `User ${user.isActive ? "activated" : "deactivated"}`);
    } catch (error) {
      next(error);
    }
  }

  async createAnnouncement(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { title, content, type } = req.body;
      const announcement = await adminService.createAnnouncement(title, content, type || "INFO");
      sendCreated(res, announcement, "Announcement created");
    } catch (error) {
      next(error);
    }
  }

  async updateAnnouncement(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const data = req.body;
      const announcement = await adminService.updateAnnouncement(id, data);
      sendSuccess(res, announcement, "Announcement updated");
    } catch (error) {
      next(error);
    }
  }

  async deleteAnnouncement(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      await adminService.deleteAnnouncement(id);
      sendNoContent(res);
    } catch (error) {
      next(error);
    }
  }

  async getPayments(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const page = parseInt(String(req.query.page)) || 1;
      const limit = parseInt(String(req.query.limit)) || 20;
      const status = req.query.status ? String(req.query.status) : undefined;
      const result = await adminService.getPayments(page, limit, status);
      sendSuccess(res, result.payments, "Payments list", 200, result.meta);
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
