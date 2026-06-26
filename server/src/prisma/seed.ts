import bcryptjs from "bcryptjs";
import prisma from "./client";

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await bcryptjs.hash("Admin@2026", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@aetherismarkets.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@aetherismarkets.com",
      password: adminPassword,
      role: "ADMIN",
      referralCode: "ADMREF",
      isVerified: true,
    },
  });
  console.log("Created admin:", admin.email);

  // Create test user
  const userPassword = await bcryptjs.hash("User@2026", 12);
  const user = await prisma.user.upsert({
    where: { email: "rahul@example.com" },
    update: {},
    create: {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      password: userPassword,
      role: "USER",
      referralCode: "RAHXYZ",
      isVerified: true,
      phone: "+91-9876543210",
    },
  });
  console.log("Created user:", user.email);

  // Create membership for test user
  const now = new Date();
  const endDate = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000); // 60 days

  await prisma.membership.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      planId: "quarterly",
      status: "ACTIVE",
      startDate: now,
      endDate,
      telegramConnected: true,
      telegramInviteLink: "https://t.me/+abc123xyz",
    },
  });
  console.log("Created membership for:", user.email);

  // Create sample payments
  const existingPayment = await prisma.payment.findUnique({ where: { orderId: "order_test001" } });
  if (!existingPayment) {
    await prisma.payment.create({
      data: {
        userId: user.id,
        orderId: "order_test001",
        paymentId: "pay_test001",
        invoiceNumber: "AEM-20260501-ABC123",
        amount: 810,
        planId: "quarterly",
        status: "COMPLETED",
        method: "UPI",
        paidAt: new Date("2026-05-01"),
      },
    });
    await prisma.payment.create({
      data: {
        userId: user.id,
        orderId: "order_test002",
        paymentId: "pay_test002",
        invoiceNumber: "AEM-20260201-DEF456",
        amount: 300,
        planId: "monthly",
        status: "COMPLETED",
        method: "CARD",
        paidAt: new Date("2026-02-01"),
      },
    });
  }
  console.log("Created sample payments");

  // Create announcements
  const announcementCount = await prisma.announcement.count();
  if (announcementCount === 0) {
    await prisma.announcement.create({
      data: {
        title: "Market Holiday Notice",
        content: "Markets will remain closed on July 1st for scheduled maintenance.",
        type: "INFO",
      },
    });
    await prisma.announcement.create({
      data: {
        title: "New Feature: Weekly Reports",
        content: "We now provide weekly performance summary reports every Saturday.",
        type: "UPDATE",
      },
    });
    await prisma.announcement.create({
      data: {
        title: "Risk Management Update",
        content: "Maximum position sizing reduced from 5% to 3% per trade for better capital preservation.",
        type: "IMPORTANT",
      },
    });
  }
  console.log("Created announcements");

  console.log("\nSeed completed successfully!");
  console.log("\n--- Test Credentials ---");
  console.log("Admin: admin@aetherismarkets.com / Admin@2026");
  console.log("User:  rahul@example.com / User@2026");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("Seed error:", e);
    prisma.$disconnect();
    process.exit(1);
  });
