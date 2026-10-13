"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  ArrowLeft,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  BarChart3,
} from "lucide-react";
import type { StorybookState } from "@/types/storybook";
import { MAHI_STORY_LIBRARY, STORYBOOK_CHAPTERS } from "@/data/mahiStoryLibrary";
import { StoryIntroduction } from "./StoryIntroduction";
import { StPageFlipBook } from "./StPageFlipBook";
import { StoryEnding } from "./StoryEnding";
import { ChapterDrawer } from "./ChapterDrawer";
import { storyAudio } from "./StoryAudio";

export const MahiStoryExperience: React.FC = () => {
  const [storybookState, setStorybookState] = useState<StorybookState>("INTRODUCTION");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const currentStory = MAHI_STORY_LIBRARY[currentIndex] || MAHI_STORY_LIBRARY[0];
  const totalStories = MAHI_STORY_LIBRARY.length;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalStories - 1;

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Reached end of book -> Show Ending Epilogue
      setStorybookState("ENDING");
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleToggleMute = () => {
    const nextMuted = storyAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleSelectStoryIndex = (idx: number) => {
    setCurrentIndex(idx);
    setStorybookState("STORYBOOK");
  };

  // State A: Introduction
  if (storybookState === "INTRODUCTION") {
    return (
      <>
        <StoryIntroduction
          onOpenStory={() => setStorybookState("STORYBOOK")}
          onExploreChapters={() => setIsDrawerOpen(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
        <ChapterDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          currentIndex={currentIndex}
          onSelectStoryIndex={handleSelectStoryIndex}
        />
      </>
    );
  }

  // State C: Ending
  if (storybookState === "ENDING") {
    return (
      <StoryEnding
        onRevisitStories={() => {
          setCurrentIndex(0);
          setStorybookState("STORYBOOK");
        }}
      />
    );
  }

  // State B: Interactive Storybook
  const currentChapter =
    STORYBOOK_CHAPTERS.find((ch) => ch.number === currentStory.chapterNumber) ||
    STORYBOOK_CHAPTERS[0];
  const progressPercent = ((currentIndex + 1) / totalStories) * 100;

  return (
    <div className="relative min-h-screen w-full bg-[#0a0806] text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#b89758]/30">
      {/* Background Ambience Texture & Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,151,88,0.08)_0%,transparent_75%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
      </div>

      {/* Top Reading Navigation Bar */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2 border-b border-white/10 bg-[#0f0c09]/90 backdrop-blur-md">
        {/* Left: Back to Home or Intro */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-stone-300 hover:text-white transition-colors"
            title="Return to Main Documentary"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Project 7</span>
          </Link>

          <button
            type="button"
            onClick={() => setStorybookState("INTRODUCTION")}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-stone-300 hover:text-white transition-colors cursor-pointer"
            title="Return to Book Cover"
          >
            <BookOpen className="w-3 h-3 text-[#b89758]" />
            <span className="hidden md:inline">Cover</span>
          </button>
        </div>

        {/* Center: Chapter and Page Tracker */}
        <div className="flex flex-col items-center min-w-0 px-2 text-center">
          <span className="text-[10px] sm:text-xs font-serif tracking-widest uppercase text-[#d6c7a1] truncate max-w-[200px] sm:max-w-md">
            CH {currentChapter.romanNumeral} · {currentChapter.title}
          </span>
          <div className="flex items-center gap-2 mt-0.5 w-32 sm:w-48">
            <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#b89758] to-[#d4af37] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-stone-400 tabular-nums shrink-0">
              {currentIndex + 1}/{totalStories}
            </span>
          </div>
        </div>

        {/* Right: Chapter Index & Audio Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#b89758]/15 hover:bg-[#b89758]/25 border border-[#b89758]/40 text-[#f6f2e8] text-xs font-mono transition-colors cursor-pointer"
            title="Open Table of Contents"
          >
            <Layers className="w-3.5 h-3.5 text-[#b89758]" />
            <span className="hidden sm:inline">Chapters</span>
          </button>

          <Link
            href="/visualize"
            className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-mono transition-colors"
            title="Switch to Cricket Analytics"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Stats</span>
          </Link>

          <button
            type="button"
            onClick={handleToggleMute}
            className="p-1.5 sm:p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-500" /> : <Volume2 className="w-3.5 h-3.5 text-[#b89758]" />}
          </button>
        </div>
      </header>

      {/* Main 2-Page Digital Storybook Canvas with Real StPageFlip Engine */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-2 sm:py-4">
        <StPageFlipBook onOpenDrawer={() => setIsDrawerOpen(true)} />
      </main>

      {/* Table of Contents Drawer */}
      <ChapterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentIndex={currentIndex}
        onSelectStoryIndex={handleSelectStoryIndex}
      />
    </div>
  );
};
