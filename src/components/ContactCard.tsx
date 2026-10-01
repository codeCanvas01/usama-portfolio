"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ContactCardProps {
  onOpenContact?: () => void;
}

export default function ContactCard({ onOpenContact }: ContactCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onOpenContact}
      data-card-hover="true"
      className="contact-card group cursor-pointer select-none transition-transform duration-300 ease-out"
      style={{
        transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0px) scale(${isHovered ? 1.02 : 1})`,
      }}
    >
      <div className="relative flex items-center gap-3.5 bg-[#0d0e12]/95 backdrop-blur-md text-white border border-white/10 rounded-none p-2.5 sm:p-3 pr-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-300 min-w-[240px] sm:min-w-[270px]">
        {/* Subtle hover gradient glow */}
        <div className="absolute inset-0 rounded-none bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Avatar with orange background provided by user */}
        <div className="relative w-12 h-14 sm:w-13 sm:h-15 rounded-none overflow-hidden shrink-0 bg-[#e75325] border border-white/10">
          <Image
            src="/images/usama-with-bg.jpg"
            alt="Usama - Shopify Developer"
            fill
            sizes="60px"
            className="object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] text-neutral-400 font-medium tracking-wide">Let's Talk</span>
            <span className="text-neutral-400 text-xs inline-block animate-[spin_8s_linear_infinite]">✳</span>
          </div>
          <div className="mt-0.5">
            <h4 className="text-sm font-bold text-white tracking-tight leading-tight group-hover:text-orange-400 transition-colors">
              Usama
            </h4>
            <p className="text-[11px] text-neutral-400 font-normal tracking-tight truncate mt-0.5">
              Shopify Expert Developer
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-none bg-white flex items-center justify-center text-black shrink-0 transition-all duration-300 group-hover:bg-[#e75325] group-hover:text-white shadow-sm">
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
}
