import { Router } from "express";
import { adminController } from "../controllers/admin.controller";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { z } from "zod/v4";

const router = Router();

// Validation schemas
const createAnnouncementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  type: z.enum(["INFO", "UPDATE", "IMPORTANT"]).optional(),
});

const updateAnnouncementSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  type: z.enum(["INFO", "UPDATE", "IMPORTANT"]).optional(),
  isActive: z.boolean().optional(),
});

// All admin routes require authentication + admin role
router.use(authenticate, requireAdmin);

// Stats
router.get("/stats", adminController.getStats);

// Users
router.get("/users", adminController.getUsers);
router.get("/users/:userId", adminController.getUserById);
router.patch("/users/:userId/toggle-status", adminController.toggleUserStatus);

// Announcements
router.post("/announcements", validate(createAnnouncementSchema), adminController.createAnnouncement);
router.patch("/announcements/:id", validate(updateAnnouncementSchema), adminController.updateAnnouncement);
router.delete("/announcements/:id", adminController.deleteAnnouncement);

// Payments
router.get("/payments", adminController.getPayments);

export default router;
