"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Trophy,
  BookOpen,
  Shirt,
  Sparkles,
  Maximize2,
  Award,
  ChevronRight,
  Shield,
  RotateCw,
} from "lucide-react";
import { COLLECTOR_BOOKS, type CollectorBook } from "@/data/booksVault";
import { TROPHIES_VAULT } from "@/data/trophiesVault";
import { JERSEYS_VAULT } from "@/data/jerseysVault";
import { LandscapeHardcover } from "./LandscapeHardcover";
import { LandscapeBookReader } from "./LandscapeBookReader";
import { BatInspectModal } from "./BatInspectModal";
import { TrophyCabinetModal } from "./TrophyCabinetModal";
import { JerseyCabinetModal } from "./JerseyCabinetModal";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface DhoniRoomWallProps {
  onDirectOpenBook?: (bookId: string) => void;
  className?: string;
}

export const DhoniRoomWall: React.FC<DhoniRoomWallProps> = ({
  onDirectOpenBook,
  className = "",
}) => {
  // Modal states
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isBatModalOpen, setIsBatModalOpen] = useState<boolean>(false);
  const [isTrophyModalOpen, setIsTrophyModalOpen] = useState<boolean>(false);
  const [isJerseyModalOpen, setIsJerseyModalOpen] = useState<boolean>(false);
  const [activeBookVolume, setActiveBookVolume] = useState<number>(1);

  const handleOpenBook = (bookId: string) => {
    storyAudio.playBookThudSound();
    if (onDirectOpenBook) {
      onDirectOpenBook(bookId);
    } else {
      setSelectedBookId(bookId);
    }
  };

  const currentFeaturedBook =
    COLLECTOR_BOOKS.find((b) => b.volumeNumber === activeBookVolume) ||
    COLLECTOR_BOOKS[0];

  return (
    <section
      id="dhoni-room-wall"
      className={`relative w-full py-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}
    >
      {/* Museum Ambient Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0805] via-[#120d08] to-[#070503] rounded-3xl pointer-events-none -z-10 shadow-[0_20px_80px_rgba(0,0,0,0.9)] border border-[#b89758]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.12)_0%,transparent_60%)] pointer-events-none -z-10" />

      {/* Museum Gallery Title & Plaque */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b89758]/15 border border-[#b89758]/40 text-[#ffd700] text-xs font-mono tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#ffd700] animate-pulse" />
          <span>THE SANCTUM OF NUMBER 7 · OFFICIAL ARCHIVES</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#fff3cb] via-[#e5c378] to-[#996e23] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          MS DHONI&apos;S PRIVATE VAULT
        </h1>
        <p className="mt-3 text-sm sm:text-base font-serif italic text-stone-300/90 max-w-2xl mx-auto">
          &ldquo;Every bat has an echo, every trophy a heartbeat, and every jersey a million roars.
          Step inside the wall of motifs that defined Indian cricket.&rdquo;
        </p>

        {/* Quick Clickable Motifs Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
          <button
            onClick={() => handleOpenBook(currentFeaturedBook.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>4 COLLECTOR BOOKS</span>
          </button>

          <button
            onClick={() => {
              storyAudio.playBatImpactSound();
              setIsBatModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-300 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AUTOGRAPHED REEBOK BAT</span>
          </button>

          <button
            onClick={() => {
              storyAudio.playBookThudSound();
              setIsTrophyModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>TROPHY CABINET (DUAL PLANKS)</span>
          </button>

          <button
            onClick={() => {
              storyAudio.playTrophyChime();
              setIsJerseyModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>JERSEY WARDROBE (2004–2026)</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          MOTIF 1: THE 4 HARDCOVER COLLECTOR BOOKS (LANDSCAPE ORIENTATION)
         ========================================================================= */}
      <div className="my-12 sm:my-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-3 border-b border-[#b89758]/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#e5c378]">
                MOTIF I · THE QUADRILOGY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mt-1">
              THE 4 COLLECTOR BOOKS
            </h2>
            <p className="text-xs sm:text-sm font-serif text-stone-400 mt-0.5">
              Click any volume below to immediately open and read in full landscape format.
            </p>
          </div>

          {/* Volume Tabs (Book 1, 2, 3, 4) */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 shrink-0">
            {COLLECTOR_BOOKS.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  storyAudio.playTrophyChime();
                  setActiveBookVolume(b.volumeNumber);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeBookVolume === b.volumeNumber
                    ? "bg-[#b89758] text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                VOL {b.romanNumeral}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Landscape Hardcover Display with Single-Click Open */}
        <div className="max-w-4xl mx-auto">
          <LandscapeHardcover
            book={currentFeaturedBook}
            onOpen={() => handleOpenBook(currentFeaturedBook.id)}
          />
        </div>

        {/* 4 Books Shelf Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {COLLECTOR_BOOKS.map((book) => {
            const isSelected = book.volumeNumber === activeBookVolume;
            return (
              <div
                key={book.id}
                onClick={() => handleOpenBook(book.id)}
                className={`group p-3.5 rounded-2xl transition-all duration-300 cursor-pointer text-left border ${
                  isSelected
                    ? "bg-[#b89758]/15 border-[#ffd700] shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-[1.02]"
                    : "bg-white/[0.02] border-white/10 hover:border-[#b89758]/50 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="px-1.5 py-0.5 rounded bg-black/60 text-[#ffd700] font-bold border border-white/10">
                    VOL {book.romanNumeral}
                  </span>
                  <span className="text-stone-400">{book.era}</span>
                </div>
                <h4 className="font-serif font-black text-sm text-white group-hover:text-[#ffd700] transition-colors line-clamp-1">
                  {book.title}
                </h4>
                <p className="text-[11px] font-serif text-stone-400 line-clamp-2 mt-1">
                  {book.subtitle}
                </p>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#d4af37]">
                  <span>{book.stories.length} MOMENTS</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    READ →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MOTIF 2 & 3: WALL MOUNTED BAT & DUAL-PLANK TROPHY CABINET
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-16">
        
        {/* LEFT (4 of 12 cols): THE AUTOGRAPHED REEBOK CRICKET BAT */}
        <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-3xl bg-[#140e09] border-2 border-[#b89758]/40 shadow-2xl relative overflow-hidden text-left">
          {/* Spotlight Cone */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/15 blur-3xl pointer-events-none rounded-full" />
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-orange-400">
                MOTIF II · WALL BRACKET MOUNT
              </span>
              <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px] font-mono font-bold">
                CLICK TO INSPECT
              </span>
            </div>

            <h3 className="font-serif font-black text-xl sm:text-2xl text-white">
              AUTOGRAPHED REEBOK WILLOW
            </h3>
            <p className="text-xs font-serif italic text-stone-300 mt-1">
              Signed by MS Dhoni with handwritten message: &ldquo;With Luv, MS Dhoni&rdquo;
            </p>
          </div>

          {/* Bat Showcase Preview with Brass Wall Brackets */}
          <div
            onClick={() => {
              storyAudio.playBatImpactSound();
              setIsBatModalOpen(true);
            }}
            className="group relative my-6 h-64 sm:h-72 flex items-center justify-center p-4 rounded-2xl bg-black/70 border border-[#b89758]/30 cursor-pointer shadow-inner hover:border-orange-400 transition-all"
          >
            {/* Horizontal Brass Wall Brackets */}
            <div className="absolute top-1/3 left-6 right-6 h-1 bg-gradient-to-r from-[#ffd700] via-[#b89758] to-[#ffd700] rounded opacity-40 pointer-events-none" />
            <div className="absolute bottom-1/3 left-6 right-6 h-1 bg-gradient-to-r from-[#ffd700] via-[#b89758] to-[#ffd700] rounded opacity-40 pointer-events-none" />

            <div className="relative w-full h-full">
              <Image
                src="/images/motifs/dhoni_reebok_bat.png"
                alt="Dhoni's Reebok Bat with Orange Grip"
                fill
                sizes="(max-width: 768px) 250px, 350px"
                className="object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
              />
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 border border-orange-500/40 text-[10px] font-mono text-orange-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              CLICK TO VIEW HIGH-RES & FACTS
            </div>
          </div>

          {/* Bat Meta */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-stone-400">
            <span>GRADE 1 ENGLISH WILLOW</span>
            <span className="text-[#ffd700] font-bold">GUINNESS RECORD £100K</span>
          </div>
        </div>

        {/* RIGHT (8 of 12 cols): THE DUAL-PLANK TROPHY CABINET */}
        <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#140e09] border-2 border-[#b89758]/40 shadow-2xl relative overflow-hidden text-left">
          {/* Spotlight Cone */}
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-yellow-500/10 blur-3xl pointer-events-none rounded-full" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#ffd700]">
                  MOTIF III · DUAL-PLANK CABINET
                </span>
                <span className="px-2 py-0.5 rounded bg-[#ffd700]/20 text-[#ffd700] text-[10px] font-mono font-bold">
                  29 TITLES & MEDALS
                </span>
              </div>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-white mt-1">
                THE SILVERWARE CABINET
              </h3>
              <p className="text-xs font-serif text-stone-300 mt-0.5">
                Clicking opens both planks to reveal all trophies in chronological order of when won.
              </p>
            </div>

            <button
              onClick={() => {
                storyAudio.playBookThudSound();
                setIsTrophyModalOpen(true);
              }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#b89758] via-[#ffd700] to-[#b89758] text-black font-bold font-serif text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              OPEN CABINET PLANKS →
            </button>
          </div>

          {/* Interactive Dual-Plank Preview Showcase */}
          <div
            onClick={() => {
              storyAudio.playBookThudSound();
              setIsTrophyModalOpen(true);
            }}
            className="group relative my-6 rounded-2xl bg-gradient-to-b from-[#1b140e] via-[#0f0b07] to-[#070503] border-2 border-[#b89758]/30 p-4 sm:p-6 shadow-inner cursor-pointer hover:border-[#ffd700] transition-all"
          >
            {/* Preview of Trophies sitting on shelves */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 py-2 items-end">
              {TROPHIES_VAULT.slice(0, 12).map((trophy, i) => (
                <div key={trophy.id} className="relative flex flex-col items-center">
                  <div className="relative w-full h-16 sm:h-20">
                    <Image
                      src={trophy.cutoutUrl}
                      alt={trophy.name}
                      fill
                      sizes="(max-width: 768px) 70px, 100px"
                      className="object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[9px] font-mono text-stone-400 mt-1 truncate max-w-full">
                    {trophy.year}
                  </span>
                </div>
              ))}
            </div>

            {/* Simulated Dual-Door Planks Glass Edge with Handles */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none rounded-2xl border border-white/10" />
            
            {/* Center Clasp Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all rounded-2xl">
              <div className="px-5 py-2.5 rounded-full bg-black/85 border border-[#ffd700]/70 text-[#ffd700] font-serif font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 group-hover:scale-105 transition-transform">
                <Trophy className="w-4 h-4" />
                <span>CLICK TO SWING OPEN BOTH PLANKS</span>
              </div>
            </div>
          </div>

          {/* Cabinet Bottom Provenance */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-stone-400">
            <span>ICC GLOBAL · RANKING MACES · ASIA CUPS · IPL & CLT20</span>
            <span className="text-[#ffd700] font-bold">EVERY TROPHY IS FULLY CLICKABLE</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOTIF 4: THE ILLUMINATED JERSEY WARDROBE (2004–2026)
         ========================================================================= */}
      <div className="my-16 p-6 sm:p-8 rounded-3xl bg-[#0f1118] border-2 border-sky-500/30 shadow-2xl text-left relative overflow-hidden">
        {/* Ambient Sky Blue Glow */}
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-sky-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-sky-400">
                MOTIF IV · SPORTS WARDROBE
              </span>
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold">
                14 HISTORIC KITS
              </span>
            </div>
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-white mt-1">
              THE JERSEY CABINET (2004–2026)
            </h3>
            <p className="text-xs sm:text-sm font-serif text-stone-300 mt-0.5">
              Every iconic jersey worn by Dhoni, showing which year kit is which one with front and back #7 views.
            </p>
          </div>

          <button
            onClick={() => {
              storyAudio.playTrophyChime();
              setIsJerseyModalOpen(true);
            }}
            className="px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-black font-bold font-mono text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            INSPECT ALL JERSEYS →
          </button>
        </div>

        {/* Horizontal Jersey Rail Showcase */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 my-6">
          {JERSEYS_VAULT.slice(0, 7).map((jersey) => (
            <div
              key={jersey.id}
              onClick={() => {
                storyAudio.playTrophyChime();
                setIsJerseyModalOpen(true);
              }}
              className="group p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 hover:border-sky-400 transition-all cursor-pointer flex flex-col items-center justify-between text-center select-none"
            >
              {/* Hanger Hook */}
              <div className="w-4 h-1.5 border-t-2 border-stone-400 rounded-t-full mb-1" />

              {/* Jersey Block */}
              <div
                className="w-full aspect-[4/5] rounded-xl flex flex-col items-center justify-between p-2.5 shadow-md border"
                style={{
                  backgroundColor: jersey.primaryColor,
                  borderColor: jersey.accentColor,
                }}
              >
                <div
                  className="w-10 h-3 rounded-b-lg shadow-inner"
                  style={{ backgroundColor: jersey.secondaryColor }}
                />
                <span
                  className="font-mono font-black text-2xl text-white drop-shadow"
                  style={{
                    color: jersey.team === "Chennai Super Kings" ? "#1e3a8a" : "#ffffff",
                  }}
                >
                  7
                </span>
                <span className="text-[8px] font-mono tracking-wider font-bold text-white/80">
                  {jersey.sponsor}
                </span>
              </div>

              <span className="text-xs font-mono font-bold text-white mt-2">
                {jersey.year}
              </span>
              <span className="text-[10px] font-mono text-stone-400 truncate max-w-full">
                {jersey.title.split(" ")[1] || jersey.title}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-stone-400">
          <span>INDIA TRICOLOR SAHARA · 2011 WORLD CUP GOLD PIPING · CSK CANARY YELLOW</span>
          <span className="text-sky-400 font-bold">CLICK TO FLIP FRONT & BACK</span>
        </div>
      </div>

      {/* =========================================================================
          ACTIVE MODALS (LANDSCAPE READER · BAT INSPECT · TROPHIES · JERSEYS)
         ========================================================================= */}
      {selectedBookId && (
        <LandscapeBookReader
          initialBookId={selectedBookId}
          isOpen={Boolean(selectedBookId)}
          onClose={() => setSelectedBookId(null)}
        />
      )}

      <BatInspectModal
        isOpen={isBatModalOpen}
        onClose={() => setIsBatModalOpen(false)}
      />

      <TrophyCabinetModal
        isOpen={isTrophyModalOpen}
        onClose={() => setIsTrophyModalOpen(false)}
      />

      <JerseyCabinetModal
        isOpen={isJerseyModalOpen}
        onClose={() => setIsJerseyModalOpen(false)}
      />
    </section>
  );
};
