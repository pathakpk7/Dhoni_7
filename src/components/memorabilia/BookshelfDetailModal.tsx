"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight,
  BookMarked,
  Info,
  Calendar,
  Compass,
  Library,
} from "lucide-react";
import { COLLECTOR_BOOKS, type CollectorBook } from "@/data/booksVault";
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
  // Default to 'shelf' so the user sees all 4 books separately first
  const [viewMode, setViewMode] = useState<"shelf" | "reader">("shelf");
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  useEffect(() => {
    if (initialVolume) {
      setActiveVolume(initialVolume);
    }
    // Reset to shelf view every time the modal is freshly opened
    if (isOpen) {
      setViewMode("shelf");
    }
  }, [isOpen, initialVolume]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (viewMode === "reader") {
          setViewMode("shelf");
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, viewMode]);

  if (!isOpen) return null;

  const currentBook =
    COLLECTOR_BOOKS.find((b) => b.volumeNumber === activeVolume) || COLLECTOR_BOOKS[0];

  const handleOpenBook = (vol: 1 | 2 | 3 | 4) => {
    storyAudio.playTurn();
    setActiveVolume(vol);
    setViewMode("reader");
  };

  const handleBackToShelf = () => {
    storyAudio.playClick();
    setViewMode("shelf");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/25 via-neutral-950/90 to-black" />

      {/* Main Container */}
      <div className="relative w-full h-full max-w-7xl max-h-[96vh] flex flex-col mx-auto px-3 sm:px-6 py-2.5 sm:py-3 z-10 justify-between">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-amber-900/40 pb-2.5 mb-2 shrink-0">
          <div className="flex items-center gap-3">
            {viewMode === "reader" ? (
              <button
                onClick={handleBackToShelf}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs tracking-wider uppercase font-mono transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Close Book (Back to Shelf)</span>
              </button>
            ) : (
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
            )}

            <div className="hidden sm:block h-4 w-px bg-neutral-800" />

            <div>
              <span className="text-[10px] tracking-widest text-amber-500/80 font-mono uppercase block">
                The Captain&apos;s Bookshelf · Archive Hardcovers
              </span>
              <h2 className="text-base sm:text-lg font-serif text-amber-100 flex items-center gap-2 font-bold">
                <Library className="w-4 h-4 text-amber-400" />
                {viewMode === "shelf"
                  ? "Select a Biographical Volume"
                  : `Volume ${currentBook.romanNumeral}: ${currentBook.title}`}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Volume Switcher visible in Reader mode */}
            {viewMode === "reader" && (
              <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-amber-500/20">
                {COLLECTOR_BOOKS.map((b) => (
                  <button
                    key={b.volumeNumber}
                    onClick={() => {
                      storyAudio.playTurn();
                      setActiveVolume(b.volumeNumber as 1 | 2 | 3 | 4);
                    }}
                    className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all duration-200 ${
                      activeVolume === b.volumeNumber
                        ? "bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20"
                        : "text-neutral-400 hover:text-amber-200 hover:bg-neutral-800/60"
                    }`}
                  >
                    Vol {b.romanNumeral}
                  </button>
                ))}
              </div>
            )}

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

        {/* VIEW 1: SHELF / 4 HARDCOVER BOOKS SHOWCASE */}
        {viewMode === "shelf" && (
          <div className="flex-1 min-h-0 flex flex-col justify-between py-2 sm:py-4 overflow-y-auto">
            {/* Shelf Banner Instructions */}
            <div className="text-center mb-4 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Four Physical Hardcovers · Click to Open
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 font-serif">
                Each volume covers a defining biographical chapter of MS Dhoni&apos;s journey with authentic records and verified historical moments.
              </p>
            </div>

            {/* 4 Hardcover Books Shelf Rack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto w-full my-auto px-2">
              {COLLECTOR_BOOKS.map((book) => {
                const isHovered = hoveredBook === book.volumeNumber;

                return (
                  <div
                    key={book.id}
                    onMouseEnter={() => setHoveredBook(book.volumeNumber)}
                    onMouseLeave={() => setHoveredBook(null)}
                    onClick={() => handleOpenBook(book.volumeNumber)}
                    className="group relative cursor-pointer flex flex-col items-center transition-all duration-300"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleOpenBook(book.volumeNumber);
                      }
                    }}
                  >
                    {/* 3D Hardcover Book Representation */}
                    <div
                      className={`relative w-full max-w-[240px] aspect-[1/1.45] rounded-xl overflow-hidden transition-all duration-500 shadow-2xl flex flex-col justify-between p-4 border-2 ${
                        isHovered
                          ? "-translate-y-3 scale-105 shadow-[0_25px_50px_rgba(212,175,55,0.35)] border-amber-400"
                          : "border-amber-600/40 shadow-black/80 hover:border-amber-500/80"
                      }`}
                      style={{
                        backgroundColor: book.spineColor,
                        background: `linear-gradient(135deg, ${book.spineColor} 0%, #17120c 60%, ${book.themeColor} 100%)`,
                      }}
                    >
                      {/* Gilded Book Spine Left Accent (Embossed Leather Depth) */}
                      <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/60 via-amber-900/30 to-transparent border-r border-amber-500/30 pointer-events-none" />

                      {/* Ornate Gold Foil Outer Border */}
                      <div className="absolute inset-2 border border-amber-400/40 rounded-lg pointer-events-none" />
                      <div className="absolute inset-2.5 border border-amber-400/20 rounded pointer-events-none" />

                      {/* Top: Volume Badge & Era */}
                      <div className="relative z-10 flex items-center justify-between pl-3 pr-1 text-amber-200">
                        <span className="px-2 py-0.5 rounded bg-black/60 border border-amber-400/50 font-mono text-[10px] font-bold text-amber-300">
                          VOL {book.romanNumeral}
                        </span>
                        <span className="text-[10px] font-mono tracking-wider text-amber-400/90 font-medium">
                          {book.era}
                        </span>
                      </div>

                      {/* Center: Title & Artwork Preview */}
                      <div className="relative z-10 flex flex-col items-center text-center my-auto px-2">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center mb-2 shadow-inner">
                          <BookOpen className="w-5 h-5 text-amber-300" />
                        </div>

                        <h3 className="text-base sm:text-lg font-serif font-black tracking-wide text-white drop-shadow-md uppercase leading-tight">
                          {book.title}
                        </h3>

                        <span className="text-[10px] font-serif italic text-amber-300/90 mt-1 line-clamp-1">
                          {book.shortTitle}
                        </span>

                        <p className="text-[9px] font-mono text-neutral-300 mt-2 line-clamp-2 px-1 text-center opacity-80">
                          {book.timelineSpan}
                        </p>
                      </div>

                      {/* Bottom Tagline & Open Button */}
                      <div className="relative z-10 pl-3 pr-1 pt-2 border-t border-amber-500/30">
                        <div className="text-[9px] font-serif italic text-amber-200/80 text-center mb-2 line-clamp-1">
                          {book.tagline}
                        </div>

                        <button
                          type="button"
                          className="w-full py-1.5 px-3 rounded-lg bg-amber-500 text-neutral-950 font-mono text-xs font-bold flex items-center justify-center gap-1.5 group-hover:bg-amber-400 transition-colors shadow-md"
                        >
                          <span>OPEN BOOK</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Wooden Shelf Footing */}
                    <div className="w-full max-w-[250px] h-3 bg-gradient-to-r from-amber-950 via-[#3a2010] to-amber-950 rounded-b-md border-t border-amber-800/40 shadow-lg mt-1" />
                  </div>
                );
              })}
            </div>

            {/* Bottom Info Bar */}
            <div className="text-center pt-3 border-t border-neutral-900 text-xs font-mono text-neutral-500">
              <span>Interactive 3D Hardcovers</span>
              <span className="mx-2">·</span>
              <span>Only one book opens at a time with authentic page turns</span>
            </div>
          </div>
        )}

        {/* VIEW 2: ACTIVE BOOK READER (REAL 3D PAGE-FLIP ENGINE) */}
        {viewMode === "reader" && (
          <div className="flex-1 min-h-0 relative flex flex-col justify-center items-center overflow-hidden">
            <StPageFlipBook
              key={activeVolume}
              initialVolumeNumber={activeVolume}
              className="w-full h-full flex flex-col justify-between items-center"
            />
          </div>
        )}
      </div>
    </div>
  );
};
