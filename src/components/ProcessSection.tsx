"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

interface ProcessStep {
  id: string;
  iconType: "sparkle" | "asterisk" | "outlineCross" | "solidCross";
  titleLine1: string;
  titleLine2?: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discovery",
    iconType: "sparkle",
    titleLine1: "DISCOVERY & STRATEGY",
    description:
      "Understanding your business, customers, goals, and technical requirements before writing a single line of code.",
  },
  {
    id: "planning",
    iconType: "asterisk",
    titleLine1: "PLANNING &",
    titleLine2: "ARCHITECTURE",
    description:
      "Planning the store structure, customer journey, features, integrations, and technical architecture for scalability",
  },
  {
    id: "development",
    iconType: "outlineCross",
    titleLine1: "DEVELOPMENT &",
    titleLine2: "OPTIMIZATION",
    description:
      "Building custom Shopify solutions with clean code, performance optimization, CRO best practices, and seamless integrations.",
  },
  {
    id: "testing",
    iconType: "solidCross",
    titleLine1: "TESTING & GROWTH",
    description:
      "Testing across devices, fixing edge cases, monitoring performance, and continuously improving through analytics and A/B testing.",
  },
];

// Precision SVGs matching the user's reference screenshot
function StepIcon({ type }: { type: ProcessStep["iconType"] }) {
  if (type === "sparkle") {
    // 4-pointed diamond sparkle starburst
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 text-[#ff4b00]"
        aria-hidden="true"
      >
        <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
      </svg>
    );
  }

  if (type === "asterisk") {
    // 8-spoke asterisk star flower
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 text-[#ff4b00]"
        aria-hidden="true"
      >
        <rect x="10.5" y="1" width="3" height="22" rx="1.5" />
        <rect x="10.5" y="1" width="3" height="22" rx="1.5" transform="rotate(45 12 12)" />
        <rect x="10.5" y="1" width="3" height="22" rx="1.5" transform="rotate(90 12 12)" />
        <rect x="10.5" y="1" width="3" height="22" rx="1.5" transform="rotate(135 12 12)" />
      </svg>
    );
  }

  if (type === "outlineCross") {
    // Rounded outline 4-petal cross with open center
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 text-[#ff4b00]"
        aria-hidden="true"
      >
        <path d="M9 2.5 C9 1.67 9.67 1 10.5 1 L13.5 1 C14.33 1 15 1.67 15 2.5 L15 9 L21.5 9 C22.33 9 23 9.67 23 10.5 L23 13.5 C23 14.33 22.33 15 21.5 15 L15 15 L15 21.5 C15 22.33 14.33 23 13.5 23 L10.5 23 C9.67 23 9 22.33 9 21.5 L9 15 L2.5 15 C1.67 15 1 14.33 1 13.5 L1 10.5 C1 9.67 1.67 9 2.5 9 L9 9 Z" />
      </svg>
    );
  }

  // Solid chunky Swiss cross with softened corners
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-8 h-8 text-[#ff4b00]"
      aria-hidden="true"
    >
      <path d="M8.5 2.5A1.5 1.5 0 0 1 10 1h4a1.5 1.5 0 0 1 1.5 1.5V8.5h6A1.5 1.5 0 0 1 23 10v4a1.5 1.5 0 0 1-1.5 1.5h-6v6a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5v-6h-6A1.5 1.5 0 0 1 1 14v-4A1.5 1.5 0 0 1 2.5 8.5h6v-6z" />
    </svg>
  );
}

export default function ProcessSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const textRevealVariants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: "easeOut",
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="process"
      className="relative w-full bg-[#f8f8f9] text-[#0f1013] overflow-hidden py-20 sm:py-24 md:py-32 selection:bg-neutral-900 selection:text-white border-t border-neutral-200/60"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        className="relative w-full max-w-[1440px] xl:max-w-[1520px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16"
      >
        {/* CENTERED HEADER: Badge & Dual-Tone Kinetic Headline */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-18 lg:mb-20">
          {/* Pill Badge */}
          <motion.div variants={fadeUpVariants} className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-[4px] bg-[#eaeaea] border border-neutral-300/80 shadow-2xs select-none">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff4b00] shrink-0"
                aria-hidden="true"
              >
                <rect x="10.5" y="1" width="3" height="22" rx="1.5" />
                <rect x="10.5" y="1" width="3" height="22" rx="1.5" transform="rotate(45 12 12)" />
                <rect x="10.5" y="1" width="3" height="22" rx="1.5" transform="rotate(90 12 12)" />
                <rect x="10.5" y="1" width="3" height="22" rx="1.5" transform="rotate(135 12 12)" />
              </svg>
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-neutral-800">
                MY DEVELOPMENT PROCESS
              </span>
            </div>
          </motion.div>

          {/* Headline: BUILD PROCESS (Black) / THAT DELIVERS (Medium Gray) */}
          <div className="space-y-0.5 sm:space-y-1">
            <div className="overflow-hidden">
              <motion.h2
                variants={textRevealVariants}
                className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[90px] leading-[0.92] text-[#0f1013]"
              >
                BUILD PROCESS
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                variants={textRevealVariants}
                className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[90px] leading-[0.92] text-[#686868]"
              >
                THAT DELIVERS
              </motion.h2>
            </div>
          </div>
        </div>

        {/* 4 PROCESS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-7">
          {PROCESS_STEPS.map((step) => (
            <motion.div
              key={step.id}
              variants={fadeUpVariants}
              data-card-hover="true"
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group relative bg-[#0c0d10] text-white rounded-none px-6 sm:px-7 lg:px-6 xl:px-8 py-8 sm:py-9 lg:py-10 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[470px] xl:min-h-[490px] shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)] border border-neutral-900 transition-all duration-300 cursor-pointer select-none"
            >
              {/* Top: Orange Icon & Title */}
              <div>
                <div className="transition-transform duration-300 group-hover:scale-110 origin-left">
                  <StepIcon type={step.iconType} />
                </div>
                <h3 className="font-black uppercase tracking-tight text-[17.5px] sm:text-[18.5px] lg:text-[18px] xl:text-[19.5px] text-white leading-[1.18] mt-6 sm:mt-7 lg:mt-8">
                  <span>{step.titleLine1}</span>
                  {step.titleLine2 && (
                    <>
                      <br />
                      <span>{step.titleLine2}</span>
                    </>
                  )}
                </h3>
              </div>

              {/* Bottom: Description */}
              <div className="pt-8">
                <p className="text-neutral-300/90 text-[13.5px] sm:text-[14px] leading-[1.65] font-normal">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
