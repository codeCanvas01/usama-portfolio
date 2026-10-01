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

// 4-pointed diamond sparkle starburst
function SparkleIcon({ className = "w-6 h-6 text-[#ff4b00]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          type: "contact",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message.");

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: "", email: "", message: "" });
      }, 5000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(null), 5000);
    } finally {
      setSubmitting(false);
    }
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
      id="contact"
      className="relative w-full bg-[#f8f8f9] text-[#0f1013] overflow-hidden py-16 sm:py-20 md:py-28 selection:bg-neutral-900 selection:text-white border-t border-neutral-200/60"
    >
      <div className="relative w-full max-w-[1440px] xl:max-w-[1520px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        
        {/* CINEMATIC NEON BANNER CONTAINER (Sharp edges, no border-radius) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          className="relative w-full min-h-[580px] lg:min-h-[640px] rounded-none overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col lg:flex-row items-center justify-between p-6 sm:p-10 md:p-12 lg:p-16 gap-10 lg:gap-14"
        >
          {/* Background Cinematic Neon Portrait */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <Image
              src="/images/contact-banner-hires.jpg"
              alt="Cinematic duotone background"
              fill
              sizes="(max-width: 1536px) 100vw, 1520px"
              className="object-cover object-center"
              priority
            />
            {/* Atmospheric cinematic vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/40" />
          </div>

          {/* LEFT: FLOATING WHITE FORM CARD (Sharp edges, no watery glass cursor) */}
          <motion.div
            variants={fadeUpVariants}
            className="relative z-10 w-full max-w-[380px] sm:max-w-[400px] lg:max-w-[420px] bg-white border border-white/70 shadow-[0_25px_60px_rgba(0,0,0,0.45)] rounded-none overflow-hidden shrink-0 select-none"
          >
            {/* Top Logo Frame: Warm Gradient Glow with White Border (Zero Black Border) */}
            <div className="relative h-[115px] sm:h-[125px] p-2.5 sm:p-3 bg-gradient-to-r from-[#6e1414] via-[#b83808] to-[#5a1010] overflow-hidden">
              <div className="relative w-full h-full border-2 border-white flex items-center justify-center overflow-hidden">
                {/* Internal warm glow matching user's screenshot */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ea580c]/25 to-black/20" />
                <div className="relative z-10 flex items-center">
                  <span className="font-black tracking-widest text-2xl sm:text-[26px] text-white uppercase select-none">
                    USAMA
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/95 align-super ml-0.5 font-bold">
                    ®
                  </span>
                </div>
              </div>
            </div>

            {/* Card Form Body */}
            <div className="p-6 sm:p-7 md:p-8">
              <h3 className="font-bold text-center text-lg sm:text-[19px] text-neutral-950 mb-6">
                Reach Out to Me
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs sm:text-[12.5px] font-bold text-neutral-900 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Jane Smith"
                    className="w-full bg-[#f6f6f7] border border-neutral-200/90 rounded-none px-4 py-3 text-xs sm:text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs sm:text-[12.5px] font-bold text-neutral-900 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="you@gmail.com"
                    className="w-full bg-[#f6f6f7] border border-neutral-200/90 rounded-none px-4 py-3 text-xs sm:text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs sm:text-[12.5px] font-bold text-neutral-900 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Your Message"
                    className="w-full bg-[#f6f6f7] border border-neutral-200/90 rounded-none px-4 py-3 text-xs sm:text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative w-full bg-[#0c0d10] hover:bg-[#ea580c] text-white rounded-none py-3.5 px-6 font-bold text-xs tracking-[0.16em] uppercase transition-colors duration-300 mt-2 flex items-center justify-center cursor-pointer select-none"
                >
                  <span className="relative z-10">
                    {submitted
                      ? "MESSAGE SENT ✓"
                      : submitting
                      ? "SENDING..."
                      : "YOUR MESSAGE"}
                  </span>
                </button>
                {errorMsg && (
                  <p className="text-red-600 text-[11px] text-center font-medium mt-2">
                    {errorMsg}
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* RIGHT: BRAND INSIGHTS + KINETIC HEADLINE + STATEMENT */}
          <div className="relative z-10 flex-1 max-w-[620px] text-left">
            {/* Pill Badge */}
            <motion.div variants={fadeUpVariants} className="mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-[4px] bg-[#eaeaea] border border-neutral-300/80 shadow-2xs select-none">
                <AsteriskIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff4b00] shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-neutral-800">
                  BRAND INSIGHTS
                </span>
              </div>
            </motion.div>

            {/* Giant Kinetic Headline: LET'S CREATE TOGETHER */}
            <div className="space-y-0 sm:space-y-1 mb-8 sm:mb-10">
              <div className="overflow-hidden">
                <motion.h2
                  variants={textRevealVariants}
                  className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[88px] leading-[0.92] text-white"
                >
                  LET&apos;S CREATE
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  variants={textRevealVariants}
                  className="font-black uppercase tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[88px] leading-[0.92] text-white"
                >
                  TOGETHER
                </motion.h2>
              </div>
            </div>

            {/* Bottom Statement: Sparkle + Results-Driven Solutions */}
            <motion.div variants={fadeUpVariants} className="space-y-2 max-w-[420px]">
              <div className="mb-2">
                <SparkleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff4b00]" />
              </div>
              <h4 className="font-bold uppercase tracking-tight text-sm sm:text-[15px] text-white">
                RESULTS-DRIVEN SOLUTIONS
              </h4>
              <p className="text-xs sm:text-[13px] md:text-[13.5px] text-neutral-300/90 leading-relaxed font-normal">
                Refining the design through feedback and testing to ensure the best user experience.
              </p>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
