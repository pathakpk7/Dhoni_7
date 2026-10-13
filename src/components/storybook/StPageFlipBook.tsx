"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  BookOpen,
  X,
  ShieldCheck,
  ExternalLink,
  Film,
  Calendar,
  MapPin,
  Quote as QuoteIcon,
  Layers,
} from "lucide-react";
import type { StoryEntry } from "@/types/storybook";
import { MAHI_STORY_LIBRARY } from "@/data/mahiStoryLibrary";
import { storyAudio } from "./StoryAudio";
import { StoryVideoPlayer } from "./StoryVideoPlayer";
import { cn } from "@/lib/utils";

interface StPageFlipBookProps {
  onOpenDrawer: () => void;
}

export const StPageFlipBook: React.FC<StPageFlipBookProps> = ({ onOpenDrawer }) => {
  const bookContainerRef = useRef<HTMLDivElement | null>(null);
  const pageFlipInstanceRef = useRef<any>(null);

  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [activeModalStory, setActiveModalStory] = useState<StoryEntry | null>(null);
  const [modalMode, setModalMode] = useState<"media" | "source">("media");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // First 2 pages are the Book Front Cover spread (Cover + Inside Intro)
  // Followed by 2 pages for each story in MAHI_STORY_LIBRARY
  // Followed by 2 pages for Back Cover spread
  // Total pages = 2 (front cover spread) + MAHI_STORY_LIBRARY.length * 2 + 2 (back cover spread)
  const totalPages = 2 + MAHI_STORY_LIBRARY.length * 2 + 2;

  // Initialize StPageFlip on client
  useEffect(() => {
    let pageFlip: any = null;

    const initBook = async () => {
      if (!bookContainerRef.current) return;

      try {
        const { PageFlip } = await import("page-flip");
        if (!bookContainerRef.current) return;

        // Clean any existing canvas if re-initializing
        const container = bookContainerRef.current;
        container.innerHTML = "";

        const pagesWrapper = document.createElement("div");
        pagesWrapper.className = "st-pages-wrapper";

        // ==========================================
        // PAGE 1: HARDCOVER FRONT (External Cover)
        // ==========================================
        const frontCoverPage = document.createElement("div");
        frontCoverPage.className =
          "st-page select-none text-[#f6f2e8] flex flex-col justify-between p-6 sm:p-8 bg-[#120e0a] border-r-2 border-[#b89758] relative shadow-[inset_-30px_0_40px_-15px_rgba(0,0,0,0.85)] overflow-hidden";
        frontCoverPage.setAttribute("data-density", "hard");
        frontCoverPage.innerHTML = `
          <!-- Leather spine crease & gold border accent -->
          <div class="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none z-20"></div>
          <div class="absolute inset-3 border-2 border-[#b89758]/60 rounded pointer-events-none z-20"></div>
          <div class="absolute inset-4.5 border border-dashed border-[#b89758]/30 rounded pointer-events-none z-20"></div>

          <!-- Cover Image artwork plate -->
          <div class="relative z-10 w-full h-full flex flex-col justify-between items-center text-center py-2">
            <div class="pt-2">
              <span class="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d6c7a1] font-bold drop-shadow">
                PROJECT 7 · CHRONICLES
              </span>
            </div>

            <!-- Artwork -->
            <div class="w-[220px] sm:w-[270px] h-[260px] sm:h-[310px] rounded-lg overflow-hidden border-2 border-[#b89758] shadow-2xl relative my-auto">
              <img src="/images/book-cover-best-thing-about-time.jpg" alt="Captain Cool Decoded" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <!-- Title Plate -->
            <div class="p-3 w-full rounded bg-black/80 border border-[#b89758]/70 shadow-xl backdrop-blur-sm">
              <h1 class="font-serif font-black text-xl sm:text-2xl text-white tracking-wide leading-tight">
                CAPTAIN COOL DECODED
              </h1>
              <p class="font-serif text-[11px] sm:text-xs text-[#e6cb85] tracking-widest uppercase mt-0.5">
                THE STORY OF MS DHONI
              </p>
              <p class="font-serif italic text-[11px] text-stone-300 mt-1">
                &ldquo;Best thing about time — It changes.&rdquo;
              </p>
            </div>

            <div class="text-[9px] font-mono tracking-widest text-[#b89758]/80 pb-1">
              OPEN THE COVER TO BEGIN →
            </div>
          </div>
        `;

        // ==========================================
        // PAGE 2: INSIDE FRONT COVER / PROLOGUE
        // ==========================================
        const insideCoverPage = document.createElement("div");
        insideCoverPage.className =
          "st-page pusho-parchment select-none text-[#2b241b] flex flex-col justify-between p-6 sm:p-8 border-l border-[#cfbfa8] relative shadow-[inset_25px_0_35px_-15px_rgba(80,50,20,0.18)]";
        insideCoverPage.setAttribute("data-density", "hard");
        insideCoverPage.innerHTML = `
          <div class="flex items-center justify-between pb-3 border-b border-[#b89758]/30 text-[10px] font-mono tracking-widest uppercase text-[#78613d]">
            <span>CAPTAIN COOL DECODED</span>
            <span>PROLOGUE</span>
          </div>

          <div class="my-auto py-4 flex flex-col items-center text-center px-2">
            <span class="text-xs font-mono tracking-widest text-[#92400e] uppercase font-bold">
              ॥ श्री गणेशाय नमः ॥
            </span>
            <h2 class="font-serif font-black text-2xl sm:text-3xl text-[#1c1917] mt-3 leading-tight">
              BEYOND THE NUMBERS.<br />BEYOND THE TROPHIES.
            </h2>
            <div class="w-16 h-[2px] bg-[#b89758] my-4"></div>
            <p class="font-serif italic text-sm sm:text-base text-[#4a3f35] leading-relaxed max-w-sm">
              &ldquo;The story of a boy from Ranchi who took the world by storm, not with loud words or flamboyant gestures, but with composure under fire, ruthless calculation, and unyielding self-belief.&rdquo;
            </p>
            <div class="mt-6 p-3 rounded bg-[#f5eedb] border border-[#b89758]/40 text-left text-xs font-serif text-[#4a3f35] leading-relaxed max-w-sm">
              <strong class="font-mono text-[10px] text-[#92400e] uppercase block mb-1">
                42 Chronological Moments (1995–2023)
              </strong>
              Every page documents a verified turning point, featuring high-resolution visuals, authentic quotations, historical context, and the tactical meaning behind the legend.
            </div>
          </div>

          <div class="pt-3 border-t border-[#b89758]/30 flex items-center justify-between text-[10px] font-mono text-[#78613d]">
            <span>PROJECT 7 ARCHIVES</span>
            <span>PAGE ii</span>
          </div>
        `;

        pagesWrapper.appendChild(frontCoverPage);
        pagesWrapper.appendChild(insideCoverPage);

        // ==========================================
        // STORY SPREADS: FOR EACH OF THE 42 STORIES
        // Left Page: Living Media Plate + Quote/Saying
        // Right Page: High-Craft Editorial Book Page (English)
        // ==========================================
        MAHI_STORY_LIBRARY.forEach((story, idx) => {
          const pageNumLeft = 2 + idx * 2 + 1;
          const pageNumRight = 2 + idx * 2 + 2;

          // First letter of narrative for drop cap
          const firstLetter = story.narrative.charAt(0);
          const remainingNarrative = story.narrative.slice(1);

          // Quote details
          const quoteText = story.quote.text || story.subtitle;
          const quoteSpeaker = story.quote.speaker || "MS Dhoni";
          const quoteSource = story.quote.sourceTitle || "Official Archive";

          // ------------------------------------------
          // LEFT PAGE: Living Visual Plate + Quote Block
          // ------------------------------------------
          const leftPage = document.createElement("div");
          leftPage.className =
            "st-page pusho-parchment select-none text-[#2b241b] flex flex-col justify-between p-5 sm:p-7 md:p-8 border-r border-[#cfbfa8] relative shadow-[inset_-25px_0_35px_-15px_rgba(80,50,20,0.18)]";
          leftPage.setAttribute("data-density", "soft");
          leftPage.innerHTML = `
            <!-- Top Header -->
            <div class="flex items-center justify-between pb-2.5 border-b border-[#b89758]/30 text-[10px] font-mono tracking-widest uppercase text-[#78613d]">
              <div class="flex items-center gap-1.5">
                <span>✦ PLATE ${idx + 1} · CH ${story.chapterNumber}</span>
              </div>
              <span class="px-2 py-0.5 rounded bg-[#b89758]/15 border border-[#b89758]/35 font-bold text-[#63481b]">
                ${story.category.replace(/_/g, " ")}
              </span>
            </div>

            <!-- Center Living Media Plate -->
            <div class="my-auto py-2 flex flex-col items-center">
              <!-- Visual Frame with Zoom Trigger -->
              <div class="relative w-[220px] sm:w-[270px] md:w-[310px] h-[190px] sm:h-[220px] md:h-[240px] rounded-lg overflow-hidden border-2 border-[#b89758] shadow-[0_12px_28px_rgba(50,30,10,0.25)] group cursor-pointer" id="img-trigger-${idx}">
                <img src="${story.media.posterUrl}" alt="${story.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none"></div>
                
                <!-- Bottom expansion chip -->
                <div class="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/80 text-[10px] font-mono text-[#f3ece0] border border-[#b89758]/50 shadow">
                    🔍 Expand Video / Photo Plate
                  </span>
                </div>
              </div>

              <!-- Media Launch Button -->
              <button type="button" class="mt-3 px-4 py-2 rounded-full bg-[#1e1710] hover:bg-[#342416] border border-[#b89758]/70 text-[#f5eee2] text-xs font-serif font-semibold tracking-wider flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer" id="media-btn-${idx}">
                <span>🎬</span>
                <span>WATCH ARCHIVAL FOOTAGE</span>
              </button>

              <!-- Archival Date & Location Badge -->
              <div class="w-full max-w-[310px] flex items-center justify-between gap-2 px-1 text-[11px] font-mono text-[#574834] mt-3">
                <div class="flex items-center gap-1">
                  <span>📅</span>
                  <span class="font-semibold">${story.eventDate}</span>
                </div>
                <div class="flex items-center gap-1 text-right truncate">
                  <span>📍</span>
                  <span class="truncate max-w-[170px]">${story.location}</span>
                </div>
              </div>

              <!-- Highlighted Quotation / Saying Card on Left Page -->
              <div class="w-full max-w-[310px] mt-3 p-3 rounded-lg bg-[#f5eedb] border-l-4 border-[#8B1E1E] border border-[#b89758]/30 shadow-sm text-left">
                <p class="font-serif italic text-xs sm:text-[13px] text-[#1c1917] font-semibold leading-relaxed">
                  &ldquo;${quoteText}&rdquo;
                </p>
                <div class="mt-1.5 text-right text-[10px] font-serif font-bold text-[#8B1E1E]">
                  — ${quoteSpeaker}
                </div>
              </div>
            </div>

            <!-- Left Page Footer -->
            <div class="pt-2.5 border-t border-[#b89758]/30 flex items-center justify-between text-[10px] font-mono text-[#78613d]">
              <span>CAPTAIN COOL DECODED</span>
              <span>PAGE ${pageNumLeft}</span>
            </div>
          `;

          // ------------------------------------------
          // RIGHT PAGE: High-Craft Book Page (English Editorial)
          // ------------------------------------------
          const rightPage = document.createElement("div");
          rightPage.className =
            "st-page pusho-parchment select-none text-[#2b241b] flex flex-col justify-between p-5 sm:p-7 md:p-8 border-l border-[#cfbfa8] relative shadow-[inset_25px_0_35px_-15px_rgba(80,50,20,0.18)]";
          rightPage.setAttribute("data-density", "soft");
          rightPage.innerHTML = `
            <!-- Top Header -->
            <div class="flex items-center justify-between pb-2.5 border-b border-[#b89758]/30 text-[10px] font-mono tracking-widest uppercase text-[#78613d]">
              <span>CHAPTER ${story.chapterNumber} · ${story.chapterTitle}</span>
              <span class="text-xs cursor-pointer opacity-70 hover:opacity-100" title="Share Story" id="share-btn-${idx}">🔗 SHARE</span>
            </div>

            <!-- Central Editorial Text -->
            <div class="my-auto py-2 overflow-y-auto max-h-[calc(100%-65px)] pr-1 scrollbar-thin">
              <!-- Headline Title -->
              <h2 class="text-lg sm:text-xl md:text-2xl font-serif font-black tracking-tight text-[#1c1917] leading-tight">
                ${story.title}
              </h2>

              <!-- Subtitle -->
              <p class="mt-1 text-xs sm:text-sm font-serif italic text-[#78350f] font-medium leading-relaxed">
                ${story.subtitle}
              </p>

              <!-- Historical Context Card -->
              <div class="my-3 p-2.5 rounded bg-[#f5eedb] border-l-2 border-[#b89758] text-[11px] sm:text-xs font-serif leading-relaxed text-[#574838]">
                <strong class="font-mono text-[9px] uppercase tracking-wider text-[#92400e] block mb-0.5">
                  Historical Context
                </strong>
                ${story.historicalContext}
              </div>

              <!-- Main Narrative with Classic Drop Cap -->
              <div class="text-xs sm:text-[13px] font-serif leading-relaxed text-[#292524] text-justify space-y-2 mt-2">
                <p>
                  <span class="float-left text-3xl sm:text-4xl font-serif font-black text-[#92400e] pr-2 pt-0.5 leading-none select-none">
                    ${firstLetter}
                  </span>
                  ${remainingNarrative}
                </p>
                <p class="italic text-[#6b4e28] pt-1 border-t border-[#b89758]/20">
                  <strong class="text-[#92400e]">The Meaning:</strong> ${story.meaning}
                </p>
              </div>

              <!-- Verified Source Citation Link -->
              <div class="mt-3 pt-2 border-t border-[#b89758]/25 flex items-center justify-between text-[10px] font-mono text-[#78613d]">
                <span class="flex items-center gap-1 font-semibold text-[#8B1E1E]">
                  🛡️ ${story.contentType.replace(/_/g, " ")}
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
            <div class="pt-2.5 border-t border-[#b89758]/30 flex items-center justify-between text-[10px] font-mono text-[#78613d]">
              <span>MOMENT ${idx + 1} OF ${MAHI_STORY_LIBRARY.length}</span>
              <span>PAGE ${pageNumRight}</span>
            </div>
          `;

          pagesWrapper.appendChild(leftPage);
          pagesWrapper.appendChild(rightPage);
        });

        // ==========================================
        // EPILOGUE & BACK COVER SPREAD (Last 2 pages)
        // ==========================================
        const epiloguePage = document.createElement("div");
        epiloguePage.className =
          "st-page pusho-parchment select-none text-[#2b241b] flex flex-col justify-between p-6 sm:p-8 border-r border-[#cfbfa8] relative shadow-[inset_-25px_0_35px_-15px_rgba(80,50,20,0.18)]";
        epiloguePage.setAttribute("data-density", "hard");
        epiloguePage.innerHTML = `
          <div class="flex items-center justify-between pb-3 border-b border-[#b89758]/30 text-[10px] font-mono tracking-widest uppercase text-[#78613d]">
            <span>CAPTAIN COOL DECODED</span>
            <span>EPILOGUE</span>
          </div>

          <div class="my-auto py-4 flex flex-col items-center text-center px-2">
            <h2 class="font-serif font-black text-2xl sm:text-3xl text-[#1c1917] leading-tight">
              THE SILENT LEADER
            </h2>
            <div class="w-16 h-[2px] bg-[#b89758] my-4"></div>
            <p class="font-serif italic text-sm text-[#4a3f35] leading-relaxed max-w-sm">
              &ldquo;Trophies gather dust in display cabinets. Records exist only until someone else breaks them. What remains forever is the feeling of calm a nation felt whenever No. 7 walked out to the crease.&rdquo;
            </p>
            <div class="mt-6 text-xs font-mono tracking-wider text-[#92400e]">
              1995 — 2023 AND BEYOND
            </div>
          </div>

          <div class="pt-3 border-t border-[#b89758]/30 flex items-center justify-between text-[10px] font-mono text-[#78613d]">
            <span>॥ ॐ तत्सत् ॥</span>
            <span>PAGE ${totalPages - 1}</span>
          </div>
        `;

        const backCoverPage = document.createElement("div");
        backCoverPage.className =
          "st-page select-none text-[#f6f2e8] flex flex-col justify-between p-6 sm:p-8 bg-[#120e0a] border-l-2 border-[#b89758] relative shadow-[inset_30px_0_40px_-15px_rgba(0,0,0,0.85)] overflow-hidden";
        backCoverPage.setAttribute("data-density", "hard");
        backCoverPage.innerHTML = `
          <div class="absolute inset-3 border-2 border-[#b89758]/60 rounded pointer-events-none z-20"></div>
          <div class="absolute inset-4.5 border border-dashed border-[#b89758]/30 rounded pointer-events-none z-20"></div>

          <div class="relative z-10 w-full h-full flex flex-col justify-between items-center text-center py-4">
            <span class="text-[10px] font-mono tracking-[0.25em] uppercase text-[#d6c7a1] font-bold">
              PROJECT 7 DIGITAL PUBLISHING
            </span>

            <div class="my-auto px-4 max-w-xs">
              <div class="w-16 h-16 mx-auto rounded-full border-2 border-[#b89758] flex items-center justify-center font-serif text-2xl font-bold text-[#b89758] mb-4">
                7
              </div>
              <h3 class="font-serif font-black text-xl text-white">CAPTAIN COOL DECODED</h3>
              <p class="font-serif italic text-xs text-[#d6c7a1] mt-2 leading-relaxed">
                Dedicated to MS Dhoni and cricket lovers worldwide.
              </p>
            </div>

            <div class="text-[9px] font-mono tracking-widest text-[#b89758]/80">
              PROJECT 7 · REINVENTING CRICKET STORYTELLING
            </div>
          </div>
        `;

        pagesWrapper.appendChild(epiloguePage);
        pagesWrapper.appendChild(backCoverPage);

        container.appendChild(pagesWrapper);

        // Attach StPageFlip
        pageFlip = new PageFlip(container, {
          width: 520,
          height: 720,
          size: "stretch",
          minWidth: 320,
          maxWidth: 620,
          minHeight: 460,
          maxHeight: 880,
          maxShadowOpacity: 0.65,
          showCover: true,
          mobileScrollSupport: false,
          useMouseEvents: true,
          clickEventForward: true,
          usePortrait: true,
          startPage: 0,
          drawShadow: true,
          flippingTime: 750,
        });

        const allDOMElements = container.querySelectorAll(".st-page");
        pageFlip.loadFromHTML(allDOMElements);

        pageFlip.on("flip", (e: any) => {
          storyAudio.playPageTurnSound();
          setCurrentPageIndex(e.data);
        });

        pageFlipInstanceRef.current = pageFlip;
        setIsLoaded(true);

        // Bind click events on pages for expanding media & sharing
        MAHI_STORY_LIBRARY.forEach((story, idx) => {
          const imgTrigger = container.querySelector(`#img-trigger-${idx}`);
          const mediaBtn = container.querySelector(`#media-btn-${idx}`);
          const shareBtn = container.querySelector(`#share-btn-${idx}`);

          imgTrigger?.addEventListener("click", () => {
            setActiveModalStory(story);
            setModalMode("media");
          });

          mediaBtn?.addEventListener("click", () => {
            setActiveModalStory(story);
            setModalMode("media");
          });

          shareBtn?.addEventListener("click", () => {
            if (navigator.share) {
              navigator
                .share({
                  title: story.title,
                  text: `${story.title} - Captain Cool Decoded`,
                  url: window.location.href,
                })
                .catch(() => {});
            }
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
  }, []);

  // Keyboard navigation (Arrow keys)
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

  // Calculate which moment we are currently viewing
  // Pages 0 & 1 = Cover spread
  // Pages 2..85 = Story spreads (idx = Math.floor((currentPageIndex - 2) / 2))
  const isCover = currentPageIndex <= 1;
  const isBackCover = currentPageIndex >= totalPages - 2;
  const currentStoryIdx = isCover ? 0 : Math.min(MAHI_STORY_LIBRARY.length - 1, Math.floor((currentPageIndex - 2) / 2));
  const currentStory = MAHI_STORY_LIBRARY[currentStoryIdx] || MAHI_STORY_LIBRARY[0];
  const displayedPages = `${currentPageIndex + 1}–${Math.min(totalPages, currentPageIndex + 2)}`;

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between items-center py-4 px-2 sm:px-6 select-none">
      {/* Central 3D Physical Book Area */}
      <div className="relative w-full max-w-5xl flex items-center justify-center my-auto">
        {/* Loading placeholder while StPageFlip boots */}
        {!isLoaded && (
          <div className="w-[500px] h-[680px] rounded-xl bg-[#ede3ce] animate-pulse flex flex-col items-center justify-center text-[#543d26] font-serif text-sm">
            <span>Opening Captain Cool Decoded...</span>
          </div>
        )}

        {/* Real StPageFlip DOM Container */}
        <div
          ref={bookContainerRef}
          className="relative w-full flex items-center justify-center overflow-visible drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
        />
      </div>

      {/* Pusho.fun Bottom Control Strip */}
      <div className="relative z-30 w-full max-w-4xl mx-auto flex items-center justify-between gap-4 pt-4 pb-2">
        {/* Far Left Circular Prev Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPageIndex === 0}
          className={cn(
            "w-12 h-12 rounded-full border border-amber-500/40 bg-black/80 flex items-center justify-center text-amber-400 hover:text-amber-300 hover:border-amber-400 hover:scale-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(251,191,36,0.25)] cursor-pointer",
            currentPageIndex === 0 && "opacity-30 cursor-not-allowed hover:scale-100"
          )}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Center Prompt & Page Counter */}
        <div className="flex flex-col items-center text-center">
          <span className="text-sm sm:text-base font-serif font-bold text-amber-400 tracking-wider">
            {isCover
              ? "Book Front Cover"
              : isBackCover
              ? "Book Epilogue & Back Cover"
              : `Moment ${currentStoryIdx + 1} of ${MAHI_STORY_LIBRARY.length} · ${currentStory.title}`}
          </span>
          <span className="text-[11px] sm:text-xs font-serif text-stone-400 tracking-wide mt-0.5">
            Page {displayedPages} of {totalPages} · Drag page corners to flip or use arrows
          </span>
        </div>

        {/* Far Right Circular Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPageIndex >= totalPages - 2}
          className={cn(
            "w-12 h-12 rounded-full border border-amber-500/40 bg-black/80 flex items-center justify-center text-amber-400 hover:text-amber-300 hover:border-amber-400 hover:scale-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(251,191,36,0.25)] cursor-pointer",
            currentPageIndex >= totalPages - 2 && "opacity-30 cursor-not-allowed hover:scale-100"
          )}
          aria-label="Next Page"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Modal Lightbox for Media Video Player */}
      {activeModalStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#14100c] border border-[#b89758]/50 rounded-2xl p-5 sm:p-7 shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalStory(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer z-20"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#b89758]">
                <Film className="w-3.5 h-3.5" />
                <span>Archival Visual Plate · {activeModalStory.chapterTitle}</span>
              </div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                {activeModalStory.title}
              </h3>
              <StoryVideoPlayer
                media={activeModalStory.media}
                title={activeModalStory.title}
                isActivePage={true}
              />
              <p className="text-xs font-serif italic text-stone-300">
                &ldquo;{activeModalStory.subtitle}&rdquo;
              </p>
              {activeModalStory.quote.text && (
                <div className="p-3 rounded bg-black/50 border-l-2 border-[#b89758] text-xs font-serif italic text-amber-200">
                  &ldquo;{activeModalStory.quote.text}&rdquo;
                  <span className="block mt-1 font-mono text-[10px] text-stone-400 not-italic">
                    — {activeModalStory.quote.speaker} ({activeModalStory.quote.sourceTitle})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
