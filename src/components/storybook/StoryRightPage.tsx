"use client";

import React from "react";
import {
  Quote as QuoteIcon,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Bookmark,
} from "lucide-react";
import type { StoryEntry } from "@/types/storybook";
import { cn } from "@/lib/utils";

interface StoryRightPageProps {
  story: StoryEntry;
  pageNumber: number;
  totalStories: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  onOpenChapters: () => void;
}

export const StoryRightPage: React.FC<StoryRightPageProps> = ({
  story,
  pageNumber,
  totalStories,
  onNextPage,
  onPrevPage,
  canGoNext,
  canGoPrev,
  onOpenChapters,
}) => {
  const hasVerifiedQuote = story.quote.text !== null && story.quote.verificationStatus === "VERIFIED";

  // First letter of narrative for drop cap
  const firstLetter = story.narrative.charAt(0);
  const remainingNarrative = story.narrative.slice(1);

  return (
    <div className="relative w-full h-full bg-[#fcfaf3] text-[#1c1917] p-5 sm:p-7 md:p-8 flex flex-col justify-between select-text overflow-hidden shadow-[inset_12px_0_24px_-8px_rgba(0,0,0,0.18)]">
      {/* Paper Grain Subtle Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#1c1917 1px, transparent 1px)`,
          backgroundSize: "6px 6px",
        }}
      />

      {/* Elegant Vintage Double Border Frame */}
      <div className="absolute inset-2.5 sm:inset-3 border border-[#b89758]/35 rounded pointer-events-none" />
      <div className="absolute inset-3.5 sm:inset-4 border border-[#b89758]/20 rounded pointer-events-none" />

      {/* Corner Decorative Ornaments */}
      <div className="absolute top-4 left-4 text-[#b89758] text-[9px] font-serif select-none pointer-events-none">✦</div>
      <div className="absolute top-4 right-4 text-[#b89758] text-[9px] font-serif select-none pointer-events-none">✦</div>

      {/* Top Header: Chapter & Table of Contents Shortcut */}
      <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-[#b89758]/25 text-[10px] font-mono uppercase tracking-widest text-[#78613d]">
        <span>CHAPTER {story.chapterNumber} · {story.chapterTitle}</span>
        <button
          type="button"
          onClick={onOpenChapters}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[#b89758]/15 text-[#63481b] hover:text-[#1c1917] font-semibold transition-colors cursor-pointer"
          title="Open Table of Contents"
        >
          <Bookmark className="w-3 h-3 text-[#b89758]" />
          <span>INDEX</span>
        </button>
      </div>

      {/* Central Editorial Narrative & Quotation Scroll Area */}
      <div className="relative z-10 my-auto py-2 overflow-y-auto max-h-[calc(100%-80px)] pr-1 scrollbar-thin scrollbar-thumb-[#b89758]/30">
        {/* Large Editorial Headline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-tight text-[#1c1917] leading-tight">
          {story.title}
        </h2>

        {/* Subtitle / Context Header */}
        <p className="mt-1 text-xs sm:text-sm font-serif italic text-[#78350f] font-medium leading-relaxed">
          {story.subtitle}
        </p>

        {/* Historical Context Short Box */}
        <div className="my-3 p-2.5 rounded bg-[#f7f3e8] border-l-2 border-[#b89758] text-[11px] sm:text-xs font-serif leading-relaxed text-[#574838]">
          <strong className="font-mono text-[9px] uppercase tracking-wider text-[#92400e] block mb-0.5">
            Historical Context
          </strong>
          {story.historicalContext}
        </div>

        {/* Primary Narrative with Drop Cap */}
        <div className="text-xs sm:text-[13px] font-serif leading-relaxed text-[#292524] text-justify space-y-2 mt-3">
          <p>
            <span className="float-left text-3xl sm:text-4xl font-serif font-black text-[#92400e] pr-2 pt-0.5 leading-none select-none">
              {firstLetter}
            </span>
            {remainingNarrative}
          </p>
          <p className="italic text-[#574838] pt-1">
            <strong>The Meaning:</strong> {story.meaning}
          </p>
        </div>

        {/* Verified Quotation Block (If present) */}
        {hasVerifiedQuote && (
          <div className="mt-4 p-3 rounded-lg bg-[#fefbf6] border border-[#b89758]/40 shadow-sm relative">
            <QuoteIcon className="w-5 h-5 text-[#b89758]/40 absolute top-2 right-2 rotate-180" />
            <blockquote className="text-xs sm:text-[13px] font-serif italic text-[#1c1917] font-medium leading-relaxed">
              &ldquo;{story.quote.text}&rdquo;
            </blockquote>
            {story.quote.hindiText && (
              <p className="text-xs font-serif italic text-[#92400e] mt-1.5 font-medium">
                &ldquo;{story.quote.hindiText}&rdquo;
              </p>
            )}
            <div className="mt-2 pt-2 border-t border-[#b89758]/20 flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-[#78613d]">
              <div>
                <strong className="text-[#1c1917]">{story.quote.speaker}</strong>
                {story.quote.publicationDate && (
                  <span className="text-[#a18861]"> · {story.quote.publicationDate}</span>
                )}
              </div>
              {story.quote.sourceUrl && (
                <a
                  href={story.quote.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#92400e] hover:underline font-semibold"
                  title="Inspect Credible Source"
                >
                  <ShieldCheck className="w-3 h-3 text-[#b89758]" />
                  <span>{story.quote.sourceTitle || "Verified Source"}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Turn-the-Page Navigation Console */}
      <div className="relative z-10 pt-2.5 border-t border-[#b89758]/25 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevPage}
          disabled={!canGoPrev}
          className={cn(
            "inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer border",
            canGoPrev
              ? "bg-[#f5eedb] hover:bg-[#b89758] hover:text-black border-[#b89758]/50 text-[#63481b]"
              : "opacity-30 cursor-not-allowed border-transparent text-stone-400"
          )}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>PREV</span>
        </button>

        <span className="font-mono text-[10px] text-[#78613d] font-bold tracking-widest">
          PAGE {pageNumber + 1}
        </span>

        <button
          type="button"
          onClick={onNextPage}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer border bg-[#b89758] text-[#1c1917] hover:bg-[#92400e] hover:text-white border-[#b89758] shadow-[0_2px_8px_rgba(184,151,88,0.35)] active:scale-95"
          aria-label={canGoNext ? "Next Page" : "Proceed to Epilogue"}
        >
          <span>{canGoNext ? "NEXT" : "EPILOGUE"}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
