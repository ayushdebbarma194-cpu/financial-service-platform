import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { authLimiter } from "../middleware/rate-limiter";
import { z } from "zod/v4";

const router = Router();

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  referralCode: z.string().optional(),
});

const loginSchema = z.object({
  email: z.email("Valid email required"),
  password: z.string().min(1, "Password is required"),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

// Routes
router.post("/register", authLimiter, validate(registerSchema), authController.register);
router.post("/login", authLimiter, validate(loginSchema), authController.login);
router.post("/refresh", validate(refreshSchema), authController.refreshToken);
router.post("/logout", authenticate, authController.logout);
router.post("/change-password", authenticate, validate(changePasswordSchema), authController.changePassword);
router.get("/me", authenticate, authController.me);

export default router;
