"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Search, ChevronRight, ShieldCheck, Film, Calendar, MapPin } from "lucide-react";
import { STORYBOOK_CHAPTERS, MAHI_STORY_LIBRARY } from "@/data/mahiStoryLibrary";
import { cn } from "@/lib/utils";

interface ChapterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onSelectStoryIndex: (index: number) => void;
}

export const ChapterDrawer: React.FC<ChapterDrawerProps> = ({
  isOpen,
  onClose,
  currentIndex,
  onSelectStoryIndex,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredStories = MAHI_STORY_LIBRARY.filter((s) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      s.title.toLowerCase().includes(term) ||
      s.subtitle.toLowerCase().includes(term) ||
      s.chapterTitle.toLowerCase().includes(term) ||
      s.location.toLowerCase().includes(term) ||
      s.tags.some((t) => t.toLowerCase().includes(term));
    const matchesChapter = !selectedChapterId || s.chapterId === selectedChapterId;
    return matchesSearch && matchesChapter;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-xl bg-[#0f0c09] border-l border-[#b89758]/30 h-full flex flex-col justify-between shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#b89758]">
              ARCHIVE INDEX
            </span>
            <h3 className="text-xl font-serif font-bold text-white mt-0.5">
              The 12 Chapters of Mahi
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Index"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="py-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#b89758] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search moments (e.g. 2011, Joginder, 183*, Kashmir, CSK)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-black/60 border border-[#b89758]/30 text-xs font-mono text-white placeholder:text-stone-500 focus:outline-none focus:border-[#b89758]"
            />
          </div>
        </div>

        {/* Chapter Quick Pills Strip */}
        <div className="overflow-x-auto scrollbar-none pb-2 flex gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setSelectedChapterId(null)}
            className={cn(
              "px-2.5 py-1 rounded text-[10px] font-mono uppercase whitespace-nowrap transition-colors border",
              !selectedChapterId
                ? "bg-[#b89758] text-black border-[#b89758] font-bold"
                : "bg-black/40 text-stone-400 border-white/10 hover:text-white"
            )}
          >
            All 36 Moments
          </button>
          {STORYBOOK_CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setSelectedChapterId(ch.id)}
              className={cn(
                "px-2.5 py-1 rounded text-[10px] font-mono uppercase whitespace-nowrap transition-colors border",
                selectedChapterId === ch.id
                  ? "bg-[#b89758] text-black border-[#b89758] font-bold"
                  : "bg-black/40 text-stone-400 border-white/10 hover:text-white"
              )}
            >
              Ch {ch.romanNumeral}
            </button>
          ))}
        </div>

        {/* Stories List */}
        <div className="flex-1 overflow-y-auto py-2 space-y-2 pr-1 scrollbar-thin scrollbar-thumb-white/10">
          {filteredStories.length === 0 ? (
            <div className="py-12 text-center text-stone-500 font-mono text-xs">
              No moments found matching &ldquo;{searchTerm}&rdquo;
            </div>
          ) : (
            filteredStories.map((s) => {
              const storyGlobalIdx = MAHI_STORY_LIBRARY.findIndex((item) => item.id === s.id);
              const isCurrent = storyGlobalIdx === currentIndex;

              return (
                <div
                  key={s.id}
                  onClick={() => {
                    onSelectStoryIndex(storyGlobalIdx);
                    onClose();
                  }}
                  className={cn(
                    "p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 group",
                    isCurrent
                      ? "bg-[#b89758]/20 border-[#b89758] text-white shadow-lg"
                      : "bg-black/40 border-white/5 hover:border-[#b89758]/40 hover:bg-white/[0.03]"
                  )}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#b89758]">
                      <span>CH {s.chapterNumber}</span>
                      <span>·</span>
                      <span className="truncate">{s.eventDate}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-stone-200 group-hover:text-white truncate mt-0.5">
                      {s.title}
                    </h4>
                    <p className="text-[11px] font-serif italic text-stone-400 truncate mt-0.5">
                      {s.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 text-[10px] font-mono text-stone-400 group-hover:text-[#b89758]">
                    <span>Page {storyGlobalIdx + 1}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-stone-500">
          <span>Active: Moment {currentIndex + 1} of {MAHI_STORY_LIBRARY.length}</span>
          <span className="text-[#b89758]">Verified Cricket Archive</span>
        </div>
      </div>
    </div>
  );
};
