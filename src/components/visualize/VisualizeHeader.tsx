"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BarChart3, Database, Layers, Sparkles, Filter, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface VisualizeHeaderProps {
  activeModuleId: string;
  onSelectModule: (id: string) => void;
}

export const VISUALIZE_MODULES = [
  { id: "career-overview", label: "Career Overview" },
  { id: "signature-opponent-runs", label: "Opponent Evolution", highlight: true },
  { id: "bowler-dominance", label: "Runs vs Bowlers", highlight: true },
  { id: "annual-progression", label: "Annual Progression" },
  { id: "career-timeline", label: "Runs Timeline" },
  { id: "batting-position", label: "Batting Position" },
  { id: "scoring-boundaries", label: "Boundaries & Scoring" },
  { id: "highest-scores", label: "Highest Scores" },
  { id: "chasing-analysis", label: "Chasing vs Batting 1st" },
  { id: "finisher-zone", label: "The Finisher Zone" },
  { id: "match-results", label: "Match Outcomes" },
  { id: "wicketkeeping", label: "Wicketkeeping" },
  { id: "captaincy-analytics", label: "Captaincy" },
  { id: "venue-explorer", label: "Venue Explorer" },
  { id: "india-vs-csk", label: "India vs CSK" },
  { id: "career-heatmap", label: "Career Heatmap" },
  { id: "methodology", label: "Data Methodology" },
];

export const VisualizeHeader: React.FC<VisualizeHeaderProps> = ({
  activeModuleId,
  onSelectModule,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#07080c]/95 backdrop-blur-md border-b border-white/10 transition-all">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-slate-300 hover:text-csk-yellow hover:border-csk-gold/40 text-[11px] sm:text-xs font-mono transition-all group shrink-0"
            title="Return to Captain Cool: Decoded documentary"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform shrink-0" />
            <span className="sm:hidden">Home</span>
            <span className="hidden sm:inline">Main Journey</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-sky-500/60 shadow-[0_0_12px_rgba(14,165,233,0.3)] bg-black shrink-0">
              <Image
                src="/images/brand/dhoni_icon.jpg"
                alt="MS Dhoni 07"
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-sky-400 uppercase truncate">
                  VISUALIZE MAHI
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-300 border border-sky-500/20 shrink-0">
                  <ShieldCheck className="w-3 h-3 text-sky-400" />
                  VERIFIED DATA
                </span>
              </div>
              <h1 className="text-xs sm:text-base font-display text-white tracking-wide truncate">
                Interactive Cricket Analytics
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <a
            href="#signature-opponent-runs"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-600/20 to-blue-600/30 border border-sky-500/40 text-sky-300 hover:text-white hover:border-sky-400 text-[10px] sm:text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(14,165,233,0.2)]"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400 animate-pulse shrink-0" />
            <span className="hidden sm:inline">SIGNATURE ANIMATION</span>
            <span className="sm:hidden">RACE</span>
          </a>

          <a
            href="#methodology"
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-full border border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20 text-xs font-mono transition-colors"
            title="Inspect Data Sources & Methodology"
          >
            <Database className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="hidden md:inline">Methodology</span>
          </a>
        </div>
      </div>

      {/* Module Quick Nav Strip */}
      <div className="border-t border-white/5 bg-black/40 overflow-x-auto scrollbar-none py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-1.5 min-w-max">
          {VISUALIZE_MODULES.map((mod) => {
            const isActive = activeModuleId === mod.id;
            return (
              <a
                key={mod.id}
                href={`#${mod.id}`}
                onClick={() => onSelectModule(mod.id)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                  isActive
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-[0_0_10px_rgba(14,165,233,0.2)] font-semibold"
                    : mod.highlight
                    ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/15 border border-sky-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                )}
              >
                {mod.label}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};
