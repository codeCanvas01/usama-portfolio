"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Zap, CheckCircle2, TrendingUp, Clock, Globe } from "lucide-react";
import { AsteriskIcon } from "./ImpactSection";

export interface ProjectItem {
  id: string;
  name: string;
  url: string;
  role: string;
  category: string;
  image: string;
  description: string;
  speedScore: number;
  conversionLift: string;
  loadTime: string;
  tags: string[];
  featured?: boolean;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectItem | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
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

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[92dvh] sm:max-h-[88vh] flex flex-col bg-[#0e0f14] border border-white/15 rounded-xl sm:rounded-none text-white shadow-2xl z-10 overflow-hidden">
        {/* Close Button - Always pinned at top-right inside visible modal */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full sm:rounded-none bg-black/75 sm:bg-white/5 hover:bg-black/90 sm:hover:bg-white/15 text-neutral-300 hover:text-white border border-white/20 sm:border-white/10 backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar p-4 sm:p-8 space-y-5 sm:space-y-6">
          {/* Project Header (Image + Title + Meta) */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            <div className="relative w-full aspect-[16/10] sm:aspect-square sm:w-48 rounded-lg sm:rounded-none overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 200px"
              />
            </div>

            <div className="flex-1 space-y-2.5 sm:space-y-3 w-full pr-8 sm:pr-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-orange-500/10 text-[#ea580c] border border-[#ea580c]/30 text-xs font-semibold">
                <AsteriskIcon className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>{project.category}</span>
                <span className="font-mono text-neutral-400 text-[10px]">{project.role}</span>
              </div>

              <h3
                id="project-modal-title"
                className="text-xl sm:text-3xl font-black tracking-tight text-white uppercase"
              >
                {project.name}
              </h3>

              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Performance KPIs */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                <div className="bg-white/5 p-2 sm:p-2.5 rounded-none border border-white/5 text-center">
                  <div className="text-sm sm:text-lg font-bold text-white flex items-center justify-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> {project.speedScore}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider">PageSpeed</div>
                </div>
                <div className="bg-white/5 p-2 sm:p-2.5 rounded-none border border-white/5 text-center">
                  <div className="text-sm sm:text-lg font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> {project.conversionLift}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider">Conversion</div>
                </div>
                <div className="bg-white/5 p-2 sm:p-2.5 rounded-none border border-white/5 text-center">
                  <div className="text-sm sm:text-lg font-bold text-white flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" /> {project.loadTime}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wider">Load Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Deliverables & Technology Tags */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold">
              Key Engineering & Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-neutral-300 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Footer Bar - Guarantees action buttons are always accessible on mobile */}
        <div className="p-3 sm:p-5 bg-[#0e0f14]/95 backdrop-blur-md border-t border-white/10 shrink-0 flex items-center justify-between sm:justify-end gap-2.5">
          {/* Mobile Secondary Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="sm:hidden px-3.5 py-2.5 rounded-none border border-white/15 bg-white/5 text-neutral-300 hover:text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer active:scale-95"
          >
            Close
          </button>

          {/* Visit Live Website Button */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-none bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>Visit Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
