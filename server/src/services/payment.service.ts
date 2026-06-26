import prisma from "../prisma/client";
import { PLANS, PlanId, PAYMENT_STATUS } from "../config/constants";
import { BadRequestError, NotFoundError } from "../utils/errors";
import { generateInvoiceNumber, generateId, paginate } from "../utils/helpers";
import { membershipService } from "./membership.service";

export class PaymentService {
  async createOrder(userId: string, planId: PlanId) {
    const plan = PLANS[planId];
    if (!plan) {
      throw new BadRequestError("Invalid plan selected");
    }

    const orderId = `order_${generateId().replace(/-/g, "").substring(0, 16)}`;
    const invoiceNumber = generateInvoiceNumber();

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId,
        orderId,
        invoiceNumber,
        amount: plan.price,
        planId,
        status: PAYMENT_STATUS.PENDING,
      },
    });

    // In production, create Razorpay order here
    // const razorpayOrder = await razorpay.orders.create({ ... });

    return {
      paymentId: payment.id,
      orderId: payment.orderId,
      amount: payment.amount,
      currency: payment.currency,
      planId: payment.planId,
      planName: plan.name,
      // razorpayOrderId: razorpayOrder.id, // production
    };
  }

  async confirmPayment(
    orderId: string,
    paymentId: string,
    method: string
  ) {
    const payment = await prisma.payment.findUnique({
      where: { orderId },
    });

    if (!payment) {
      throw new NotFoundError("Payment order not found");
    }

    if (payment.status === PAYMENT_STATUS.COMPLETED) {
      throw new BadRequestError("Payment already processed");
    }

    // Update payment status
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        paymentId,
        status: PAYMENT_STATUS.COMPLETED,
        method,
        paidAt: new Date(),
      },
    });

    // Activate membership
    await membershipService.activateMembership(
      payment.userId,
      payment.planId as PlanId
    );

    return {
      id: updatedPayment.id,
      orderId: updatedPayment.orderId,
      invoiceNumber: updatedPayment.invoiceNumber,
      amount: updatedPayment.amount,
      status: updatedPayment.status,
      planId: updatedPayment.planId,
      paidAt: updatedPayment.paidAt,
    };
  }

  async handleWebhook(payload: Record<string, unknown>, signature: string) {
    // In production: verify Razorpay webhook signature
    // const isValid = validateWebhookSignature(payload, signature, config.razorpay.webhookSecret);
    // if (!isValid) throw new BadRequestError("Invalid webhook signature");

    const event = payload.event as string;
    const entity = (payload.payload as Record<string, unknown>)?.payment as Record<string, unknown>;

    if (event === "payment.captured" && entity) {
      const orderId = entity.order_id as string;
      const paymentId = entity.id as string;
      const method = entity.method as string;

      await this.confirmPayment(orderId, paymentId, method);
    }

    return { received: true };
  }

  async getPaymentHistory(userId: string, page = 1, limit = 10) {
    const { skip, take } = paginate(page, limit);

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where: { userId, status: PAYMENT_STATUS.COMPLETED },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.payment.count({
        where: { userId, status: PAYMENT_STATUS.COMPLETED },
      }),
    ]);

    return {
      payments: payments.map((p) => ({
        id: p.id,
        invoiceNumber: p.invoiceNumber,
        amount: p.amount,
        currency: p.currency,
        planId: p.planId,
        planName: PLANS[p.planId as PlanId]?.name || p.planId,
        method: p.method,
        status: p.status,
        paidAt: p.paidAt,
        createdAt: p.createdAt,
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getInvoice(userId: string, paymentId: string) {
    const payment = await prisma.payment.findFirst({
      where: { id: paymentId, userId },
      include: { user: true },
    });

    if (!payment) {
      throw new NotFoundError("Invoice not found");
    }

    const plan = PLANS[payment.planId as PlanId];

    return {
      invoiceNumber: payment.invoiceNumber,
      date: payment.paidAt || payment.createdAt,
      customer: {
        name: payment.user.name,
        email: payment.user.email,
      },
      items: [
        {
          description: `${plan?.name || payment.planId} Membership Plan`,
          duration: plan?.duration || "N/A",
          amount: payment.amount,
        },
      ],
      total: payment.amount,
      currency: payment.currency,
      paymentMethod: payment.method,
      status: payment.status,
    };
  }
}

export const paymentService = new PaymentService();
