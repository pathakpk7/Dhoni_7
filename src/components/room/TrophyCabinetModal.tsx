"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Trophy, Sparkles, ChevronRight, Award, Shield, Crown, Info, RotateCcw } from "lucide-react";
import { TROPHIES_VAULT, type TrophyVaultItem } from "@/data/trophiesVault";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface TrophyCabinetModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedTrophyId?: string | null;
}

export const TrophyCabinetModal: React.FC<TrophyCabinetModalProps> = ({
  isOpen,
  onClose,
  initialSelectedTrophyId,
}) => {
  const [isPlanksOpen, setIsPlanksOpen] = useState<boolean>(true);
  const [selectedTrophy, setSelectedTrophy] = useState<TrophyVaultItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  useEffect(() => {
    if (initialSelectedTrophyId) {
      const match = TROPHIES_VAULT.find((t) => t.id === initialSelectedTrophyId);
      if (match) setSelectedTrophy(match);
    }
  }, [initialSelectedTrophyId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedTrophy) setSelectedTrophy(null);
        else onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, selectedTrophy, onClose]);

  if (!isOpen) return null;

  const togglePlanks = () => {
    storyAudio.playBookThudSound();
    setIsPlanksOpen((prev) => !prev);
  };

  const filteredTrophies = TROPHIES_VAULT.filter((t) => {
    if (categoryFilter === "ALL") return true;
    if (categoryFilter === "ICC") return t.category === "ICC_GLOBAL" || t.category === "ICC_RANKING";
    if (categoryFilter === "IPL") return t.category === "IPL_CLT20";
    if (categoryFilter === "CONTINENTAL") return t.category === "CONTINENTAL" || t.category === "TRI_SERIES" || t.category === "BILATERAL";
    if (categoryFilter === "HONOURS") return t.category === "CIVIC_HONOUR" || t.category === "DOMESTIC";
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_75%)] pointer-events-none" />

      {/* Main Museum Cabinet Container */}
      <div className="relative w-full max-w-7xl h-[94vh] max-h-[94vh] rounded-3xl bg-[#0e0b08] border-2 border-[#b89758]/50 shadow-[0_30px_90px_rgba(0,0,0,0.98),0_0_60px_rgba(212,175,55,0.25)] flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="relative z-30 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#16110c] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#b89758]/20 border border-[#b89758]/40 text-[#ffd700]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#d4af37] uppercase">
                SANCTUM OF NUMBER 7 · DUAL-PLANK TROPHY CABINET
              </span>
              <h2 className="text-base sm:text-xl font-serif font-black text-white">
                THE IMMORTAL SILVERWARE VAULT ({TROPHIES_VAULT.length} TITLES & HONOURS)
              </h2>
            </div>
          </div>

          {/* Planks Toggle & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlanks}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Toggle Cabinet Doors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">
                {isPlanksOpen ? "CLOSE PLANKS" : "OPEN PLANKS"}
              </span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close cabinet modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Filter Navigation Tabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-black/60 border-b border-white/5 flex items-center justify-between gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            {[
              { id: "ALL", label: `ALL CHRONOLOGICAL (${TROPHIES_VAULT.length})` },
              { id: "ICC", label: "GLOBAL ICC & MACE (6)" },
              { id: "IPL", label: "CSK & CLT20 (7)" },
              { id: "CONTINENTAL", label: "ASIA CUP & BILATERALS (9)" },
              { id: "HONOURS", label: "CIVIC HONOURS & FIRST CLASS (7)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  categoryFilter === tab.id
                    ? "bg-[#b89758] text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                    : "bg-white/5 text-stone-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="hidden lg:inline text-[11px] font-mono text-stone-500">
            ARRANGED IN STRICT ORDER OF WHEN WON · CLICK TROPHY FOR MATCH DETAILS
          </span>
        </div>

        {/* The 3D Cabinet Box with Dual Opening Planks */}
        <div
          className="relative flex-1 overflow-hidden bg-[#140e09]"
          style={{ perspective: "1800px" }}
        >
          {/* Velvet Mahogany Shelves Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a120b] via-[#100a06] to-[#080503] p-4 sm:p-6 overflow-y-auto">
            {/* Shelf Wood Grain Background & Spotlights */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1)_0%,transparent_60%)] pointer-events-none" />

            {/* Grid of Trophies Arranged in Order of When Won */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 pb-12">
              {filteredTrophies.map((trophy, idx) => (
                <div
                  key={trophy.id}
                  onClick={() => {
                    storyAudio.playTrophyChime();
                    setSelectedTrophy(trophy);
                  }}
                  className="group relative flex flex-col items-center justify-between p-3 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.07] border border-[#b89758]/20 hover:border-[#ffd700]/70 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_12px_30px_rgba(212,175,55,0.25)] hover:-translate-y-2 select-none"
                >
                  {/* Top Chronological Index Pill */}
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-stone-400 mb-2">
                    <span className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[#d4af37]">
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-stone-300">{trophy.year}</span>
                  </div>

                  {/* Cutout Image with Golden Hover Aura */}
                  <div className="relative w-full h-32 sm:h-36 flex items-center justify-center my-1">
                    {/* Hover Glow Behind Trophy */}
                    <div className="absolute inset-0 bg-[#ffd700]/0 group-hover:bg-[#ffd700]/20 blur-xl rounded-full transition-all duration-500" />
                    
                    <div className="relative w-full h-full">
                      <Image
                        src={trophy.cutoutUrl}
                        alt={trophy.name}
                        fill
                        sizes="(max-width: 768px) 150px, 200px"
                        className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] group-hover:scale-110 group-hover:drop-shadow-[0_12px_24px_rgba(255,215,0,0.45)] transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Polish Wooden Shelf Plaque Beneath Trophy */}
                  <div className="w-full mt-2 pt-2 border-t border-[#b89758]/30 text-center">
                    <h3 className="font-serif font-bold text-xs sm:text-[13px] text-white line-clamp-2 group-hover:text-[#ffd700] transition-colors">
                      {trophy.shortTitle}
                    </h3>
                    <p className="mt-0.5 text-[10px] font-mono text-stone-400 truncate">
                      {trophy.team}
                    </p>
                  </div>

                  {/* Small Action Prompt */}
                  <span className="mt-1 text-[9px] font-mono text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">
                    CLICK FOR DETAILS →
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DUAL PLANK 3D CABINET DOORS (Left & Right) */}
          {/* Left Door Plank */}
          <div
            onClick={togglePlanks}
            className={`absolute top-0 bottom-0 left-0 w-1/2 z-20 transition-transform duration-700 ease-in-out cursor-pointer ${
              isPlanksOpen ? "pointer-events-none" : "pointer-events-auto"
            }`}
            style={{
              transformOrigin: "left center",
              transform: isPlanksOpen ? "rotateY(-112deg)" : "rotateY(0deg)",
            }}
          >
            {/* Wooden Frame + Glass Panel */}
            <div className="w-full h-full bg-[#1e150d]/95 border-r-4 border-y-4 border-l-8 border-[#3d2918] shadow-[15px_0_40px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6 relative">
              {/* Frosted Glass Window */}
              <div className="absolute inset-4 sm:inset-8 bg-gradient-to-r from-black/40 via-white/[0.04] to-black/50 border-2 border-[#b89758]/40 rounded-lg flex items-center justify-center">
                <div className="text-center p-4">
                  <Crown className="w-10 h-10 text-[#b89758]/40 mx-auto mb-2 animate-pulse" />
                  <p className="font-serif font-bold text-stone-300 tracking-widest text-sm uppercase">
                    THE SANCTUM CABINET
                  </p>
                  <p className="text-[10px] font-mono text-[#d4af37] mt-1">
                    LEFT DOOR · CLICK TO OPEN
                  </p>
                </div>
              </div>

              {/* Brass Door Handle on Right Edge */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-20 rounded-full bg-gradient-to-r from-[#ffd700] via-[#b89758] to-[#80693a] border border-[#ffd700] shadow-lg flex items-center justify-center">
                <div className="w-1.5 h-12 bg-black/40 rounded-full" />
              </div>
            </div>
          </div>

          {/* Right Door Plank */}
          <div
            onClick={togglePlanks}
            className={`absolute top-0 bottom-0 right-0 w-1/2 z-20 transition-transform duration-700 ease-in-out cursor-pointer ${
              isPlanksOpen ? "pointer-events-none" : "pointer-events-auto"
            }`}
            style={{
              transformOrigin: "right center",
              transform: isPlanksOpen ? "rotateY(112deg)" : "rotateY(0deg)",
            }}
          >
            {/* Wooden Frame + Glass Panel */}
            <div className="w-full h-full bg-[#1e150d]/95 border-l-4 border-y-4 border-r-8 border-[#3d2918] shadow-[-15px_0_40px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6 relative">
              {/* Frosted Glass Window */}
              <div className="absolute inset-4 sm:inset-8 bg-gradient-to-l from-black/40 via-white/[0.04] to-black/50 border-2 border-[#b89758]/40 rounded-lg flex items-center justify-center">
                <div className="text-center p-4">
                  <Trophy className="w-10 h-10 text-[#b89758]/40 mx-auto mb-2 animate-pulse" />
                  <p className="font-serif font-bold text-stone-300 tracking-widest text-sm uppercase">
                    HISTORIC SILVERWARE
                  </p>
                  <p className="text-[10px] font-mono text-[#d4af37] mt-1">
                    RIGHT DOOR · CLICK TO OPEN
                  </p>
                </div>
              </div>

              {/* Brass Door Handle on Left Edge */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-20 rounded-full bg-gradient-to-r from-[#80693a] via-[#b89758] to-[#ffd700] border border-[#ffd700] shadow-lg flex items-center justify-center">
                <div className="w-1.5 h-12 bg-black/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <footer className="px-6 py-2.5 bg-[#140e0a] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-stone-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ffd700] animate-pulse" />
            <span>
              {isPlanksOpen
                ? "CABINET PLANKS FULLY OPEN · ALL TROPHIES ACCESSIBLE"
                : "CABINET PLANKS CLOSED · CLICK ANY PLANK TO SWING OPEN"}
            </span>
          </div>
          <span className="hidden sm:inline">2003–2023 FIRST CLASS & INTERNATIONAL ARCHIVES</span>
        </footer>
      </div>

      {/* INDIVIDUAL TROPHY DETAIL MODAL (WHEN A TROPHY IS CLICKED) */}
      {selectedTrophy && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#14100c] border-2 border-[#b89758] shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(212,175,55,0.3)] p-5 sm:p-8 text-left">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#b89758]/20 border border-[#b89758]/40 text-[#ffd700]">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#b89758]/20 text-[#ffd700] text-[10px] font-mono font-bold uppercase">
                      {selectedTrophy.category.replace("_", " ")}
                    </span>
                    <span className="text-xs font-mono text-stone-400">{selectedTrophy.exactDate}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-white mt-1">
                    {selectedTrophy.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedTrophy(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close trophy detail"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content: Trophy Cutout + Match Telemetry */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center">
              {/* Cutout Presentation (Left 5 Cols) */}
              <div className="md:col-span-5 relative h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-black/80 via-[#1c140d] to-black/90 border border-[#b89758]/40 p-4 flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />
                <div className="relative w-full h-full">
                  <Image
                    src={selectedTrophy.cutoutUrl}
                    alt={selectedTrophy.name}
                    fill
                    sizes="(max-width: 768px) 250px, 300px"
                    className="object-contain filter drop-shadow-[0_12px_30px_rgba(255,215,0,0.35)]"
                  />
                </div>
              </div>

              {/* Match Highlights (Right 7 Cols) */}
              <div className="md:col-span-7 space-y-3.5">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-black/60 border border-white/10">
                    <span className="text-stone-400 block text-[10px]">TEAM / ROLE</span>
                    <span className="font-bold text-white">{selectedTrophy.team} ({selectedTrophy.captainOrPlayer})</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/60 border border-white/10">
                    <span className="text-stone-400 block text-[10px]">VENUE</span>
                    <span className="font-bold text-white truncate block">{selectedTrophy.venue}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 col-span-2">
                    <span className="text-stone-400 block text-[10px]">RESULT / OPPONENT</span>
                    <span className="font-bold text-[#ffd700]">{selectedTrophy.result} · vs {selectedTrophy.opponentOrScope}</span>
                  </div>
                </div>

                {/* How it was won */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-[#b89758]/30">
                  <span className="text-[10px] font-mono font-bold text-[#e5c378] uppercase block mb-1">
                    HOW IT WAS WON
                  </span>
                  <p className="text-xs sm:text-sm font-serif text-stone-200 leading-relaxed">
                    {selectedTrophy.howWon}
                  </p>
                </div>

                {/* Significance */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block mb-1">
                    HISTORICAL SIGNIFICANCE
                  </span>
                  <p className="text-xs sm:text-sm font-serif text-stone-300 leading-relaxed">
                    {selectedTrophy.significance}
                  </p>
                </div>

                {/* Quote (if present) */}
                {selectedTrophy.quote && (
                  <div className="p-3 rounded-lg bg-[#b89758]/10 border border-[#b89758]/30 italic text-xs font-serif text-[#ffd700]">
                    &ldquo;{selectedTrophy.quote.text}&rdquo;
                    <span className="block mt-1 font-mono text-[10px] text-stone-400 not-italic">
                      — {selectedTrophy.quote.by}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-stone-400">
              <span className="text-[#d4af37] font-bold">
                {selectedTrophy.statsHighlight || "Archival Trophy Vault"}
              </span>
              <button
                onClick={() => setSelectedTrophy(null)}
                className="px-4 py-1.5 rounded-full bg-[#b89758] text-black font-bold uppercase text-xs hover:bg-[#ffd700] transition-colors cursor-pointer"
              >
                BACK TO CABINET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
