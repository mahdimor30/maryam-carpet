"use client";

import { useState } from "react";
import { ChevronDown, User, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { useLoaderData } from "@tanstack/react-router";

export const generateFaqSchema = (data: any) => {
  const allFaqs = [...data.candidates, ...data.referrers];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
};

type Tab = "candidates" | "referrers";

interface FaqAccordionProps {
  /** desktop = sidebar layout; mobile = stacked tab layout */
  variant?: "desktop" | "mobile";
}

export function FaqAccordion({ variant = "mobile" }: FaqAccordionProps) {
  const { FAQ_DATA } = useLoaderData({
    from: "/_layout/faq",
  });
  const [activeTab, setActiveTab] = useState<Tab>("candidates");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = FAQ_DATA[activeTab];
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  /* ── Desktop: sidebar + accordion, no inner tabs ── */
  if (variant === "desktop") {
    return (
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex gap-3 rounded-[2rem] bg-[#F3F4F6] p-2">
          {(["candidates", "referrers"] as Tab[]).map((tab) => {
            const Icon = tab === "candidates" ? User : Share2;
            return (
              <Button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setOpenIndex(0);
                }}
                size={"lg"}
                variant={"ghost"}
                className={cn(
                  "",
                  // `flex w-full flex-1 items-center justify-center gap-3
                  // rounded-[1.5rem] px-8 py-5 text-sm font-bold transition-all`,
                  activeTab === tab
                    ? `editorial-shadow border border-[#059669]/10 bg-white
                      font-extrabold text-[#059669]`
                    : "text-[#4B5563] hover:text-[#064E3B]",
                )}
              >
                <Icon className="h-5 w-5" />
                For {tab === "candidates" ? "Candidates" : "Referrers"}
              </Button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left sidebar */}
          <div className="space-y-8 lg:col-span-4">
            {/* Audience toggle */}

            {/* Support CTA */}
            <div
              className="group relative overflow-hidden rounded-[2.5rem]
                bg-[#047857] p-10 text-white"
            >
              <div
                className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full
                  bg-white/10 blur-2xl transition-transform duration-500
                  group-hover:scale-125"
              />
              <h3
                className="relative z-10 mb-4 text-2xl leading-tight font-bold"
              >
                Can&apos;t find what you&apos;re looking for?
              </h3>
              <p className="relative z-10 mb-8 font-medium text-white/80">
                Our support team is available 24/7 to help you with any specific
                queries regarding your referral journey.
              </p>

              <a
                href="mailto:contact@refriend.xyz"
                className="hover:bg-opacity-90 relative z-10 flex w-full
                  items-center justify-center gap-2 rounded-2xl bg-white px-8
                  py-4 text-center font-extrabold text-[#059669] transition-all"
              >
                Contact Support <span className="text-lg">→</span>
              </a>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="space-y-4 lg:col-span-8">
            <h2
              className="mb-8 border-l-4 border-[#059669] pl-4 text-3xl
                font-extrabold text-[#064E3B]"
            >
              {activeTab === "candidates" ? "Candidates" : "Referrers"} FAQ
            </h2>
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={cn(
                    `group editorial-shadow overflow-hidden rounded-2xl border
                    bg-white transition-all`,
                    isOpen
                      ? "border-[#059669]/30"
                      : "border-[#E5E7EB] hover:border-[#059669]/30",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between gap-4
                      px-8 py-6 text-left"
                  >
                    <span
                      className={cn(
                        "text-lg font-bold transition-colors",
                        isOpen
                          ? "text-[#059669]"
                          : "text-[#064E3B] group-hover:text-[#059669]",
                      )}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 flex-shrink-0 transition-all duration-300",
                        isOpen
                          ? "rotate-180 text-[#059669]"
                          : "text-[#4B5563] group-hover:text-[#059669]",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <p
                      className="border-t border-[#F3F4F6] px-8 pt-4 pb-6
                        leading-relaxed font-medium text-[#4B5563]"
                      dangerouslySetInnerHTML={{
                        __html: item.answer,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ── Mobile: stacked tab pills + accordion ── */
  return (
    <>
      <div className="mb-12 flex rounded-2xl bg-[#F3F4F6] p-1.5 shadow-sm">
        {(["candidates", "referrers"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setOpenIndex(0);
            }}
            className={cn(
              "flex-1 rounded-xl py-3 text-sm font-bold transition-all",
              activeTab === tab
                ? "bg-white text-[#059669] shadow-sm"
                : "text-[#4B5563] hover:text-[#064E3B]",
            )}
          >
            For {tab === "candidates" ? "Candidates" : "Referrers"}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="editorial-shadow overflow-hidden rounded-2xl border
                border-[#E5E7EB]/50 bg-white"
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 p-6
                  text-left"
              >
                <h3 className="text-base leading-snug font-bold text-[#064E3B]">
                  {item.question}
                </h3>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-all duration-300",
                    isOpen ? "rotate-180 text-[#059669]" : "text-[#4B5563]",
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <p className="px-6 pb-6 text-sm leading-relaxed text-[#4B5563]">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
