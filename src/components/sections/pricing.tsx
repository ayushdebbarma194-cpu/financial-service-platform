"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { PRICING_PLANS } from "@/constants/pricing";
import { cn } from "@/lib/utils";

function SwipeButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full py-4 rounded-xl font-medium text-sm overflow-hidden group cursor-pointer",
        className
      )}
    >
      {/* Swipe shine effect */}
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </span>
      {/* Button content */}
      <span className="relative flex items-center justify-center gap-2">
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </motion.button>
  );
}

export function PricingSection() {
  return (
    <SectionWrapper id="membership">
      <SectionHeading
        title="Choose Your Membership"
        subtitle="Transparent pricing with no hidden fees. Select the plan that works best for you."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {PRICING_PLANS.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "relative rounded-2xl border p-6 lg:p-8 flex flex-col transition-all",
              plan.isPopular
                ? "border-[#2563EB] bg-card light-depth-lg dark:shadow-xl dark:shadow-[#2563EB]/10 scale-[1.02] md:scale-105"
                : "border-border bg-card light-depth-sm dark:shadow-sm hover:light-depth dark:hover:shadow-md"
            )}
          >
            {/* Popular Badge */}
            {plan.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#2563EB] hover:bg-[#2563EB] text-white px-4 py-1 font-medium text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {plan.name}
              </h3>
              <div className="mt-4">
                <span className="text-4xl lg:text-5xl font-bold text-foreground">
                  ₹{plan.price.toLocaleString("en-IN")}
                </span>
                <span className="text-muted-foreground ml-1">
                  /{plan.duration}
                </span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                ₹{plan.monthlyPrice}/month
              </div>
              {plan.savings > 0 && (
                <Badge
                  variant="secondary"
                  className="mt-3 bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
                >
                  Save {plan.savings}%
                </Badge>
              )}
            </div>

            {/* Features */}
            <div className="flex-1 space-y-3 mb-8">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-[#10B981]" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA - Swipe Animation */}
            <SwipeButton
              className={cn(
                plan.isPopular
                  ? "bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg shadow-[#2563EB]/20"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              )}
            >
              Subscribe Now
            </SwipeButton>
          </motion.div>
        ))}
      </div>

      {/* Trust Note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-10 text-center text-sm text-muted-foreground"
      >
        Secure payment processing. Cancel or change plans anytime. No questions asked.
      </motion.p>
    </SectionWrapper>
  );
}
