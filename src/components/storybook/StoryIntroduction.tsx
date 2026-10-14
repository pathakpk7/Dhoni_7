"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { DhoniRoomWall } from "@/components/room/DhoniRoomWall";

interface StoryIntroductionProps {
  onOpenStory: (bookId?: string) => void;
  onExploreChapters: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const StoryIntroduction: React.FC<StoryIntroductionProps> = ({
  onOpenStory,
  onExploreChapters,
  isMuted,
  onToggleMute,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-2 sm:px-4 md:px-6 py-6 overflow-hidden bg-[#090705]">
      {/* Cinematic Deep Background Imagery with Vintage Vignette */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#090705] via-[#090705]/85 to-[#090705]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,151,88,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Top Bar: Navigation Links & Sound Control */}
      <header className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between gap-4 pt-1 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PROJECT 7 HOME</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/visualize"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-mono transition-colors"
          >
            <span>CRICKET ANALYTICS</span>
          </Link>

          <button
            type="button"
            onClick={onToggleMute}
            className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#b89758]" />
            )}
          </button>
        </div>
      </header>

      {/* Core Dhoni Room Wall Experience with all 4 motifs */}
      <main className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <DhoniRoomWall onDirectOpenBook={onOpenStory} />
      </main>

      {/* Footer Provenance */}
      <footer className="relative z-20 w-full max-w-4xl mx-auto text-center py-4 text-[11px] font-mono text-stone-500 border-t border-white/5 mt-8">
        <p>THE SANCTUM OF NUMBER 7 · 4 COLLECTOR VOLUMES · 29 SILVERWARE TROPHIES · 14 HISTORIC KITS</p>
      </footer>
    </div>
  );
};
