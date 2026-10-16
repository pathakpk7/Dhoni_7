"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles,
  Layers,
  RotateCw,
  Trophy,
} from "lucide-react";
import { JERSEYS_VAULT } from "@/data/jerseysVault";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface IndiaJerseyCabinetDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialJerseyId?: string;
}

export const IndiaJerseyCabinetDetailModal: React.FC<IndiaJerseyCabinetDetailModalProps> = ({
  isOpen,
  onClose,
  initialJerseyId,
}) => {
  const indiaJerseys = useMemo(
    () => JERSEYS_VAULT.filter((j) => j.team === "India"),
    []
  );

  const [categoryFilter, setCategoryFilter] = useState<"ALL" | "ICC_TROPHIES" | "WORLD_CUPS">("ALL");

  const filteredJerseys = useMemo(() => {
    if (categoryFilter === "ICC_TROPHIES") {
      return indiaJerseys.filter(
        (j) =>
          j.id === "jersey_2007_t20_wc" ||
          j.id === "jersey_2011_world_cup" ||
          j.id === "jersey_2013_champions_trophy"
      );
    }
    if (categoryFilter === "WORLD_CUPS") {
      return indiaJerseys.filter(
        (j) =>
          j.tournamentType === "ICC_WORLD_CUP" ||
          j.tournamentType === "ASIA_CUP"
      );
    }
    return indiaJerseys;
  }, [indiaJerseys, categoryFilter]);

  const [selectedJerseyId, setSelectedJerseyId] = useState<string>(
    initialJerseyId || indiaJerseys[0]?.id || "jersey_2011_world_cup"
  );
  const [viewSide, setViewSide] = useState<"front" | "back">("front");

  useEffect(() => {
    if (initialJerseyId) {
      setSelectedJerseyId(initialJerseyId);
    }
  }, [initialJerseyId]);

  // Ensure selected jersey is valid within filtered subset
  useEffect(() => {
    if (!filteredJerseys.some((j) => j.id === selectedJerseyId)) {
      if (filteredJerseys.length > 0) {
        setSelectedJerseyId(filteredJerseys[0].id);
      }
    }
  }, [categoryFilter, filteredJerseys, selectedJerseyId]);

  const currentJersey =
    filteredJerseys.find((j) => j.id === selectedJerseyId) ||
    indiaJerseys.find((j) => j.id === selectedJerseyId) ||
    filteredJerseys[0] ||
    indiaJerseys[0];

  const currentIndex = Math.max(
    0,
    filteredJerseys.findIndex((j) => j.id === currentJersey?.id)
  );

  const handlePrev = () => {
    storyAudio.playTurn();
    const prevIdx = (currentIndex - 1 + filteredJerseys.length) % filteredJerseys.length;
    setSelectedJerseyId(filteredJerseys[prevIdx].id);
  };

  const handleNext = () => {
    storyAudio.playTurn();
    const nextIdx = (currentIndex + 1) % filteredJerseys.length;
    setSelectedJerseyId(filteredJerseys[nextIdx].id);
  };

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
  }, [isOpen, selectedJerseyId, currentIndex, filteredJerseys]);

  if (!isOpen || !currentJersey) return null;

  const isIccTrophy = (id: string) => {
    return (
      id === "jersey_2007_t20_wc" ||
      id === "jersey_2011_world_cup" ||
      id === "jersey_2013_champions_trophy"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 p-2 sm:p-4 overflow-y-auto">
      {/* Ambient background lighting */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/15 via-neutral-950/90 to-black" />

      {/* Main Responsive Modal Shell */}
      <div className="relative w-full max-w-7xl max-h-[96vh] sm:max-h-[94vh] bg-neutral-950 border-2 border-blue-500/40 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(37,99,235,0.2)] flex flex-col overflow-hidden my-auto z-10">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-blue-500/30 bg-neutral-900/90 shrink-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => {
                storyAudio.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-blue-500/30 text-blue-300 text-xs tracking-wider uppercase font-mono transition-colors shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <div className="hidden sm:block h-4 w-px bg-neutral-800 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] tracking-widest text-blue-400/80 font-mono uppercase block truncate">
                The National Archive · 2004–2019
              </span>
              <h2 className="text-sm sm:text-lg font-serif text-blue-100 flex items-center gap-1.5 font-bold truncate">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
                <span className="truncate">Indian National Team Jersey Vault</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => {
                storyAudio.playClick();
                setViewSide((prev) => (prev === "front" ? "back" : "front"));
              }}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/40 text-blue-200 text-xs font-mono transition-colors cursor-pointer"
            >
              <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Flip:</span>
              <span>{viewSide === "front" ? "Back #7" : "Front"}</span>
            </button>
            <button
              onClick={() => {
                storyAudio.playClick();
                onClose();
              }}
              className="p-1.5 sm:p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar: All (11) | ICC World Trophies (3) | World Cups (5) */}
        <div className="px-3 sm:px-6 py-2 border-b border-neutral-900 bg-neutral-950/90 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => {
                storyAudio.playClick();
                setCategoryFilter("ALL");
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === "ALL"
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                  : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              All 11 National Kits ({indiaJerseys.length})
            </button>
            <button
              onClick={() => {
                storyAudio.playClick();
                setCategoryFilter("ICC_TROPHIES");
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === "ICC_TROPHIES"
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                  : "bg-neutral-900 text-neutral-400 hover:text-blue-300 border border-neutral-800"
              }`}
            >
              ICC Trophy Victories (3)
            </button>
            <button
              onClick={() => {
                storyAudio.playClick();
                setCategoryFilter("WORLD_CUPS");
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === "WORLD_CUPS"
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                  : "bg-neutral-900 text-neutral-400 hover:text-blue-300 border border-neutral-800"
              }`}
            >
              World Cup Editions (5)
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-blue-400/80">
            <span>Kit {currentIndex + 1} of {filteredJerseys.length}</span>
          </div>
        </div>

        {/* Horizontal Timeline Scrubber of all Indian Journey Jerseys */}
        <div className="px-3 sm:px-6 py-2 border-b border-blue-900/30 bg-neutral-900/50 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          {filteredJerseys.map((jersey) => {
            const isSelected = jersey.id === currentJersey.id;
            const trophy = isIccTrophy(jersey.id);

            return (
              <button
                key={jersey.id}
                onClick={() => {
                  storyAudio.playTurn();
                  setSelectedJerseyId(jersey.id);
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white font-bold border-blue-400 shadow-md shadow-blue-500/30 scale-105"
                    : "bg-neutral-900/80 hover:bg-neutral-850 text-neutral-300 border-neutral-800 hover:border-blue-500/40"
                }`}
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    isSelected ? "bg-white text-blue-900" : "bg-neutral-800 text-blue-400"
                  }`}
                >
                  {jersey.year}
                </span>
                <span className="truncate max-w-[130px] sm:max-w-[180px]">
                  {jersey.title.replace(/^The\s+/, "")}
                </span>
                {trophy && (
                  <Trophy
                    className={`w-3 h-3 shrink-0 ${
                      isSelected ? "text-amber-300 fill-amber-300" : "text-amber-400 fill-amber-400"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Body: Scrollable on mobile, Split grid on large screens */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
            
            {/* Left Column: Authentic Jersey View / Interactive Frame */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-neutral-900 via-blue-950/20 to-neutral-950 border border-blue-500/30 relative overflow-hidden shadow-2xl">
              {/* Blue Ambient Spotlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-64 bg-blue-500/20 blur-3xl pointer-events-none rounded-full" />

              {/* Navigation Bar inside Left Showcase */}
              <div className="w-full flex items-center justify-between text-xs font-mono text-neutral-400 mb-3 z-10">
                <button
                  onClick={handlePrev}
                  className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">PREV</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {isIccTrophy(currentJersey.id) && (
                    <div className="flex items-center gap-1 bg-amber-950/90 px-2 py-0.5 rounded-full border border-amber-500/40 text-amber-300">
                      <Sparkles className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold">ICC CROWN</span>
                    </div>
                  )}
                  <span className="text-[11px] font-bold text-blue-300 font-mono bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                    {currentJersey.year}
                  </span>
                </div>

                <button
                  onClick={handleNext}
                  className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="hidden sm:inline">NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Front View: Real Authentic Kit Image or Clean Back View */}
              {viewSide === "front" ? (
                <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden flex items-center justify-center p-2 z-10">
                  {currentJersey.imageSrc ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
                      <Image
                        src={currentJersey.imageSrc}
                        alt={currentJersey.title}
                        fill
                        sizes="(max-width: 640px) 320px, (max-width: 1024px) 360px, 380px"
                        className="object-contain object-center drop-shadow-[0_20px_45px_rgba(37,99,235,0.45)] transform hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full h-full rounded-2xl relative shadow-2xl flex flex-col justify-between p-4 sm:p-6 transition-all duration-500"
                      style={{
                        backgroundColor: currentJersey.primaryColor,
                        borderColor: currentJersey.secondaryColor,
                        borderWidth: 2,
                        boxShadow: `0 20px 50px -10px ${currentJersey.primaryColor}40`,
                      }}
                    >
                      {/* Collar and Neck */}
                      <div className="flex justify-between items-start">
                        <div className="w-10 sm:w-12 h-5 sm:h-6 border-b-2 border-white/40 rounded-b-xl" />
                        <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-white/70">
                          OFFICIAL ON-FIELD
                        </div>
                        <div className="w-10 sm:w-12 h-5 sm:h-6 border-b-2 border-white/40 rounded-b-xl" />
                      </div>

                      {/* Chest Sponsor & Crest */}
                      <div className="flex flex-col items-center justify-center text-center my-auto">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-900/80 border border-amber-400 flex items-center justify-center mb-2 sm:mb-3 shadow-md">
                          <span className="text-[9px] sm:text-[10px] text-amber-300 font-bold tracking-tighter">BCCI</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-widest text-white drop-shadow-md">
                          {currentJersey.sponsor}
                        </h3>
                        <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-300/90 bg-black/40 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-amber-400/20">
                          {currentJersey.tournament}
                        </div>
                      </div>

                      {/* Jersey Hem & Tech Badge */}
                      <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-white/60 border-t border-white/20 pt-2">
                        <span>SIZE: 42 (L)</span>
                        <span className="text-amber-300 font-semibold">AUTHENTIC PLAYER SPEC</span>
                        <span>{currentJersey.year}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Back View with #7 DHONI */
                <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden flex items-center justify-center p-2 z-10">
                  <div
                    className="w-full h-full rounded-2xl relative shadow-2xl flex flex-col justify-between p-5 sm:p-6 transition-all duration-500 border border-blue-400/30"
                    style={{
                      backgroundColor: currentJersey.primaryColor,
                      boxShadow: `0 20px 50px -10px ${currentJersey.primaryColor}50`,
                    }}
                  >
                    {/* Back Neck Line */}
                    <div className="flex justify-between items-center">
                      <div className="w-8 sm:w-10 h-3 border-b-2 border-white/30 rounded-b-lg" />
                      <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-white/80 uppercase">
                        OFFICIAL PLAYER ISSUE · SIZE 42
                      </div>
                      <div className="w-8 sm:w-10 h-3 border-b-2 border-white/30 rounded-b-lg" />
                    </div>

                    {/* Back Name & Number */}
                    <div className="flex flex-col items-center justify-center text-center my-auto py-2">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-widest text-white uppercase drop-shadow-md font-sans">
                        {currentJersey.playerName}
                      </h3>
                      <div className="text-7xl sm:text-8xl md:text-9xl font-black text-amber-300 drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)] font-mono leading-none tracking-tight my-1 sm:my-2">
                        {currentJersey.number}
                      </div>
                      <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/90 bg-black/40 px-3 py-1 rounded-full border border-white/20 mt-1">
                        {currentJersey.tournament}
                      </div>
                    </div>

                    {/* Bottom details */}
                    <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-white/70 border-t border-white/20 pt-2.5">
                      <span>TEAM INDIA</span>
                      <span className="text-amber-300 font-bold">THE FINISHER</span>
                      <span>{currentJersey.year}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick side toggle indicator */}
              <div className="mt-3 flex items-center gap-2 text-xs font-mono text-neutral-400 z-10">
                <span className={viewSide === "front" ? "text-blue-400 font-bold" : ""}>FRONT VIEW</span>
                <span>/</span>
                <span className={viewSide === "back" ? "text-amber-400 font-bold" : ""}>BACK (#7 DHONI)</span>
              </div>
            </div>

            {/* Right: Rich Historical Storytelling & Design Telemetry */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4 pt-4 lg:pt-0 lg:pl-6 text-left">
              <div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] sm:text-xs font-mono font-medium">
                    {currentJersey.era}
                  </span>
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] sm:text-xs font-mono">
                    {currentJersey.tournament}
                  </span>
                  {isIccTrophy(currentJersey.id) && (
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] sm:text-xs font-mono flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      ICC World Champions
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                  {currentJersey.title}
                </h1>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans mb-3 sm:mb-4">
                  {currentJersey.description}
                </p>

                {/* Iconic Moment Card */}
                <div className="p-3 sm:p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-blue-400 uppercase tracking-wider mb-1 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    Iconic Moment in This Kit
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100 font-sans italic">
                    &ldquo;{currentJersey.famousMoment}&rdquo;
                  </p>
                </div>

                {/* Design Details & Tailoring */}
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-[11px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-neutral-500" />
                    Fabric & Design Anatomy
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {currentJersey.designDetails.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 bg-neutral-950/40 p-2 rounded-lg border border-neutral-800/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Match Stats */}
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400">
                  <span className="text-amber-400 font-semibold">CAREER TELEMETRY IN KIT: </span>
                  <span>{currentJersey.statsInJersey}</span>
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="pt-3 sm:pt-4 border-t border-neutral-800 flex items-center justify-between gap-2">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Era</span>
                </button>

                <span className="text-[11px] sm:text-xs font-mono text-neutral-500">
                  {currentIndex + 1} of {filteredJerseys.length}
                </span>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-mono text-white font-semibold transition-colors cursor-pointer"
                >
                  <span>Next Era</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
