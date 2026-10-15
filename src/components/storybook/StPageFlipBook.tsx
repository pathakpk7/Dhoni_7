"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Calendar,
  MapPin,
  ShieldCheck,
  Check,
} from "lucide-react";
import { COLLECTOR_BOOKS, type CollectorBook } from "@/data/booksVault";
import type { StoryEntry } from "@/types/storybook";
import { storyAudio } from "./StoryAudio";
import { cn } from "@/lib/utils";

interface StPageFlipBookProps {
  className?: string;
  initialVolumeNumber?: 1 | 2 | 3 | 4;
}

export const StPageFlipBook: React.FC<StPageFlipBookProps> = ({
  className = "",
  initialVolumeNumber = 1,
}) => {
  const [activeVolume, setActiveVolume] = useState<1 | 2 | 3 | 4>(initialVolumeNumber);
  const bookContainerRef = useRef<HTMLDivElement | null>(null);
  const pageFlipInstanceRef = useRef<any>(null);

  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [activeModalStory, setActiveModalStory] = useState<StoryEntry | null>(null);
  const [copiedStoryId, setCopiedStoryId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const currentBook: CollectorBook =
    COLLECTOR_BOOKS.find((b) => b.volumeNumber === activeVolume) ||
    COLLECTOR_BOOKS[0];

  const stories = currentBook.stories;
  // 2 pages per story spread (Left archival plate + Right narrative page)
  const totalPages = stories.length * 2;

  // Initialize StPageFlip on client whenever activeVolume changes
  useEffect(() => {
    let pageFlip: any = null;
    setIsLoaded(false);
    setCurrentPageIndex(0);

    const initBook = async () => {
      if (!bookContainerRef.current) return;

      try {
        const { PageFlip } = await import("page-flip");
        if (!bookContainerRef.current) return;

        const container = bookContainerRef.current;
        container.innerHTML = "";

        const pagesWrapper = document.createElement("div");
        pagesWrapper.className = "st-pages-wrapper";

        // Build dual-page DOM elements for each story in this volume
        stories.forEach((story, idx) => {
          const leftPageNum = idx * 2 + 1;
          const rightPageNum = idx * 2 + 2;

          // First letter for traditional editorial drop cap
          const firstChar = story.narrative.charAt(0);
          const restNarrative = story.narrative.slice(1);

          // Quote details
          const quoteText = story.quote.text || story.subtitle;
          const quoteSpeaker = story.quote.speaker || "MS Dhoni";
          const quoteSource = story.quote.sourceTitle || "Archival Record";

          // ==========================================
          // LEFT PAGE: Archival Photo Plate & Quote
          // ==========================================
          const leftPage = document.createElement("div");
          leftPage.className =
            "st-page pusho-parchment pusho-parchment-left select-none text-[#2b241b] flex flex-col justify-between p-3 sm:p-5 relative overflow-hidden";
          leftPage.setAttribute("data-density", "soft");
          leftPage.innerHTML = `
            <!-- Top Header -->
            <div class="flex items-center justify-between pb-1.5 border-b border-[#b89758]/35 text-[10px] sm:text-[11px] font-serif tracking-widest text-[#63481b] uppercase">
              <span class="font-bold">VOL ${currentBook.romanNumeral} · PLATE ${idx + 1}</span>
              <span class="px-2 py-0.5 rounded bg-[#b89758]/15 border border-[#b89758]/30 text-[9px] sm:text-[10px] font-mono font-semibold">
                ${story.category.replace(/_/g, " ")}
              </span>
            </div>

            <!-- Center Archival Visual Frame & Quote -->
            <div class="flex-1 min-h-0 flex flex-col items-center justify-center overflow-y-auto pr-1 py-1.5 scrollbar-thin">
              <div class="relative w-full max-w-[250px] sm:max-w-[280px] h-[150px] sm:h-[180px] md:h-[200px] rounded-lg overflow-hidden border-2 border-[#b89758] shadow-[0_8px_20px_rgba(50,30,10,0.35)] group cursor-pointer shrink-0" id="img-trigger-${idx}">
                <!-- Ornate Gold Corner Trim Accents -->
                <div class="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#ffd700] z-20 pointer-events-none"></div>
                <div class="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#ffd700] z-20 pointer-events-none"></div>
                <div class="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#ffd700] z-20 pointer-events-none"></div>
                <div class="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#ffd700] z-20 pointer-events-none"></div>

                <img src="${story.media.posterUrl}" alt="${story.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

                <!-- Expansion Prompt Pill -->
                <div class="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-black/85 text-[9px] font-mono text-[#f3ece0] border border-[#b89758]/60 shadow">
                    🔍 Click to Inspect Image
                  </span>
                </div>
              </div>

              <!-- Archival Date & Location Badges -->
              <div class="w-full max-w-[280px] flex items-center justify-between gap-2 px-1 text-[10px] sm:text-[11px] font-mono text-[#574834] mt-2">
                <div class="flex items-center gap-1 font-semibold truncate">
                  <span>📅</span>
                  <span class="truncate">${story.eventDate}</span>
                </div>
                <div class="flex items-center gap-1 text-right truncate">
                  <span>📍</span>
                  <span class="truncate max-w-[140px] font-medium">${story.location}</span>
                </div>
              </div>

              <!-- Historical Quotation Card -->
              <div class="w-full max-w-[280px] mt-2 p-2 sm:p-2.5 rounded-lg bg-[#efe5cf] border-l-4 border-[#8B1E1E] border border-[#b89758]/35 shadow-sm text-left">
                <p class="font-serif italic text-[11px] sm:text-xs text-[#1c1917] font-semibold leading-relaxed line-clamp-3">
                  &ldquo;${quoteText}&rdquo;
                </p>
                <div class="mt-0.5 text-right text-[10px] font-serif font-bold text-[#8B1E1E]">
                  — ${quoteSpeaker}
                </div>
              </div>
            </div>

            <!-- Left Page Footer -->
            <div class="pt-1.5 border-t border-[#b89758]/35 flex items-center justify-between text-[10px] sm:text-[11px] font-serif text-[#63481b]">
              <span>MS DHONI · BIOGRAPHICAL ARCHIVES</span>
              <span class="font-bold">PAGE ${leftPageNum}</span>
            </div>
          `;

          // ==========================================
          // RIGHT PAGE: High-Craft Biographical Narrative
          // ==========================================
          const rightPage = document.createElement("div");
          rightPage.className =
            "st-page pusho-parchment pusho-parchment-right select-none text-[#2b241b] flex flex-col justify-between p-3 sm:p-5 relative overflow-hidden";
          rightPage.setAttribute("data-density", "soft");
          rightPage.innerHTML = `
            <!-- Top Header -->
            <div class="flex items-center justify-between pb-1.5 border-b border-[#b89758]/35 text-[10px] sm:text-[11px] font-serif tracking-widest text-[#63481b] uppercase">
              <span class="font-bold truncate max-w-[220px]">${story.chapterTitle}</span>
              <button type="button" class="w-5 h-5 rounded border border-[#b89758]/40 bg-[#e8ded0] hover:bg-[#ded1c0] text-[#543d26] flex items-center justify-center transition-colors cursor-pointer shadow-sm" title="Share Moment" id="share-btn-${idx}">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            </div>

            <!-- Central Biographical Narrative -->
            <div class="flex-1 min-h-0 py-1.5 overflow-y-auto max-h-[calc(100%-46px)] pr-1.5 scrollbar-thin text-left">
              <!-- Headline Title -->
              <h2 class="text-sm sm:text-base md:text-lg font-serif font-black tracking-tight text-[#1c1917] leading-snug">
                ${story.title}
              </h2>

              <!-- Subtitle -->
              <p class="mt-0.5 text-[11px] sm:text-xs font-serif italic text-[#78350f] font-medium leading-relaxed">
                ${story.subtitle}
              </p>

              <!-- Historical Context Card -->
              <div class="my-1.5 p-2 rounded bg-[#efe5cf] border-l-2 border-[#b89758] text-[10px] sm:text-[11px] font-serif leading-relaxed text-[#574838]">
                <strong class="font-mono text-[9px] uppercase tracking-wider text-[#92400e] block mb-0.5">
                  Historical Context
                </strong>
                ${story.historicalContext}
              </div>

              <!-- Main Narrative with Classic Drop Cap -->
              <div class="text-[11px] sm:text-xs md:text-[12.5px] font-serif leading-relaxed text-[#292524] text-justify space-y-1 mt-1">
                <p>
                  <span class="float-left text-2xl sm:text-3xl font-serif font-black text-[#92400e] pr-1.5 pt-0.5 leading-none select-none">
                    ${firstChar}
                  </span>
                  ${restNarrative}
                </p>
                <p class="italic text-[#6b4e28] pt-1 border-t border-[#b89758]/25 text-[10px] sm:text-[11px]">
                  <strong class="text-[#92400e] not-italic">The Tactical Meaning:</strong> ${story.meaning}
                </p>
              </div>

              <!-- Verified Source Citation Link -->
              <div class="mt-2 pt-1 border-t border-[#b89758]/25 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#63481b]">
                <span class="flex items-center gap-1 font-semibold text-[#8B1E1E]">
                  🛡️ VERIFIED RECORD
                </span>
                ${
                  story.quote.sourceUrl
                    ? `<a href="${story.quote.sourceUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[#92400e] hover:underline font-semibold" title="View Source">
                        <span>Source: ${quoteSource}</span> ↗
                       </a>`
                    : `<span class="italic text-stone-500">${quoteSource}</span>`
                }
              </div>
            </div>

            <!-- Right Page Footer -->
            <div class="pt-1.5 border-t border-[#b89758]/35 flex items-center justify-between text-[10px] sm:text-[11px] font-serif text-[#63481b]">
              <span>MOMENT ${idx + 1} OF ${stories.length}</span>
              <span class="font-bold">PAGE ${rightPageNum}</span>
            </div>
          `;

          pagesWrapper.appendChild(leftPage);
          pagesWrapper.appendChild(rightPage);
        });

        container.appendChild(pagesWrapper);

        // Attach StPageFlip 3D physics canvas engine with balanced dimensions
        pageFlip = new PageFlip(container, {
          width: 480,
          height: 640,
          size: "stretch",
          minWidth: 280,
          maxWidth: 540,
          minHeight: 380,
          maxHeight: 740,
          maxShadowOpacity: 0.65,
          showCover: false, // Immediately open directly to 2-page spread
          mobileScrollSupport: false,
          useMouseEvents: true,
          clickEventForward: true,
          usePortrait: true,
          startPage: 0,
          drawShadow: true,
          flippingTime: 700,
        });

        const allDOMElements = container.querySelectorAll(".st-page");
        pageFlip.loadFromHTML(allDOMElements);

        // Bind page flip audio & active page index
        pageFlip.on("flip", (e: any) => {
          storyAudio.playPageTurnSound();
          setCurrentPageIndex(e.data);
        });

        pageFlipInstanceRef.current = pageFlip;
        setIsLoaded(true);

        // Bind click events on pages for image expansion and share
        stories.forEach((story, idx) => {
          const imgTrigger = container.querySelector(`#img-trigger-${idx}`);
          const shareBtn = container.querySelector(`#share-btn-${idx}`);

          imgTrigger?.addEventListener("click", () => {
            setActiveModalStory(story);
          });

          shareBtn?.addEventListener("click", () => {
            handleShareStory(story);
          });
        });
      } catch (err) {
        console.error("Error initializing StPageFlip:", err);
      }
    };

    initBook();

    return () => {
      if (pageFlip) {
        pageFlip.destroy();
      }
      pageFlipInstanceRef.current = null;
    };
  }, [activeVolume]);

  // Keyboard navigation (Left / Right Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        pageFlipInstanceRef.current?.flipNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        pageFlipInstanceRef.current?.flipPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNext = () => {
    pageFlipInstanceRef.current?.flipNext();
  };

  const handlePrev = () => {
    pageFlipInstanceRef.current?.flipPrev();
  };

  const handleSelectVolume = (vol: 1 | 2 | 3 | 4) => {
    if (vol === activeVolume) return;
    storyAudio.playBookThudSound();
    setActiveVolume(vol);
  };

  const handleShareStory = (story: StoryEntry) => {
    const textToShare = `${story.title} - ${story.subtitle}\nFrom Captain Cool Decoded: Volume ${currentBook.romanNumeral}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: story.title,
          text: textToShare,
          url: typeof window !== "undefined" ? window.location.href : "",
        })
        .catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setCopiedStoryId(story.id);
      setTimeout(() => setCopiedStoryId(null), 3000);
    }
  };

  // Current moment calculation
  const currentStoryIndex = Math.floor(currentPageIndex / 2);
  const currentStory = stories[currentStoryIndex] || stories[0];
  const leftPageNum = currentPageIndex + 1;
  const rightPageNum = Math.min(totalPages, currentPageIndex + 2);
  const displayedPages = `${leftPageNum}–${rightPageNum}`;

  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col justify-between items-center py-1 px-1 sm:px-3 select-none",
        className
      )}
    >
      {/* Toast Notification when Story link is shared */}
      {copiedStoryId && (
        <div className="fixed top-16 z-50 px-4 py-2 rounded-full bg-[#1c140d] border border-[#ffd700] text-[#ffd700] text-xs font-serif flex items-center gap-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Biographical moment link copied to clipboard</span>
        </div>
      )}

      {/* 4 BIOGRAPHICAL VOLUMES SWITCHER BAR (COMPACT) */}
      <div className="w-full max-w-3xl mx-auto mb-2 flex items-center justify-between gap-2 p-1.5 rounded-xl bg-[#140e09]/90 border border-[#b89758]/40 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2 px-2 text-left">
          <BookOpen className="w-3.5 h-3.5 text-[#ffd700] shrink-0" />
          <div className="hidden sm:block">
            <span className="text-[9px] font-mono tracking-widest uppercase text-[#d6c7a1] block">
              DHONI BIOGRAPHY · 4 VOLUMES
            </span>
            <span className="text-xs font-serif font-bold text-white">
              Vol {currentBook.romanNumeral}: {currentBook.title}
            </span>
          </div>
        </div>

        {/* 4 Volume Selector Buttons */}
        <div className="grid grid-cols-4 gap-1 w-full sm:w-auto">
          {COLLECTOR_BOOKS.map((book) => {
            const isSelected = book.volumeNumber === activeVolume;
            return (
              <button
                key={book.id}
                onClick={() => handleSelectVolume(book.volumeNumber)}
                className={cn(
                  "px-2 sm:px-3 py-1 rounded-lg text-center transition-all cursor-pointer border flex flex-col items-center",
                  isSelected
                    ? "bg-gradient-to-r from-[#b89758] to-[#ffd700] text-black font-bold border-[#ffd700] shadow-[0_0_12px_rgba(212,175,55,0.4)] scale-102"
                    : "bg-white/[0.04] text-stone-400 border-white/10 hover:border-[#b89758]/50 hover:text-white"
                )}
                title={book.title}
              >
                <span className="text-[10px] font-mono font-bold">
                  VOL {book.romanNumeral}
                </span>
                <span className="text-[8px] font-serif truncate max-w-[65px] hidden md:inline">
                  {book.shortTitle.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Page Physical Book Canvas Area */}
      <div className="relative w-full max-w-5xl flex-1 min-h-0 flex items-center justify-center my-auto">
        {/* Loading skeleton while PageFlip scripts and DOM initialize */}
        {!isLoaded && (
          <div className="w-[480px] h-[640px] max-w-full rounded-xl bg-[#ede3ce] animate-pulse flex flex-col items-center justify-center text-[#543d26] font-serif text-sm border-2 border-[#b89758]/50 shadow-2xl">
            <Sparkles className="w-6 h-6 text-[#b89758] animate-spin mb-3" />
            <span>Opening Volume {currentBook.romanNumeral}: {currentBook.title}...</span>
          </div>
        )}

        {/* Real 3D StPageFlip Physical Engine Canvas Container */}
        <div
          ref={bookContainerRef}
          className="relative w-full flex items-center justify-center overflow-visible drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
        />
      </div>

      {/* Bottom Physical Page Controls */}
      <div className="relative z-30 w-full max-w-3xl mx-auto flex items-center justify-between gap-3 pt-2 pb-1">
        {/* Left Circular Navigation Button (<) */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPageIndex === 0}
          className={cn(
            "w-10 h-10 rounded-full border border-[#b89758]/60 bg-black/85 flex items-center justify-center text-[#e5c378] hover:text-[#ffd700] hover:border-[#ffd700] hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer",
            currentPageIndex === 0 && "opacity-30 cursor-not-allowed hover:scale-100"
          )}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Center Text Indicators */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs sm:text-sm font-serif font-bold text-[#e5c378] tracking-wider">
            Volume {currentBook.romanNumeral} · Moment {currentStoryIndex + 1} of {stories.length} · Page {displayedPages} / {totalPages}
          </span>
          <span className="text-[10px] sm:text-[11px] font-serif text-stone-400 tracking-wide">
            Drag page corners to flip or use arrow buttons
          </span>
        </div>

        {/* Right Circular Navigation Button (>) */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPageIndex >= totalPages - 2}
          className={cn(
            "w-10 h-10 rounded-full border border-[#b89758]/60 bg-black/85 flex items-center justify-center text-[#e5c378] hover:text-[#ffd700] hover:border-[#ffd700] hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer",
            currentPageIndex >= totalPages - 2 && "opacity-30 cursor-not-allowed hover:scale-100"
          )}
          aria-label="Next Page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Lightbox for Expanded Image */}
      {activeModalStory && (
        <div
          onClick={() => setActiveModalStory(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#140e09] border-2 border-[#b89758] rounded-2xl p-5 sm:p-7 shadow-2xl overflow-hidden cursor-default text-left"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalStory(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer z-20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono tracking-widest text-[#ffd700] uppercase">
                {activeModalStory.chapterTitle} · {activeModalStory.eventDate}
              </span>

              {/* High-res Image Display */}
              <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-[#b89758]/60 bg-black">
                <img
                  src={activeModalStory.media.posterUrl}
                  alt={activeModalStory.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Story Context & Quote */}
              <div className="p-3.5 rounded-lg bg-[#1f160e] border-l-4 border-[#b89758] text-stone-200">
                <h3 className="font-serif font-black text-lg text-white">
                  ${activeModalStory.title}
                </h3>
                <p className="font-serif italic text-xs text-amber-200 mt-1">
                  &ldquo;${activeModalStory.subtitle}&rdquo;
                </p>
                {activeModalStory.quote.text && (
                  <p className="mt-2 text-xs font-serif text-stone-300">
                    &ldquo;${activeModalStory.quote.text}&rdquo; —{" "}
                    <span className="text-[#ffd700]">
                      {activeModalStory.quote.speaker}
                    </span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                <span>📍 {activeModalStory.location}</span>
                <span>🛡️ {activeModalStory.contentType.replace(/_/g, " ")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
