"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

// 8-spoke orange asterisk matching design system
function AsteriskIcon({ className = "w-4 h-4 text-[#ff4b00]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <rect x="10.5" y="1" width="3" height="22" rx="1.5" />
      <rect x="10.5" y="1" width="3" height="22" rx="1.5" transform="rotate(45 12 12)" />
      <rect x="10.5" y="1" width="3" height="22" rx="1.5" transform="rotate(90 12 12)" />
      <rect x="10.5" y="1" width="3" height="22" rx="1.5" transform="rotate(135 12 12)" />
    </svg>
  );
}

// 5 Orange Filled Stars
function StarRating() {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ff4b00]"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// Animated Plus Sign in the corner of quote cards
function AnimatedPlus() {
  return (
    <div className="relative w-4 h-4 flex items-center justify-center text-neutral-400 group-hover:text-neutral-900 transition-colors select-none shrink-0">
      <motion.svg
        viewBox="0 0 16 16"
        fill="none"
        className="w-3.5 h-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: "linear",
        }}
      >
        <line x1="8" y1="2" x2="8" y2="14" />
        <line x1="2" y1="8" x2="14" y2="8" />
      </motion.svg>
    </div>
  );
}

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  authorPosition: "top" | "bottom";
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "othmane",
    name: "Othmane",
    role: "Store Owner",
    avatar: "/images/client-othmane-hires.jpg",
    quote:
      '"Really great working with Muhammad, he solved huge issues for my ecommerce store I really recommand working with him !!"',
    authorPosition: "top",
  },
  {
    id: "sebra",
    name: "Sebra",
    role: "Store Owner",
    avatar: "/images/client-sebra-hires.jpg",
    quote:
      '"Excellent communication, fast delivery, and outstanding attention to detail. Highly recommended for any Shopify project."',
    authorPosition: "bottom",
  },
  {
    id: "yael",
    name: "Yael",
    role: "Store Owner",
    avatar: "/images/client-yael-hires.jpg",
    quote:
      '"He was always attentive and very patient. He is dedicated to satisfying his clients by offering tailored solutions! I highly recommend working with someone so pleasant."',
    authorPosition: "top",
  },
  {
    id: "ingiomar",
    name: "Ingiomar",
    role: "Store Owner",
    avatar: "/images/client-ingiomar-hires.jpg",
    quote:
      '"Outstanding Shopify developer with a strong understanding of UX and performance. He built a complete custom product configurator for us, and the result exceeded expectations."',
    authorPosition: "bottom",
  },
];

export default function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  // Duplicate items 4 times to ensure seamless infinite marquee loop on any screen width
  const carouselItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#f8f8f9] text-[#0f1013] overflow-hidden py-20 sm:py-24 md:py-32 selection:bg-neutral-900 selection:text-white border-t border-neutral-200/60"
    >
      {/* HEADER CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        className="relative w-full max-w-[1440px] xl:max-w-[1520px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 mb-12 sm:mb-16 lg:mb-20"
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
          <div>
            {/* Pill Badge */}
            <motion.div variants={fadeUpVariants} className="mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-[4px] bg-[#eaeaea] border border-neutral-300/80 shadow-2xs select-none">
                <AsteriskIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff4b00] shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-neutral-800">
                  DESIGNS CLIENTS LOVE
                </span>
              </div>
            </motion.div>

            {/* Kinetic Dual-Tone Headline */}
            <div className="space-y-0 sm:space-y-0.5">
              <div className="overflow-hidden">
                <motion.h2
                  variants={textRevealVariants}
                  className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.92] text-[#0f1013]"
                >
                  WHAT MY
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  variants={textRevealVariants}
                  className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.92] text-[#686868]"
                >
                  CLIENTS SAY
                </motion.h2>
              </div>
            </div>
          </div>

          {/* Right-Aligned Statement */}
          <motion.div
            variants={fadeUpVariants}
            className="lg:max-w-[360px] xl:max-w-[400px] lg:pt-8"
          >
            <p className="text-xs sm:text-[13px] md:text-[13.5px] uppercase font-bold tracking-tight text-[#686868] leading-relaxed lg:text-right">
              CREATING THOUGHTFUL AND USER-FOCUSED DESIGNS THAT HELP BRANDS GROW, IMPROVE USER EXPERIENCES LEAVE.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* FULL WIDTH INFINITE LOOP CAROUSEL */}
      <div
        className="relative w-full overflow-hidden select-none py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle Edge Fog Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#f8f8f9] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#f8f8f9] to-transparent z-10" />

        {/* Marquee Track using Framer Motion */}
        <motion.div
          animate={{
            x: isPaused ? undefined : ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 38,
              ease: "linear",
            },
          }}
          className="flex items-stretch gap-5 sm:gap-6 w-max pl-6 pr-6 cursor-grab active:cursor-grabbing"
        >
          {carouselItems.map((item, index) => {
            const isTop = item.authorPosition === "top";

            return (
              <div
                key={`${item.id}-${index}`}
                className="group w-[330px] sm:w-[360px] md:w-[390px] xl:w-[410px] shrink-0 h-[480px] sm:h-[500px] md:h-[520px] flex flex-col justify-between"
              >
                {/* 1. TOP AUTHOR STRIP (for columns with authorPosition="top") */}
                {isTop && (
                  <div
                    data-card-hover="true"
                    className="bg-white border border-neutral-200/90 rounded-none p-3.5 sm:p-4 flex items-center gap-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer h-[74px] sm:h-[80px] mb-3 sm:mb-3.5"
                  >
                    <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-none overflow-hidden shrink-0 border border-neutral-300/60 bg-neutral-100">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        sizes="60px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-[13.5px] text-neutral-950 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-neutral-500 font-normal leading-tight mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. MAIN QUOTE CARD (Sharp edges, no border-radius) */}
                <div
                  data-card-hover="true"
                  className="bg-white border border-neutral-200/90 rounded-none p-6 sm:p-7 md:p-8 flex flex-col justify-between flex-1 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <StarRating />
                    <AnimatedPlus />
                  </div>
                  <blockquote className="font-bold text-xs sm:text-[13.5px] md:text-[14px] text-neutral-900 leading-[1.65] mt-10 sm:mt-14">
                    {item.quote}
                  </blockquote>
                </div>

                {/* 3. BOTTOM AUTHOR STRIP (for columns with authorPosition="bottom") */}
                {!isTop && (
                  <div
                    data-card-hover="true"
                    className="bg-white border border-neutral-200/90 rounded-none p-3.5 sm:p-4 flex items-center gap-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer h-[74px] sm:h-[80px] mt-3 sm:mb-0 sm:mt-3.5"
                  >
                    <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-none overflow-hidden shrink-0 border border-neutral-300/60 bg-neutral-100">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        sizes="60px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-[13.5px] text-neutral-950 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-neutral-500 font-normal leading-tight mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
