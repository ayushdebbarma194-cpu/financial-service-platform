# Aetheris Markets

Professional Market Research & Options Trading Guidance Platform.

## Overview

A premium fintech platform delivering timely market insights, structured trade ideas, and disciplined analysis through a subscription-based Telegram membership.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Animation | Framer Motion |
| State Management | Zustand |
| Data Fetching | TanStack Query |
| Forms | React Hook Form + Zod |
| Charts | Recharts (future-ready) |
| Theme | next-themes |
| Fonts | Inter + JetBrains Mono |

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── dashboard/      # User dashboard
│   ├── login/          # Authentication
│   ├── privacy/        # Privacy Policy
│   ├── risk-disclosure/# Risk Disclosure
│   └── terms/          # Terms of Service
├── components/
│   ├── layout/         # Navbar, Footer
│   ├── sections/       # Hero, Trust, Pricing, FAQ, How It Works
│   ├── shared/         # Reusable components
│   └── ui/             # shadcn/ui base components
├── config/             # Font configuration
├── constants/          # Site config, pricing, FAQ data
├── hooks/              # Custom React hooks
├── lib/                # Utilities, form validations
├── providers/          # Theme provider
└── types/              # TypeScript interfaces
```

## Pages

- **/** — Landing page (Hero, Trust, How It Works, Pricing, FAQ)
- **/login** — Authentication
- **/dashboard** — Membership dashboard
- **/terms** — Terms of Service
- **/privacy** — Privacy Policy
- **/risk-disclosure** — Risk Disclosure

## Features

- Responsive design (mobile, tablet, desktop)
- Dark/light theme support
- Subtle Framer Motion animations
- SEO optimized (OpenGraph, Twitter Cards, sitemap, robots.txt)
- Accessible (semantic HTML, ARIA labels, keyboard navigation)
- Form validation with Zod schemas
- Enterprise-grade folder architecture

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` triggers automatic deployment.

## License

All rights reserved.
