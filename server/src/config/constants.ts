export const PLANS = {
  monthly: {
    id: "monthly",
    name: "Monthly",
    duration: "month",
    price: 300,
    durationDays: 30,
    monthlyPrice: 300,
    savings: 0,
  },
  quarterly: {
    id: "quarterly",
    name: "Quarterly",
    duration: "3 months",
    price: 810,
    durationDays: 90,
    monthlyPrice: 270,
    savings: 10,
  },
  yearly: {
    id: "yearly",
    name: "Yearly",
    duration: "year",
    price: 2700,
    durationDays: 365,
    monthlyPrice: 225,
    savings: 25,
  },
} as const;

export type PlanId = keyof typeof PLANS;

export const MEMBERSHIP_STATUS = {
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
  PENDING: "PENDING",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;

export const USER_ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export const ANNOUNCEMENT_TYPE = {
  INFO: "INFO",
  UPDATE: "UPDATE",
  IMPORTANT: "IMPORTANT",
} as const;
