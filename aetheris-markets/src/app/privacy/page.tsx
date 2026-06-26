import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: June 2026
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect information you provide directly, including your name, email
              address, and payment details when you subscribe to {SITE_CONFIG.name}.
              We also collect usage data to improve our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information is used solely to provide and maintain our service,
              process payments, send important updates, and improve user experience.
              We do not sell or share your personal data with third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              3. Data Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your data.
              All payment processing is handled through PCI-DSS compliant gateways.
              However, no method of electronic transmission is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              4. Your Rights
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, update, or delete your personal information.
              Contact us to exercise these rights. We will respond to your request within
              a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              5. Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy-related inquiries, please reach out through our official
              communication channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
