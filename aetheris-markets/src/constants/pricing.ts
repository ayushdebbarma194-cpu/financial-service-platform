export interface PricingPlan {
  id: string;
  name: string;
  duration: string;
  price: number;
  monthlyPrice: number;
  savings: number;
  isPopular: boolean;
  features: string[];
}

const BASE_MONTHLY_PRICE = 300;

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    duration: "month",
    price: 300,
    monthlyPrice: 300,
    savings: 0,
    isPopular: false,
    features: [
      "Premium Telegram Access",
      "Real-Time Trade Suggestions",
      "Market Commentary",
      "Priority Support",
      "Daily Updates",
    ],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    duration: "3 months",
    price: 810,
    monthlyPrice: 270,
    savings: Math.round(((BASE_MONTHLY_PRICE - 270) / BASE_MONTHLY_PRICE) * 100),
    isPopular: true,
    features: [
      "Premium Telegram Access",
      "Real-Time Trade Suggestions",
      "Market Commentary",
      "Priority Support",
      "Daily Updates",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    duration: "year",
    price: 2700,
    monthlyPrice: 225,
    savings: Math.round(((BASE_MONTHLY_PRICE - 225) / BASE_MONTHLY_PRICE) * 100),
    isPopular: false,
    features: [
      "Premium Telegram Access",
      "Real-Time Trade Suggestions",
      "Market Commentary",
      "Priority Support",
      "Daily Updates",
    ],
  },
] as const;
