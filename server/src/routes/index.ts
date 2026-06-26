import { Router } from "express";
import authRoutes from "./auth.routes";
import membershipRoutes from "./membership.routes";
import paymentRoutes from "./payment.routes";
import dashboardRoutes from "./dashboard.routes";
import adminRoutes from "./admin.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/membership", membershipRoutes);
router.use("/payments", paymentRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/admin", adminRoutes);

export default router;
