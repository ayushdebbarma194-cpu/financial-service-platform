import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";

export const metadata = {
  title: "Risk Disclosure",
};

export default function RiskDisclosurePage() {
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
          Risk Disclosure
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: June 2026
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Important Notice
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Trading in financial markets involves substantial risk of loss and is
              not suitable for every investor. The content provided by {SITE_CONFIG.name}{" "}
              is for educational and informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              No Guaranteed Returns
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Past performance is not indicative of future results. There is no
              guarantee that any strategy or trade suggestion will result in
              profits. You should never invest money that you cannot afford to lose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Personal Responsibility
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All trading decisions are solely your responsibility. {SITE_CONFIG.name}{" "}
              provides research and analysis but does not manage funds, execute
              trades, or provide personalized financial advice. Always conduct your
              own due diligence.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Risk of Options Trading
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Options trading carries a high level of risk and can result in the
              loss of your entire investment. The leverage inherent in options can
              amplify both gains and losses. Only trade with capital you can afford
              to lose entirely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Seek Professional Advice
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We strongly recommend consulting with a qualified financial advisor
              before making any investment decisions. Our service is supplementary
              to — not a replacement for — professional financial advice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
