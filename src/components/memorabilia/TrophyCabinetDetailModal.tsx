"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Award,
  Sparkles,
  Calendar,
  MapPin,
  Shield,
  Layers,
} from "lucide-react";
import { TROPHIES_VAULT, type TrophyVaultItem } from "@/data/trophiesVault";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface TrophyCabinetDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrophyId?: string;
}

export const TrophyCabinetDetailModal: React.FC<TrophyCabinetDetailModalProps> = ({
  isOpen,
  onClose,
  initialTrophyId,
}) => {
  const [selectedTrophyId, setSelectedTrophyId] = useState<string>(
    initialTrophyId || TROPHIES_VAULT[0]?.id || "icc_cwc_2011"
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  useEffect(() => {
    if (initialTrophyId) {
      setSelectedTrophyId(initialTrophyId);
    }
  }, [initialTrophyId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, selectedTrophyId]);

  if (!isOpen) return null;

  const currentTrophy =
    TROPHIES_VAULT.find((t) => t.id === selectedTrophyId) || TROPHIES_VAULT[0];
  const currentIndex = TROPHIES_VAULT.findIndex((t) => t.id === currentTrophy.id);

  const handlePrev = () => {
    storyAudio.playTrophyChime();
    const prevIdx = (currentIndex - 1 + TROPHIES_VAULT.length) % TROPHIES_VAULT.length;
    setSelectedTrophyId(TROPHIES_VAULT[prevIdx].id);
  };

  const handleNext = () => {
    storyAudio.playTrophyChime();
    const nextIdx = (currentIndex + 1) % TROPHIES_VAULT.length;
    setSelectedTrophyId(TROPHIES_VAULT[nextIdx].id);
  };

  const filteredTrophies =
    categoryFilter === "ALL"
      ? TROPHIES_VAULT
      : TROPHIES_VAULT.filter((t) => t.category === categoryFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Background Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ffd700]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-7xl bg-[#0f0c08] border-2 border-[#b89758]/50 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.98),0_0_50px_rgba(212,175,55,0.2)] overflow-hidden my-auto flex flex-col max-h-[94vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#b89758]/30 bg-[#17120a] shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-stone-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO ROOM</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
              <Trophy className="w-4 h-4 text-[#ffd700]" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#ffd700] uppercase">
                THE SILVERWARE CABINET · 29 VERIFIED TITLES
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-stone-400 hidden md:inline">
              Trophy {currentIndex + 1} of {TROPHIES_VAULT.length}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.15] text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Split View (Left: Large Trophy Inspector, Right: Shelf Grid & History) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-[#b89758]/20">
          {/* LEFT: Featured Trophy Showcase (5 of 12 cols) */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between items-center text-center bg-gradient-to-b from-[#140f09] to-[#0c0906] relative">
            {/* Spotlight Cone */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-64 bg-amber-400/15 blur-3xl pointer-events-none rounded-full" />

            <div className="w-full flex items-center justify-between text-[11px] font-mono text-stone-400 mb-2">
              <span className="px-2 py-0.5 rounded bg-[#b89758]/20 text-[#ffd700] font-bold border border-[#b89758]/40">
                {currentTrophy.category.replace(/_/g, " ")}
              </span>
              <span>{currentTrophy.year}</span>
            </div>

            {/* Trophy Cutout Image */}
            <div className="relative w-full h-64 sm:h-72 md:h-80 my-4 flex items-center justify-center group">
              <div className="relative w-56 sm:w-64 h-full">
                <Image
                  src={currentTrophy.cutoutUrl}
                  alt={currentTrophy.name}
                  fill
                  sizes="300px"
                  className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="w-full flex items-center justify-between gap-3 pt-3 border-t border-[#b89758]/25">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-stone-300 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREV</span>
              </button>

              <span className="text-[10px] font-mono tracking-wider text-[#ffd700]">
                {currentTrophy.team} · {currentTrophy.captainOrPlayer}
              </span>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-stone-300 hover:text-white transition-all cursor-pointer"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT: Detailed Historical Dossier & Shelf Matrix (7 of 12 cols) */}
          <div className="lg:col-span-7 p-6 overflow-y-auto space-y-6 text-left bg-[#100c08]">
            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#ffd700] uppercase tracking-wider">
                  {currentTrophy.team} ({currentTrophy.exactDate})
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffd700]" />
                <span className="text-xs font-mono text-stone-400">
                  Role: {currentTrophy.captainOrPlayer}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight">
                {currentTrophy.name}
              </h2>
              <p className="mt-1 text-xs font-serif italic text-stone-300">
                {currentTrophy.significance}
              </p>
            </div>

            {/* Match Context Plate */}
            <div className="p-4 rounded-xl bg-black/60 border border-[#b89758]/30 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Opponent / Scope:</span>
                  <span className="text-stone-200 font-semibold">{currentTrophy.opponentOrScope}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Venue:</span>
                  <span className="text-stone-200 font-semibold">{currentTrophy.venue}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-stone-400 block text-[10px] uppercase">Final Result:</span>
                  <span className="text-[#ffd700] font-bold">{currentTrophy.result}</span>
                </div>
              </div>
            </div>

            {/* Historical Account */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-[#d6c7a1]">
                HISTORICAL ACCOUNT & TACTICAL DECISION
              </h3>
              <p className="text-sm font-serif text-stone-200 leading-relaxed text-justify">
                {currentTrophy.howWon}
              </p>
            </div>

            {/* Quote if present */}
            {currentTrophy.quote && (
              <div className="p-3 rounded-lg bg-[#18120b] border-l-4 border-[#ffd700] text-xs font-serif italic text-amber-200">
                &ldquo;{currentTrophy.quote.text}&rdquo;
                <span className="block mt-1 font-mono text-[10px] text-stone-400 not-italic text-right">
                  — {currentTrophy.quote.by}
                </span>
              </div>
            )}

            {/* Category Filter Pills & Cabinet Shelf Explorer */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold">
                  CABINET SHELVES ({TROPHIES_VAULT.length} TITLES)
                </span>
                <div className="flex items-center gap-1">
                  {["ALL", "ICC_GLOBAL", "ICC_RANKING", "IPL_CLT20", "CIVIC_HONOUR"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-2 py-0.5 rounded text-[9px] font-mono cursor-pointer transition-all ${
                        categoryFilter === cat
                          ? "bg-[#b89758] text-black font-bold"
                          : "bg-white/5 text-stone-400 hover:text-white"
                      }`}
                    >
                      {cat === "ICC_GLOBAL"
                        ? "ICC"
                        : cat === "ICC_RANKING"
                        ? "MACES"
                        : cat === "IPL_CLT20"
                        ? "CSK"
                        : cat === "CIVIC_HONOUR"
                        ? "HONOURS"
                        : "ALL"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of All Trophies in Cabinet */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                {filteredTrophies.map((trophy) => {
                  const isSelected = trophy.id === selectedTrophyId;
                  return (
                    <button
                      key={trophy.id}
                      onClick={() => {
                        storyAudio.playTrophyChime();
                        setSelectedTrophyId(trophy.id);
                      }}
                      className={`p-1.5 rounded-xl border flex flex-col items-center justify-between text-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#b89758]/30 border-[#ffd700] shadow-[0_0_12px_rgba(212,175,55,0.4)] scale-105"
                          : "bg-black/40 border-white/10 hover:border-[#b89758]/50 hover:bg-black/60"
                      }`}
                      title={trophy.name}
                    >
                      <div className="relative w-8 h-10">
                        <Image
                          src={trophy.cutoutUrl}
                          alt={trophy.name}
                          fill
                          sizes="40px"
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[8px] font-mono text-stone-300 truncate max-w-full mt-1">
                        {trophy.year}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
