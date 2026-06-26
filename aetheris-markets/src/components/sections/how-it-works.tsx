"use client";

import { motion } from "framer-motion";
import { UserPlus, CreditCard, MessageCircle, TrendingUp } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Choose Membership",
    description:
      "Select the plan that fits your needs. Monthly, quarterly, or yearly — each provides full access.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Secure Payment",
    description:
      "Complete your payment through our encrypted, PCI-compliant gateway. Multiple payment methods accepted.",
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "Instant Telegram Access",
    description:
      "Receive your private channel invite immediately. Zero waiting time between payment and access.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Receive Professional Suggestions",
    description:
      "Get real-time trade ideas with clear parameters — entry, targets, and stop-loss levels included.",
  },
];

export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works">
      <SectionHeading
        title="How It Works"
        subtitle="A simple, transparent process from signup to receiving your first market insight."
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line - Desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-1 md:gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative md:flex md:items-center md:gap-8 ${
                index % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              {/* Content Card */}
              <div
                className={`flex-1 ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                <div
                  className={`inline-block p-6 rounded-2xl border border-border bg-card shadow-sm ${
                    index % 2 === 0 ? "md:ml-auto" : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 ${
                      index % 2 === 0
                        ? "md:flex-row-reverse"
                        : "md:flex-row"
                    }`}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2563EB]/10">
                      <step.icon className="h-5 w-5 text-[#2563EB]" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Center Circle */}
              <div className="hidden md:flex items-center justify-center z-10">
                <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center shadow-lg shadow-[#2563EB]/20">
                  <span className="text-sm font-bold text-white">
                    {step.step}
                  </span>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
