"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Volume2,
  VolumeX,
  Bookmark,
  Share2,
  Layers,
  Sparkles,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { COLLECTOR_BOOKS, type CollectorBook } from "@/data/booksVault";
import type { StoryEntry } from "@/types/storybook";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface LandscapeBookReaderProps {
  initialBookId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LandscapeBookReader: React.FC<LandscapeBookReaderProps> = ({
  initialBookId,
  isOpen,
  onClose,
}) => {
  const [currentBookId, setCurrentBookId] = useState<string>(initialBookId);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);

  useEffect(() => {
    setCurrentBookId(initialBookId);
    setCurrentStoryIndex(0);
  }, [initialBookId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevPage();
      if (e.key === "ArrowRight") handleNextPage();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, currentStoryIndex, currentBookId, onClose]);

  if (!isOpen) return null;

  const currentBook =
    COLLECTOR_BOOKS.find((b) => b.id === currentBookId) || COLLECTOR_BOOKS[0];
  const stories = currentBook.stories;
  const currentStory: StoryEntry = stories[currentStoryIndex] || stories[0];
  const totalStories = stories.length;

  const handleNextPage = () => {
    if (currentStoryIndex < totalStories - 1) {
      storyAudio.playPageTurnSound();
      setCurrentStoryIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentStoryIndex > 0) {
      storyAudio.playPageTurnSound();
      setCurrentStoryIndex((prev) => prev - 1);
    }
  };

  const handleSelectBook = (bookId: string) => {
    storyAudio.playBookThudSound();
    setCurrentBookId(bookId);
    setCurrentStoryIndex(0);
  };

  const handleToggleMute = () => {
    const next = storyAudio.toggleMute();
    setIsMuted(next);
  };

  const progressPercent = ((currentStoryIndex + 1) / totalStories) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_75%)] pointer-events-none" />

      {/* Main Landscape Reading Frame (Aspect 16:9 / 16:10 Wide Format) */}
      <div className="relative w-full max-w-7xl h-[94vh] max-h-[94vh] rounded-3xl bg-[#130f0a] border-2 border-[#b89758]/60 shadow-[0_30px_90px_rgba(0,0,0,0.98),0_0_60px_rgba(212,175,55,0.3)] flex flex-col justify-between overflow-hidden">
        
        {/* Top Reading Navigation Bar */}
        <header className="relative z-30 px-3 sm:px-6 py-3 border-b border-white/10 bg-[#1b150e] flex items-center justify-between gap-3 shrink-0">
          
          {/* Left: Volume Selector Tabs (All 4 Books) */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-[50%] sm:max-w-none">
            {COLLECTOR_BOOKS.map((b) => {
              const isActive = b.id === currentBook.id;
              return (
                <button
                  key={b.id}
                  onClick={() => handleSelectBook(b.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#b89758] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "bg-white/5 text-stone-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>VOL {b.romanNumeral}</span>
                  <span className="hidden md:inline font-normal">· {b.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Center: Reading Progress */}
          <div className="hidden lg:flex flex-col items-center">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#d4af37]">
              {currentBook.title}
            </span>
            <div className="flex items-center gap-2 mt-0.5 w-36">
              <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#b89758] to-[#ffd700] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-stone-400">
                {currentStoryIndex + 1}/{totalStories}
              </span>
            </div>
          </div>

          {/* Right: Sound & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTocOpen((prev) => !prev)}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-stone-300 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Table of Contents"
            >
              <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">INDEX</span>
            </button>

            <button
              onClick={handleToggleMute}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-[#ffd700]" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close book reader"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Center: Landscape 2-Page Spread (Left Page: Media & Quote · Right Page: Narrative & Analysis) */}
        <main className="relative flex-1 overflow-y-auto lg:overflow-hidden p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 bg-[#16110c]">
          
          {/* Central Book Spine Crease Shadow (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/40 via-black/80 to-black/40 pointer-events-none z-20 shadow-[inset_0_0_15px_rgba(0,0,0,0.9)]" />

          {/* =========================================================================
              LEFT PAGE (Verso): Archival Media, Quote, Location & Verification
             ========================================================================= */}
          <div className="relative rounded-2xl bg-[#0f0c08] border border-[#b89758]/30 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto shadow-inner">
            {/* Top Page Number & Meta */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] sm:text-xs font-mono text-stone-400">
              <span className="text-[#d4af37] font-bold">PAGE {currentStoryIndex * 2 + 1}</span>
              <span className="uppercase">{currentStory.location}</span>
            </div>

            {/* Archival Media Showcase */}
            <div className="my-3 sm:my-4 relative w-full aspect-video max-h-[280px] rounded-xl overflow-hidden border border-[#b89758]/40 shadow-xl bg-black">
              <Image
                src={currentStory.media.posterUrl || currentBook.coverImage}
                alt={currentStory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              {/* Event Date Tag */}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/80 border border-[#b89758]/50 text-[10px] sm:text-xs font-mono text-[#ffd700] font-bold">
                {currentStory.eventDate}
              </div>

              {/* Attribution */}
              {currentStory.media.attribution && (
                <div className="absolute bottom-3 right-3 text-[9px] font-mono text-stone-300 bg-black/60 px-2 py-0.5 rounded">
                  {currentStory.media.attribution}
                </div>
              )}
            </div>

            {/* Verified Quotation Block */}
            {currentStory.quote && currentStory.quote.text && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border-l-4 border-[#b89758] my-2 text-left">
                <Quote className="w-4 h-4 text-[#d4af37] mb-1.5 opacity-80" />
                <p className="font-serif italic text-xs sm:text-sm text-stone-200 leading-relaxed">
                  &ldquo;{currentStory.quote.text}&rdquo;
                </p>
                {currentStory.quote.speaker && (
                  <p className="mt-2 text-[10px] sm:text-xs font-mono text-[#d4af37] font-bold">
                    — {currentStory.quote.speaker}
                  </p>
                )}
                {currentStory.quote.sourceTitle && (
                  <p className="text-[9px] font-mono text-stone-500 mt-0.5">
                    Source: {currentStory.quote.sourceTitle}
                  </p>
                )}
              </div>
            )}

            {/* Verification Footer */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-stone-500">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                <span>ARCHIVAL VERIFIED RECORD</span>
              </div>
              <span>{currentStory.category}</span>
            </div>
          </div>

          {/* =========================================================================
              RIGHT PAGE (Recto): Chapter Title, Narrative Prose & Strategic Meaning
             ========================================================================= */}
          <div className="relative rounded-2xl bg-[#0f0c08] border border-[#b89758]/30 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto shadow-inner text-left">
            {/* Top Page Number & Chapter Marker */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] sm:text-xs font-mono text-stone-400">
              <span className="uppercase text-[#d4af37]">
                CHAPTER {currentStory.chapterNumber} · {currentStory.chapterTitle}
              </span>
              <span>PAGE {currentStoryIndex * 2 + 2}</span>
            </div>

            {/* Story Titles */}
            <div className="my-3">
              <h3 className="font-serif font-black tracking-tight text-xl sm:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff2c2] via-[#e2b755] to-[#a37722] leading-tight">
                {currentStory.title}
              </h3>
              <p className="mt-1.5 font-serif text-xs sm:text-sm text-stone-300 font-semibold italic">
                {currentStory.subtitle}
              </p>
            </div>

            {/* Narrative Prose */}
            <div className="space-y-3 text-xs sm:text-sm font-serif text-stone-200 leading-relaxed max-w-none">
              <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-stone-300 text-xs font-mono leading-relaxed">
                <span className="text-[#d4af37] font-bold block mb-1">HISTORICAL CONTEXT:</span>
                {currentStory.historicalContext}
              </div>

              <p className="first-letter:text-3xl first-letter:font-black first-letter:text-[#ffd700] first-letter:float-left first-letter:mr-2">
                {currentStory.narrative}
              </p>

              {/* The Deeper Meaning / Tactical Philosophy */}
              {currentStory.meaning && (
                <div className="p-3.5 rounded-xl bg-[#b89758]/10 border border-[#b89758]/30 text-xs sm:text-sm font-serif text-[#f3e3a9]">
                  <span className="font-mono text-[10px] font-bold text-[#ffd700] uppercase block mb-1">
                    THE STOIC LESSON:
                  </span>
                  {currentStory.meaning}
                </div>
              )}
            </div>

            {/* Right Page Navigation Arrows */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={handlePrevPage}
                disabled={currentStoryIndex === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-stone-300 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREVIOUS</span>
              </button>

              <div className="text-[10px] font-mono text-stone-400">
                MOMENT {currentStoryIndex + 1} OF {totalStories}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentStoryIndex === totalStories - 1}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#b89758] hover:bg-[#ffd700] text-black font-bold text-xs font-mono disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <span>NEXT MOMENT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

        {/* Bottom Drawer: Table of Contents / Index of Moments */}
        {isTocOpen && (
          <div className="absolute inset-x-0 bottom-0 max-h-[60%] bg-[#0e0b08]/98 border-t-2 border-[#b89758] p-4 sm:p-6 z-40 overflow-y-auto animate-in slide-in-from-bottom duration-300 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <span className="text-xs font-mono text-[#d4af37] font-bold uppercase">
                  {currentBook.shortTitle}
                </span>
                <h4 className="text-lg font-serif font-black text-white">
                  TABLE OF CONTENTS ({totalStories} VERIFIED MOMENTS)
                </h4>
              </div>
              <button
                onClick={() => setIsTocOpen(false)}
                className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {stories.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    storyAudio.playPageTurnSound();
                    setCurrentStoryIndex(idx);
                    setIsTocOpen(false);
                  }}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer flex items-start gap-3 ${
                    idx === currentStoryIndex
                      ? "bg-[#b89758]/20 border border-[#ffd700] text-white"
                      : "bg-white/[0.02] border border-white/10 text-stone-300 hover:bg-white/[0.08]"
                  }`}
                >
                  <span className="font-mono text-xs text-[#d4af37] font-bold shrink-0 mt-0.5">
                    #{idx + 1}
                  </span>
                  <div>
                    <h5 className="font-serif font-bold text-xs sm:text-sm line-clamp-1">
                      {s.title}
                    </h5>
                    <p className="text-[10px] font-mono text-stone-400 mt-0.5">
                      {s.eventDate} · {s.location}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Bar */}
        <footer className="px-4 sm:px-6 py-2 bg-[#1b150e] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-stone-400 shrink-0">
          <span className="text-[#d4af37]">
            {currentBook.era} · {currentBook.timelineSpan}
          </span>
          <span className="hidden sm:inline">USE LEFT/RIGHT ARROW KEYS TO TURN PAGES</span>
        </footer>
      </div>
    </div>
  );
};
