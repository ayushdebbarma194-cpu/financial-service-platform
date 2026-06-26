"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { FAQ_ITEMS } from "@/constants/faq";

export function FAQSection() {
  return (
    <SectionWrapper id="faq" className="bg-muted/30">
      <SectionHeading
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our service and membership."
      />

      <div className="max-w-3xl mx-auto">
        <Accordion className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              className="bg-card border border-border rounded-xl px-6 data-[open]:shadow-sm transition-shadow"
            >
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}
