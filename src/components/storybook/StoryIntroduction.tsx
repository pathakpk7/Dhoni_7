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

      {/* Center 3D Hardcover Book Cover Plate */}
      <main className="relative z-20 my-auto py-6 sm:py-10 max-w-4xl flex flex-col items-center">
        {/* Subtle Decorative Crest */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#b89758]/10 border border-[#b89758]/35 text-[#d6c7a1] text-[11px] font-mono tracking-widest uppercase mb-5 shadow-[0_0_20px_rgba(184,151,88,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-[#b89758] animate-pulse" />
          <span>AN INTERACTIVE DIGITAL STORYBOOK</span>
        </div>

        {/* 3D Physical Book Cover Presentation */}
        <div className="relative group cursor-pointer my-2" onClick={() => {
          storyAudio.playBookThudSound();
          onOpenStory();
        }}>
          {/* Outer Leather/Wood Shadow & Glow */}
          <div className="relative w-[280px] sm:w-[340px] md:w-[380px] rounded-r-2xl rounded-l-md overflow-hidden bg-[#18130e] border-2 border-[#b89758] shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_40px_rgba(184,151,88,0.25)] transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_55px_rgba(212,175,55,0.4)]">
            
            {/* Book Spine Simulation on the Left */}
            <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-[#0d0905] via-[#2a1d12] to-transparent z-20 pointer-events-none border-r border-[#b89758]/30 shadow-inner" />
            
            {/* Golden Edge Foil Accent */}
            <div className="absolute inset-2 border border-[#b89758]/40 rounded-r-xl rounded-l-sm pointer-events-none z-20" />
            <div className="absolute inset-3 border border-dashed border-[#b89758]/25 rounded-r-lg pointer-events-none z-20" />

            {/* Book Cover Artwork Image */}
            <div className="relative w-full aspect-[3/4] bg-[#0c0a08] overflow-hidden">
              <Image
                src="/images/book-cover-best-thing-about-time.jpg"
                alt="Captain Cool Decoded - Project 7: The Story of MS Dhoni"
                fill
                priority
                sizes="(max-width: 768px) 340px, 380px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Subtle Atmospheric Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

              {/* Top Embossed Header */}
              <div className="absolute top-4 left-6 right-4 z-10 text-center">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#d6c7a1] font-bold drop-shadow">
                  PROJECT 7 · OFFICIAL CHRONICLES
                </span>
              </div>

              {/* Bottom Embossed Title Plate */}
              <div className="absolute bottom-4 left-6 right-4 z-10 text-center">
                <div className="p-3 rounded-lg bg-black/75 backdrop-blur-sm border border-[#b89758]/60 shadow-xl">
                  <h1 className="font-serif font-black tracking-tight text-white leading-tight text-lg sm:text-xl md:text-2xl drop-shadow">
                    CAPTAIN COOL DECODED
                  </h1>
                  <p className="mt-1 font-serif text-[11px] sm:text-xs tracking-wider text-[#e6cb85] font-semibold uppercase">
                    THE STORY OF MS DHONI
                  </p>
                  <p className="mt-2 text-[10px] font-mono text-stone-300 italic">
                    &ldquo;Best thing about time — It changes.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Book Thickness / 3D Page Edges simulation on right */}
          <div className="absolute -right-2 top-2 bottom-2 w-3 rounded-r bg-gradient-to-r from-[#d9cfb8] via-[#ede4d0] to-[#c7b99c] -z-10 shadow-lg border-y border-r border-[#8f7e61]" />
        </div>

        {/* Primary & Secondary Call-to-Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
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
        <p>42 VERIFIED MOMENTS · 8 CHRONOLOGICAL CHAPTERS · 1995–2023 ARCHIVES</p>
      </footer>
    </div>
  );
};
