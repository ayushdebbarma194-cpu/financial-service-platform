export const SITE_CONFIG = {
  name: "Aetheris Markets",
  description:
    "Professional Market Research & Options Trading Guidance. Receive timely market insights, structured trade ideas, and disciplined analysis.",
  url: "https://aetherismarkets.com",
  ogImage: "https://aetherismarkets.com/og.png",
  creator: "Aetheris Markets",
  keywords: [
    "market research",
    "options trading",
    "financial analysis",
    "trading guidance",
    "market commentary",
    "risk management",
  ],
} as const;

export const NAV_LINKS = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#membership", label: "Membership" },
  { href: "#faq", label: "FAQ" },
] as const;

export const SOCIAL_LINKS = {
  telegram: "https://t.me/aetherismarkets",
  instagram: "https://instagram.com/aetherismarkets",
  youtube: "https://youtube.com/@aetherismarkets",
  linkedin: "https://linkedin.com/company/aetherismarkets",
} as const;

export const FOOTER_LINKS = {
  company: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/risk-disclosure", label: "Risk Disclosure" },
  ],
  support: [
    { href: "#faq", label: "FAQ" },
    { href: SOCIAL_LINKS.telegram, label: "Contact Us" },
  ],
} as const;
