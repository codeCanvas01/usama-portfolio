"use client";

import React from "react";
import { motion } from "framer-motion";

interface GridPlusProps {
  top: string;
  delay?: number;
}

// Pixel-perfect crosshair (+) aligned precisely to the 1px grid intersection with smooth ambient pulse & hover interaction
function GridPlus({ top, delay = 0 }: GridPlusProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0.35 }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.4, 0.9, 0.4],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      whileHover={{
        scale: 1.7,
        rotate: 90,
        opacity: 1,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className={`absolute -ml-[4px] -mt-[4px] w-[9px] h-[9px] pointer-events-auto select-none cursor-crosshair flex items-center justify-center ${top}`}
      aria-hidden="true"
    >
      {/* Horizontal arm: perfectly aligned with the 1px horizontal grid line */}
      <div className="absolute top-[4px] left-0 w-full h-[1px] bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
      {/* Vertical arm: perfectly aligned with the 1px vertical grid line */}
      <div className="absolute left-[4px] top-0 h-full w-[1px] bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
    </motion.div>
  );
}

export default function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
      {/* Container aligned with content */}
      <div className="relative w-full h-full max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Vertical Grid Lines (4 Columns -> 5 boundary lines) */}
        <div className="absolute inset-y-0 left-6 md:left-12 right-6 md:right-12 flex justify-between">
          {/* Column Line 0% */}
          <div className="w-px h-full bg-white/[0.12] relative">
            <GridPlus top="top-[75px]" delay={0.2} />
            <GridPlus top="top-[38%]" delay={0.5} />
            <GridPlus top="top-[70%]" delay={0.8} />
          </div>

          {/* Column Line 25% */}
          <div className="hidden sm:block w-px h-full bg-white/[0.12] relative">
            <GridPlus top="top-[75px]" delay={0.4} />
            <GridPlus top="top-[38%]" delay={0.7} />
            <GridPlus top="top-[70%]" delay={1.0} />
          </div>

          {/* Column Line 50% */}
          <div className="hidden md:block w-px h-full bg-white/[0.12] relative">
            <GridPlus top="top-[75px]" delay={0.6} />
            <GridPlus top="top-[38%]" delay={0.9} />
            <GridPlus top="top-[70%]" delay={1.2} />
          </div>

          {/* Column Line 75% */}
          <div className="hidden lg:block w-px h-full bg-white/[0.12] relative">
            <GridPlus top="top-[75px]" delay={0.8} />
            <GridPlus top="top-[38%]" delay={1.1} />
            <GridPlus top="top-[70%]" delay={1.4} />
          </div>

          {/* Column Line 100% */}
          <div className="w-px h-full bg-white/[0.12] relative">
            <GridPlus top="top-[75px]" delay={1.0} />
            <GridPlus top="top-[38%]" delay={1.3} />
            <GridPlus top="top-[70%]" delay={1.6} />
          </div>
        </div>

        {/* Horizontal Divider Lines across full container */}
        <div className="absolute top-[75px] left-6 md:left-12 right-6 md:right-12 h-px bg-white/[0.12]" />
        <div className="absolute top-[38%] left-6 md:left-12 right-6 md:right-12 h-px bg-white/[0.12]" />
        <div className="absolute top-[70%] left-6 md:left-12 right-6 md:right-12 h-px bg-white/[0.12]" />
      </div>
    </div>
  );
}
