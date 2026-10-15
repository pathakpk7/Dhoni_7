"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight,
  BookMarked,
  Info,
} from "lucide-react";
import { COLLECTOR_BOOKS } from "@/data/booksVault";
import { StPageFlipBook } from "@/components/storybook/StPageFlipBook";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface BookshelfDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVolume?: 1 | 2 | 3 | 4;
}

export const BookshelfDetailModal: React.FC<BookshelfDetailModalProps> = ({
  isOpen,
  onClose,
  initialVolume = 1,
}) => {
  const [activeVolume, setActiveVolume] = useState<1 | 2 | 3 | 4>(initialVolume);
  const [viewMode, setViewMode] = useState<"shelf" | "reader">("reader");

  useEffect(() => {
    if (initialVolume) {
      setActiveVolume(initialVolume);
    }
  }, [initialVolume]);

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

  const currentBook = COLLECTOR_BOOKS.find((b) => b.volumeNumber === activeVolume) || COLLECTOR_BOOKS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-neutral-950/80 to-black" />

      {/* Main Container */}
      <div className="relative w-full h-full max-w-7xl max-h-[96vh] flex flex-col mx-auto px-4 py-3 sm:px-6 sm:py-4 z-10">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-amber-900/40 pb-3 mb-3">
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
                The Captain&apos;s Library · Archive Editions
              </span>
              <h2 className="text-lg sm:text-xl font-serif text-amber-100 flex items-center gap-2 font-bold">
                <BookOpen className="w-5 h-5 text-amber-400" />
                The Four Hardcover Chronicles
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Volume Quick Pickers */}
            <div className="hidden md:flex items-center gap-1.5 bg-neutral-900/90 p-1 rounded-xl border border-amber-500/20">
              {COLLECTOR_BOOKS.map((b) => (
                <button
                  key={b.volumeNumber}
                  onClick={() => {
                    storyAudio.playTurn();
                    setActiveVolume(b.volumeNumber as 1 | 2 | 3 | 4);
                    setViewMode("reader");
                  }}
                  className={`px-3 py-1 text-xs rounded-lg font-mono transition-all duration-200 ${
                    activeVolume === b.volumeNumber
                      ? "bg-amber-500 text-neutral-950 font-semibold shadow-md shadow-amber-500/20"
                      : "text-neutral-400 hover:text-amber-200 hover:bg-neutral-800/60"
                  }`}
                >
                  Vol {b.volumeNumber}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                storyAudio.playClick();
                onClose();
              }}
              className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close library modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Volume Sub-Bar for Mobile */}
        <div className="flex md:hidden items-center justify-center gap-2 mb-2 overflow-x-auto py-1">
          {COLLECTOR_BOOKS.map((b) => (
            <button
              key={b.volumeNumber}
              onClick={() => {
                storyAudio.playTurn();
                setActiveVolume(b.volumeNumber as 1 | 2 | 3 | 4);
              }}
              className={`px-2.5 py-1 text-[11px] rounded-lg font-mono whitespace-nowrap transition-colors ${
                activeVolume === b.volumeNumber
                  ? "bg-amber-500 text-neutral-950 font-bold"
                  : "bg-neutral-900/60 text-neutral-400 border border-neutral-800"
              }`}
            >
              Vol {b.volumeNumber}: {b.era}
            </button>
          ))}
        </div>

        {/* Content Area: StPageFlip 3D Book Container */}
        <div className="flex-1 min-h-0 relative flex flex-col justify-center items-center overflow-hidden">
          <StPageFlipBook
            key={activeVolume}
            initialVolumeNumber={activeVolume}
            className="w-full h-full flex items-center justify-center"
          />
        </div>

        {/* Footer info bar */}
        <div className="mt-2 pt-2 border-t border-neutral-900/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-400/90 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Volume {currentBook.volumeNumber}: {currentBook.title}
            </span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="hidden sm:inline text-neutral-400">
              {currentBook.subtitle} ({currentBook.era})
            </span>
          </div>
          <div className="flex items-center gap-3 text-neutral-400">
            <span>Drag corners or click arrows to turn pages</span>
            <span className="text-neutral-700">·</span>
            <span className="text-amber-500/80">Realistic 3D Physics</span>
          </div>
        </div>
      </div>
    </div>
  );
};
