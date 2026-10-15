"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { JERSEYS_VAULT } from "@/data/jerseysVault";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface CskJerseyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: "IPL" | "CLT20";
}

export const CskJerseyDetailModal: React.FC<CskJerseyDetailModalProps> = ({
  isOpen,
  onClose,
  initialType = "IPL",
}) => {
  const [selectedType, setSelectedType] = useState<"IPL" | "CLT20">(initialType);
  const [viewSide, setViewSide] = useState<"front" | "back">("front");

  useEffect(() => {
    if (initialType) setSelectedType(initialType);
  }, [initialType]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const cskIplJersey = JERSEYS_VAULT.find((j) => j.id === "jersey_2023_csk_5th_crown") ||
    JERSEYS_VAULT.find((j) => j.team === "Chennai Super Kings" && j.tournamentType === "IPL");

  const cskClt20Jersey = JERSEYS_VAULT.find((j) => j.id === "jersey_2014_clt20_champions") ||
    JERSEYS_VAULT.find((j) => j.id === "jersey_2010_clt20_champions");

  const activeJersey = selectedType === "IPL" ? cskIplJersey! : cskClt20Jersey!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Amber / Yellow Ambient Radiance */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/15 via-neutral-950/90 to-black" />

      {/* Shell */}
      <div className="relative w-full h-full max-w-6xl max-h-[96vh] flex flex-col mx-auto px-4 py-3 sm:px-6 sm:py-4 z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                storyAudio.playClick();
                onClose();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-amber-500/30 text-amber-300 text-xs tracking-wider uppercase font-mono transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Room</span>
            </button>
            <div className="hidden sm:block h-4 w-px bg-neutral-800" />
            <div>
              <span className="text-[10px] tracking-widest text-amber-500/80 font-mono uppercase block">
                Chennai Super Kings · Chepauk Fortress
              </span>
              <h2 className="text-lg sm:text-xl font-serif text-amber-100 flex items-center gap-2 font-bold">
                <Crown className="w-5 h-5 text-amber-400" />
                The Canary Yellow Dynasty
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                storyAudio.playClick();
                setViewSide((prev) => (prev === "front" ? "back" : "front"));
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/30 text-amber-200 text-xs font-mono transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flip: {viewSide === "front" ? "Show Back #7" : "Show Front"}</span>
            </button>
            <button
              onClick={() => {
                storyAudio.playClick();
                onClose();
              }}
              className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tournament Toggle: IPL vs CLT20 */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => {
              storyAudio.playClick();
              setSelectedType("IPL");
            }}
            className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-mono flex items-center justify-center gap-2 transition-all ${
              selectedType === "IPL"
                ? "bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/20"
                : "bg-neutral-900/80 text-neutral-400 hover:text-amber-200 border border-neutral-800"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>IPL Championship Edition (5 Stars · 2010, 2011, 2018, 2021, 2023)</span>
          </button>
          <button
            onClick={() => {
              storyAudio.playClick();
              setSelectedType("CLT20");
            }}
            className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-mono flex items-center justify-center gap-2 transition-all ${
              selectedType === "CLT20"
                ? "bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/20"
                : "bg-neutral-900/80 text-neutral-400 hover:text-amber-200 border border-neutral-800"
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>Champions League T20 Edition (2010 & 2014 World Crowns)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto pr-1">
          {/* Left: Jersey Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-neutral-900/90 via-amber-950/20 to-neutral-950 border border-amber-500/20 relative">
            <div className="relative w-full max-w-[320px] aspect-[4/5] flex items-center justify-center">
              {viewSide === "front" ? (
                <div
                  className="w-full h-full rounded-2xl relative shadow-2xl flex flex-col justify-between p-6 transition-all duration-500 bg-[#eab308] border-2 border-[#1e3a8a] text-neutral-950"
                  style={{
                    boxShadow: "0 20px 50px -10px rgba(234, 179, 8, 0.4)",
                  }}
                >
                  {/* Top: 5 Stars / Roaring Lion */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: selectedType === "IPL" ? 5 : 2 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-900 text-amber-900" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-900/70">
                      WHISTLE PODU
                    </span>
                  </div>

                  {/* Chest Sponsor & Lion */}
                  <div className="flex flex-col items-center justify-center text-center my-auto">
                    <div className="w-14 h-14 rounded-full bg-red-600 border border-white flex items-center justify-center mb-2 shadow-lg">
                      <Flame className="w-8 h-8 text-amber-300" />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-neutral-800">
                      {selectedType === "IPL" ? "CHENNAI SUPER KINGS" : "CLT20 CHAMPIONS"}
                    </span>
                    <h3 className="text-3xl font-black tracking-wider text-blue-950 drop-shadow-sm mt-1">
                      {activeJersey.sponsor}
                    </h3>
                  </div>

                  {/* Hem */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-900 font-bold border-t border-neutral-900/20 pt-2">
                    <span>CAPTAIN: MS DHONI</span>
                    <span>CHANNAPATNA TIGER</span>
                  </div>
                </div>
              ) : (
                /* Back View */
                <div
                  className="w-full h-full rounded-2xl relative shadow-2xl flex flex-col justify-between p-6 transition-all duration-500 bg-[#eab308] border-2 border-[#1e3a8a] text-neutral-950"
                  style={{
                    boxShadow: "0 20px 50px -10px rgba(234, 179, 8, 0.4)",
                  }}
                >
                  <div className="flex justify-center">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-900/70">
                      THALA DHONI
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center my-auto">
                    <h3 className="text-3xl sm:text-4xl font-black tracking-widest text-blue-950 uppercase font-sans">
                      DHONI
                    </h3>
                    <div className="text-8xl sm:text-9xl font-black text-blue-950 font-mono leading-none tracking-tight">
                      7
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-900 font-bold border-t border-neutral-900/20 pt-2">
                    <span>RECORD: 5 IPL TITLES</span>
                    <span>10 FINALS</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: History & Accolades */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-medium">
                  {activeJersey.era}
                </span>
                <span className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 text-xs font-mono">
                  {activeJersey.year}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 mb-2">
                {activeJersey.title}
              </h1>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans mb-4">
                {activeJersey.description}
              </p>

              {/* Famous Moment */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Whistle Podu Folklore
                </div>
                <p className="text-xs sm:text-sm text-amber-100 font-sans italic">
                  &ldquo;{activeJersey.famousMoment}&rdquo;
                </p>
              </div>

              {/* Design breakdown */}
              <div className="mb-4">
                <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-neutral-500" />
                  Key Details & Tailoring
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                  {activeJersey.designDetails.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 bg-neutral-950/40 p-2 rounded-lg border border-neutral-800/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400">
                <span className="text-amber-400 font-semibold">RECORD IN THIS KIT: </span>
                <span>{activeJersey.statsInJersey}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>Chennai Super Kings Marquee Player #7</span>
              <span className="text-amber-400 font-semibold">Anbalgai Dhoni</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
