"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RotateCcw, BarChart3, ArrowLeft, Trophy, Sparkles } from "lucide-react";

interface StoryEndingProps {
  onRevisitStories: () => void;
}

export const StoryEnding: React.FC<StoryEndingProps> = ({ onRevisitStories }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-4 sm:px-6 py-10 overflow-hidden bg-[#090705]">
      {/* Cinematic Outro Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/tribute/dhoni_goat_outfield.jpg"
          alt="MS Dhoni The Legacy Continues"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 filter contrast-125 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090705] via-[#090705]/85 to-[#090705]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,151,88,0.15)_0%,transparent_70%)]" />
      </div>

      <header className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PROJECT 7 HOME</span>
        </Link>
      </header>

      {/* Main Epilogue Body */}
      <main className="relative z-20 my-auto py-8 max-w-2xl flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#b89758]/10 border border-[#b89758]/35 text-[#d6c7a1] text-[11px] font-mono tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(184,151,88,0.15)]">
          <Trophy className="w-3.5 h-3.5 text-[#b89758]" />
          <span>EPILOGUE</span>
        </div>

        <h2 className="font-serif font-black tracking-tight text-white text-4xl sm:text-6xl md:text-7xl leading-tight drop-shadow-2xl">
          THE LEGACY CONTINUES.
        </h2>

        {/* Ornamental Divider */}
        <div className="flex items-center gap-3 my-6 text-[#b89758]">
          <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#b89758]" />
          <span className="text-xs">✦</span>
          <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#b89758]" />
        </div>

        <p className="text-base sm:text-xl font-serif italic text-stone-300 leading-relaxed max-w-xl">
          &ldquo;Some careers are measured in runs and trophies.<br />
          Others are remembered in moments.&rdquo;
        </p>

        {/* Three Requested Action Portals */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          {/* Action 1: Revisit Stories */}
          <button
            type="button"
            onClick={onRevisitStories}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#b89758] text-[#14100c] hover:bg-[#d4af37] font-serif font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(184,151,88,0.3)] hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>REVISIT THE STORIES</span>
          </button>

          {/* Action 2: Explore Dhoni's Statistics */}
          <Link
            href="/visualize"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)] hover:scale-105 active:scale-95"
          >
            <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
            <span>EXPLORE STATISTICS</span>
          </Link>

          {/* Action 3: Return to Project 7 */}
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-stone-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b89758]" />
            <span>RETURN TO PROJECT 7</span>
          </Link>
        </div>
      </main>

      <footer className="relative z-20 w-full max-w-4xl text-center pb-2 text-[11px] font-mono text-stone-500">
        <p>CAPTAIN COOL DECEDED · PROJECT 7 · TRIBUTE TO NO. 7</p>
      </footer>
    </div>
  );
};
