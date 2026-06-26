import { Router } from "express";
import { membershipController } from "../controllers/membership.controller";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { z } from "zod/v4";

const router = Router();

// Validation schemas
const connectTelegramSchema = z.object({
  telegramId: z.string().min(1, "Telegram ID is required"),
});

// All routes require authentication
router.use(authenticate);

// Routes
router.get("/", membershipController.getMembership);
router.post("/cancel", membershipController.cancelMembership);
router.post("/toggle-auto-renew", membershipController.toggleAutoRenew);
router.post("/connect-telegram", validate(connectTelegramSchema), membershipController.connectTelegram);

export default router;
