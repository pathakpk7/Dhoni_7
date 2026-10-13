"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Layers, Sparkles, Volume2, VolumeX, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { storyAudio } from "./StoryAudio";

interface StoryIntroductionProps {
  onOpenStory: () => void;
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
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-4 sm:px-6 py-8 overflow-hidden bg-[#090705]">
      {/* Cinematic Deep Background Imagery with Vintage Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/hero/hero_dhoni_duo.jpg"
          alt="MS Dhoni The Man Behind The Legend"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 filter contrast-125 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090705] via-[#090705]/80 to-[#090705]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,151,88,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Top Bar: Navigation Links & Sound Control */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between gap-4 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PROJECT 7</span>
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
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#b89758]" />}
          </button>
        </div>
      </header>

      {/* Center Cinematic Book Cover Plate */}
      <main className="relative z-20 my-auto py-8 sm:py-12 max-w-3xl flex flex-col items-center">
        {/* Subtle Decorative Crest */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#b89758]/10 border border-[#b89758]/35 text-[#d6c7a1] text-[11px] font-mono tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(184,151,88,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-[#b89758] animate-pulse" />
          <span>AN INTERACTIVE CINEMATIC STORYBOOK</span>
        </div>

        {/* Master Heading */}
        <h1 className="font-serif font-black tracking-tight text-white leading-none text-5xl sm:text-7xl md:text-8xl drop-shadow-2xl">
          MAHI
        </h1>
        <p className="mt-3 font-serif tracking-[0.25em] text-[#d6c7a1] text-xs sm:text-base md:text-lg font-bold uppercase">
          THE MAN BEHIND THE LEGEND
        </p>

        {/* Golden Ornamental Divider */}
        <div className="flex items-center gap-3 my-6 text-[#b89758]">
          <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#b89758]" />
          <span className="text-xs">✦</span>
          <span className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#b89758]" />
        </div>

        {/* Supporting Line */}
        <p className="text-base sm:text-lg md:text-xl font-serif italic text-stone-300 max-w-xl leading-relaxed">
          &ldquo;Beyond the numbers. Beyond the trophies.<br />
          The moments that made a legend.&rdquo;
        </p>

        {/* Primary & Secondary Call-to-Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              storyAudio.playBookThudSound();
              onOpenStory();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#b89758] via-[#d4af37] to-[#b89758] text-[#14100c] font-serif font-bold tracking-wider text-sm sm:text-base uppercase shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 fill-current" />
            <span>OPEN THE STORY</span>
          </button>

          <button
            type="button"
            onClick={onExploreChapters}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-stone-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#b89758]" />
            <span>EXPLORE CHAPTERS</span>
          </button>
        </div>
      </main>

      {/* Footer Provenance */}
      <footer className="relative z-20 w-full max-w-4xl text-center pb-2 text-[11px] font-mono text-stone-500">
        <p>36 VERIFIED MOMENTS · 12 CHAPTERS · OFFICIAL ARCHIVES &amp; AUTHENTIC TESTIMONY</p>
      </footer>
    </div>
  );
};
