"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize2,
  ExternalLink,
  ShieldCheck,
  Film,
} from "lucide-react";
import type { StoryMedia } from "@/types/storybook";
import { cn } from "@/lib/utils";

interface StoryVideoPlayerProps {
  media: StoryMedia;
  title: string;
  isActivePage: boolean;
  onMediaStateChange?: (isPlaying: boolean) => void;
}

export const StoryVideoPlayer: React.FC<StoryVideoPlayerProps> = ({
  media,
  title,
  isActivePage,
  onMediaStateChange,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showEmbed, setShowEmbed] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Stop video immediately when turning away from this page
  useEffect(() => {
    if (!isActivePage) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
      setShowEmbed(false);
      onMediaStateChange?.(false);
    }
  }, [isActivePage, onMediaStateChange]);

  const togglePlay = () => {
    if (media.provider === "HTML5" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        onMediaStateChange?.(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          onMediaStateChange?.(true);
        }).catch(() => {});
      }
    } else if (media.provider === "YOUTUBE") {
      setShowEmbed(!showEmbed);
      setIsPlaying(!showEmbed);
      onMediaStateChange?.(!showEmbed);
    } else {
      // For archival images, opening source link or expand
      if (media.sourceUrl) {
        window.open(media.sourceUrl, "_blank", "noopener,noreferrer");
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      onMediaStateChange?.(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-lg overflow-hidden bg-black/90 border border-[#b89758]/40 shadow-inner group flex flex-col justify-between"
      style={{ aspectRatio: "16/9" }}
    >
      {/* Archival Corner Filigree Brackets */}
      <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#b89758] pointer-events-none z-20" />
      <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#b89758] pointer-events-none z-20" />
      <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#b89758] pointer-events-none z-20" />
      <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#b89758] pointer-events-none z-20" />

      {/* Main Screen Content */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {media.provider === "HTML5" && media.sourceUrl && (
          <video
            ref={videoRef}
            src={media.sourceUrl}
            poster={media.posterUrl}
            playsInline
            onTimeUpdate={() => {
              if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
                setDuration(videoRef.current.duration || 0);
              }
            }}
            onEnded={() => {
              setIsPlaying(false);
              onMediaStateChange?.(false);
            }}
            className="w-full h-full object-cover"
          />
        )}

        {media.provider === "YOUTUBE" && showEmbed && media.embedUrl && (
          <iframe
            src={`${media.embedUrl}?autoplay=1&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0 z-10"
          />
        )}

        {/* Poster Plate (When not embedding iframe or when image archive) */}
        {(!showEmbed || media.provider !== "YOUTUBE") && media.provider !== "HTML5" && (
          <div className="relative w-full h-full">
            <Image
              src={imageError ? "/images/hero/hero_dhoni_duo.jpg" : media.posterUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
              priority={isActivePage}
            />
            {/* Subtle vintage vignette & sepia toning */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />
            <div className="absolute inset-0 bg-[#451a03]/10 mix-blend-color pointer-events-none" />
          </div>
        )}

        {/* Big Central Play / Inspect Trigger (When video is paused or un-embedded) */}
        {!isPlaying && !showEmbed && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1c1917]/85 border-2 border-[#b89758] flex items-center justify-center text-[#f6f2e8] shadow-[0_0_20px_rgba(184,151,88,0.4)] hover:scale-110 active:scale-95 transition-all cursor-pointer group-hover:bg-[#b89758] group-hover:text-black"
            aria-label={media.provider === "IMAGE_ARCHIVE" ? "Inspect Source Record" : "Play Media Plate"}
          >
            {media.provider === "IMAGE_ARCHIVE" ? (
              <Film className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
            )}
          </button>
        )}
      </div>

      {/* Control Console (Overlay at bottom) */}
      <div className="relative z-20 bg-gradient-to-t from-black via-black/90 to-transparent p-2 sm:p-2.5 flex flex-col gap-1.5 border-t border-white/10 font-mono text-[10px]">
        {/* Progress seek line for HTML5 video */}
        {media.provider === "HTML5" && duration > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[#d6c7a1] text-[9px] tabular-nums">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/20 rounded accent-[#b89758] cursor-pointer"
            />
            <span className="text-slate-400 text-[9px] tabular-nums">{formatTime(duration)}</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          {/* Left Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 rounded hover:bg-white/10 text-[#d6c7a1] hover:text-white transition-colors cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            {media.provider === "HTML5" && (
              <>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded hover:bg-white/10 text-[#d6c7a1] hover:text-white transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-12 h-1 bg-white/20 rounded accent-[#b89758] cursor-pointer hidden sm:inline-block"
                />
                <button
                  type="button"
                  onClick={handleReplay}
                  className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Replay from start"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </>
            )}

            {/* Provider provenance badge */}
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 border border-[#b89758]/30 text-[9px] text-[#d6c7a1] uppercase tracking-wider">
              <ShieldCheck className="w-2.5 h-2.5 text-[#b89758]" />
              <span className="truncate max-w-[120px]">{media.attribution || "VERIFIED ICC ARCHIVE"}</span>
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5">
            {media.sourceUrl && (
              <a
                href={media.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-[#b89758]/20 border border-white/10 hover:border-[#b89758]/40 text-slate-300 hover:text-[#d6c7a1] text-[9px] transition-colors"
                title="View Official Source Verification"
              >
                <span>Source</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Fullscreen"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
