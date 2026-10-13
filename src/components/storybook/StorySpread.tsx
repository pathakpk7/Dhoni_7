"use client";

import React, { useState, useEffect } from "react";
import type { StoryEntry } from "@/types/storybook";
import { StoryLeftPage } from "./StoryLeftPage";
import { StoryRightPage } from "./StoryRightPage";
import { storyAudio } from "./StoryAudio";
import { cn } from "@/lib/utils";

interface StorySpreadProps {
  currentStory: StoryEntry;
  currentIndex: number;
  totalStories: number;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  onOpenChapters: () => void;
}

export const StorySpread: React.FC<StorySpreadProps> = ({
  currentStory,
  currentIndex,
  totalStories,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
  onOpenChapters,
}) => {
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleNextWithSound = () => {
    if (flipDirection) return;
    storyAudio.playPageTurnSound();
    setFlipDirection("next");
    setTimeout(() => {
      onNext();
      setFlipDirection(null);
    }, 420);
  };

  const handlePrevWithSound = () => {
    if (flipDirection || !canGoPrev) return;
    storyAudio.playPageTurnSound();
    setFlipDirection("prev");
    setTimeout(() => {
      onPrev();
      setFlipDirection(null);
    }, 420);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        handleNextWithSound();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (canGoPrev) {
          e.preventDefault();
          handlePrevWithSound();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canGoPrev, flipDirection]);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      // Swiped Left -> Next Page
      handleNextWithSound();
    } else if (diff < -50 && canGoPrev) {
      // Swiped Right -> Previous Page
      handlePrevWithSound();
    }
    setTouchStart(null);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6 flex items-center justify-center select-none"
    >
      {/* Outer Physical Book Outer Casing / Leather Shadow Base */}
      <div className="relative w-full rounded-2xl bg-[#14100c] p-2.5 sm:p-4 md:p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(184,151,88,0.12)] border border-[#b89758]/30">
        {/* Leather Binding Perimeter Stitching */}
        <div className="absolute inset-1.5 sm:inset-2 border border-dashed border-[#b89758]/20 rounded-xl pointer-events-none" />

        {/* The Open Book Surface (Two Pages Spread on Desktop, Stacked or Tabbed on Mobile) */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden bg-[#fcfaf3] shadow-2xl border border-[#b89758]/40 min-h-[580px] sm:min-h-[640px] md:min-h-[680px]">
          {/* Central 3D Binding Spine (Running down the center on desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 pointer-events-none z-30">
            {/* Spine Depth Crease Gradient */}
            <div className="w-full h-full bg-gradient-to-r from-black/25 via-black/45 to-black/25 shadow-inner" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-[#574427]/40 shadow" />
          </div>

          {/* Book Bottom Page Stack Layering Simulation */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-t from-[#c9bfa8] to-transparent pointer-events-none z-20" />

          {/* Left Page: Archival Visual Plate */}
          <div
            className={cn(
              "relative w-full transition-all duration-300",
              flipDirection === "prev" && "opacity-60 scale-[0.99] filter blur-[0.5px]"
            )}
          >
            <StoryLeftPage
              story={currentStory}
              pageNumber={currentIndex + 1}
              totalStories={totalStories}
              isActive={!flipDirection}
            />
          </div>

          {/* Right Page: High-Craft Editorial Narrative */}
          <div
            className={cn(
              "relative w-full transition-all duration-300",
              flipDirection === "next" && "opacity-60 scale-[0.99] filter blur-[0.5px]"
            )}
          >
            <StoryRightPage
              story={currentStory}
              pageNumber={currentIndex + 1}
              totalStories={totalStories}
              onNextPage={handleNextWithSound}
              onPrevPage={handlePrevWithSound}
              canGoNext={canGoNext}
              canGoPrev={canGoPrev}
              onOpenChapters={onOpenChapters}
            />
          </div>

          {/* Turning Page 3D Flip Overlay Simulation */}
          {flipDirection && (
            <div
              className={cn(
                "absolute inset-0 pointer-events-none z-40 transition-opacity duration-300 flex items-center justify-center",
                flipDirection === "next"
                  ? "bg-gradient-to-r from-transparent via-black/20 to-black/40"
                  : "bg-gradient-to-l from-transparent via-black/20 to-black/40"
              )}
            >
              <div className="px-6 py-3 rounded-full bg-[#1c1917]/90 border border-[#b89758] text-[#f6f2e8] font-mono text-xs uppercase tracking-widest shadow-2xl animate-pulse">
                {flipDirection === "next" ? "Turning Forward..." : "Turning Back..."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
