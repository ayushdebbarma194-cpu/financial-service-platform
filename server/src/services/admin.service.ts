import prisma from "../prisma/client";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { paginate } from "../utils/helpers";

export class AdminService {
  async getUsers(page = 1, limit = 20, search?: string) {
    const { skip, take } = paginate(page, limit);

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          referralCode: true,
          lastLoginAt: true,
          createdAt: true,
          membership: {
            select: {
              planId: true,
              status: true,
              endDate: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        referralCode: true,
        telegramId: true,
        lastLoginAt: true,
        createdAt: true,
        membership: true,
        payments: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async toggleUserStatus(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError("User not found");

    return await prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
      select: { id: true, name: true, email: true, isActive: true },
    });
  }

  async createAnnouncement(title: string, content: string, type: string) {
    return await prisma.announcement.create({
      data: { title, content, type },
    });
  }

  async updateAnnouncement(
    id: string,
    data: { title?: string; content?: string; type?: string; isActive?: boolean }
  ) {
    const announcement = await prisma.announcement.findUnique({ where: { id } });
    if (!announcement) throw new NotFoundError("Announcement not found");

    return await prisma.announcement.update({ where: { id }, data });
  }

  async deleteAnnouncement(id: string) {
    const announcement = await prisma.announcement.findUnique({ where: { id } });
    if (!announcement) throw new NotFoundError("Announcement not found");

    await prisma.announcement.delete({ where: { id } });
  }

  async getStats() {
    const [totalUsers, activeMembers, totalRevenue, recentPayments] =
      await Promise.all([
        prisma.user.count(),
        prisma.membership.count({ where: { status: "ACTIVE" } }),
        prisma.payment.aggregate({
          where: { status: "COMPLETED" },
          _sum: { amount: true },
        }),
        prisma.payment.count({
          where: {
            status: "COMPLETED",
            paidAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          },
        }),
      ]);

    return {
      totalUsers,
      activeMembers,
      totalRevenue: totalRevenue._sum.amount || 0,
      recentPayments,
      conversionRate:
        totalUsers > 0
          ? ((activeMembers / totalUsers) * 100).toFixed(1)
          : "0",
    };
  }

  async getPayments(page = 1, limit = 20, status?: string) {
    const { skip, take } = paginate(page, limit);
    const where = status ? { status } : {};

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        include: {
          user: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.payment.count({ where }),
    ]);

    return {
      payments,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}

export const adminService = new AdminService();
