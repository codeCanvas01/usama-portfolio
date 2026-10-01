"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { AsteriskIcon } from "./ImpactSection";

export interface ServiceData {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  alt: string;
}

export const SERVICES_DATA: ServiceData[] = [
  {
    id: "shopify-dev",
    number: "001",
    title: "SHOPIFY DEVELOPMENT",
    description:
      "Building fast, scalable, and custom Shopify stores that deliver seamless shopping experiences.",
    tags: [
      "Custom Shopify Theme Development",
      "Shopify App Integration",
      "Custom Liquid Development",
      "Performance Optimization",
      "Shopify 2.0 Development",
    ],
    images: [
      "/images/service-shopify-dev.png",
      "/images/service-shopify-dev.png",
      "/images/service-shopify-dev.png",
    ],
    alt: "Shopify 2.0 Theme Development and Liquid Architecture",
  },
  {
    id: "cro",
    number: "002",
    title: "CRO",
    description:
      "Optimizing every step of the customer journey to increase conversions and revenue.",
    tags: [
      "Landing Page Optimization",
      "A/B Testing (VWO)",
      "Checkout Optimization",
      "User Journey Analysis",
      "Speed & UX Improvements",
    ],
    images: [
      "/images/service-cro.png",
      "/images/service-cro.png",
      "/images/service-cro.png",
    ],
    alt: "Conversion Rate Optimization and A/B Testing Analytics",
  },
  {
    id: "custom-solutions",
    number: "003",
    title: "CUSTOM SOLUTIONS",
    description:
      "Creating tailored Shopify features and integrations to solve unique business challenges.",
    tags: [
      "Custom Shopify Apps",
      "API Integrations",
      "Subscription & Recharge Setup",
      "Custom Product Configurators",
      "Third-Party Integrations",
    ],
    images: [
      "/images/service-custom-solutions.png",
      "/images/service-custom-solutions.png",
      "/images/service-custom-solutions.png",
    ],
    alt: "Custom Shopify Apps, 3D Configurators, and API Integrations",
  },
  {
    id: "maintenance",
    number: "004",
    title: "SHOPIFY MAINTENANCE",
    description:
      "Keeping your Shopify store secure, updated, and performing at its best with ongoing support.",
    tags: [
      "Bug Fixes & Support",
      "Theme Updates",
      "Store Monitoring",
      "Performance Audits",
      "Feature Enhancements",
    ],
    images: [
      "/images/service-maintenance.png",
      "/images/service-maintenance.png",
      "/images/service-maintenance.png",
    ],
    alt: "Shopify Store Maintenance, 100 Lighthouse Speed and 24/7 Security",
  },
];

