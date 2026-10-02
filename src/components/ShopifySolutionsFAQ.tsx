"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AsteriskIcon } from "./ImpactSection";
import { ChevronDown, Zap, Code2, Box, ShoppingCart, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  shortAnswer: string;
  details: string[];
  icon: React.ReactNode;
}

export const SHOPIFY_FAQS: FAQItem[] = [
  {
    id: "pagespeed-optimization",
    category: "Performance & CRO",
    question: "How do you achieve 95+ Mobile PageSpeed on Shopify without breaking marketing apps?",
    shortAnswer:
      "By isolating third-party scripts, eliminating render-blocking Liquid calls, and deferring non-critical tracking until after First Contentful Paint (FCP).",
    details: [
      "Auditing and removing orphaned app assets left in theme.liquid after uninstalls.",
      "Inlining critical above-the-fold CSS and asynchronously loading Google Fonts & marketing tags via RequestIdleCallback.",
      "Implementing responsive WebP/AVIF image srcsets with explicit aspect ratios to eliminate Cumulative Layout Shift (CLS).",
      "Replacing heavy external JavaScript slider and drawer libraries with native, zero-dependency browser APIs.",
    ],
    icon: <Zap className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "os2-migration",
    category: "Liquid 2.0 Migration",
    question: "How do you migrate a vintage theme to Shopify Online Store 2.0 with zero downtime?",
    shortAnswer:
      "We build in an unpublishable development theme preview, converting static Liquid templates into modular JSON architecture with App Blocks.",
    details: [
      "Converting hardcoded section templates into flexible JSON templates compatible with the Shopify Theme Customizer.",
      "Refactoring app code into App Embed Blocks so apps never modify your theme's core code directly.",
      "Maintaining 100% URL parity and canonical meta tags to safeguard existing Google SEO rankings and indexation.",
      "Instant 1-click theme switch during low-traffic windows with zero disruption to active customer carts or checkouts.",
    ],
    icon: <Code2 className="w-4 h-4 text-[#ea580c]" />,
  },
  {
    id: "3d-webgl-performance",
    category: "3D & Interactive UX",
    question: "How can brands integrate 3D WebGL product previews without hurting store speed?",
    shortAnswer:
      "By using on-demand WebGL initialization, progressive Draco geometry compression, and asynchronous loading triggered solely by user interaction.",
    details: [
      "Serving high-resolution static WebP poster images initially so initial page load stays sub-second (under 1.0s).",
      "Triggering 3D WebGL engines (Three.js / Google model-viewer) only when the customer clicks or scrolls near the 3D canvas.",
      "Compressing 3D GLTF/GLB models using Draco mesh compression to reduce file sizes by up to 80%.",
      "Graceful fallback to interactive 360-degree image sprites for low-end mobile devices and legacy browsers.",
    ],
    icon: <Box className="w-4 h-4 text-blue-400" />,
  },
  {
    id: "custom-bundle-builder",
    category: "Cart & Conversion",
    question: "How do you build custom bundle builders and tiered volume discounts in Liquid?",
    shortAnswer:
      "Using the Shopify Cart Ajax API, real-time threshold progress bars, and custom line-item properties that bundle products seamlessly into a single checkout flow.",
    details: [
      "Bespoke multi-step bundle selectors (e.g. 3-pack, 6-pack) that calculate automatic tier discounts in real time.",
      "Synchronizing inventory between individual parent SKUs and child bundle components without third-party app delays.",
      "Integrating instant sticky slide-out cart drawers with free shipping threshold progress meters.",
      "Zero-latency cart updates using lightweight vanilla JavaScript instead of bulky jQuery app wrappers.",
    ],
    icon: <ShoppingCart className="w-4 h-4 text-emerald-400" />,
  },
  {
    id: "checkout-extensibility",
    category: "Checkout Customization",
    question: "How can merchants customize the Shopify Checkout without paying for Shopify Plus?",
    shortAnswer:
      "While Shopify Plus is required for checkout.liquid, non-Plus stores can utilize modern Checkout UI Extensions, Cart Transform APIs, and pre-checkout cart drawer triggers.",
    details: [
      "Deploying high-converting pre-checkout upsells, shipping insurance, and free gift selectors directly inside the custom cart drawer.",
      "Implementing custom delivery date pickers, gift note fields, and order attributes via standard Shopify Cart Attributes API.",
      "Using Shopify Functions (Cart Transform API) for automatic volume discounts and bundle discounting rules.",
      "For Shopify Plus stores: full migration from deprecated checkout.liquid to modular Checkout UI Extensions and Branding API.",
    ],
    icon: <ShieldCheck className="w-4 h-4 text-purple-400" />,
  },
  {
    id: "cart-drawer-conflicts",
    category: "Bug Fix & Architecture",
    question: "Why do Shopify cart drawers conflict with apps, and how do you build an instant cart?",
    shortAnswer:
      "Conflicts occur due to race conditions when multiple apps hijack the Cart API. We build an event-driven single source of truth.",
    details: [
      "Building an asynchronous event bus that listens to Shopify's native cart:updated events without reload lag.",
      "Debouncing quantity update inputs to prevent API rate-limit errors (HTTP 429) during rapid clicking.",
      "Integrating one-click upsell items that recalculate subtotal and shipping bar instantly without full DOM refreshes.",
      "Engineered to load in under 15ms with pure CSS transitions and zero external runtime libraries.",
    ],
    icon: <HelpCircle className="w-4 h-4 text-amber-500" />,
  },
];

