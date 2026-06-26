import { Response, NextFunction } from "express";
import { membershipService } from "../services/membership.service";
import { AuthenticatedRequest } from "../types";
import { sendSuccess } from "../utils/response";
import { PlanId } from "../config/constants";

export class MembershipController {
  async getMembership(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const membership = await membershipService.getMembership(userId);
      sendSuccess(res, membership, membership ? "Membership found" : "No active membership");
    } catch (error) {
      next(error);
    }
  }

  async cancelMembership(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const result = await membershipService.cancelMembership(userId);
      sendSuccess(res, result, "Membership cancelled");
    } catch (error) {
      next(error);
    }
  }

  async toggleAutoRenew(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const result = await membershipService.toggleAutoRenew(userId);
      sendSuccess(res, { autoRenew: result.autoRenew }, "Auto-renew updated");
    } catch (error) {
      next(error);
    }
  }

  async connectTelegram(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { telegramId } = req.body;
      const result = await membershipService.connectTelegram(userId, telegramId);
      sendSuccess(res, result, "Telegram connected");
    } catch (error) {
      next(error);
    }
  }
}

export const membershipController = new MembershipController();
