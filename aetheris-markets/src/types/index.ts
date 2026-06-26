export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  membership: MembershipInfo;
  createdAt: string;
}

export interface MembershipInfo {
  plan: "monthly" | "quarterly" | "yearly" | "none";
  status: "active" | "expired" | "cancelled" | "pending";
  startDate: string;
  endDate: string;
  daysRemaining: number;
  telegramConnected: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "info" | "update" | "important";
}

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: "completed" | "pending" | "failed";
  invoiceUrl?: string;
}

export interface NavigationItem {
  href: string;
  label: string;
  icon?: string;
}
