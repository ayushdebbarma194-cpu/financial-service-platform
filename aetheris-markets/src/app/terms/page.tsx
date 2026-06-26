import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";

export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: June 2026
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using {SITE_CONFIG.name}, you agree to be bound by these Terms of Service.
              If you disagree with any part of these terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              2. Service Description
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {SITE_CONFIG.name} provides market research, analysis, and educational content
              through a subscription-based Telegram membership. Our service includes trade
              suggestions, market commentary, and educational material.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              3. Disclaimer
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content provided is for informational and educational purposes only.
              Nothing constitutes financial advice, investment recommendations, or
              solicitation to buy or sell securities. Users are solely responsible for
              their own trading decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              4. Subscription & Payments
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Membership fees are non-refundable once access to the private channel
              has been granted. Subscriptions auto-renew unless cancelled before the
              renewal date. You may cancel at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              5. Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions regarding these terms, please contact us through our
              official Telegram channel or email support.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
