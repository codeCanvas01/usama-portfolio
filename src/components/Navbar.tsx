"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ArrowUpRight, Mail } from "lucide-react";

interface NavbarProps {
  onOpenContact?: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Header: Black bar on mobile, transparent grid-aligned on desktop */}
      <header className="relative z-30 w-full bg-[#0c0d10] md:bg-transparent h-[60px] md:h-[75px] max-w-[1600px] mx-auto px-6 md:px-12 flex items-center">
        {/* Mobile View: Left-aligned minimalist two-line hamburger matching screenshot */}
        <div className="flex md:hidden w-full items-center justify-start">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="group flex flex-col items-start justify-center gap-1.5 py-2 cursor-pointer transition-transform hover:scale-105 select-none"
          >
            <span className="w-9 h-[2.5px] bg-white rounded-none block transition-all" />
            <span className="w-9 h-[2.5px] bg-white rounded-none block transition-all" />
          </button>
        </div>

        {/* Desktop & Tablet Navigation */}
        <nav className="hidden md:grid w-full grid-cols-4 items-center">
          {/* Column 1: Home */}
          <div className="flex items-center">
            <Link
              href="#home"
              className="text-white text-[15px] font-semibold tracking-tight hover:opacity-80 transition-opacity pl-2 sm:pl-3"
            >
              Home
            </Link>
          </div>

          {/* Column 2: About */}
          <div className="flex items-center">
            <Link
              href="#about"
              className="text-white/95 text-[15px] font-semibold tracking-tight hover:opacity-80 transition-opacity pl-2 sm:pl-3"
            >
              About
            </Link>
          </div>

          {/* Column 3: Service */}
          <div className="flex items-center">
            <Link
              href="#services"
              className="text-white/95 text-[15px] font-semibold tracking-tight hover:opacity-80 transition-opacity pl-2 sm:pl-3"
            >
              Service
            </Link>
          </div>

          {/* Column 4: Contact & Hamburger */}
          <div className="flex items-center justify-between pl-2 sm:pl-3">
            <button
              onClick={onOpenContact}
              className="text-white/95 text-[15px] font-semibold tracking-tight hover:opacity-80 transition-opacity cursor-pointer text-left"
            >
              Contact
            </button>

            {/* Two-Line Minimalist Hamburger Icon from Reference */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="ml-auto group flex flex-col items-end justify-center gap-1.5 w-10 h-10 p-2 cursor-pointer transition-transform hover:scale-105"
            >
              <span className="w-8 h-[2.5px] bg-white transition-all group-hover:w-9 rounded-none" />
              <span className="w-8 h-[2.5px] bg-white transition-all group-hover:w-6 rounded-none" />
            </button>
          </div>
        </nav>
      </header>

      {/* Slide-out Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="absolute inset-0"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-full max-w-md h-full bg-[#0c0d10] border-l border-white/10 p-8 sm:p-12 flex flex-col justify-between z-10 animate-slideLeft text-white">
            {/* Top close bar */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-6 my-auto">
              {[
                { number: "01", label: "Home", href: "#home" },
                { number: "02", label: "About Usama", href: "#about" },
                { number: "03", label: "Shopify Services", href: "#services" },
                { number: "04", label: "Client Case Studies", href: "#work" },
                { number: "05", label: "Shopify Solutions & FAQ", href: "#solutions" },
                { number: "06", label: "Get In Touch", href: "#contact", action: onOpenContact },
              ].map((item) => (
                <div key={item.label} className="group">
                  {item.action ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        item.action?.();
                      }}
                      className="w-full flex items-center justify-between text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-orange-400 transition-colors text-left"
                    >
                      <span className="flex items-center gap-4">
                        <span className="font-mono text-xs text-neutral-500 font-normal">{item.number}</span>
                        {item.label}
                      </span>
                      <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-between text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-orange-400 transition-colors"
                    >
                      <span className="flex items-center gap-4">
                        <span className="font-mono text-xs text-neutral-500 font-normal">{item.number}</span>
                        {item.label}
                      </span>
                      <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Available for freelance contracts</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Q3/Q4 2026
                </span>
              </div>
              <div className="flex items-center gap-4 text-neutral-400">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="X (Twitter)">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="mailto:cntctwithusama512@gmail.com" className="hover:text-white transition-colors" aria-label="Email"><Mail className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
