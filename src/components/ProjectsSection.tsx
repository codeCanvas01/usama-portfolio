"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { AsteriskIcon } from "./ImpactSection";
import ProjectModal, { type ProjectItem } from "./ProjectModal";

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: "fumicase",
    name: "FUMI CASE",
    url: "https://fumicase.com",
    role: "/Dev",
    category: "Custom Theme & 3D Previews",
    image: "/images/projects/fumicase-clean.png",
    description:
      "Custom Shopify theme architecture engineered for an anime & designer phone case lifestyle brand. Integrated 3D model previews, instant sticky cart drawer, and high-velocity mobile UX.",
    speedScore: 98,
    conversionLift: "+42%",
    loadTime: "1.1s",
    tags: ["Custom Liquid 2.0", "3D WebGL Previews", "Instant Cart Drawer", "Mobile CRO"],
    featured: true,
  },
  {
    id: "inne",
    name: "INNE",
    url: "https://inne.io",
    role: "/Dev",
    category: "HealthTech & Subscriptions",
    image: "/images/projects/inne-clean.png",
    description:
      "Shopify 2.0 storefront engineering for CE-certified hormone biosensor minilab with bespoke subscription management, refill kits, and medical-grade data security.",
    speedScore: 99,
    conversionLift: "+38%",
    loadTime: "0.8s",
    tags: ["Recharge Subscriptions", "Shopify 2.0", "Custom App Blocks", "GDPR/HIPAA Flow"],
    featured: true,
  },
  {
    id: "levis",
    name: "LEVIS AVOCADOS",
    url: "https://levisorganicavocados.com",
    role: "/Dev",
    category: "Farm-to-Door E-Commerce",
    image: "/images/projects/levis.jpg",
    description:
      "Direct-to-consumer certified organic California avocado farm store with custom harvest delivery scheduling, recurring subscription box bundling, and zero-latency checkout.",
    speedScore: 100,
    conversionLift: "+54%",
    loadTime: "0.9s",
    tags: ["Custom Harvest Scheduler", "Box Bundling", "Local Delivery Logic", "SEO 100"],
    featured: true,
  },
  {
    id: "javvy",
    name: "JAVVY",
    url: "https://javycoffee.com",
    role: "/Dev",
    category: "DTC Beverage & Bundle Builder",
    image: "/images/projects/javvy.jpg",
    description:
      "High-volume liquid coffee concentrate e-commerce architecture with tiered multi-pack bundle discounts, VIP club memberships, and instant sticky cart checkout.",
    speedScore: 96,
    conversionLift: "+46%",
    loadTime: "1.2s",
    tags: ["Dynamic Bundle Builder", "Multi-Tier Discounts", "VIP Club Engine", "High Concurrency"],
    featured: true,
  },
  {
    id: "fleurandbee",
    name: "FLEUR & BEE",
    url: "https://fleurandbee.com",
    role: "/CRO",
    category: "Clean Skincare & Funnel Optimization",
    image: "/images/projects/fleurandbee.jpg",
    description:
      "Conversion rate optimization audit and theme redesign for 100% vegan clinical skincare brand. Re-architected PDP product gallery, trust badges, and ingredient drawer.",
    speedScore: 97,
    conversionLift: "+33.8%",
    loadTime: "1.0s",
    tags: ["A/B Testing (VWO)", "PDP Redesign", "Ingredient Drawer", "Checkout Velocity"],
    featured: true,
  },
  {
    id: "notifyjeans",
    name: "NOTIFY JEANS",
    url: "https://notifyjeans.com",
    role: "/Dev",
    category: "Luxury Parisian Fashion",
    image: "/images/projects/notifyjeans.jpg",
    description:
      "Artisan Italian-crafted Parisian luxury denim e-commerce experience featuring interactive custom silhouette sizing advisor, lookbook integration, and multi-currency internationalization.",
    speedScore: 97,
    conversionLift: "+29%",
    loadTime: "0.95s",
    tags: ["Shopify Markets", "Custom Fit Guide", "Editorial Lookbook", "Multi-Currency"],
  },
  {
    id: "truebotanicals",
    name: "TRUE BOTANICALS",
    url: "https://truebotanicals.com",
    role: "/CRO",
    category: "Clean Luxury Beauty",
    image: "/images/projects/truebotanicals.jpg",
    description:
      "Continuous CRO testing on top-of-funnel landing pages for award-winning biocompatible skincare. Implemented micro-survey skin quiz funnel and accelerated bundle builder.",
    speedScore: 98,
    conversionLift: "+41.2%",
    loadTime: "1.1s",
    tags: ["Diagnostic Skin Quiz", "Upsell Engine", "Funnel CRO", "VWO Verified"],
  },
  {
    id: "shadyrays",
    name: "SHADY RAYS",
    url: "https://shadyrays.com",
    role: "/Dev",
    category: "Performance Eyewear",
    image: "/images/projects/shadyrays.jpg",
    description:
      "Polarized performance sunglasses Shopify architecture with real-time lens tint preview, automated Lost & Broken replacement claims portal, and high-converting flash sale modules.",
    speedScore: 98,
    conversionLift: "+48%",
    loadTime: "0.85s",
    tags: ["Custom Warranty Portal", "Lens Visualizer", "Flash Sale Engine", "Sub-1s LCP"],
  },
  {
    id: "hiyahealth",
    name: "HIYA HEALTH",
    url: "https://hiyahealth.com/products/kids-bedtime-essentials",
    role: "/CRO",
    category: "Children's Wellness & Subscriptions",
    image: "/images/projects/hiyahealth.jpg",
    description:
      "Conversion-engineered product detail page for sugar-free kids bedtime essentials. Optimized refillable glass bottle customizer, pediatric endorsement proof, and subscription switchers.",
    speedScore: 99,
    conversionLift: "+52%",
    loadTime: "0.8s",
    tags: ["Subscription Retention", "PDP Customizer", "Pediatric Social Proof", "Klaviyo Sync"],
  },
  {
    id: "kettleandfire",
    name: "KETTLE & FIRE",
    url: "https://kettleandfire.com",
    role: "/Full-Stack",
    category: "Regenerative Nutrition",
    image: "/images/projects/kettleandfire.jpg",
    description:
      "Scalable Shopify enterprise stack for America's #1 grass-fed bone broth brand. Integrated custom Recharge subscription portal, recipe cooking hub, and store locator.",
    speedScore: 98,
    conversionLift: "+64%",
    loadTime: "1.15s",
    tags: ["Enterprise Recharge", "Custom Recipe Hub", "Store Locator API", "Automated Backups"],
  },
];

