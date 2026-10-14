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
  const [activeChant, setActiveChant] = useState<"dhoni" | "mahi" | "thala" | null>(null);

  const handleOpenBook = (bookId: string) => {
    storyAudio.playBookThudSound();
    if (onDirectOpenBook) {
      onDirectOpenBook(bookId);
    } else {
      setSelectedBookId(bookId);
    }
  };

  const handlePlayChant = (type: "dhoni" | "mahi" | "thala") => {
    setActiveChant(type);
    if (type === "dhoni") storyAudio.playDhoniChant();
    else if (type === "mahi") storyAudio.playMahiChant();
    else if (type === "thala") storyAudio.playThalaChant();
    setTimeout(() => setActiveChant(null), 4200);
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
      <div className="text-center mb-8 sm:mb-12">
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
      </div>

      {/* =========================================================================
          MASTER INTERACTIVE 3D ROOM SANCTUM (DIRECT FROM MASTER REFERENCE BLUEPRINT)
         ========================================================================= */}
      <div className="relative w-full rounded-3xl bg-[#140e09] border-2 border-[#b89758]/60 shadow-[0_30px_90px_rgba(0,0,0,0.98),0_0_60px_rgba(212,175,55,0.25)] p-4 sm:p-6 lg:p-8 overflow-hidden my-8">
        
        {/* Overhead Spotlights Ambient Cones */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#ffd700]/10 via-[#ffd700]/[0.02] to-transparent pointer-events-none" />
        <div className="absolute top-0 left-[14%] w-24 h-44 bg-[#ffd700]/15 blur-2xl pointer-events-none -translate-x-1/2" />
        <div className="absolute top-0 left-[38%] w-32 h-52 bg-[#ffd700]/15 blur-2xl pointer-events-none -translate-x-1/2" />
        <div className="absolute top-0 left-[62%] w-28 h-48 bg-orange-500/15 blur-2xl pointer-events-none -translate-x-1/2" />
        <div className="absolute top-0 left-[86%] w-32 h-52 bg-sky-500/15 blur-2xl pointer-events-none -translate-x-1/2" />

        {/* Master Room Blueprint Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#b89758]/30 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700] animate-ping" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#ffd700] uppercase">
              INTERACTIVE 3D ROOM WALL · CLICK ANY MOTIF TO ENGAGE
            </span>
          </div>
          <span className="text-[11px] font-mono text-stone-400">
            BLUEPRINT: 4 BOOKS · 29 TROPHIES · REEBOK WILLOW · TV & CHANTS · VERIFIED JERSEYS
          </span>
        </div>

        {/* 4-Zone Panoramic Wall Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ZONE 1 (3 of 12 cols): BOOKSHELF & MEMORABILIA */}
          <div className="lg:col-span-3 flex flex-col justify-between p-4 rounded-2xl bg-black/50 border border-[#b89758]/40 shadow-inner relative text-left">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-[#ffd700] tracking-wider uppercase">
                  BOOKSHELF (4 VOLUMES)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#b89758]/20 text-[#ffd700]">
                  CLICK TO READ
                </span>
              </div>

              {/* Upper Shelf: 4 Standing Collector Books with Spines */}
              <div className="p-3 rounded-xl bg-[#1b140d] border-b-4 border-[#523b1c] shadow-lg mb-4">
                <div className="flex items-end justify-center gap-2 py-2">
                  {COLLECTOR_BOOKS.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => handleOpenBook(book.id)}
                      className="group/book relative w-12 sm:w-14 h-40 rounded-t-sm bg-gradient-to-r from-[#21170d] via-[#3d2a17] to-[#1a1109] border border-[#b89758]/60 hover:border-[#ffd700] hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex flex-col justify-between py-2 items-center select-none shadow-md"
                      title={`${book.title} (Vol ${book.romanNumeral})`}
                    >
                      <span className="text-[8px] font-mono text-[#ffd700] font-bold">
                        V{book.romanNumeral}
                      </span>
                      <span className="[writing-mode:vertical-rl] rotate-180 text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-stone-200 group-hover/book:text-[#ffd700] font-bold truncate max-h-24">
                        {book.shortTitle}
                      </span>
                      <div className="w-2.5 h-1 bg-[#ffd700]/70 rounded-full" />
                    </div>
                  ))}
                </div>
                <div className="text-center pt-1 border-t border-white/10 text-[9px] font-mono text-stone-400">
                  WOODEN UPPER SHELF
                </div>
              </div>

              {/* Lower Shelf: Young Dhoni Sketch, Quote & Motorbike */}
              <div className="p-3 rounded-xl bg-[#181109] border border-white/10 text-center space-y-2.5">
                {/* Young Dhoni Framed Sketch */}
                <div className="relative w-full h-24 rounded-lg overflow-hidden border border-[#b89758]/40 bg-black/60 shadow">
                  <Image
                    src="/images/stories/dhoni_early_railways.jpg"
                    alt="Young Dhoni Sketch"
                    fill
                    sizes="200px"
                    className="object-cover filter contrast-125 sepia-[0.3]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1 inset-x-0 text-[8px] font-mono text-[#ffd700]">
                    ORIGINAL RANCHI SKETCH
                  </span>
                </div>

                {/* Framed Quote */}
                <div className="p-2 rounded bg-black/60 border-l-2 border-[#ffd700] text-left">
                  <p className="text-[10px] font-serif italic text-stone-200">
                    &ldquo;Calm Mind, Sharper Choices.&rdquo;
                  </p>
                  <span className="text-[8px] font-mono text-[#ffd700]">
                    — MS Dhoni Desk Motto
                  </span>
                </div>

                {/* Miniature Motorbike Note */}
                <div className="flex items-center justify-between text-[9px] font-mono text-stone-400 px-1 pt-1 border-t border-white/5">
                  <span>🏍️ VINTAGE MOTORBIKE</span>
                  <span className="text-[#ffd700]">YAMAHA RD350</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenBook(COLLECTOR_BOOKS[0].id)}
              className="mt-3 w-full py-1.5 rounded-lg bg-[#b89758]/20 hover:bg-[#b89758]/40 border border-[#b89758]/50 text-[#ffd700] font-mono text-xs font-bold transition-all cursor-pointer"
            >
              BROWSE 4 BOOKS →
            </button>
          </div>

          {/* ZONE 2 (4 of 12 cols): 6-TIER ILLUMINATED TROPHY CABINET */}
          <div className="lg:col-span-4 flex flex-col justify-between p-4 rounded-2xl bg-black/50 border border-[#b89758]/40 shadow-inner relative text-left">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span className="text-[10px] font-mono font-bold text-[#ffd700] tracking-wider uppercase">
                    6-TIER TROPHY CABINET
                  </span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#ffd700]/20 text-[#ffd700]">
                  29 TITLES
                </span>
              </div>

              {/* 6 Shelves Preview with Ambient Spotlights */}
              <div
                onClick={() => {
                  storyAudio.playBookThudSound();
                  setIsTrophyModalOpen(true);
                }}
                className="group relative rounded-xl bg-gradient-to-b from-[#1b140c] via-[#100b06] to-[#070503] border-2 border-[#b89758]/50 p-2.5 cursor-pointer shadow-lg hover:border-[#ffd700] transition-all"
              >
                {/* 6 Glass Shelf Bars */}
                <div className="space-y-2">
                  {/* Tier 1: ICC Global */}
                  <div className="p-1 rounded bg-black/40 border-b border-cyan-500/30 flex items-center justify-between">
                    <span className="text-[8px] font-mono text-cyan-300 font-bold">1. ICC GLOBAL</span>
                    <div className="flex items-center gap-1">
                      {TROPHIES_VAULT.slice(0, 3).map((t) => (
                        <div key={t.id} className="relative w-6 h-6">
                          <Image src={t.cutoutUrl} alt={t.name} fill sizes="24px" className="object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tier 2: ICC Rankings */}
                  <div className="p-1 rounded bg-black/40 border-b border-yellow-500/30 flex items-center justify-between">
                    <span className="text-[8px] font-mono text-yellow-300 font-bold">2. TEST MACES & SHIELD</span>
                    <div className="flex items-center gap-1">
                      {TROPHIES_VAULT.slice(3, 6).map((t) => (
                        <div key={t.id} className="relative w-6 h-6">
                          <Image src={t.cutoutUrl} alt={t.name} fill sizes="24px" className="object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tier 3: Asia Cup */}
                  <div className="p-1 rounded bg-black/40 border-b border-amber-500/30 flex items-center justify-between">
                    <span className="text-[8px] font-mono text-amber-300 font-bold">3. ASIA CUPS</span>
                    <div className="flex items-center gap-1">
                      {TROPHIES_VAULT.slice(6, 8).map((t) => (
                        <div key={t.id} className="relative w-6 h-6">
                          <Image src={t.cutoutUrl} alt={t.name} fill sizes="24px" className="object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tier 4: Bilaterals & CB Series */}
                  <div className="p-1 rounded bg-black/40 border-b border-orange-500/30 flex items-center justify-between">
                    <span className="text-[8px] font-mono text-orange-300 font-bold">4. MULTI-NATION & BGT</span>
                    <div className="flex items-center gap-1">
                      {TROPHIES_VAULT.slice(8, 13).map((t) => (
                        <div key={t.id} className="relative w-6 h-6">
                          <Image src={t.cutoutUrl} alt={t.name} fill sizes="24px" className="object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tier 5: CSK Titles */}
                  <div className="p-1 rounded bg-black/40 border-b border-amber-400/40 flex items-center justify-between">
                    <span className="text-[8px] font-mono text-amber-300 font-bold">5. CSK IPL & CLT20</span>
                    <div className="flex items-center gap-1">
                      {TROPHIES_VAULT.slice(13, 20).map((t) => (
                        <div key={t.id} className="relative w-6 h-6">
                          <Image src={t.cutoutUrl} alt={t.name} fill sizes="24px" className="object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tier 6: Domestic & Civic Honours */}
                  <div className="p-1 rounded bg-black/40 flex items-center justify-between">
                    <span className="text-[8px] font-mono text-stone-300 font-bold">6. CIVIC & HONOURS</span>
                    <div className="flex items-center gap-1">
                      {TROPHIES_VAULT.slice(20, 26).map((t) => (
                        <div key={t.id} className="relative w-6 h-6">
                          <Image src={t.cutoutUrl} alt={t.name} fill sizes="24px" className="object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dual-Plank Glass Doors Effect with Handles */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 rounded-xl pointer-events-none border border-white/10" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-xl">
                  <span className="px-3 py-1.5 rounded-full bg-[#ffd700] text-black font-bold text-xs font-mono shadow-lg">
                    SWING OPEN BOTH PLANKS →
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                storyAudio.playBookThudSound();
                setIsTrophyModalOpen(true);
              }}
              className="mt-3 w-full py-1.5 rounded-lg bg-gradient-to-r from-[#b89758] to-[#ffd700] text-black font-mono text-xs font-bold transition-all cursor-pointer shadow"
            >
              OPEN CABINET (29 TROPHIES) →
            </button>
          </div>

          {/* ZONE 3 (2 of 12 cols): CENTER TV, AUTOGRAPHED WILLOW & STADIUM CHANTS */}
          <div className="lg:col-span-2 flex flex-col justify-between p-3.5 rounded-2xl bg-black/50 border border-orange-500/30 shadow-inner text-center">
            <div>
              {/* Center TV: 2011 WC Final Broadcast */}
              <div className="p-1 rounded-lg bg-[#14100c] border border-white/10 shadow-md mb-3">
                <div className="relative w-full aspect-video rounded overflow-hidden bg-black border border-orange-500/40">
                  <Image
                    src="/images/stories/dhoni_cwc_2011_six.jpg"
                    alt="Dhoni 2011 World Cup Winning Six"
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
                  <span className="absolute bottom-1 inset-x-0 text-[8px] font-mono text-[#ffd700] font-bold">
                    INDIA WIN BY 6 WICKETS
                  </span>
                </div>
              </div>

              {/* Autographed Willow Leaning */}
              <div
                onClick={() => {
                  storyAudio.playSixBatStrikeSound();
                  setIsBatModalOpen(true);
                }}
                className="group relative h-36 flex items-center justify-center p-2 rounded-xl bg-black/70 border border-[#b89758]/40 hover:border-orange-400 cursor-pointer transition-all shadow-inner mb-3"
                title="Click to play Six sound and inspect willow"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/images/motifs/dhoni_reebok_bat.png"
                    alt="Dhoni Autographed Reebok Bat"
                    fill
                    sizes="120px"
                    className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] group-hover:scale-105 group-hover:rotate-1 transition-transform"
                  />
                </div>
                <div className="absolute bottom-1 px-2 py-0.5 rounded-full bg-black/80 text-[8px] font-mono text-orange-300 border border-orange-500/30">
                  🏏 HIT FOR SIX
                </div>
              </div>

              {/* Stadium Crowd Chants Soundboard */}
              <div className="space-y-1.5 text-left">
                <span className="text-[8px] font-mono text-stone-400 uppercase block text-center">
                  GROUND CHANTS CONSOLE
                </span>

                <button
                  onClick={() => handlePlayChant("dhoni")}
                  className={`w-full py-1 px-2 rounded text-[10px] font-mono font-bold flex items-center justify-between transition-all cursor-pointer ${
                    activeChant === "dhoni"
                      ? "bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.6)] animate-pulse"
                      : "bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10"
                  }`}
                >
                  <span>🔊 DHONI! DHONI!</span>
                  <span>👏 👏</span>
                </button>

                <button
                  onClick={() => handlePlayChant("mahi")}
                  className={`w-full py-1 px-2 rounded text-[10px] font-mono font-bold flex items-center justify-between transition-all cursor-pointer ${
                    activeChant === "mahi"
                      ? "bg-sky-400 text-black shadow-[0_0_12px_rgba(56,189,248,0.6)] animate-pulse"
                      : "bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10"
                  }`}
                >
                  <span>🔊 MAHI! MAHI!</span>
                  <span>👏 👏</span>
                </button>

                <button
                  onClick={() => handlePlayChant("thala")}
                  className={`w-full py-1 px-2 rounded text-[10px] font-mono font-bold flex items-center justify-between transition-all cursor-pointer ${
                    activeChant === "thala"
                      ? "bg-yellow-400 text-black shadow-[0_0_12px_rgba(250,204,21,0.6)] animate-pulse"
                      : "bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10"
                  }`}
                >
                  <span>🔊 THALA! THALA!</span>
                  <span>🎵 👏</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                storyAudio.playSixBatStrikeSound();
                setIsBatModalOpen(true);
              }}
              className="mt-3 w-full py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 font-mono text-xs font-bold transition-all cursor-pointer"
            >
              INSPECT WILLOW →
            </button>
          </div>

          {/* ZONE 4 (3 of 12 cols): 3-TIER ILLUMINATED JERSEY WARDROBE (VERIFIED KITS) */}
          <div className="lg:col-span-3 flex flex-col justify-between p-4 rounded-2xl bg-black/50 border border-sky-500/40 shadow-inner relative text-left">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Shirt className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-[10px] font-mono font-bold text-sky-400 tracking-wider uppercase">
                    JERSEY WARDROBE
                  </span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
                  {JERSEYS_VAULT.length} REAL KITS
                </span>
              </div>

              {/* 3 Illuminated Glass Tiers Preview */}
              <div
                onClick={() => {
                  storyAudio.playTrophyChime();
                  setIsJerseyModalOpen(true);
                }}
                className="group relative rounded-xl bg-gradient-to-b from-[#0e1420] via-[#090d15] to-[#05080d] border-2 border-sky-500/40 p-2.5 cursor-pointer shadow-lg hover:border-sky-300 transition-all space-y-2.5"
              >
                {/* Tier 1: India */}
                <div className="p-1.5 rounded bg-black/40 border-b border-sky-500/30">
                  <span className="text-[8px] font-mono text-sky-400 font-bold block mb-1">
                    TIER 1: TEAM INDIA KITS
                  </span>
                  <div className="grid grid-cols-4 gap-1 items-center">
                    {JERSEYS_VAULT.filter((j) => j.team === "India").slice(0, 4).map((j) => (
                      <div key={j.id} className="relative w-full h-10 rounded overflow-hidden bg-black/40 border border-white/10">
                        {j.imageSrc && (
                          <img src={j.imageSrc} alt={j.title} className="w-full h-full object-contain p-0.5" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tier 2: CSK & CLT20 */}
                <div className="p-1.5 rounded bg-black/40 border-b border-amber-400/30">
                  <span className="text-[8px] font-mono text-amber-300 font-bold block mb-1">
                    TIER 2: CSK & CLT20 KITS
                  </span>
                  <div className="grid grid-cols-4 gap-1 items-center">
                    {JERSEYS_VAULT.filter((j) => j.tournamentType === "IPL" || j.tournamentType === "CLT20").slice(0, 4).map((j) => (
                      <div key={j.id} className="relative w-full h-10 rounded overflow-hidden bg-black/40 border border-white/10">
                        {j.imageSrc && (
                          <img src={j.imageSrc} alt={j.title} className="w-full h-full object-contain p-0.5" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tier 3: Army / Domestic */}
                <div className="p-1.5 rounded bg-black/40">
                  <span className="text-[8px] font-mono text-emerald-400 font-bold block mb-1">
                    TIER 3: MILITARY & DOMESTIC KITS
                  </span>
                  <div className="grid grid-cols-4 gap-1 items-center">
                    {JERSEYS_VAULT.filter((j) => j.tournamentType === "MILITARY" || j.tournamentType === "DOMESTIC" || j.tournamentType === "IPL").slice(0, 4).map((j) => (
                      <div key={j.id} className="relative w-full h-10 rounded overflow-hidden bg-black/40 border border-white/10">
                        {j.imageSrc && (
                          <img src={j.imageSrc} alt={j.title} className="w-full h-full object-contain p-0.5" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover inspect prompt */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-xl">
                  <span className="px-3 py-1.5 rounded-full bg-sky-500 text-black font-bold text-xs font-mono shadow-lg">
                    INSPECT ALL VERIFIED JERSEYS →
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                storyAudio.playTrophyChime();
                setIsJerseyModalOpen(true);
              }}
              className="mt-3 w-full py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-black font-mono text-xs font-bold transition-all cursor-pointer shadow"
            >
              OPEN WARDROBE ({JERSEYS_VAULT.length} KITS) →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Motifs Shortcut Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        <button
          onClick={() => handleOpenBook(currentFeaturedBook.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>4 COLLECTOR BOOKS</span>
        </button>

        <button
          onClick={() => {
            storyAudio.playSixBatStrikeSound();
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
