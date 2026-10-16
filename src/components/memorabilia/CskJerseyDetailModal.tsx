"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  Crown,
  Sparkles,
  RotateCw,
  Trophy,
  Flame,
  Shield,
  Star,
  Layers,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { JERSEYS_VAULT, type JerseyVaultItem } from "@/data/jerseysVault";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface CskJerseyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: "IPL" | "CLT20" | "ALL" | string;
  initialJerseyId?: string;
}

export const CskJerseyDetailModal: React.FC<CskJerseyDetailModalProps> = ({
  isOpen,
  onClose,
  initialType = "ALL",
  initialJerseyId,
}) => {
  // All CSK and franchise jerseys in chronological sequence
  const cskJerseys = JERSEYS_VAULT.filter(
    (j) => j.team === "Chennai Super Kings" || j.team === "Rising Pune Supergiant"
  );

  const [categoryFilter, setCategoryFilter] = useState<"ALL" | "IPL" | "CLT20">("ALL");
  const [selectedJerseyId, setSelectedJerseyId] = useState<string>(
    initialJerseyId || "jersey_2023_csk_5th_crown"
  );
  const [viewSide, setViewSide] = useState<"front" | "back">("front");

  useEffect(() => {
    if (initialJerseyId) {
      setSelectedJerseyId(initialJerseyId);
    } else if (initialType === "CLT20") {
      setCategoryFilter("CLT20");
      setSelectedJerseyId("jersey_2014_clt20_champions");
    } else if (initialType === "IPL") {
      setCategoryFilter("IPL");
      setSelectedJerseyId("jersey_2023_csk_5th_crown");
    } else {
      setCategoryFilter("ALL");
    }
  }, [initialType, initialJerseyId, isOpen]);

  const filteredJerseys = cskJerseys.filter((j) => {
    if (categoryFilter === "IPL") return j.tournamentType === "IPL" && j.team === "Chennai Super Kings";
    if (categoryFilter === "CLT20") return j.tournamentType === "CLT20";
    return true;
  });

  const activeJersey =
    filteredJerseys.find((j) => j.id === selectedJerseyId) ||
    cskJerseys.find((j) => j.id === selectedJerseyId) ||
    filteredJerseys[0] ||
    cskJerseys[0];

  const currentIndex = filteredJerseys.findIndex((j) => j.id === activeJersey.id);

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

  if (!isOpen) return null;

  // Star counts for respective eras
  const getStarCount = (jerseyId: string) => {
    if (jerseyId.includes("2024") || jerseyId.includes("2023")) return 5;
    if (jerseyId.includes("2021")) return 4;
    if (jerseyId.includes("2018")) return 3;
    if (jerseyId.includes("2014")) return 2;
    if (jerseyId.includes("2011") || jerseyId.includes("2010")) return 1;
    return 0;
  };

  const starCount = getStarCount(activeJersey.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 p-2 sm:p-4 overflow-y-auto">
      {/* Amber Radiance Background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/15 via-neutral-950/90 to-black" />

      {/* Main Responsive Modal Shell */}
      <div className="relative w-full max-w-7xl max-h-[96vh] sm:max-h-[94vh] bg-neutral-950 border-2 border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(245,158,11,0.2)] flex flex-col overflow-hidden my-auto z-10">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-amber-500/30 bg-neutral-900/90 shrink-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => {
                storyAudio.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-amber-500/30 text-amber-300 text-xs tracking-wider uppercase font-mono transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <div className="hidden sm:block h-4 w-px bg-neutral-800 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] tracking-widest text-amber-500/80 font-mono uppercase block truncate">
                Chennai Super Kings · Chepauk Fortress Archive
              </span>
              <h2 className="text-sm sm:text-lg font-serif text-amber-100 flex items-center gap-1.5 font-bold truncate">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                <span className="truncate">The Canary Yellow Dynasty (2008–2026)</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => {
                storyAudio.playClick();
                setViewSide((prev) => (prev === "front" ? "back" : "front"));
              }}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 text-amber-200 text-xs font-mono transition-colors"
            >
              <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Flip:</span>
              <span>{viewSide === "front" ? "Back #7" : "Front"}</span>
            </button>
            <button
              onClick={() => {
                storyAudio.playClick();
                onClose();
              }}
              className="p-1.5 sm:p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar: All (10) | IPL Champions (5) | CLT20 (2) */}
        <div className="px-3 sm:px-6 py-2 border-b border-neutral-900 bg-neutral-950/90 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => {
                storyAudio.playClick();
                setCategoryFilter("ALL");
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                categoryFilter === "ALL"
                  ? "bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              All 10 Journey Kits ({cskJerseys.length})
            </button>
            <button
              onClick={() => {
                storyAudio.playClick();
                setCategoryFilter("IPL");
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                categoryFilter === "IPL"
                  ? "bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-neutral-900 text-neutral-400 hover:text-amber-300 border border-neutral-800"
              }`}
            >
              IPL Editions (5 Titles)
            </button>
            <button
              onClick={() => {
                storyAudio.playClick();
                setCategoryFilter("CLT20");
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                categoryFilter === "CLT20"
                  ? "bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-neutral-900 text-neutral-400 hover:text-amber-300 border border-neutral-800"
              }`}
            >
              CLT20 Champions (2 Titles)
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-amber-400/80">
            <span>Kit {currentIndex + 1} of {filteredJerseys.length}</span>
          </div>
        </div>

        {/* Horizontal Timeline Scrubber of all CSK Journey Jerseys */}
        <div className="px-3 sm:px-6 py-2 border-b border-amber-900/30 bg-neutral-900/50 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          {filteredJerseys.map((jersey, idx) => {
            const isSelected = jersey.id === activeJersey.id;
            const isChamp =
              jersey.id.includes("champions") ||
              jersey.id.includes("defense") ||
              jersey.id.includes("comeback") ||
              jersey.id.includes("camo") ||
              jersey.id.includes("5th_crown");

            return (
              <button
                key={jersey.id}
                onClick={() => {
                  storyAudio.playTurn();
                  setSelectedJerseyId(jersey.id);
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                  isSelected
                    ? "bg-amber-500 text-neutral-950 font-bold border-amber-400 shadow-md shadow-amber-500/30 scale-105"
                    : "bg-neutral-900/80 hover:bg-neutral-850 text-neutral-300 border-neutral-800 hover:border-amber-500/40"
                }`}
              >
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  isSelected ? "bg-neutral-950 text-amber-300" : "bg-neutral-800 text-amber-400"
                }`}>
                  {jersey.year}
                </span>
                <span className="truncate max-w-[130px] sm:max-w-[180px]">
                  {jersey.title.split(":")[1]?.trim() || jersey.title}
                </span>
                {isChamp && (
                  <Star className={`w-3 h-3 shrink-0 ${isSelected ? "fill-neutral-950 text-neutral-950" : "fill-amber-400 text-amber-400"}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Body: Scrollable on mobile, Split grid on large screens */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
            
            {/* Left Column: Authentic Jersey View / Interactive Frame */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-neutral-900 via-amber-950/20 to-neutral-950 border border-amber-500/30 relative overflow-hidden shadow-2xl">
              {/* Golden Ambient Spotlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-64 bg-amber-400/15 blur-3xl pointer-events-none rounded-full" />

              {/* Navigation Bar inside Left Showcase */}
              <div className="w-full flex items-center justify-between text-xs font-mono text-neutral-400 mb-3 z-10">
                <button
                  onClick={handlePrev}
                  className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">PREV</span>
                </button>

                <div className="flex items-center gap-1">
                  {starCount > 0 && (
                    <div className="flex items-center gap-0.5 bg-neutral-950/90 px-2 py-0.5 rounded-full border border-amber-500/30 text-amber-400">
                      {Array.from({ length: starCount }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                      <span className="text-[10px] font-bold ml-1">{starCount}★</span>
                    </div>
                  )}
                  <span className="text-[11px] font-bold text-amber-300 font-mono">
                    {activeJersey.year}
                  </span>
                </div>

                <button
                  onClick={handleNext}
                  className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1 transition-colors"
                >
                  <span className="hidden sm:inline">NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Front View: Real Authentic Kit Image */}
              {viewSide === "front" ? (
                <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden flex items-center justify-center p-2 z-10">
                  {activeJersey.imageSrc ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
                      <Image
                        src={activeJersey.imageSrc}
                        alt={activeJersey.title}
                        fill
                        sizes="(max-width: 640px) 280px, 320px"
                        className="object-contain object-center drop-shadow-[0_15px_30px_rgba(234,179,8,0.35)] transform hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    </div>
                  ) : (
                    /* Fallback stylized jersey card */
                    <div className="w-full h-full rounded-2xl relative shadow-2xl flex flex-col justify-between p-6 bg-[#eab308] border-2 border-[#1e3a8a] text-neutral-950">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: starCount || 1 }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-900 text-amber-900" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-900/70">
                          WHISTLE PODU
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center my-auto">
                        <Flame className="w-12 h-12 text-red-600 mb-2" />
                        <h3 className="text-2xl font-black tracking-wider text-blue-950">
                          {activeJersey.sponsor}
                        </h3>
                        <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-neutral-800 mt-1">
                          {activeJersey.team}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-900 font-bold border-t border-neutral-900/20 pt-2">
                        <span>CAPTAIN: MS DHONI</span>
                        <span>#7</span>
                      </div>
                    </div>
                  )}

                  {/* Watermark badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-amber-300 border border-amber-500/30">
                    AUTHENTIC KIT
                  </div>
                </div>
              ) : (
                /* Back View: Iconic #7 DHONI */
                <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden flex items-center justify-center p-2 z-10">
                  <div
                    className="w-full h-full rounded-2xl relative shadow-2xl flex flex-col justify-between p-6 bg-[#eab308] border-2 border-[#1e3a8a] text-neutral-950"
                    style={{
                      boxShadow: "0 20px 50px -10px rgba(234, 179, 8, 0.4)",
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono tracking-widest text-neutral-900/70 font-bold">
                        CHENNAI SUPER KINGS
                      </span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: starCount || 1 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-neutral-950 text-neutral-950" />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center text-center my-auto">
                      <h3 className="text-3xl sm:text-4xl font-black tracking-widest text-blue-950 uppercase font-sans">
                        DHONI
                      </h3>
                      <div className="text-8xl sm:text-9xl font-black text-blue-950 font-mono leading-none tracking-tight">
                        7
                      </div>
                      <span className="text-[11px] font-mono font-bold tracking-widest text-neutral-800 uppercase mt-1">
                        THALA · LEADER OF CHEPAUK
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-900 font-bold border-t border-neutral-900/20 pt-2">
                      <span>5x IPL CHAMPIONS</span>
                      <span>2x CLT20 TITLES</span>
                    </div>
                  </div>
                </div>
              )}

              {/* View Toggle Bar */}
              <div className="w-full pt-3 mt-2 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400 z-10">
                <span className="text-amber-400 font-bold">{activeJersey.tournament}</span>
                <button
                  onClick={() => setViewSide((prev) => (prev === "front" ? "back" : "front"))}
                  className="text-neutral-300 hover:text-white underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCw className="w-3 h-3 text-amber-400" />
                  <span>{viewSide === "front" ? "View Back #7" : "View Front"}</span>
                </button>
              </div>
            </div>

            {/* Right Column: History, Folklore & Specifications */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                {/* Era & Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                    {activeJersey.era}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-mono">
                    Season: {activeJersey.year}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-blue-950/60 text-blue-300 border border-blue-500/30 text-xs font-mono">
                    {activeJersey.team}
                  </span>
                </div>

                <h1 className="text-xl sm:text-3xl font-serif font-black text-amber-100 mb-2 leading-tight">
                  {activeJersey.title}
                </h1>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans mb-4">
                  {activeJersey.description}
                </p>

                {/* Whistle Podu Folklore Card */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-neutral-900 border border-amber-500/30 mb-4 shadow-lg">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Whistle Podu Folklore & Iconic Moment</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-100/90 font-sans italic leading-relaxed">
                    &ldquo;{activeJersey.famousMoment}&rdquo;
                  </p>
                </div>

                {/* Key Details & Tailoring Grid */}
                <div className="mb-4">
                  <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Key Design & Tailoring Features</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {activeJersey.designDetails.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-800"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span className="leading-tight">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Official Record In Kit */}
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs font-mono space-y-1">
                  <div className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>STATISTICAL CAMPAIGN & RECORD:</span>
                  </div>
                  <p className="text-neutral-300 font-sans text-xs">
                    {activeJersey.statsInJersey}
                  </p>
                </div>
              </div>

              {/* Bottom Footer Info Plate */}
              <div className="pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">Sponsor:</span>
                  <span className="text-white font-bold">{activeJersey.sponsor}</span>
                </div>
                <div className="text-amber-400 font-semibold">
                  #7 · Anbuden Thala Dhoni
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