interface ScrollProjectCardProps {
  children: React.ReactNode;
  scaleFrom?: number;
  scaleTo?: number;
  scaleExit?: number;
  className?: string;
  onClick?: () => void;
}

function ScrollProjectCard({
  children,
  scaleFrom = 0.91,
  scaleTo = 1.0,
  scaleExit = 0.94,
  className = "",
  onClick,
}: ScrollProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"],
  });

  // Robust dynamic scale transformer with mobile adaptation and clean clamping
  const scale = useTransform(scrollYProgress, (rawProgress) => {
    const progress = Math.max(0, Math.min(1, rawProgress));
    const from = isMobile ? 0.96 : scaleFrom;
    const exit = isMobile ? 0.97 : scaleExit;
    if (progress <= 0.5) {
      const p = progress / 0.5;
      return from + (scaleTo - from) * p;
    } else {
      const p = (progress - 0.5) / 0.5;
      return scaleTo - (scaleTo - exit) * p;
    }
  });

  return (
    <motion.div
      ref={cardRef}
      style={{ scale }}
      onClick={onClick}
      className={`will-change-transform origin-center ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const openProjectDetails = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // 5 Featured items
  const fumicase = PROJECTS_LIST[0];
  const inne = PROJECTS_LIST[1];
  const levis = PROJECTS_LIST[2];
  const javvy = PROJECTS_LIST[3];
  const fleur = PROJECTS_LIST[4];

  // Filtered list for "All Projects" expanded view
  const filteredProjects = PROJECTS_LIST.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "dev") return p.role === "/Dev";
    if (activeFilter === "cro") return p.role === "/CRO";
    if (activeFilter === "fullstack") return p.role === "/Full-Stack";
    return true;
  });

  return (
    <section
      id="work"
      className="relative w-full bg-[#f7f7f7] text-[#0f1013] overflow-hidden py-14 sm:py-18 md:py-24 selection:bg-neutral-900 selection:text-white border-t border-neutral-200/60"
    >
      <div id="projects" className="absolute -top-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        className="relative w-full max-w-[1440px] xl:max-w-[1520px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16"
      >
        {/* Header Section: Badge & Kinetic Headline matching reference */}
        <div className="mb-10 sm:mb-14 lg:mb-16">
          {/* Badge: PORTFOLIO with Orange Asterisk */}
          <motion.div variants={fadeUpVariants} className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-none bg-[#f0f0f2] border border-neutral-300 shadow-2xs select-none">
              <AsteriskIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ea580c] shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-neutral-800">
                PORTFOLIO
              </span>
            </div>
          </motion.div>

          {/* Masked Headline: MY PROJECTS. (Dual Tone black & gray matching screenshot 2) */}
          <div className="space-y-0.5 sm:space-y-1">
            <div className="overflow-hidden">
              <motion.h2
                variants={textRevealVariants}
                className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[88px] leading-[0.92] text-neutral-950"
              >
                MY
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                variants={textRevealVariants}
                className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[88px] leading-[0.92] text-[#686868]"
              >
                PROJECTS.
              </motion.h2>
            </div>
          </div>
        </div>

        {/* 5 FEATURED PROJECTS GRID: Matches user's reference screenshot with exact asymmetrical balance */}
        <div className="w-full flex flex-col gap-6 sm:gap-8 lg:gap-10">
          
          {/* ROW 1: Fumi Case (Left, wider & taller) + Inne (Right, compact square) */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 sm:gap-8 lg:gap-10">
            
            {/* 1. FUMI CASE */}
            <ScrollProjectCard
              scaleFrom={0.92}
              scaleTo={1.0}
              scaleExit={0.94}
              className="w-full md:w-[48%] lg:w-[46%]"
              onClick={() => openProjectDetails(fumicase)}
            >
              <div
                data-card-hover="true"
                className="group relative bg-white border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.11)] transition-all duration-300 p-2.5 sm:p-3 cursor-pointer select-none"
              >
                <div className="relative w-full aspect-[4/4.6] bg-neutral-900 overflow-hidden">
                  <Image
                    src={fumicase.image}
                    alt="Fumi Case Shopify Store"
                    fill
                    sizes="(max-width: 768px) 100vw, 46vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Bottom Label Bar */}
                <div className="mt-2.5 sm:mt-3 bg-[#e8e8ea] px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AsteriskIcon className="w-3.5 h-3.5 text-[#ea580c] transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                    <span className="font-bold text-xs sm:text-[13px] tracking-tight uppercase text-neutral-950">
                      {fumicase.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs sm:text-[12px] text-neutral-500 font-medium">
                    {fumicase.role}
                  </span>
                </div>
              </div>
            </ScrollProjectCard>

            {/* 2. INNE */}
            <ScrollProjectCard
              scaleFrom={0.90}
              scaleTo={1.0}
              scaleExit={0.93}
              className="w-full md:w-[34%] lg:w-[30%]"
              onClick={() => openProjectDetails(inne)}
            >
              <div
                data-card-hover="true"
                className="group relative bg-white border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.11)] transition-all duration-300 p-2.5 sm:p-3 cursor-pointer select-none"
              >
                <div className="relative w-full aspect-square bg-[#f5f1ea] overflow-hidden">
                  <Image
                    src={inne.image}
                    alt="Inne Biosensor Shopify Store"
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Bottom Label Bar */}
                <div className="mt-2.5 sm:mt-3 bg-[#e8e8ea] px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AsteriskIcon className="w-3.5 h-3.5 text-[#ea580c] transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                    <span className="font-bold text-xs sm:text-[13px] tracking-tight uppercase text-neutral-950">
                      {inne.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs sm:text-[12px] text-neutral-500 font-medium">
                    {inne.role}
                  </span>
                </div>
              </div>
            </ScrollProjectCard>

          </div>

          {/* ROW 2: Levi's Organic Avocados (Panoramic Full Width) */}
          <ScrollProjectCard
            scaleFrom={0.95}
            scaleTo={1.0}
            scaleExit={0.96}
            className="w-full"
            onClick={() => openProjectDetails(levis)}
          >
            <div
              data-card-hover="true"
              className="group relative bg-white border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.11)] transition-all duration-300 p-2.5 sm:p-3 cursor-pointer select-none"
            >
              <div className="relative w-full aspect-[16/7] sm:aspect-[21/9] md:aspect-[2.35/1] bg-neutral-900 overflow-hidden">
                <Image
                  src={levis.image}
                  alt="Levi's Organic Avocados Store"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Bottom Label Bar */}
              <div className="mt-2.5 sm:mt-3 bg-[#e8e8ea] px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <AsteriskIcon className="w-3.5 h-3.5 text-[#ea580c] transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                  <span className="font-bold text-xs sm:text-[13px] tracking-tight uppercase text-neutral-950">
                    {levis.name}
                  </span>
                </div>
                <span className="font-mono text-xs sm:text-[12px] text-neutral-500 font-medium">
                  {levis.role}
                </span>
              </div>
            </div>
          </ScrollProjectCard>

          {/* ROW 3: Javvy Coffee (Left, square) + Fleur & Bee (Right, wide) */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 sm:gap-8 lg:gap-10">
            
            {/* 4. JAVVY */}
            <ScrollProjectCard
              scaleFrom={0.90}
              scaleTo={1.0}
              scaleExit={0.93}
              className="w-full md:w-[34%] lg:w-[30%]"
              onClick={() => openProjectDetails(javvy)}
            >
              <div
                data-card-hover="true"
                className="group relative bg-white border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.11)] transition-all duration-300 p-2.5 sm:p-3 cursor-pointer select-none"
              >
                <div className="relative w-full aspect-square bg-[#fbf5ee] overflow-hidden">
                  <Image
                    src={javvy.image}
                    alt="Javvy Coffee Shopify Store"
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Bottom Label Bar */}
                <div className="mt-2.5 sm:mt-3 bg-[#e8e8ea] px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AsteriskIcon className="w-3.5 h-3.5 text-[#ea580c] transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                    <span className="font-bold text-xs sm:text-[13px] tracking-tight uppercase text-neutral-950">
                      {javvy.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs sm:text-[12px] text-neutral-500 font-medium">
                    {javvy.role}
                  </span>
                </div>
              </div>
            </ScrollProjectCard>

            {/* 5. FLEUR & BEE */}
            <ScrollProjectCard
              scaleFrom={0.92}
              scaleTo={1.0}
              scaleExit={0.94}
              className="w-full md:w-[48%] lg:w-[46%]"
              onClick={() => openProjectDetails(fleur)}
            >
              <div
                data-card-hover="true"
                className="group relative bg-white border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.11)] transition-all duration-300 p-2.5 sm:p-3 cursor-pointer select-none"
              >
                <div className="relative w-full aspect-[4/4.6] bg-[#ece7e1] overflow-hidden">
                  <Image
                    src={fleur.image}
                    alt="Fleur & Bee Clean Skincare"
                    fill
                    sizes="(max-width: 768px) 100vw, 46vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Bottom Label Bar */}
                <div className="mt-2.5 sm:mt-3 bg-[#e8e8ea] px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AsteriskIcon className="w-3.5 h-3.5 text-[#ea580c] transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                    <span className="font-bold text-xs sm:text-[13px] tracking-tight uppercase text-neutral-950">
                      {fleur.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs sm:text-[12px] text-neutral-500 font-medium">
                    {fleur.role}
                  </span>
                </div>
              </div>
            </ScrollProjectCard>

          </div>

        </div>

        {/* BOTTOM ACTION: All Projects button with right-to-left red slide fill on hover and zero shadow */}
        <div className="mt-12 sm:mt-16 flex flex-col items-start">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="group relative inline-flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-none border-l-2 border-[#ea580c] bg-transparent text-neutral-950 transition-colors duration-300 cursor-pointer select-none overflow-hidden active:scale-[0.99] shadow-none hover:shadow-none"
          >
            {/* Red/Orange fill overlay moving from right end to left end */}
            <span
              className="absolute inset-0 bg-[#ea580c] translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none z-0"
              aria-hidden="true"
            />

            {/* Button label */}
            <span className="relative z-10 text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-neutral-950 group-hover:text-white transition-colors duration-300 select-none">
              {showAllProjects ? "COLLAPSE PROJECTS" : "ALL PROJECTS"}
            </span>

            {/* Square box: Orange with white arrow in simple state, white with orange arrow on hover */}
            <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 bg-[#ea580c] group-hover:bg-white text-white group-hover:text-[#ea580c] flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-2xs">
              <ArrowRight
                className={`w-4 h-4 transition-transform duration-300 ${
                  showAllProjects ? "rotate-90" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* EXPANDED ALL 10 PROJECTS SHOWCASE */}
        {showAllProjects && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full mt-10 pt-8 border-t border-neutral-300/80"
          >
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {[
                { id: "all", label: "All Projects (10)" },
                { id: "dev", label: "Shopify Dev (6)" },
                { id: "cro", label: "CRO & Optimization (3)" },
                { id: "fullstack", label: "Enterprise Stack (1)" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                    activeFilter === filter.id
                      ? "bg-neutral-950 text-white"
                      : "bg-[#ececed] text-neutral-700 hover:bg-neutral-300"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* 10 Projects Grid with dynamic scroll scaling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <ScrollProjectCard
                  key={project.id}
                  scaleFrom={0.93}
                  scaleTo={1.0}
                  scaleExit={0.96}
                  onClick={() => openProjectDetails(project)}
                >
                  <div
                    data-card-hover="true"
                    className="group bg-white border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.1)] transition-all duration-300 p-2.5 sm:p-3 overflow-hidden cursor-pointer flex flex-col justify-between h-full"
                  >
                    {/* Image Area */}
                    <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Top Overlay Badge */}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/75 backdrop-blur-xs text-[10px] font-mono font-semibold text-white uppercase">
                        {project.category}
                      </div>
                    </div>

                    {/* Content info */}
                    <div className="pt-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-black text-sm sm:text-base tracking-tight uppercase text-neutral-950">
                            {project.name}
                          </h4>
                          <span className="font-mono text-xs font-semibold text-[#ea580c]">
                            {project.role}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Footer row */}
                      <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <span className="font-bold text-neutral-900 text-[11px]">
                          {project.conversionLift} Lift
                        </span>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[#ea580c] font-semibold text-[11px] hover:underline"
                        >
                          Visit Store <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollProjectCard>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Dynamic Project Case Study Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
}
