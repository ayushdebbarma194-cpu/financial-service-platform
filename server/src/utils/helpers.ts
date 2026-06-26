import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export function generateId(): string {
  return uuidv4();
}

export function calculateEndDate(startDate: Date, durationDays: number): Date {
  return dayjs(startDate).add(durationDays, "day").toDate();
}

export function getDaysRemaining(endDate: Date): number {
  const now = dayjs();
  const end = dayjs(endDate);
  const diff = end.diff(now, "day");
  return Math.max(0, diff);
}

export function isExpired(endDate: Date): boolean {
  return dayjs().isAfter(dayjs(endDate));
}

export function formatDate(date: Date): string {
  return dayjs(date).format("YYYY-MM-DD");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function generateInvoiceNumber(): string {
  const date = dayjs().format("YYYYMMDD");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `AEM-${date}-${random}`;
}

export function generateReferralCode(name: string): string {
  const prefix = name.substring(0, 3).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${random}`;
}

export function paginate(page: number, limit: number) {
  const skip = (page - 1) * limit;
  return { skip, take: limit };
}