export default function ShopifySolutionsFAQ({
  onOpenContact,
}: {
  onOpenContact?: () => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Schema for Google FAQ Rich Snippets and AI Search Citations
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SHOPIFY_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${faq.shortAnswer} ${faq.details.join(" ")}`,
      },
    })),
  };

  return (
    <section
      id="solutions"
      aria-label="Shopify Engineering Solutions and FAQ"
      className="relative w-full bg-[#0c0d11] text-white py-20 sm:py-28 px-4 sm:px-6 md:px-12 border-t border-white/10"
    >
      {/* FAQ Schema for AI Search & Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Decorative background grid subtle overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-orange-500/10 text-[#ea580c] border border-[#ea580c]/30 text-xs font-semibold tracking-wider uppercase">
            <AsteriskIcon className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>Shopify Knowledge Hub & Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-tight">
            Engineered For High-Intent <br className="hidden sm:inline" />
            <span className="text-neutral-400">Shopify Architecture Problems.</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Direct answers to the most complex technical challenges in modern Shopify 2.0 theme engineering, sub-second PageSpeed optimization, and conversion-driven e-commerce.
          </p>
        </div>

        {/* Interactive Solutions Accordion */}
        <div className="space-y-3.5">
          {SHOPIFY_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.id}
                className={`border transition-all duration-300 rounded-none bg-[#101218]/90 overflow-hidden ${
                  isOpen
                    ? "border-[#ea580c]/60 shadow-[0_4px_24px_rgba(234,88,12,0.12)]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
                    <div className="p-2 rounded-none bg-white/5 border border-white/10 mt-0.5 shrink-0">
                      {faq.icon}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#ea580c] font-semibold">
                        {faq.category}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                        {faq.question}
                      </h3>
                      {!isOpen && (
                        <p className="text-xs sm:text-sm text-neutral-400 line-clamp-1 mt-1">
                          {faq.shortAnswer}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`p-1.5 rounded-none bg-white/5 border border-white/10 text-neutral-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-white bg-white/15" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 sm:px-6 pb-6 pt-1 text-sm text-neutral-300 space-y-4 border-t border-white/5">
                        <p className="text-sm sm:text-[15px] font-medium text-white leading-relaxed bg-white/5 p-3.5 border-l-2 border-[#ea580c]">
                          {faq.shortAnswer}
                        </p>

                        <div className="space-y-2 pt-1">
                          <div className="text-xs uppercase tracking-wider text-neutral-400 font-bold font-mono">
                            Engineering Execution:
                          </div>
                          <ul className="grid grid-cols-1 gap-2">
                            {faq.details.map((point, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mt-2 shrink-0" />
                                <span className="leading-relaxed">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Knowledge Hub Action Banner */}
        <div className="p-6 sm:p-8 border border-white/15 bg-gradient-to-r from-[#14151e] to-[#0c0d12] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
              Have a Specific Shopify Architecture Challenge?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              From resolving elusive Liquid app conflicts to engineering high-converting custom cart drawers, let's analyze your store's codebase.
            </p>
          </div>

          {onOpenContact ? (
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-lg shadow-orange-500/20 cursor-pointer active:scale-95"
            >
              <span>Discuss Your Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-lg shadow-orange-500/20 active:scale-95"
            >
              <span>Discuss Your Store</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
