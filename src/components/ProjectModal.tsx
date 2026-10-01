"use client";

import React from "react";
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
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0e0f14] border border-white/15 rounded-none p-6 sm:p-8 text-white shadow-2xl z-10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-none bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative w-full sm:w-48 aspect-square rounded-none overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 200px"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-orange-500/10 text-[#ea580c] border border-[#ea580c]/30 text-xs font-semibold">
              <AsteriskIcon className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{project.category}</span>
              <span className="font-mono text-neutral-400 text-[10px]">{project.role}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              {project.name}
            </h3>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              {project.description}
            </p>

            {/* Performance KPIs */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
              <div className="bg-white/5 p-2.5 rounded-none border border-white/5 text-center">
                <div className="text-base sm:text-lg font-bold text-white flex items-center justify-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> {project.speedScore}
                </div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider">PageSpeed</div>
              </div>
              <div className="bg-white/5 p-2.5 rounded-none border border-white/5 text-center">
                <div className="text-base sm:text-lg font-bold text-emerald-400 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> {project.conversionLift}
                </div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Conversion</div>
              </div>
              <div className="bg-white/5 p-2.5 rounded-none border border-white/5 text-center">
                <div className="text-base sm:text-lg font-bold text-white flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> {project.loadTime}
                </div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Load Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deliverables & Technology Tags */}
        <div className="mt-6 pt-5 border-t border-white/10 space-y-4">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-2">
              Key Engineering & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-none bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-end pt-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-orange-500/20"
            >
              <Globe className="w-4 h-4" />
              <span>Visit Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
