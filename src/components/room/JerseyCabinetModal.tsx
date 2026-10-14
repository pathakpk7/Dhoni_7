"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, Shirt, RotateCw, Calendar, Award, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { JERSEYS_VAULT, type JerseyVaultItem } from "@/data/jerseysVault";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface JerseyCabinetModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedJerseyId?: string | null;
}

export const JerseyCabinetModal: React.FC<JerseyCabinetModalProps> = ({
  isOpen,
  onClose,
  initialSelectedJerseyId,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isBackView, setIsBackView] = useState<boolean>(false);
  const [filterTeam, setFilterTeam] = useState<"ALL" | "India" | "CSK" | "IPL_CLT20">("ALL");

  useEffect(() => {
    if (initialSelectedJerseyId) {
      const idx = JERSEYS_VAULT.findIndex((j) => j.id === initialSelectedJerseyId);
      if (idx !== -1) setSelectedIndex(idx);
    }
  }, [initialSelectedJerseyId]);

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
  }, [isOpen, selectedIndex, onClose]);

  if (!isOpen) return null;

  const filteredJerseys = JERSEYS_VAULT.filter((j) => {
    if (filterTeam === "India") return j.team === "India";
    if (filterTeam === "CSK") return j.team === "Chennai Super Kings";
    if (filterTeam === "IPL_CLT20") return j.tournamentType === "IPL" || j.tournamentType === "CLT20";
    return true;
  });

  const currentJersey = JERSEYS_VAULT[selectedIndex] || JERSEYS_VAULT[0];

  const handleNext = () => {
    storyAudio.playTrophyChime();
    setSelectedIndex((prev) => (prev + 1) % JERSEYS_VAULT.length);
    setIsBackView(false);
  };

  const handlePrev = () => {
    storyAudio.playTrophyChime();
    setSelectedIndex((prev) => (prev - 1 + JERSEYS_VAULT.length) % JERSEYS_VAULT.length);
    setIsBackView(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_75%)] pointer-events-none" />

      {/* Main Wardrobe Container */}
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[92vh] rounded-3xl bg-[#0f1117] border-2 border-[#b89758]/50 shadow-[0_30px_90px_rgba(0,0,0,0.98),0_0_60px_rgba(56,189,248,0.2)] flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#141722] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#d4af37] uppercase">
                SANCTUM OF NUMBER 7 · THE JERSEY ARCHIVES
              </span>
              <h2 className="text-base sm:text-xl font-serif font-black text-white">
                MS DHONI&apos;S CAREER JITSU ({JERSEYS_VAULT.length} HISTORIC KITS · 2004–2026)
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close jersey cabinet"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Filter Navigation & Era Quick-Jumper */}
        <div className="px-4 sm:px-6 py-2.5 bg-black/50 border-b border-white/5 flex items-center justify-between gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterTeam("ALL")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                filterTeam === "ALL"
                  ? "bg-[#b89758] text-black font-bold"
                  : "bg-white/5 text-stone-400 hover:text-white"
              }`}
            >
              ALL KITS ({JERSEYS_VAULT.length})
            </button>
            <button
              onClick={() => setFilterTeam("IPL_CLT20")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                filterTeam === "IPL_CLT20"
                  ? "bg-amber-400 text-black font-bold shadow-[0_0_12px_rgba(251,191,36,0.4)]"
                  : "bg-white/5 text-stone-400 hover:text-amber-300"
              }`}
            >
              🟡 IPL & CLT20 ({JERSEYS_VAULT.filter((j) => j.tournamentType === "IPL" || j.tournamentType === "CLT20").length})
            </button>
            <button
              onClick={() => setFilterTeam("India")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                filterTeam === "India"
                  ? "bg-sky-500 text-black font-bold shadow-[0_0_12px_rgba(14,165,233,0.4)]"
                  : "bg-white/5 text-stone-400 hover:text-sky-300"
              }`}
            >
              🇮🇳 INDIA BLUE ({JERSEYS_VAULT.filter((j) => j.team === "India").length})
            </button>

          </div>

          <span className="hidden md:inline text-[11px] font-mono text-stone-400">
            CLICK ANY JERSEY HANGER BELOW TO INSPECT WHICH YEAR IS WHICH
          </span>
        </div>

        {/* Horizontal Jersey Rail (Hanger Wardrobe) */}
        <div className="px-4 sm:px-6 py-3 bg-[#11131a] border-b border-white/10 overflow-x-auto flex items-center gap-3 shrink-0 scrollbar-thin">
          {filteredJerseys.map((jersey, i) => {
            const isSelected = jersey.id === currentJersey.id;
            return (
              <button
                key={jersey.id}
                onClick={() => {
                  storyAudio.playTrophyChime();
                  const targetIdx = JERSEYS_VAULT.findIndex((j) => j.id === jersey.id);
                  setSelectedIndex(targetIdx);
                  setIsBackView(false);
                }}
                className={`group flex flex-col items-center p-2 rounded-xl transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#b89758]/25 border-2 border-[#ffd700] scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    : "bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.08]"
                }`}
              >
                {/* Hanger Hook Icon */}
                <div className="w-5 h-2 border-t-2 border-stone-400 rounded-t-full mb-1" />

                {/* Jersey Miniature Avatar */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-black text-xs shadow-md border"
                  style={{
                    backgroundColor: jersey.primaryColor,
                    borderColor: jersey.accentColor,
                    color: jersey.team === "Chennai Super Kings" ? "#1e3a8a" : "#ffffff",
                  }}
                >
                  7
                </div>

                <span className="text-[10px] font-mono font-bold mt-1 text-white">
                  {jersey.year}
                </span>
                <span className="text-[9px] font-mono text-stone-400 truncate max-w-[70px]">
                  {jersey.team === "India" ? "India" : "CSK"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Display: 3D High-Fidelity Jersey Showcase & Historical Documentation */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-b from-[#0f1117] via-[#141724] to-[#0a0c10]">
          
          {/* Left Column (5 of 12 cols): Interactive Jersey Rendering with Front/Back Toggle */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* 3D Jersey Cutout Canvas */}
            <div
              className="relative w-full max-w-[320px] aspect-[4/5] rounded-3xl p-6 flex flex-col items-center justify-between border-2 shadow-2xl transition-all duration-500 overflow-hidden"
              style={{
                backgroundColor: currentJersey.primaryColor,
                borderColor: currentJersey.accentColor,
                boxShadow: `0 20px 50px ${currentJersey.secondaryColor}66, 0 0 30px ${currentJersey.primaryColor}44`,
              }}
            >
              {/* Fabric Shimmer & Mesh Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25)_0%,transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-black/15 pointer-events-none" />

              {/* Collar / Neck Cutout */}
              <div
                className="w-20 h-7 rounded-b-2xl border-b-4 shadow-inner"
                style={{
                  backgroundColor: currentJersey.secondaryColor,
                  borderColor: currentJersey.accentColor,
                }}
              />

              {/* FRONT VIEW vs BACK VIEW */}
              {!isBackView ? (
                /* FRONT VIEW */
                <div className="w-full flex flex-col items-center justify-center my-auto text-center space-y-4">
                  {/* Top Crest / Stars */}
                  <div className="flex items-center justify-between w-full px-4">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/40 text-white border border-white/20">
                      {currentJersey.team === "India" ? "BCCI" : "CSK LION"}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/40 text-[#ffd700] border border-white/20">
                      YEAR {currentJersey.year}
                    </span>
                  </div>

                  {/* Main Chest Sponsor */}
                  <div className="py-2 px-6 rounded-lg bg-black/35 backdrop-blur-sm border border-white/20 shadow-lg">
                    <span
                      className="font-mono font-black tracking-widest text-lg sm:text-xl drop-shadow"
                      style={{
                        color: currentJersey.team === "Chennai Super Kings" ? "#ffffff" : "#ffffff",
                      }}
                    >
                      {currentJersey.sponsor}
                    </span>
                  </div>

                  {/* Number 7 on Front Right */}
                  <div className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                    7
                  </div>

                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/80 font-bold">
                    OFFICIAL MATCH KIT
                  </span>
                </div>
              ) : (
                /* BACK VIEW (DHONI 7) */
                <div className="w-full flex flex-col items-center justify-center my-auto text-center space-y-2 animate-in fade-in duration-300">
                  {/* Player Name */}
                  <span className="font-mono font-black tracking-[0.25em] text-2xl sm:text-3xl text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                    {currentJersey.playerName}
                  </span>

                  {/* Giant Number 7 */}
                  <span className="font-mono font-black text-7xl sm:text-8xl tracking-tight text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] leading-none">
                    {currentJersey.number}
                  </span>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 font-semibold pt-2">
                    {currentJersey.era}
                  </span>
                </div>
              )}

              {/* Bottom Hem Details */}
              <div className="w-full flex items-center justify-between text-[9px] font-mono text-white/70 px-2 pt-2 border-t border-white/20">
                <span>ATHLETIC FIT #07</span>
                <span>AUTHENTIC RETRO</span>
              </div>
            </div>

            {/* Flip View & Cycle Controls */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
                title="Previous Jersey"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  storyAudio.playTrophyChime();
                  setIsBackView((prev) => !prev);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold text-white transition-all cursor-pointer shadow-md"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>{isBackView ? "SHOW FRONT VIEW" : "SHOW BACK (#7 DHONI)"}</span>
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer"
                title="Next Jersey"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column (7 of 12 cols): Historical Documentation of This Jersey */}
          <div className="lg:col-span-7 space-y-4 text-left">
            
            {/* Header Badge & Title */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#b89758]/20 border border-[#b89758]/40 text-[#ffd700] text-xs font-mono font-bold uppercase">
                  YEAR {currentJersey.year}
                </span>
                <span className="text-xs font-mono text-stone-400">
                  {currentJersey.team} · {currentJersey.tournament}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                {currentJersey.title}
              </h3>
              <p className="text-xs sm:text-sm font-serif italic text-stone-300 mt-1">
                {currentJersey.era}
              </p>
            </div>

            {/* Famous Moment in this Jersey */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-[#b89758]/35">
              <div className="flex items-center gap-2 text-[#ffd700] font-mono text-xs font-bold uppercase mb-1.5">
                <Award className="w-4 h-4" />
                <span>FAMOUS MOMENT IN THIS JERSEY</span>
              </div>
              <p className="text-xs sm:text-sm font-serif text-stone-200 leading-relaxed">
                {currentJersey.famousMoment}
              </p>
            </div>

            {/* Description & Significance */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <span className="text-[10px] font-mono font-bold text-stone-400 uppercase block mb-1">
                JERSEY PROVENANCE & CONTEXT
              </span>
              <p className="text-xs sm:text-sm font-serif text-stone-300 leading-relaxed">
                {currentJersey.description}
              </p>
            </div>

            {/* Design Details Checklist */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10">
              <span className="text-[10px] font-mono font-bold text-[#e5c378] uppercase block mb-2">
                AUTHENTIC DESIGN ELEMENTS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentJersey.designDetails.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-serif text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Match Stats Telemetry */}
            <div className="p-3 rounded-lg bg-[#b89758]/10 border border-[#b89758]/30 flex items-center justify-between text-xs font-mono text-[#ffd700]">
              <span className="font-bold">STATS IN THIS KIT:</span>
              <span className="text-stone-300">{currentJersey.statsInJersey}</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="px-6 py-2.5 bg-[#141722] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-stone-400 shrink-0">
          <span>JERSEY #{selectedIndex + 1} OF {JERSEYS_VAULT.length}</span>
          <span className="hidden sm:inline">USE ARROW KEYS OR SWIPE TO BROWSE KITS</span>
        </footer>
      </div>
    </div>
  );
};
