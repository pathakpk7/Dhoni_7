"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Sparkles } from "lucide-react";
import type { CollectorBook } from "@/data/booksVault";

interface LandscapeHardcoverProps {
  book: CollectorBook;
  onOpen: () => void;
  className?: string;
  isInteractive?: boolean;
}

export const LandscapeHardcover: React.FC<LandscapeHardcoverProps> = ({
  book,
  onOpen,
  className = "",
  isInteractive = true,
}) => {
  return (
    <div
      onClick={isInteractive ? onOpen : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
      className={`group relative select-none text-left transition-all duration-500 ${
        isInteractive
          ? "cursor-pointer hover:-translate-y-2 hover:scale-[1.01]"
          : ""
      } ${className}`}
      style={{ perspective: "1400px" }}
    >
      {/* 3D Physical Book Container - Landscape Format (Aspect 16:10) */}
      <div className="relative w-full aspect-[16/10] min-h-[300px] sm:min-h-[380px] md:min-h-[440px] rounded-r-2xl rounded-l-md overflow-hidden bg-[#18120b] border-2 border-[#b89758]/80 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),0_0_45px_rgba(184,151,88,0.22)] group-hover:border-[#e5c378] group-hover:shadow-[0_35px_80px_rgba(0,0,0,0.98),0_0_60px_rgba(212,175,55,0.45)] transition-all duration-500">
        
        {/* Real Hardbound Leather Grain & Vintage Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.12)_0%,transparent_60%)] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none z-10" />
        
        {/* Left Book Spine Simulation (Deep embossed leather crease with gold foil rules) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 z-30 pointer-events-none bg-gradient-to-r from-[#0d0905] via-[#24170d] to-[#120b06] border-r border-[#b89758]/50 shadow-[inset_-3px_0_10px_rgba(0,0,0,0.9)] flex flex-col justify-between py-6 items-center">
          <div className="w-5 h-0.5 bg-[#b89758]/60 rounded-full" />
          <div className="w-5 h-0.5 bg-[#b89758]/60 rounded-full" />
          <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase text-[#d6c7a1]/80 font-bold">
            {book.shortTitle}
          </span>
          <div className="w-5 h-0.5 bg-[#b89758]/60 rounded-full" />
          <div className="w-5 h-0.5 bg-[#b89758]/60 rounded-full" />
        </div>

        {/* Embossed Stitched Seam Border (Gilded hot-foil stamped look) */}
        <div className="absolute inset-3 sm:inset-4 left-10 sm:left-12 border-2 border-[#b89758]/60 rounded-r-xl rounded-l-sm pointer-events-none z-20 shadow-[inset_0_0_12px_rgba(0,0,0,0.6)]" />
        <div className="absolute inset-4 sm:inset-5 left-11 sm:left-14 border border-dashed border-[#b89758]/35 rounded-r-lg pointer-events-none z-20" />

        {/* Brass Corner Protectors (Top-Right and Bottom-Right) */}
        <div className="absolute top-3 right-3 w-7 h-7 pointer-events-none z-30 border-t-2 border-r-2 border-[#ffd700] rounded-tr-md shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
        <div className="absolute bottom-3 right-3 w-7 h-7 pointer-events-none z-30 border-b-2 border-r-2 border-[#ffd700] rounded-br-md shadow-[0_0_8px_rgba(255,215,0,0.5)]" />

        {/* Main Landscape Cover Layout: Balanced Left Imagery & Right Printed Foil Typography */}
        <div className="relative w-full h-full pl-9 sm:pl-12 grid grid-cols-1 md:grid-cols-12 z-10 overflow-hidden">
          
          {/* Left Column (5 of 12 cols): Complete Unclipped Archival Cameo */}
          <div className="md:col-span-5 relative h-44 md:h-full p-4 sm:p-5 flex items-center justify-center">
            {/* Gilded Cameo Frame */}
            <div className="relative w-full h-full max-h-[340px] rounded-lg overflow-hidden border-2 border-[#b89758]/70 shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-black/80">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain p-1.5 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
              {/* Subtle inner gold frame */}
              <div className="absolute inset-1.5 border border-[#b89758]/30 rounded pointer-events-none" />
            </div>
          </div>

          {/* Right Column (7 of 12 cols): Genuine Hot-Foil Printed Typography (NO BLACK OVERLAY BOX) */}
          <div className="md:col-span-7 flex flex-col justify-between p-4 sm:p-6 sm:pr-8 md:py-8 text-left">
            {/* Top Foil Stamp: Archival Provenance */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#d4af37] text-xs">✦</span>
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#e5c378] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  PROJECT 7 · OFFICIAL ARCHIVAL CHRONICLES
                </span>
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#b89758]/15 border border-[#b89758]/40 text-[#f3e3a9] text-[10px] font-mono tracking-wider uppercase mb-3">
                VOLUME {book.romanNumeral} · {book.era}
              </div>

              {/* Main Book Title - Stamped in Golden Leaf onto the cover */}
              <h2 className="font-serif font-black tracking-tight leading-tight text-xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff2c2] via-[#e2b755] to-[#a37722] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {book.title}
              </h2>

              {/* Subtitle / Timeline Span */}
              <p className="mt-1.5 font-serif text-xs sm:text-sm tracking-wide text-[#e6cb85] font-semibold uppercase">
                {book.subtitle}
              </p>

              {/* Tagline / Inscription (Printed directly on cover) */}
              <p className="mt-3 text-xs sm:text-sm font-serif italic text-stone-300/90 leading-relaxed max-w-md">
                {book.tagline}
              </p>
            </div>

            {/* Bottom Meta & Interactive Clasp: Click to Open Book */}
            <div className="pt-3 sm:pt-4 border-t border-[#b89758]/30 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[10px] sm:text-[11px] font-mono text-stone-400">
                <span className="text-[#d4af37] font-bold">{book.stories.length}</span> VERIFIED MOMENTS · {book.timelineSpan}
              </div>

              {/* Gold Foil Clasp / Button */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#b89758] via-[#e5c378] to-[#b89758] text-[#140f0a] font-serif font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-105 active:scale-95 transition-all">
                <BookOpen className="w-3.5 h-3.5 fill-current" />
                <span>CLICK TO OPEN BOOK</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Page Gilded Edges (Simulated stacked gold pages on right and bottom) */}
        <div className="absolute right-0 top-2 bottom-2 w-2.5 bg-gradient-to-r from-[#80693a] via-[#e5c378] to-[#997933] shadow-lg border-l border-black/40" />
        <div className="absolute left-8 right-2 bottom-0 h-2 bg-gradient-to-b from-[#80693a] via-[#e5c378] to-[#997933] shadow-md border-t border-black/40" />
      </div>

      {/* Under-book Depth Shadow */}
      <div className="w-[96%] mx-auto h-4 bg-black/80 blur-md rounded-full -mt-2 pointer-events-none" />
    </div>
  );
};
