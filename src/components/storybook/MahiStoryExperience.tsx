"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { StPageFlipBook } from "./StPageFlipBook";
import { storyAudio } from "./StoryAudio";

export const MahiStoryExperience: React.FC = () => {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleToggleMute = () => {
    const nextMuted = storyAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080705] text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#b89758]/30">
      {/* Background Ambience Texture & Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,151,88,0.08)_0%,transparent_75%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/95" />
      </div>

      {/* Top Reading Navigation Bar */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2 border-b border-[#b89758]/20 bg-[#0d0a07]/80 backdrop-blur-md">
        {/* Left: Back to Home */}
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-stone-300 hover:text-white transition-colors"
          title="Return to Main Documentary"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {/* Center: Title Plaque */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs sm:text-sm font-serif font-bold tracking-widest uppercase text-[#e5c378]">
            CAPTAIN COOL DECODED
          </span>
          <span className="text-[10px] font-mono text-stone-400">
            THE 4 BIOGRAPHICAL VOLUMES OF MS DHONI
          </span>
        </div>

        {/* Right: Audio Control */}
        <button
          type="button"
          onClick={handleToggleMute}
          className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
          aria-label="Toggle Sound"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-stone-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#ffd700]" />
          )}
        </button>
      </header>

      {/* Main 2-Page Digital Storybook Canvas with Real StPageFlip Engine */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-4">
        <StPageFlipBook />
      </main>
    </div>
  );
};
