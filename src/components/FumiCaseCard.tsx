"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

interface FumiCaseCardProps {
  onOpenProject?: () => void;
}

export default function FumiCaseCard({ onOpenProject }: FumiCaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onOpenProject}
      data-card-hover="true"
      className="fumi-card group relative cursor-pointer select-none transition-all duration-300 ease-out"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="w-[145px] sm:w-[165px] md:w-[175px] bg-white rounded-none p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-transform duration-200 ease-out border border-white/20"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.05 : 1})`,
        }}
      >
        {/* Product Image Frame */}
        <div className="relative aspect-square w-full rounded-none overflow-hidden bg-neutral-900 shadow-inner">
          <Image
            src="/images/fumi-case-cases.png"
            alt="Fumi Case Shopify Project"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 160px, 180px"
          />
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none" />
        </div>

        {/* Footer info row */}
        <div className="mt-2.5 flex items-center justify-between px-0.5 text-[11px] font-medium tracking-tight text-neutral-800">
          <div className="flex items-center gap-1.5">
            <span className="text-[#e25822] text-xs animate-spin-slow">✳</span>
            <span className="font-semibold text-neutral-900 tracking-tight">FUMI CASE</span>
          </div>
          <span className="text-neutral-500 font-mono text-[10px]">/Dev</span>
        </div>
      </div>
    </div>
  );
}
