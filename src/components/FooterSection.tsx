"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "newsletter" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to subscribe.");

      setSubmitted(true);
      setStatusMessage("Thank you for subscribing!");
      setTimeout(() => {
        setSubmitted(false);
        setStatusMessage(null);
        setEmail("");
      }, 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setStatusMessage(msg);
      setTimeout(() => setStatusMessage(null), 4000);
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

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
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
    <footer
      id="footer"
      className="relative w-full bg-[#f8f8f9] text-[#0f1013] overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 border-t border-neutral-200/60 selection:bg-neutral-900 selection:text-white"
    >
      <div className="relative w-full max-w-[1440px] xl:max-w-[1520px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
        >
          {/* TOP ROW: Manifesto & Contact Info (Left) + Newsletter Card (Right) */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
            
            {/* LEFT: Manifesto & Direct Contacts */}
            <motion.div variants={fadeUpVariants} className="max-w-[620px] xl:max-w-[680px]">
              {/* Bio / Manifesto */}
              <p className="text-xl sm:text-2xl md:text-[27px] lg:text-[29px] text-[#484a50] font-normal leading-[1.38] tracking-tight">
                Focused on crafting clean and intuitive experiences that blend creativity, usability, and functionality to{" "}
                <strong className="font-bold text-neutral-950">help brands connect</strong> better their users.
              </p>

              {/* Direct Contacts */}
              <div className="mt-8 sm:mt-12 md:mt-14 space-y-1 sm:space-y-1.5">
                <div className="text-[13px] sm:text-sm text-neutral-500 font-medium">
                  <a
                    href="https://wa.me/923455152512?text=Hi%20Usama%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Click to chat on WhatsApp (+92 345 5152512)"
                    className="hover:text-neutral-900 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span>+92 345 5152512</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider bg-emerald-100/70 px-1.5 py-0.5 rounded-none group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      WhatsApp
                    </span>
                  </a>
                </div>
                <div className="text-xl sm:text-2xl md:text-[23px] font-bold text-neutral-950 tracking-tight">
                  <a
                    href="mailto:cntctwithusama512@gmail.com"
                    className="hover:text-[#ea580c] transition-colors"
                  >
                    cntctwithusama512@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Newsletter Card */}
            <motion.div
              variants={fadeUpVariants}
              className="w-full sm:w-[380px] md:w-[410px] shrink-0"
            >
              <div className="bg-white border border-neutral-200/70 p-6 sm:p-7 md:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
                <h3 className="text-lg sm:text-[19px] font-bold text-neutral-950 tracking-tight mb-4">
                  Newsletter
                </h3>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3.5">
                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      className="w-full bg-[#f4f4f5] border border-neutral-200/50 focus:border-neutral-950 focus:bg-white text-xs sm:text-[13.5px] text-neutral-900 placeholder:text-neutral-400 px-4 py-3.5 rounded-none outline-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#0c0d10] hover:bg-neutral-800 active:scale-[0.99] text-white py-3.5 px-6 font-bold text-xs tracking-[0.16em] uppercase rounded-none transition-all duration-200 cursor-pointer select-none flex items-center justify-center"
                  >
                    <span className="relative z-10">
                      {submitted ? "THANK YOU ✓" : submitting ? "SENDING..." : "YOUR MESSAGE"}
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>

          </div>

          {/* BOTTOM ROW: Navigation Columns (Left) + Giant USAMA® (Right) */}
          <div className="mt-20 sm:mt-28 md:mt-32 lg:mt-36 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-8">
            
            {/* Left: Navigation links matching header */}
            <motion.div
              variants={fadeUpVariants}
              className="shrink-0 pb-1"
            >
              <span className="block text-xs sm:text-[13px] text-neutral-400 font-medium mb-4 sm:mb-5">
                Navigation
              </span>
              <ul className="space-y-2.5 sm:space-y-3">
                {[
                  { label: "Home", href: "#home" },
                  { label: "About", href: "#about" },
                  { label: "Service", href: "#services" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-[15px] font-semibold text-neutral-900 hover:text-[#ea580c] hover:translate-x-0.5 inline-block transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Giant USAMA® Brand Wordmark */}
            <motion.div
              variants={fadeUpVariants}
              className="w-full lg:w-auto flex justify-start lg:justify-end select-none overflow-hidden"
            >
              <div className="inline-flex items-start">
                <span className="font-black text-black uppercase tracking-[-0.04em] leading-none text-[21vw] sm:text-[17vw] md:text-[15vw] lg:text-[138px] xl:text-[175px] 2xl:text-[200px]">
                  USAMA
                </span>
                <span className="text-[2.6vw] sm:text-[2.2vw] md:text-[1.8vw] lg:text-[20px] xl:text-[24px] 2xl:text-[28px] font-bold text-black ml-1 sm:ml-1.5 -mt-0.5 sm:-mt-1 select-none leading-none">
                  ®
                </span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </footer>
  );
}
