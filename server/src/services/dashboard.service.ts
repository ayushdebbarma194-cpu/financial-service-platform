import prisma from "../prisma/client";
import { NotFoundError } from "../utils/errors";
import { membershipService } from "./membership.service";

export class DashboardService {
  async getDashboard(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatarUrl: true,
        referralCode: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const membership = await membershipService.getMembership(userId);

    const announcements = await prisma.announcement.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const recentPayments = await prisma.payment.findMany({
      where: { userId, status: "COMPLETED" },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    const referralCount = await prisma.referral.count({
      where: { referrerId: userId },
    });

    return {
      user,
      membership,
      announcements: announcements.map((a) => ({
        id: a.id,
        title: a.title,
        content: a.content,
        type: a.type,
        date: a.createdAt,
      })),
      recentPayments: recentPayments.map((p) => ({
        id: p.id,
        invoiceNumber: p.invoiceNumber,
        amount: p.amount,
        planId: p.planId,
        status: p.status,
        paidAt: p.paidAt,
      })),
      stats: {
        referralCount,
        memberSince: user.createdAt,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatarUrl: true,
        referralCode: true,
        telegramId: true,
        isVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async updateProfile(
    userId: string,
    data: { name?: string; phone?: string }
  ) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatarUrl: true,
        referralCode: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async getAnnouncements(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.announcement.count({ where: { isActive: true } }),
    ]);

    return {
      announcements,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export const dashboardService = new DashboardService();
