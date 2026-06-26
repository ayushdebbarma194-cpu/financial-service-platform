import { Router } from "express";
import { paymentController } from "../controllers/payment.controller";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { z } from "zod/v4";

const router = Router();

// Validation schemas
const createOrderSchema = z.object({
  planId: z.enum(["monthly", "quarterly", "yearly"]),
});

const confirmPaymentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  paymentId: z.string().min(1, "Payment ID is required"),
  method: z.string().min(1, "Payment method is required"),
});

// Webhook (no auth - called by payment gateway)
router.post("/webhook", paymentController.webhook);

// Authenticated routes
router.post("/create-order", authenticate, validate(createOrderSchema), paymentController.createOrder);
router.post("/confirm", authenticate, validate(confirmPaymentSchema), paymentController.confirmPayment);
router.get("/history", authenticate, paymentController.getHistory);
router.get("/invoice/:paymentId", authenticate, paymentController.getInvoice);

export default router;
