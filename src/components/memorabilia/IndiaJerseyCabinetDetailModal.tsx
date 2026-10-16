"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles,
  Calendar,
  Layers,
  RotateCw,
  Award,
} from "lucide-react";
import { JERSEYS_VAULT, type JerseyVaultItem } from "@/data/jerseysVault";
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
  const indiaJerseys = JERSEYS_VAULT.filter((j) => j.team === "India");

  const [selectedJerseyId, setSelectedJerseyId] = useState<string>(
    initialJerseyId || indiaJerseys[0]?.id || "jersey_2011_world_cup"
  );
  const [viewSide, setViewSide] = useState<"front" | "back">("front");

  useEffect(() => {
    if (initialJerseyId) {
      setSelectedJerseyId(initialJerseyId);
    }
  }, [initialJerseyId]);

  const currentJersey =
    indiaJerseys.find((j) => j.id === selectedJerseyId) || indiaJerseys[0];
  const currentIndex = indiaJerseys.findIndex((j) => j.id === currentJersey.id);

  const handlePrev = () => {
    storyAudio.playTurn();
    const prevIdx = (currentIndex - 1 + indiaJerseys.length) % indiaJerseys.length;
    setSelectedJerseyId(indiaJerseys[prevIdx].id);
  };

  const handleNext = () => {
    storyAudio.playTurn();
    const nextIdx = (currentIndex + 1) % indiaJerseys.length;
    setSelectedJerseyId(indiaJerseys[nextIdx].id);
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
  }, [isOpen, selectedJerseyId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Ambient background lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/30 via-neutral-950/90 to-black -z-10" />

      {/* Main Modal Shell */}
      <div className="relative w-full max-w-7xl max-h-[96vh] sm:max-h-[94vh] bg-[#0c1017] border border-blue-500/30 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(37,99,235,0.15)] overflow-hidden my-auto flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-blue-900/40 px-3 sm:px-6 py-3 bg-[#0f1420] gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => {
                storyAudio.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-blue-500/30 text-blue-300 text-xs tracking-wider uppercase font-mono transition-colors shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Back</span>
            </button>
            <div className="hidden sm:block h-4 w-px bg-neutral-800 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] tracking-widest text-blue-400 font-mono uppercase block truncate">
                The National Archive · 2004–2019
              </span>
              <h2 className="text-xs sm:text-base font-serif text-white flex items-center gap-1.5 font-bold truncate">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
                <span className="truncate">Indian Cricket Jersey Wardrobe</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => {
                storyAudio.playClick();
                setViewSide((prev) => (prev === "front" ? "back" : "front"));
              }}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-200 text-xs font-mono transition-colors cursor-pointer"
            >
              <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Flip:</span>
              <span className="font-bold">{viewSide === "front" ? "Back #7" : "Front"}</span>
            </button>
            <button
              onClick={() => {
                storyAudio.playClick();
                onClose();
              }}
              className="p-1.5 sm:p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.15] border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close jersey cabinet"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Chronological Ribbon */}
        <div className="px-3 sm:px-6 py-2 bg-[#090c12] border-b border-blue-900/20 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
            {indiaJerseys.map((jersey, idx) => (
              <button
                key={jersey.id}
                onClick={() => {
                  storyAudio.playClick();
                  setSelectedJerseyId(jersey.id);
                }}
                className={`flex-shrink-0 snap-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedJerseyId === jersey.id
                    ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30 border border-blue-400"
                    : "bg-neutral-900/80 text-neutral-400 hover:text-blue-200 hover:bg-neutral-800 border border-neutral-800/80"
                }`}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: jersey.primaryColor }} />
                <span>{jersey.year}</span>
                <span className="text-[10px] text-blue-300/80 hidden md:inline">
                  {jersey.tournament.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Body: Glass Showcase & Storytelling */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-blue-900/20">
          {/* Left: Jersey Glass Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-between p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-neutral-900/90 via-blue-950/20 to-neutral-950 border border-blue-900/30 relative overflow-hidden group">
            {/* Subtle glass reflection effects */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/5 to-transparent pointer-events-none" />

            {/* Jersey Visualization Frame */}
            <div className="relative w-full max-w-[340px] h-60 sm:h-72 md:h-80 lg:h-[360px] flex items-center justify-center my-auto">
              {viewSide === "front" ? (
                currentJersey.imageSrc ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-2 rounded-2xl bg-neutral-950/70 border border-blue-500/30 shadow-2xl backdrop-blur-md overflow-hidden group/img">
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-blue-950/90 border border-blue-400/40 text-[9px] sm:text-[10px] font-mono text-blue-200 z-10 shadow-md">
                      {currentJersey.year} · {currentJersey.sponsor}
                    </div>
                    <div className="relative w-full h-full transition-transform duration-500 group-hover/img:scale-105">
                      <Image
                        src={currentJersey.imageSrc}
                        alt={currentJersey.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        className="object-contain p-2 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                        priority
                      />
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 border border-white/10 text-[8px] sm:text-[9px] font-mono text-neutral-300 z-10">
                      AUTHENTIC MATCH SPEC
                    </div>
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
                )
              ) : (
                /* Back View with #7 DHONI */
                <div
                  className="w-full h-full rounded-2xl relative shadow-2xl flex flex-col justify-between p-4 sm:p-6 transition-all duration-500"
                  style={{
                    backgroundColor: currentJersey.primaryColor,
                    borderColor: currentJersey.secondaryColor,
                    borderWidth: 2,
                    boxShadow: `0 20px 50px -10px ${currentJersey.primaryColor}40`,
                  }}
                >
                  {/* Back Neck Line */}
                  <div className="flex justify-center items-center">
                    <div className="w-14 sm:w-16 h-3 sm:h-4 bg-white/20 rounded-full" />
                  </div>

                  {/* Back Name & Number */}
                  <div className="flex flex-col items-center justify-center text-center my-auto">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-widest text-white uppercase drop-shadow-md font-sans">
                      {currentJersey.playerName}
                    </h3>
                    <div className="text-7xl sm:text-8xl md:text-9xl font-black text-amber-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] font-mono leading-none tracking-tight">
                      {currentJersey.number}
                    </div>
                  </div>

                  {/* Bottom details */}
                  <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-white/60 border-t border-white/20 pt-2">
                    <span>TEAM INDIA</span>
                    <span>THE FINISHER</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick side toggle indicator */}
            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className={viewSide === "front" ? "text-blue-400 font-bold" : ""}>FRONT</span>
              <span>/</span>
              <span className={viewSide === "back" ? "text-amber-400 font-bold" : ""}>BACK (#7)</span>
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
                {currentIndex + 1} of {indiaJerseys.length}
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
  );
};
