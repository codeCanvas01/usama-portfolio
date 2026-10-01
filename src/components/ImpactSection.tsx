"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";

// 8-Pointed Asterisk Starburst Icon matching design
export function AsteriskIcon({ className = "w-4 h-4 text-[#ea580c]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <rect x="10.75" y="1.5" width="2.5" height="21" />
      <rect x="10.75" y="1.5" width="2.5" height="21" transform="rotate(45 12 12)" />
      <rect x="10.75" y="1.5" width="2.5" height="21" transform="rotate(90 12 12)" />
      <rect x="10.75" y="1.5" width="2.5" height="21" transform="rotate(135 12 12)" />
    </svg>
  );
}

// Smooth Animated Count-Up Number Component that re-animates on scroll into view
export function Counter({
  target,
  suffix = "+",
  duration = 1600,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  // once: true ensures it smoothly animates on mobile and never resets/flickers
  const isInView = useInView(ref, { once: true, amount: "some" });

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    let start = 0;
    const end = target;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeProgress * (end - start) + start);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export interface StatItem {
  target: number;
  suffix?: string;
  title: string;
  description: string;
}

interface ImpactSectionProps {
  stats?: StatItem[];
}

export default function ImpactSection({
  stats = [
    {
      target: 43,
      suffix: "+",
      title: "PROJECTS COMPLETED",
      description: "I have successfully completed a variety of projects across web and mobile.",
    },
    {
      target: 40,
      suffix: "+",
      title: "HAPPY CLIENTS",
      description: "I have worked with clients from different industries delivering designs.",
    },
  ],
}: ImpactSectionProps) {
  // Stagger animation container - runs whenever scrolled into view from top or bottom
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

  // Kinetic text line reveal
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

  // Fade & slide up
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Left image slides to right and stays closer to the cards
  const imageSlideRightVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.85,
        ease: "easeOut",
      },
    },
  };

  // Stat cards slide in from the right
  const cardSlideVariants: Variants = {
    hidden: { opacity: 0, x: 40, y: 10 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full bg-[#f7f7f7] text-[#0f1013] overflow-hidden py-10 sm:py-14 md:py-16 lg:py-20 selection:bg-neutral-900 selection:text-white"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        className="relative w-full max-w-[1440px] xl:max-w-[1520px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16"
      >
        {/* Continuous Slow Rotating Decorative Watermark in Center/Upper area */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          className="hidden lg:flex absolute left-[54%] top-[8%] -translate-x-1/2 pointer-events-none select-none z-0 text-[#dedede]"
          aria-hidden="true"
        >
          <AsteriskIcon className="w-24 h-24 xl:w-32 xl:h-32 text-[#dedede]" />
        </motion.div>

        {/* Main 2-Column Responsive Grid: Preserves Original Right-Side Alignment for Cards */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT COLUMN: Top Badge + Kinetic Headline, Bottom Sharp Portrait positioned closer to the right cards */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Top Area: Badge & Bold Masked Headline */}
            <div>
              {/* Sharp Pill Badge - No Border Radius */}
              <motion.div
                variants={fadeUpVariants}
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-none bg-[#f0f0f2] border border-neutral-300 shadow-xs mb-4 sm:mb-6"
              >
                <AsteriskIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ea580c]" />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-neutral-800">
                  BUILDING BRANDS THAT SELL.
                </span>
              </motion.div>

              {/* Kinetic Text Reveal (Masked Overflow) */}
              <div className="space-y-0.5 sm:space-y-1">
                {/* Line 1: MY IMPACT */}
                <div className="overflow-hidden">
                  <motion.h2
                    variants={textRevealVariants}
                    className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[86px] leading-[0.92] text-neutral-950"
                  >
                    MY IMPACT
                  </motion.h2>
                </div>

                {/* Line 2: THROUGH USER */}
                <div className="overflow-hidden">
                  <motion.h2
                    variants={textRevealVariants}
                    className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[86px] leading-[0.92]"
                  >
                    <span className="text-neutral-950">THROUGH </span>
                    <span className="text-[#686868]">USER</span>
                  </motion.h2>
                </div>

                {/* Line 3: EXPERIENCE */}
                <div className="overflow-hidden">
                  <motion.h2
                    variants={textRevealVariants}
                    className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[86px] leading-[0.92] text-[#686868]"
                  >
                    EXPERIENCE
                  </motion.h2>
                </div>
              </div>
            </div>

            {/* Bottom Area: Portrait Card slides to right & stays closer to cards - Sharp Edges, No Border Radius */}
            <div className="mt-8 sm:mt-12 lg:mt-16 flex justify-start lg:justify-end lg:pr-8 xl:pr-12">
              <motion.div
                variants={imageSlideRightVariants}
                className="relative w-[185px] sm:w-[215px] md:w-[235px] lg:w-[245px] aspect-[178/219]"
              >
                {/* 4 Corner Registration Crosshairs (+) with ample breathing room */}
                <span
                  className="absolute -top-6 -left-6 text-neutral-400 font-light text-lg sm:text-xl select-none leading-none transition-transform duration-300 hover:scale-125"
                  aria-hidden="true"
                >
                  +
                </span>
                <span
                  className="absolute -top-6 -right-6 text-neutral-400 font-light text-lg sm:text-xl select-none leading-none transition-transform duration-300 hover:scale-125"
                  aria-hidden="true"
                >
                  +
                </span>
                <span
                  className="absolute -bottom-6 -left-6 text-neutral-400 font-light text-lg sm:text-xl select-none leading-none transition-transform duration-300 hover:scale-125"
                  aria-hidden="true"
                >
                  +
                </span>
                <span
                  className="absolute -bottom-6 -right-6 text-neutral-400 font-light text-lg sm:text-xl select-none leading-none transition-transform duration-300 hover:scale-125"
                  aria-hidden="true"
                >
                  +
                </span>

                {/* Inner Image Card - Sharp Edges, No Border Radius */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group relative w-full h-full rounded-none overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)] bg-neutral-200 border border-neutral-200/60"
                >
                  <Image
                    src="/images/impact-bottom-left.png"
                    alt="User Experience visual"
                    fill
                    priority
                    sizes="(max-width: 768px) 210px, 245px"
                    className="object-cover rounded-none transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN: Kept strictly at its ORIGINAL position on the right */}
          <div className="lg:col-span-5 flex flex-col justify-between items-end">
            
            {/* Top-Right Motion Blur Portrait Card - Sharp Edges, No Border Radius */}
            <motion.div
              variants={fadeUpVariants}
              className="flex justify-end w-full mb-8 lg:mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative w-[150px] sm:w-[175px] md:w-[195px] aspect-[115/139] rounded-none overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-neutral-900 border border-neutral-300/40"
              >
                <Image
                  src="/images/impact-top-right.png"
                  alt="Editorial portrait"
                  fill
                  priority
                  sizes="(max-width: 768px) 175px, 200px"
                  className="object-cover rounded-none transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </motion.div>

            {/* Bottom-Right: Sentence & Stat Cards at their ORIGINAL right-anchored position */}
            <div className="w-full max-w-[480px] flex flex-col items-start">
              {/* Bio Sentence with exact line breaks, starting, and width matching screenshot */}
              <motion.p
                variants={fadeUpVariants}
                className="font-bold text-[12.5px] sm:text-[13.5px] md:text-[14.5px] text-[#555555] uppercase tracking-normal leading-[1.38] mb-5 sm:mb-6 text-left select-none"
              >
                <span className="block">HI, I'M USAMA, A SHOPIFY</span>
                <span className="block">ENGINEER WHO COMBINES</span>
                <span className="block">DEVELOPMENT, CRO, AND ECOMMERCE</span>
                <span className="block">STRATEGY TO BUILD STORES THAT DRIVE</span>
                <span className="block">GROWTH.</span>
              </motion.p>

              {/* Stacked White Stat Cards - Sharp Edges (rounded-none) with Replay-enabled Counters */}
              <div className="w-full flex flex-col gap-3.5 sm:gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardSlideVariants}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="group relative w-full bg-white rounded-none p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-200/80 flex items-center transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-neutral-400 select-none cursor-default"
                  >
                    {/* Left: Big Stat Number with smooth Animated Counter */}
                    <div className="w-[85px] sm:w-[100px] shrink-0">
                      <span className="text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight text-neutral-950 leading-none group-hover:text-[#ea580c] transition-colors duration-300">
                        <Counter target={stat.target} suffix={stat.suffix ?? "+"} />
                      </span>
                    </div>

                    {/* Middle: Subtle Vertical Divider */}
                    <div className="w-[1px] h-11 sm:h-12 bg-neutral-200 mx-3 sm:mx-5 shrink-0" />

                    {/* Right: Icon + Title + Description */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <AsteriskIcon className="w-3.5 h-3.5 text-[#ea580c] shrink-0 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                        <h4 className="text-xs sm:text-[13px] md:text-sm font-bold tracking-tight text-neutral-950 uppercase truncate">
                          {stat.title}
                        </h4>
                      </div>
                      <p className="text-[11px] sm:text-xs text-neutral-500 font-normal leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </motion.div>
    </section>
  );
}
