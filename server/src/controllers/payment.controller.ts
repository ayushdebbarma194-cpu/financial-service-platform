import { Request, Response, NextFunction } from "express";
import { paymentService } from "../services/payment.service";
import { AuthenticatedRequest } from "../types";
import { sendSuccess, sendCreated } from "../utils/response";
import { PlanId } from "../config/constants";

export class PaymentController {
  async createOrder(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { planId } = req.body;
      const order = await paymentService.createOrder(userId, planId as PlanId);
      sendCreated(res, order, "Payment order created");
    } catch (error) {
      next(error);
    }
  }

  async confirmPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { orderId, paymentId, method } = req.body;
      const result = await paymentService.confirmPayment(orderId, paymentId, method);
      sendSuccess(res, result, "Payment confirmed and membership activated");
    } catch (error) {
      next(error);
    }
  }

  async webhook(req: Request, res: Response, next: NextFunction) {
    try {
      const signature = req.headers["x-razorpay-signature"] as string || "";
      const result = await paymentService.handleWebhook(req.body, signature);
      sendSuccess(res, result, "Webhook processed");
    } catch (error) {
      next(error);
    }
  }

  async getHistory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const page = parseInt(String(req.query.page)) || 1;
      const limit = parseInt(String(req.query.limit)) || 10;
      const result = await paymentService.getPaymentHistory(userId, page, limit);
      sendSuccess(res, result.payments, "Payment history", 200, result.meta);
    } catch (error) {
      next(error);
    }
  }

  async getInvoice(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const paymentId = String(req.params.paymentId);
      const invoice = await paymentService.getInvoice(userId, paymentId);
      sendSuccess(res, invoice, "Invoice details");
    } catch (error) {
      next(error);
    }
  }
}

export const paymentController = new PaymentController();
