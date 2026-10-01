"use client";

import React, { useRef, useState, useEffect } from "react";

interface NeonBorderBeamProps {
  duration?: number; // Duration of 1 complete loop around the card edges (in seconds)
  borderWidth?: number; // Beam stroke width in pixels
  className?: string;
  beamPercentage?: number; // Fraction of perimeter covered by the beam (e.g. 0.25 = 25%)
}

/**
 * NeonBorderBeam:
 * High-performance moving neon reddish border beam that travels along the edges of cards on hover.
 * Includes a vivid neon bloom and ambient reddish glow.
 */
export default function NeonBorderBeam({
  duration = 3.5,
  borderWidth = 2,
  className = "",
  beamPercentage = 0.25,
}: NeonBorderBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const updateSize = () => {
      if (el) {
        setDim({
          width: el.offsetWidth,
          height: el.offsetHeight,
        });
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const { width, height } = dim;
  const perimeter = (width + height) * 2;
  const dashLength = Math.max(70, Math.min(220, perimeter * beamPercentage));
  const gapLength = Math.max(0, perimeter - dashLength);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none rounded-[inherit] overflow-visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 ${className}`}
    >
      {/* 1. Neon Reddish Ambient Surface & Border Glow */}
      <div className="absolute inset-0 rounded-[inherit] border border-[#ff3700]/35 shadow-[0_0_24px_rgba(255,45,0,0.22),inset_0_0_16px_rgba(255,45,0,0.08)] pointer-events-none" />

      {/* 2. Moving Laser Line along the Card Edges */}
      {width > 0 && height > 0 && (
        <svg
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          style={{ width, height }}
        >
          <defs>
            {/* Hot Neon Reddish Gradient with White Tip */}
            <linearGradient id="neonReddishBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="25%" stopColor="#ff3300" stopOpacity="1" />
              <stop offset="65%" stopColor="#e11d48" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ff3300" stopOpacity="0" />
            </linearGradient>

            {/* Neon Bloom Glow Filter */}
            <filter id="neonRedBloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Exact rectangular path traced along the edges */}
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={Math.max(0, width - borderWidth)}
            height={Math.max(0, height - borderWidth)}
            fill="none"
            stroke="url(#neonReddishBeam)"
            strokeWidth={borderWidth}
            strokeDasharray={`${dashLength} ${gapLength}`}
            strokeLinecap="round"
            filter="url(#neonRedBloom)"
            style={{
              ["--perimeter" as string]: `${perimeter}px`,
              animation: `neonBorderCycle ${duration}s linear infinite`,
            }}
          />
        </svg>
      )}
    </div>
  );
}
