"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";

// 8-Spoke Asterisk Icon matching design system
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

// Smooth Count-Up Number Component that rolls up from 0 on scroll into view
function MetricCounter({
  target,
  suffix = "+",
  duration = 1400,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: "some" });

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    let frame = 0;
    const totalFrames = Math.round(duration / (1000 / 60));

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Exponential ease-out
      const current = Math.round(target * (1 - Math.pow(2, -10 * progress)));
      setCount(current);

      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums font-black">
      {count}
      {suffix}
    </span>
  );
}

export default function WhyChooseMeSection() {
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

  return (
    <section
      id="why-choose-me"
      className="relative w-full bg-[#f8f8f9] text-[#0f1013] overflow-hidden py-20 sm:py-24 md:py-32 selection:bg-neutral-900 selection:text-white border-t border-neutral-200/60"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        className="relative w-full max-w-[1440px] xl:max-w-[1520px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16"
      >
        {/* HEADER: Badge on Left + Giant Kinetic Headline Aligned */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
          {/* Left Column: Badge */}
          <motion.div variants={fadeUpVariants} className="lg:w-[26%] xl:w-[25%] shrink-0 pt-2">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-none bg-[#eaeaea] border border-neutral-300/80 shadow-2xs select-none">
              <AsteriskIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff4b00] shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-neutral-800">
                WHY CHOOSE ME
              </span>
            </div>
          </motion.div>

          {/* Right Column: Giant Kinetic Headline */}
          <div className="flex-1">
            <div className="space-y-0 sm:space-y-0.5">
              <div className="overflow-hidden">
                <motion.h2
                  variants={textRevealVariants}
                  className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.92] text-[#0f1013]"
                >
                  BUILT FOR
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  variants={textRevealVariants}
                  className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.92] text-[#0f1013]"
                >
                  PERFORMANCE
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  variants={textRevealVariants}
                  className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.92] text-[#686868]"
                >
                  DESIGNED FOR
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  variants={textRevealVariants}
                  className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.92] text-[#686868]"
                >
                  GROWTH.
                </motion.h2>
              </div>
            </div>
          </div>
        </div>

        {/* 3-COLUMN BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-stretch">
          
          {/* COLUMN 1: Two Stacked White Metric Cards */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col gap-5 md:gap-6">
            {/* Card 1A: Development Experience */}
            <motion.div
              variants={fadeUpVariants}
              data-card-hover="true"
              whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
              className="flex-1 bg-white border border-neutral-200/90 rounded-none p-6 sm:p-7 xl:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer select-none"
            >
              <div>
                <div className="flex items-center gap-2">
                  <AsteriskIcon className="w-4 h-4 text-[#ff4b00] shrink-0" />
                  <span className="font-bold text-xs sm:text-[13px] tracking-tight uppercase text-neutral-900">
                    DEVELOPMENT EXPERIENCE
                  </span>
                </div>
                <div className="mt-8 sm:mt-10 lg:mt-12 text-5xl sm:text-6xl md:text-7xl font-black text-[#0f1013] tracking-tight">
                  <MetricCounter target={5} suffix="+" />
                </div>
              </div>
              <p className="mt-6 sm:mt-8 text-neutral-500 text-xs sm:text-[13px] leading-relaxed font-normal">
                Building modern Shopify experiences with a focus on performance, conversions, and growth.
              </p>
            </motion.div>

            {/* Card 1B: Client Satisfaction */}
            <motion.div
              variants={fadeUpVariants}
              data-card-hover="true"
              whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
              className="flex-1 bg-white border border-neutral-200/90 rounded-none p-6 sm:p-7 xl:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer select-none"
            >
              <div>
                <div className="flex items-center gap-2">
                  <AsteriskIcon className="w-4 h-4 text-[#ff4b00] shrink-0" />
                  <span className="font-bold text-xs sm:text-[13px] tracking-tight uppercase text-neutral-900">
                    CLIENT SATISFACTION
                  </span>
                </div>
                <div className="mt-8 sm:mt-10 lg:mt-12 text-5xl sm:text-6xl md:text-7xl font-black text-[#0f1013] tracking-tight">
                  <MetricCounter target={99} suffix="%" />
                </div>
              </div>
              <p className="mt-6 sm:mt-8 text-neutral-500 text-xs sm:text-[13px] leading-relaxed font-normal">
                Focused on delivering results that meet both user needs and business.
              </p>
            </motion.div>
          </div>

          {/* COLUMN 2: Tall Testimonial Card with Ethereal Prism Background */}
          <motion.div
            variants={fadeUpVariants}
            data-card-hover="true"
            whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
            className="lg:col-span-5 xl:col-span-5 relative bg-white border border-neutral-200/90 rounded-none overflow-hidden p-6 sm:p-7 lg:p-8 xl:p-9 flex flex-col justify-between min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.09)] transition-all duration-300 cursor-pointer select-none"
          >
            {/* Background Texture with Ethereal Motion Blur & Rainbow Glints */}
            <div className="absolute inset-0 pointer-events-none select-none">
              <Image
                src="/images/why-testimonial-clean-bg.png"
                alt="Atmospheric light background"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10" />
            </div>

            {/* Top Content: Avatars + Clients Count */}
            <div className="relative z-10">
              <div className="inline-block">
                <Image
                  src="/images/why-avatars-row.png"
                  alt="70+ Happy Clients"
                  width={110}
                  height={38}
                  className="h-8 sm:h-9 w-auto object-contain rounded-none"
                />
              </div>
              <p className="text-xs sm:text-[13.5px] font-semibold text-neutral-800 mt-3 sm:mt-3.5 tracking-tight">
                70+ Happy Clients Successfully
              </p>
            </div>

            {/* Bottom Content: Stars, Quote, and Client Bio */}
            <div className="relative z-10 pt-16 sm:pt-20">
              {/* 5 Filled Orange Stars + 5/5 Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-[#ff4b00]"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className="font-bold text-xs sm:text-[13px] text-neutral-900 ml-2">
                  5/5
                </span>
              </div>

              {/* Quote Body */}
              <blockquote className="text-xs sm:text-[13px] md:text-[13.5px] text-neutral-800 leading-relaxed font-medium mt-3.5 sm:mt-4">
                &ldquo;He was always attentive and very patient. He is dedicated to satisfying his clients by offering tailored solutions! I highly recommend working with someone so pleasant.&rdquo;
              </blockquote>

              {/* Client Info Row */}
              <div className="flex items-center gap-3 mt-5 sm:mt-6">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-none overflow-hidden shrink-0 border border-neutral-300/60 bg-neutral-200">
                  <Image
                    src="/images/client-yael-hires.jpg"
                    alt="Yael"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-[13.5px] text-neutral-950 leading-tight">
                    Yael
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 font-normal leading-tight mt-0.5">
                    Store Owner
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* COLUMN 3: Artistic Portrait Image + Fast & Reliable Card */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-5 md:gap-6">
            {/* Card 3A: Artistic Silhouette Sunset Portrait */}
            <motion.div
              variants={fadeUpVariants}
              data-card-hover="true"
              whileHover={{ scale: 1.015, transition: { duration: 0.25, ease: "easeOut" } }}
              className="relative w-full h-[220px] sm:h-[250px] lg:h-[270px] xl:h-[290px] rounded-none overflow-hidden border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer select-none"
            >
              <Image
                src="/images/why-portrait.png"
                alt="Usama - Shopify Architect"
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>

            {/* Card 3B: Fast & Reliable */}
            <motion.div
              variants={fadeUpVariants}
              data-card-hover="true"
              whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
              className="flex-1 bg-white border border-neutral-200/90 rounded-none p-6 sm:p-7 xl:p-8 flex flex-col justify-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer select-none"
            >
              {/* Solid Orange Lightning Bolt Icon */}
              <div>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-[#ff4b00]"
                  aria-hidden="true"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <h3 className="font-black uppercase tracking-tight text-base sm:text-lg text-[#0f1013] mt-4 sm:mt-5">
                  FAST & RELIABLE
                </h3>
              </div>
              <p className="mt-2.5 sm:mt-3 text-neutral-500 text-xs sm:text-[13px] leading-relaxed font-normal">
                I maintain an efficient workflow that ensures smooth collaboration, clear communication timely.
              </p>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
