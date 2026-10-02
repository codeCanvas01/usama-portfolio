"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Mail, MessageSquare, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, type: "modal" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message.");

      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(null), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md transition-all animate-fadeIn"
    >
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Modal Card Container with overflow-hidden to cleanly clip decorative elements and eliminate x-overflow */}
      <div className="relative w-full max-w-lg max-h-[92dvh] flex flex-col bg-[#0e0f13] border border-white/15 rounded-2xl text-white shadow-2xl z-10 overflow-hidden">
        {/* Decorative corner glow - strictly clipped by outer overflow-hidden */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#e75325]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button - Stays securely anchored in top right */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content - vertical scroll only, x-scroll strictly hidden */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain custom-scrollbar p-5 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3.5 sm:gap-4 mb-6 pr-8 sm:pr-10">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-[#e75325] border border-white/15 shrink-0">
              <Image
                src="/images/usama-with-bg.jpg"
                alt="Usama"
                fill
                sizes="60px"
                className="object-cover object-[center_25%]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-1 max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">Available for Shopify Projects</span>
              </div>
              <h3 id="contact-modal-title" className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                Let's Build Something Huge
              </h3>
              <p className="text-xs text-neutral-400 truncate sm:whitespace-normal">
                Custom Shopify Stores • Liquid Themes • Migrations • CRO
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Message Received!</h4>
              <p className="text-sm text-neutral-400 max-w-xs mx-auto">
                Thanks for reaching out! I will review your requirements and respond within a few hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#e75325] text-white font-medium text-sm hover:bg-[#d6461a] transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">Your Name / Brand</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex (founder @ Fumi Case)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#e75325] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">Email Address</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@brand.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#e75325] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">Project Scope</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your Shopify store goals, redesign, or custom features..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#e75325] transition-colors resize-none"
                />
              </div>

              {errorMsg && (
                <p className="text-red-400 text-xs font-medium text-center">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#e75325] hover:bg-[#d6461a] active:scale-[0.99] text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-orange-950/40 cursor-pointer disabled:opacity-70"
              >
                <span>{submitting ? "Sending Message..." : "Send Message"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Contact Links */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-xs text-neutral-400">
                <a
                  href="mailto:cntctwithusama512@gmail.com"
                  className="hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Mail className="w-3.5 h-3.5 text-[#e75325]" />
                  Direct Email
                </a>
                <a
                  href="https://wa.me/923455152512?text=Hi%20Usama%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  WhatsApp
                </a>
                <a
                  href="https://wa.me/923455152512?text=Hi%20Usama%2C%20I%20would%20like%20to%20schedule%20a%20call%20about%20my%20Shopify%20store."
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  Schedule Call
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
