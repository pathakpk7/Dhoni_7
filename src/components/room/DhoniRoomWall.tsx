"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, Maximize2 } from "lucide-react";
import { StPageFlipBook } from "@/components/storybook/StPageFlipBook";

interface DhoniRoomWallProps {
  className?: string;
  onDirectOpenBook?: (bookId?: string) => void;
}

export const DhoniRoomWall: React.FC<DhoniRoomWallProps> = ({
  className = "",
}) => {
  return (
    <section
      id="dhoni-room-wall"
      className={`relative w-full py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}
    >
      {/* Museum Ambient Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0805] via-[#120d08] to-[#070503] rounded-3xl pointer-events-none -z-10 shadow-[0_20px_80px_rgba(0,0,0,0.9)] border border-[#b89758]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.12)_0%,transparent_60%)] pointer-events-none -z-10" />

      {/* Header & Title Plaque */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b89758]/15 border border-[#b89758]/40 text-[#ffd700] text-xs font-mono tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#ffd700] animate-pulse" />
          <span>THE QUADRILOGY · 4 BIOGRAPHICAL VOLUMES</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#fff3cb] via-[#e5c378] to-[#996e23] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          CAPTAIN COOL DECODED
        </h1>
        <p className="mt-3 text-sm sm:text-base font-serif italic text-stone-300/90 max-w-2xl mx-auto">
          &ldquo;Beyond the numbers. Beyond the trophies. The definitive biographical chronicles of Mahendra Singh Dhoni across four eras.&rdquo;
          <span className="block mt-1 font-mono text-xs text-[#ffd700] not-italic">
            Select any of the 4 volumes below, drag page edges to flip, or use the navigation arrows.
          </span>
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <Link
            href="/story"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#b89758] to-[#ffd700] text-black font-mono text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>FULL SCREEN READING MODE →</span>
          </Link>
        </div>
      </div>

      {/* Real Interactive 3D StPageFlip Physical Book Container */}
      <div className="relative w-full rounded-3xl bg-[#0e0a07] border-2 border-[#b89758]/50 shadow-[0_30px_90px_rgba(0,0,0,0.98),0_0_60px_rgba(212,175,55,0.2)] p-2 sm:p-6 lg:p-8 overflow-visible my-6">
        <StPageFlipBook />
      </div>
    </section>
  );
};
