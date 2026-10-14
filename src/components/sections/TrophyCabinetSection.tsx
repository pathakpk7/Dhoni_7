"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Trophy, Award, Crown, CheckCircle2, Sparkles, ChevronDown, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TROPHIES_VAULT, type TrophyVaultItem } from "@/data/trophiesVault";
import { TrophyCabinetModal } from "@/components/room/TrophyCabinetModal";
import { storyAudio } from "@/components/storybook/StoryAudio";

export const TrophyCabinetSection: React.FC = () => {
  const [filterTeam, setFilterTeam] = useState<"ALL" | "India" | "CSK">("ALL");
  const [isCabinetModalOpen, setIsCabinetModalOpen] = useState<boolean>(false);
  const [selectedTrophyId, setSelectedTrophyId] = useState<string | null>(null);

  const filteredTrophies = TROPHIES_VAULT.filter((t) => {
    if (filterTeam === "India") return t.team === "India";
    if (filterTeam === "CSK") return t.team === "Chennai Super Kings";
    return true;
  });

  const handleOpenTrophyDetail = (trophyId: string) => {
    storyAudio.playTrophyChime();
    setSelectedTrophyId(trophyId);
    setIsCabinetModalOpen(true);
  };

  const handleOpenFullCabinet = () => {
    storyAudio.playBookThudSound();
    setSelectedTrophyId(null);
    setIsCabinetModalOpen(true);
  };

  return (
    <section id="trophies" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative text-left">
      <SectionHeader
        badge="CHAPTER VI · THE VAULT"
        title="THE SILVERWARE CABINET"
        subtitle="“Silverware earned, not borrowed. 29 Trophies, Shields, Maces and National Honours in chronological glory.”"
        accentColor="gold"
        bgImage="/images/trophies/dhoni_icc_trifecta_vault.jpg"
        bgOpacity="opacity-40 sm:opacity-35"
      />

      {/* Flagship Call-to-Action: Dual-Plank Trophy Cabinet Opening */}
      <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1c140d] via-[#120d08] to-[#1c140d] border-2 border-[#b89758]/50 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.2)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-[#b89758]/20 border border-[#b89758]/40 text-[#ffd700] shrink-0">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#d4af37] uppercase">
              INTERACTIVE 3D ARTIFACT
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-white mt-0.5">
              DUAL-PLANK OPENING TROPHY CABINET
            </h3>
            <p className="text-xs sm:text-sm font-serif text-stone-300 mt-1 max-w-xl">
              Click to swing open both planks of the cabinet in 3D. Explore all 29 trophies arranged in the exact order of when won with match-winning breakdowns.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenFullCabinet}
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#b89758] via-[#ffd700] to-[#b89758] text-black font-serif font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>SWING OPEN CABINET PLANKS</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
        <button
          onClick={() => setFilterTeam("ALL")}
          className={cn(
            "px-5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer",
            filterTeam === "ALL"
              ? "bg-[#b89758] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              : "bg-white/5 text-slate-400 hover:text-white"
          )}
        >
          ALL CHRONOLOGICAL TITLES ({TROPHIES_VAULT.length})
        </button>
        <button
          onClick={() => setFilterTeam("India")}
          className={cn(
            "px-5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer",
            filterTeam === "India"
              ? "bg-sky-500 text-black font-bold shadow-[0_0_15px_rgba(14,165,233,0.4)]"
              : "bg-white/5 text-slate-400 hover:text-sky-400"
          )}
        >
          <span>🇮🇳 INDIA TITLES ({TROPHIES_VAULT.filter((t) => t.team === "India").length})</span>
        </button>
        <button
          onClick={() => setFilterTeam("CSK")}
          className={cn(
            "px-5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer",
            filterTeam === "CSK"
              ? "bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)]"
              : "bg-white/5 text-slate-400 hover:text-amber-400"
          )}
        >
          <span>🟡 CSK TITLES ({TROPHIES_VAULT.filter((t) => t.team === "Chennai Super Kings").length})</span>
        </button>
      </div>

      {/* Trophy Cards Grid - Displaying Each Trophy with Cutout PNG and How/When Won details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {filteredTrophies.map((trophy, idx) => {
          const isIndia = trophy.team === "India";
          const isCSK = trophy.team === "Chennai Super Kings";

          return (
            <div
              key={trophy.id}
              onClick={() => handleOpenTrophyDetail(trophy.id)}
              className={cn(
                "group relative rounded-3xl bg-surface/95 border p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl cursor-pointer hover:-translate-y-2 select-none",
                isIndia
                  ? "border-sky-500/30 hover:border-sky-400 shadow-glow-blue"
                  : isCSK
                  ? "border-amber-500/30 hover:border-amber-400 shadow-glow-gold"
                  : "border-[#b89758]/30 hover:border-[#ffd700]"
              )}
            >
              {/* Top ambient glow */}
              <div
                className={cn(
                  "absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity",
                  isIndia ? "bg-sky-500" : isCSK ? "bg-amber-400" : "bg-[#ffd700]"
                )}
              />

              <div className="space-y-4 relative z-10">
                {/* Year Badge & Category */}
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-mono font-bold uppercase",
                      isIndia
                        ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
                        : isCSK
                        ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                        : "bg-[#b89758]/20 text-[#ffd700] border border-[#b89758]/40"
                    )}
                  >
                    #{idx + 1} · {trophy.year}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px]">
                    {trophy.category.replace("_", " ")}
                  </span>
                </div>

                {/* Trophy Cutout Image */}
                <div className="relative w-full h-44 rounded-2xl bg-black/60 border border-white/10 p-3 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-[#ffd700]/50 transition-colors">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
                  <div className="relative w-full h-full">
                    <Image
                      src={trophy.cutoutUrl}
                      alt={trophy.name}
                      fill
                      sizes="(max-width: 768px) 200px, 300px"
                      className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Title and Opponent */}
                <div>
                  <h4 className="text-lg sm:text-xl font-serif font-black text-white group-hover:text-[#ffd700] transition-colors leading-snug">
                    {trophy.name}
                  </h4>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    {trophy.exactDate} · {trophy.venue}
                  </p>
                </div>

                {/* How it was won preview */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-serif text-slate-300 leading-relaxed line-clamp-3">
                  <span className="text-[#d4af37] font-bold font-mono text-[10px] block mb-0.5">
                    HOW IT WAS WON:
                  </span>
                  {trophy.howWon}
                </div>
              </div>

              {/* Card Footer with Click Action */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 truncate max-w-[160px]">
                  {trophy.result}
                </span>
                <span className="text-[#ffd700] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  DETAILS <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dual-Plank Modal */}
      <TrophyCabinetModal
        isOpen={isCabinetModalOpen}
        onClose={() => setIsCabinetModalOpen(false)}
        initialSelectedTrophyId={selectedTrophyId}
      />
    </section>
  );
};
