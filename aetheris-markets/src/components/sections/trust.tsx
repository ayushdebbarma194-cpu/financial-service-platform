"use client";

import {
  Shield,
  Award,
  LineChart,
  CreditCard,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedCard } from "@/components/shared/animated-card";

const trustItems = [
  {
    icon: Shield,
    title: "Government Registered",
    description:
      "Fully registered and compliant with all applicable regulatory requirements.",
  },
  {
    icon: Award,
    title: "Certified Research Team",
    description:
      "Our analysts hold professional certifications in financial markets research.",
  },
  {
    icon: LineChart,
    title: "Professional Analysis",
    description:
      "Institutional-level market research with disciplined methodology.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "PCI-DSS compliant payment processing with end-to-end encryption.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Responsive support team available to assist with any queries.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management First",
    description:
      "Every suggestion prioritizes capital preservation and risk control.",
  },
];

export function TrustSection() {
  return (
    <SectionWrapper id="trust" className="bg-muted/30">
      <SectionHeading
        title="Built on Trust & Transparency"
        subtitle="We believe in establishing credibility through action, not promises. Here's what sets us apart."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trustItems.map((item, index) => (
          <AnimatedCard key={item.title} delay={index * 0.1}>
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#2563EB]/10">
                <item.icon className="h-6 w-6 text-[#2563EB]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
