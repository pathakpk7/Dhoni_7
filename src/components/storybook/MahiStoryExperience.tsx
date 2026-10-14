"use client";

import React, { useState } from "react";
import { StoryIntroduction } from "./StoryIntroduction";
import { LandscapeBookReader } from "@/components/room/LandscapeBookReader";
import { storyAudio } from "./StoryAudio";

export const MahiStoryExperience: React.FC = () => {
  const [activeReaderBookId, setActiveReaderBookId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleOpenBook = (bookId?: string) => {
    storyAudio.playBookThudSound();
    setActiveReaderBookId(bookId || "book-1-the-genesis");
  };

  const handleToggleMute = () => {
    const nextMuted = storyAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <>
      <StoryIntroduction
        onOpenStory={handleOpenBook}
        onExploreChapters={() => handleOpenBook("book-1-the-genesis")}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {activeReaderBookId && (
        <LandscapeBookReader
          initialBookId={activeReaderBookId}
          isOpen={Boolean(activeReaderBookId)}
          onClose={() => setActiveReaderBookId(null)}
        />
      )}
    </>
  );
};
