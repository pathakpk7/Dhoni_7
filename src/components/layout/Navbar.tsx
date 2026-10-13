"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Menu, Trophy, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StoryChapter } from "@/config/storySpine";

interface NavbarProps {
  onTriggerNo7: () => void;
  onTrigger3DHelicopter: () => void;
  onTriggerBadge?: () => void;
  onOpenAskMahi?: () => void;
  unlockedAchievementsCount: number;
  activeChapter: StoryChapter;
  onToggleSidebar: () => void;
  scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onTriggerNo7,
  onTrigger3DHelicopter,
  onTriggerBadge,
  onOpenAskMahi,
  unlockedAchievementsCount,
  activeChapter,
  onToggleSidebar,
  scrolled,
}) => {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background,border] duration-300",
        scrolled
          ? "bg-[#0a0b0f]/95 border-b border-white/10 py-1.5 sm:py-2 backdrop-blur-md"
          : "bg-gradient-to-b from-black/95 via-black/70 to-transparent py-2 sm:py-2.5"
      )}
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-5 flex flex-col gap-1.5">
        {/* Primary Row */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-3">
          {/* Left: Menu + Brand + Visualize Mahi */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 shrink-0">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="p-1.5 sm:p-2 rounded-lg border border-white/10 text-slate-300 hover:text-csk-yellow hover:border-csk-gold/40 shrink-0 cursor-pointer"
              aria-label="Open chapters sidebar"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <a href="#hero" className="flex items-center gap-2 shrink-0 min-w-0 group cursor-pointer">
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-csk-gold/60 group-hover:border-csk-gold transition-all shadow-glow-gold bg-black shrink-0">
                <Image
                  src="/images/brand/dhoni_icon.jpg"
                  alt="MS Dhoni Captain Cool 07 Icon"
                  fill
                  sizes="32px"
                  className="object-cover"
                  priority
                />
              </div>
              <span className="hidden lg:inline font-display text-sm text-white group-hover:text-csk-yellow transition-colors truncate">
                Captain Cool
              </span>
            </a>

            <a
              href="/visualize-mahi/story"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#b89758]/50 bg-[#b89758]/15 hover:bg-[#b89758]/25 hover:border-[#d4af37] text-[#f6f2e8] hover:text-white font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all shrink-0 cursor-pointer shadow-[0_0_15px_rgba(184,151,88,0.25)]"
              title="Visualize Mahi: The Story of MS Dhoni (Interactive Digital Storybook)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse shrink-0" />
              <span>VISUALIZE MAHI</span>
            </a>

            <a
              href="/visualize"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 sm:py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all shrink-0 cursor-pointer"
              title="Cricket Analytics & Telemetry"
            >
              <span>STATS</span>
            </a>
          </div>

          {/* Center: Active Chapter Pill (Desktop/Tablet) */}
          <a
            href={`#${activeChapter.id}`}
            className="hidden md:flex flex-1 min-w-0 justify-center lg:justify-start lg:pl-2 cursor-pointer"
            title={activeChapter.tagline}
          >
            <span className="inline-flex items-center gap-2 max-w-full px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-csk-gold/30 transition-colors">
              <span className="text-[10px] font-mono text-slate-500 shrink-0">{activeChapter.index}</span>
              <span className="text-xs font-mono uppercase tracking-wide text-slate-200 truncate">
                {activeChapter.title}
              </span>
            </span>
          </a>

          {/* Right: Action Pills */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {onOpenAskMahi && (
              <button
                onClick={onOpenAskMahi}
                title="Ask Mahi · Verified Career Data Assistant"
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/15 text-slate-300 hover:text-csk-yellow hover:border-csk-gold/40 transition-all text-xs font-mono cursor-pointer"
              >
                <Database className="w-3.5 h-3.5 text-csk-gold" />
                <span>Ask Mahi</span>
              </button>
            )}

            <button
              onClick={onTrigger3DHelicopter}
              title="3D Helicopter Shot · Signature Weapon"
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-csk-gold/25 to-csk-yellow/20 border border-csk-gold/50 text-csk-yellow hover:border-csk-gold hover:bg-csk-gold/30 hover:scale-105 active:scale-95 transition-all text-[10px] sm:text-xs font-mono font-bold shadow-glow-gold cursor-pointer"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-csk-yellow animate-pulse shrink-0" />
              <span className="hidden lg:inline">3D HELICOPTER SHOT</span>
              <span className="lg:hidden">3D</span>
            </button>

            <button
              onClick={onTriggerNo7}
              title="Surprise MS Dhoni Stats"
              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-csk-gold/10 border border-csk-gold/40 text-csk-yellow text-[10px] font-mono font-bold hover:bg-csk-gold/20 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>No.7</span>
            </button>

            <button
              onClick={onTriggerBadge}
              title={
                unlockedAchievementsCount === 7
                  ? "All 7 Chapter Badges Unlocked! View 7 Stage Badges"
                  : `View 7 Stage Badges (${unlockedAchievementsCount}/7 Unlocked)`
              }
              className={cn(
                "flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-colors text-[10px] font-mono font-bold cursor-pointer",
                unlockedAchievementsCount === 7
                  ? "bg-csk-gold/20 border-csk-yellow text-csk-yellow shadow-glow-gold"
                  : "bg-black/40 border-white/10 text-slate-300 hover:border-csk-gold/40 hover:text-white"
              )}
            >
              <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>{unlockedAchievementsCount}/7</span>
              <span className="hidden sm:inline">Badges</span>
            </button>
          </div>
        </div>

        {/* Secondary Mobile Row: Active Chapter Pill + Ask Mahi (< md screens) */}
        <div className="flex md:hidden items-center justify-between gap-2 pt-0.5">
          <a
            href={`#${activeChapter.id}`}
            className="flex-1 min-w-0 cursor-pointer"
            title={activeChapter.tagline}
          >
            <span className="flex items-center gap-1.5 w-full px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] hover:border-csk-gold/30 transition-colors">
              <span className="text-[10px] font-mono text-csk-gold font-bold shrink-0">
                {activeChapter.index}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-200 truncate">
                {activeChapter.title}
              </span>
            </span>
          </a>

          {onOpenAskMahi && (
            <button
              onClick={onOpenAskMahi}
              title="Ask Mahi · Verified Career Data Assistant"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/15 text-slate-300 hover:text-csk-yellow text-[10px] font-mono shrink-0 cursor-pointer"
            >
              <Database className="w-3 h-3 text-csk-gold shrink-0" />
              <span>Ask Mahi</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
