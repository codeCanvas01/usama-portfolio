"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import GridBackground from "./GridBackground";
import Navbar from "./Navbar";
import FumiCaseCard from "./FumiCaseCard";
import ContactCard from "./ContactCard";
import ContactModal from "./ContactModal";
import ProjectModal from "./ProjectModal";
import { ArrowUpRight } from "lucide-react";
import { AsteriskIcon } from "./ImpactSection";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  // GSAP Entrance & Floating Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark entrance - subtle opacity matching screenshot
      if (watermarkRef.current) {
        gsap.from(watermarkRef.current, {
          opacity: 0,
          scale: 1.04,
          y: -15,
          duration: 1.2,
          ease: "power2.out",
        });
      }

      // Portrait entrance
      if (portraitRef.current) {
        gsap.from(portraitRef.current, {
          y: 30,
          opacity: 0.5,
          duration: 1,
          ease: "power2.out",
        });
      }

      // Statement at lower left
      if (statementRef.current) {
        gsap.from(statementRef.current, {
          y: 20,
          opacity: 0.5,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Floating cards entrance
      gsap.from(".fumi-card-wrapper", {
        x: 30,
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".contact-card-wrapper", {
        y: 20,
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-screen bg-gradient-to-b from-[#b8381c] via-[#b63519] to-[#9c2911] text-white overflow-hidden flex flex-col justify-between selection:bg-white selection:text-[#b8381c]"
    >
      {/* Architectural Grid Lines & Crosshairs */}
      <GridBackground />

      {/* Top Header / Navigation */}
      {/* Top Header / Navigation */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Background Watermark: Giant "USAMA" with soft low opacity (Desktop only) */}
      <div
        ref={watermarkRef}
        className="hidden md:flex absolute top-[8%] sm:top-[7%] left-0 right-0 w-full justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-extrabold text-[24vw] leading-none tracking-[-0.04em] text-white/[0.07] uppercase whitespace-nowrap">
          USAMA
        </span>
      </div>

      {/* Center Portrait using high-res cutout (Desktop & Tablet only) */}
      <div
        ref={portraitRef}
        className="hidden md:flex absolute left-1/2 bottom-0 -translate-x-1/2 w-[340px] sm:w-[480px] md:w-[580px] lg:w-[660px] xl:w-[720px] max-w-full pointer-events-none z-10 justify-center items-end"
      >
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src="/images/usama-hero-perfect.png"
            alt="Usama - Shopify Developer"
            fill
            priority
            className="object-contain object-bottom select-none"
            sizes="(max-width: 768px) 380px, (max-width: 1200px) 600px, 720px"
          />
          {/* Smooth bottom gradient fade to dissolve suit seamlessly into background */}
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#9c2911] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* DESKTOP & TABLET LAYOUT (md and up) */}
      <div className="hidden md:flex relative z-20 flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex-col justify-between pt-2 pb-6 md:pb-10">
        
        {/* Upper Row: Right FUMI CASE Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start pt-6 sm:pt-10 md:pt-14">
          <div className="hidden md:block col-span-3 pointer-events-none" />

          {/* Column 4: Floating FUMI CASE Card */}
          <div className="flex justify-end col-span-1 z-30 pt-0 sm:pt-4 pr-1 sm:pr-3">
            <div className="fumi-card-wrapper animate-float-slow">
              <FumiCaseCard onOpenProject={() => setIsProjectOpen(true)} />
            </div>
          </div>
        </div>

        {/* Bottom Row: Left Statement & Right "Let's Talk" Card */}
        <div className="relative z-30 grid grid-cols-1 md:grid-cols-4 gap-6 items-end mt-16 sm:mt-28 md:mt-36">
          
          {/* Lower Left: Statement replacing the lower-left USAMA */}
          <div
            ref={statementRef}
            className="col-span-1 md:col-span-3 pl-2 sm:pl-3 pb-2 sm:pb-4 max-w-sm sm:max-w-md lg:max-w-lg"
          >
            <h2 className="text-white text-base sm:text-lg md:text-[21px] lg:text-[23px] font-bold uppercase tracking-tight leading-[1.3] font-sans drop-shadow-sm">
              <span>I BUILD HIGH-CONVERTING SHOPIFY</span>
              <br />
              <span>STORES THAT ARE FAST, SCALABLE,</span>
              <br />
              <span>AND BUILT TO GROW BRANDS.</span>
            </h2>
          </div>

          {/* Column 4: Let's Talk Card with original orange background image */}
          <div className="flex justify-start md:justify-end col-span-1 pb-1 sm:pb-3 pr-1 sm:pr-3">
            <div className="contact-card-wrapper animate-float-delay">
              <ContactCard onOpenContact={() => setIsContactOpen(true)} />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT (strictly under md - matching mobile screenshot) */}
      <div className="block md:hidden relative z-20 w-full px-5 pt-5 pb-12">
        {/* Top Text Block: ©2026 USAMA and Statement */}
        <div className="mb-6">
          <span className="text-white text-base sm:text-lg font-bold tracking-tight block">
            ©2026
          </span>
          <h1 className="text-white text-5xl sm:text-6xl font-black uppercase tracking-tight leading-none mt-1">
            USAMA
          </h1>
          <p className="text-white text-[13px] sm:text-[14px] font-bold uppercase tracking-tight leading-[1.35] mt-3 sm:mt-4 max-w-xs">
            I BUILD HIGH-CONVERTING SHOPIFY STORES THAT ARE FAST, SCALABLE, AND BUILT TO GROW BRANDS.
          </p>
        </div>

        {/* Vertical Stacked Cards */}
        <div className="flex flex-col gap-5 w-full">
          {/* Card 1: Vertical Contact Card with orange-background portrait */}
          <div
            onClick={() => setIsContactOpen(true)}
            className="w-full max-w-[340px] sm:max-w-[380px] mx-auto bg-[#0d0e12] text-white border border-white/10 rounded-none p-3 sm:p-3.5 shadow-2xl cursor-pointer transition-transform active:scale-[0.99] select-none"
          >
            {/* Square photo with orange background */}
            <div className="relative aspect-square w-full rounded-none overflow-hidden bg-[#e75325] border border-white/5">
              <Image
                src="/images/usama-with-bg.jpg"
                alt="Usama - Shopify Developer"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 340px, 380px"
              />
            </div>

            {/* Details below photo */}
            <div className="pt-3 pb-1 px-1">
              <span className="text-[11px] text-neutral-400 font-medium block">
                Let's Talk
              </span>
              <h3 className="text-base font-bold text-white tracking-tight leading-tight mt-0.5">
                Usama
              </h3>
              <p className="text-[11px] text-neutral-400 font-normal tracking-tight mt-0.5">
                Shopify Expert Developer
              </p>

              {/* White square action button with diagonal arrow */}
              <div className="w-8 h-8 rounded-none bg-white text-black flex items-center justify-center mt-3 shadow-xs">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 2: Vertical FUMI CASE Card */}
          <div
            onClick={() => setIsProjectOpen(true)}
            className="w-full max-w-[340px] sm:max-w-[380px] mx-auto bg-white rounded-none p-3 sm:p-3.5 shadow-2xl cursor-pointer transition-transform active:scale-[0.99] select-none"
          >
            {/* Product image */}
            <div className="relative aspect-square w-full rounded-none overflow-hidden bg-neutral-900">
              <Image
                src="/images/fumi-case-cases.png"
                alt="FUMI CASE"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 340px, 380px"
              />
            </div>

            {/* Gray footer bar */}
            <div className="mt-3 bg-[#ededef] px-3 py-2 flex items-center justify-between text-xs font-semibold text-neutral-800 rounded-none">
              <div className="flex items-center gap-1.5">
                <AsteriskIcon className="w-3.5 h-3.5 text-[#e25822]" />
                <span className="font-bold text-neutral-900 tracking-tight">FUMI CASE</span>
              </div>
              <span className="text-neutral-500 font-mono text-[11px]">/Dev</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <ProjectModal
        isOpen={isProjectOpen}
        onClose={() => setIsProjectOpen(false)}
      />
    </section>
  );
}
