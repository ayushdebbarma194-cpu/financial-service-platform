export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How do I receive trade suggestions?",
    answer:
      "All trade suggestions are delivered in real-time through our private Telegram channel. Once your membership is activated, you receive instant access to the channel where our research team shares structured trade ideas with clear entry, exit, and stop-loss levels.",
  },
  {
    question: "How is membership activated?",
    answer:
      "After completing your secure payment, your membership is activated instantly. You will receive a Telegram invite link within minutes. Our automated system ensures zero downtime between payment and access.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Yes, you can upgrade your membership at any time. When upgrading, the remaining value of your current plan is prorated and applied to your new plan. Contact our support team for seamless upgrades.",
  },
  {
    question: "How do renewals work?",
    answer:
      "Your membership renews automatically at the end of your billing period. You will receive a reminder 3 days before renewal. You can cancel or change your plan at any time before the renewal date with no penalties.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major payment methods including UPI, credit/debit cards, net banking, and popular digital wallets. All transactions are processed through secure, PCI-DSS compliant payment gateways.",
  },
] as const;
