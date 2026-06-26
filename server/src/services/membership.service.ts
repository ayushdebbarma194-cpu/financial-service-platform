import prisma from "../prisma/client";
import { PLANS, PlanId, MEMBERSHIP_STATUS } from "../config/constants";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { calculateEndDate, getDaysRemaining, isExpired } from "../utils/helpers";

export class MembershipService {
  async getMembership(userId: string) {
    const membership = await prisma.membership.findUnique({
      where: { userId },
    });

    if (!membership) {
      return null;
    }

    // Auto-expire if end date passed
    if (membership.status === "ACTIVE" && isExpired(membership.endDate)) {
      await prisma.membership.update({
        where: { id: membership.id },
        data: { status: MEMBERSHIP_STATUS.EXPIRED },
      });
      membership.status = MEMBERSHIP_STATUS.EXPIRED;
    }

    const plan = PLANS[membership.planId as PlanId];

    return {
      id: membership.id,
      plan: plan?.name || membership.planId,
      planId: membership.planId,
      status: membership.status,
      startDate: membership.startDate,
      endDate: membership.endDate,
      daysRemaining: getDaysRemaining(membership.endDate),
      autoRenew: membership.autoRenew,
      telegramConnected: membership.telegramConnected,
      telegramInviteLink: membership.telegramInviteLink,
    };
  }

  async activateMembership(userId: string, planId: PlanId) {
    const plan = PLANS[planId];
    if (!plan) {
      throw new BadRequestError("Invalid plan selected");
    }

    const now = new Date();
    const endDate = calculateEndDate(now, plan.durationDays);

    // Check if user already has a membership
    const existing = await prisma.membership.findUnique({
      where: { userId },
    });

    if (existing) {
      // Upgrade/renew existing membership
      const newEndDate = existing.status === "ACTIVE" && !isExpired(existing.endDate)
        ? calculateEndDate(existing.endDate, plan.durationDays) // Extend from current end
        : endDate; // Fresh start

      return await prisma.membership.update({
        where: { userId },
        data: {
          planId,
          status: MEMBERSHIP_STATUS.ACTIVE,
          startDate: now,
          endDate: newEndDate,
          telegramInviteLink: this.generateTelegramInviteLink(),
        },
      });
    }

    // Create new membership
    return await prisma.membership.create({
      data: {
        userId,
        planId,
        status: MEMBERSHIP_STATUS.ACTIVE,
        startDate: now,
        endDate,
        telegramInviteLink: this.generateTelegramInviteLink(),
      },
    });
  }

  async cancelMembership(userId: string) {
    const membership = await prisma.membership.findUnique({
      where: { userId },
    });

    if (!membership) {
      throw new NotFoundError("No active membership found");
    }

    return await prisma.membership.update({
      where: { userId },
      data: {
        status: MEMBERSHIP_STATUS.CANCELLED,
        autoRenew: false,
      },
    });
  }

  async toggleAutoRenew(userId: string) {
    const membership = await prisma.membership.findUnique({
      where: { userId },
    });

    if (!membership) {
      throw new NotFoundError("No membership found");
    }

    return await prisma.membership.update({
      where: { userId },
      data: { autoRenew: !membership.autoRenew },
    });
  }

  async connectTelegram(userId: string, telegramId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { telegramId },
    });

    const membership = await prisma.membership.findUnique({
      where: { userId },
    });

    if (membership) {
      await prisma.membership.update({
        where: { userId },
        data: { telegramConnected: true },
      });
    }

    return { telegramConnected: true };
  }

  private generateTelegramInviteLink(): string {
    // In production, this would use Telegram Bot API to generate unique invite links
    const random = Math.random().toString(36).substring(2, 10);
    return `https://t.me/+${random}`;
  }
}

export const membershipService = new MembershipService();
