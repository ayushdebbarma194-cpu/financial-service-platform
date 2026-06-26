import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { z } from "zod/v4";

const router = Router();

// Validation schemas
const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
});

// All routes require authentication
router.use(authenticate);

// Routes
router.get("/", dashboardController.getDashboard);
router.get("/profile", dashboardController.getProfile);
router.patch("/profile", validate(updateProfileSchema), dashboardController.updateProfile);
router.get("/announcements", dashboardController.getAnnouncements);

export default router;