export default function ServicesSection() {
  // Track active slide index for each service card
  const [activeSlides, setActiveSlides] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  });

  const handleDotClick = (serviceIdx: number, slideIdx: number) => {
    setActiveSlides((prev) => ({
      ...prev,
      [serviceIdx]: slideIdx,
    }));
  };

  // Stagger animation container
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

  // Kinetic text reveal
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

  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#f7f7f7] text-[#0f1013] overflow-hidden py-14 sm:py-18 md:py-24 selection:bg-neutral-900 selection:text-white border-t border-neutral-200/60"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        className="relative w-full max-w-[1440px] xl:max-w-[1520px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16"
      >
        {/* TOP HEADER: Badge at Col 1, Massive Headline at Col 2 matching grid alignment */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start mb-16 sm:mb-20 lg:mb-24">
          {/* Col 1: Pill Badge */}
          <div className="md:col-span-3 lg:col-span-2 pt-1 sm:pt-2">
            <motion.div
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-none bg-[#f0f0f2] border border-neutral-300 shadow-2xs select-none"
            >
              <AsteriskIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ea580c] shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-neutral-800">
                MY SERVICES
              </span>
            </motion.div>
          </div>

          {/* Col 2 & 3: Kinetic Headline matching typography and dual-tone gray/black */}
          <div className="md:col-span-9 lg:col-span-10">
            <div className="space-y-0.5 sm:space-y-1">
              {/* Line 1: POWERFUL */}
              <div className="overflow-hidden">
                <motion.h2
                  variants={textRevealVariants}
                  className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[88px] leading-[0.92] text-neutral-950"
                >
                  POWERFUL
                </motion.h2>
              </div>

              {/* Line 2: SHOPIFY */}
              <div className="overflow-hidden">
                <motion.h2
                  variants={textRevealVariants}
                  className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[88px] leading-[0.92] text-neutral-950"
                >
                  SHOPIFY
                </motion.h2>
              </div>

              {/* Line 3: SOLUTIONS FOR */}
              <div className="overflow-hidden">
                <motion.h2
                  variants={textRevealVariants}
                  className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[88px] leading-[0.92] text-[#686868]"
                >
                  SOLUTIONS FOR
                </motion.h2>
              </div>

              {/* Line 4: YOUR BRAND */}
              <div className="overflow-hidden">
                <motion.h2
                  variants={textRevealVariants}
                  className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[88px] leading-[0.92] text-[#686868]"
                >
                  YOUR BRAND
                </motion.h2>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES LIST: 4 rows separated by subtle dividers */}
        <div className="w-full flex flex-col">
          {SERVICES_DATA.map((service, index) => {
            const activeIndex = activeSlides[index] ?? 0;
            const currentImg = service.images[activeIndex] || service.images[0];

            return (
              <motion.div
                key={service.id}
                variants={rowVariants}
                className="group relative w-full border-t border-neutral-300/70 py-10 sm:py-12 md:py-14 transition-colors duration-300 hover:bg-neutral-50/40"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 items-start">
                  
                  {/* Column 1: Asterisk Icon + 3-Digit Number */}
                  <div className="md:col-span-3 lg:col-span-2 flex items-center gap-2.5 pt-1">
                    <AsteriskIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ea580c] shrink-0 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                    <span className="text-sm sm:text-[15px] font-semibold tracking-wider text-neutral-900 font-mono select-none">
                      {service.number}
                    </span>
                  </div>

                  {/* Column 2: Title, Description, and Badges/Tags */}
                  <div className="md:col-span-5 lg:col-span-6 flex flex-col justify-start">
                    {/* Service Title */}
                    <h3 className="font-black uppercase tracking-tight text-xl sm:text-2xl md:text-[25px] text-neutral-950 leading-tight mb-2.5 group-hover:text-neutral-900 transition-colors">
                      {service.title}
                    </h3>

                    {/* Service Description */}
                    <p className="text-[12.5px] sm:text-[13.5px] text-neutral-600 font-normal leading-relaxed max-w-[460px] mb-5 sm:mb-6">
                      {service.description}
                    </p>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {service.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-block px-3 py-1.5 text-[11px] sm:text-[12px] font-medium text-neutral-800 bg-[#ebebef] border border-neutral-200/90 rounded-none transition-all duration-200 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 select-none cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Image Card with Interactive Carousel Dots */}
                  <div className="md:col-span-4 lg:col-span-4 flex justify-start md:justify-end">
                    <div
                      data-card-hover="true"
                      className="relative w-full max-w-[340px] sm:max-w-[360px] md:max-w-[320px] lg:max-w-[350px] xl:max-w-[380px] aspect-[4/3] rounded-none overflow-hidden border border-neutral-200/90 shadow-[0_6px_24px_rgba(0,0,0,0.04)] bg-neutral-200 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] group-hover:border-neutral-300 transition-all duration-300 cursor-pointer"
                    >
                      
                      {/* Image with subtle zoom on hover */}
                      <Image
                        src={currentImg}
                        alt={service.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 350px, 400px"
                        className="object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Interactive Carousel Pagination Pill */}
                      <div
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-xs border border-neutral-200/70 shadow-xs rounded-none select-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {[0, 1, 2].map((dotIdx) => {
                          const isActive = activeIndex === dotIdx;
                          return (
                            <button
                              key={dotIdx}
                              type="button"
                              onClick={() => handleDotClick(index, dotIdx)}
                              aria-label={`Show preview image ${dotIdx + 1} for ${service.title}`}
                              className={`w-2 h-2 rounded-none transition-all duration-200 cursor-pointer ${
                                isActive
                                  ? "bg-[#ea580c] scale-105"
                                  : "bg-neutral-300 hover:bg-neutral-400"
                              }`}
                            />
                          );
                        })}
                      </div>

                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
