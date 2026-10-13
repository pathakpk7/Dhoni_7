"use client";

import React from "react";
import { Calendar, MapPin, Film, ShieldCheck } from "lucide-react";
import type { StoryEntry } from "@/types/storybook";
import { StoryVideoPlayer } from "./StoryVideoPlayer";

interface StoryLeftPageProps {
  story: StoryEntry;
  pageNumber: number;
  totalStories: number;
  isActive: boolean;
}

export const StoryLeftPage: React.FC<StoryLeftPageProps> = ({
  story,
  pageNumber,
  totalStories,
  isActive,
}) => {
  return (
    <div className="relative w-full h-full bg-[#fcfaf3] text-[#1c1917] p-5 sm:p-7 md:p-8 flex flex-col justify-between select-text overflow-hidden shadow-[inset_-12px_0_24px_-8px_rgba(0,0,0,0.18)] border-r border-[#d4af37]/25">
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

      {/* Header Stamp: Chapter & Category */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#b89758]/25 text-[10px] font-mono uppercase tracking-widest text-[#78613d]">
        <div className="flex items-center gap-1.5">
          <Film className="w-3 h-3 text-[#b89758]" />
          <span>PLATE {pageNumber} · {story.chapterTitle}</span>
        </div>
        <span className="px-1.5 py-0.5 rounded bg-[#b89758]/15 border border-[#b89758]/30 font-bold text-[#63481b]">
          {story.category.replace("_", " ")}
        </span>
      </div>

      {/* Central Living Media Plate */}
      <div className="relative z-10 my-auto py-2 flex flex-col gap-3">
        <StoryVideoPlayer
          media={story.media}
          title={story.title}
          isActivePage={isActive}
        />

        {/* Archival Date & Location Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] font-mono text-[#574834]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-[#b89758]" />
            <span className="font-semibold">{story.eventDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-right">
            <MapPin className="w-3 h-3 text-[#b89758]" />
            <span className="truncate max-w-[200px]">{story.location}</span>
          </div>
        </div>

        {/* Visual Caption */}
        <p className="text-[12px] font-serif italic text-[#4a3f35] leading-relaxed text-center px-2">
          &ldquo;{story.subtitle}&rdquo;
        </p>
      </div>

      {/* Footer Page Stamping */}
      <div className="relative z-10 pt-2 border-t border-[#b89758]/20 flex items-center justify-between text-[10px] font-mono text-[#8a7251]">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#b89758]" />
          <span>{story.contentType.replace(/_/g, " ")}</span>
        </span>
        <span className="font-bold tracking-widest">
          {pageNumber} / {totalStories}
        </span>
      </div>
    </div>
  );
};
