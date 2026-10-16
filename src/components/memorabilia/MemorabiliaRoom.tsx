"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Trophy,
  BookOpen,
  Tv,
  Flame,
  Shield,
  Sparkles,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Compass,
  Crown,
  ChevronRight,
  Info,
} from "lucide-react";
import { TrophyCabinetDetailModal } from "./TrophyCabinetDetailModal";
import { BookshelfDetailModal } from "./BookshelfDetailModal";
import { ReebokBatDetailModal } from "./ReebokBatDetailModal";
import { IndiaJerseyCabinetDetailModal } from "./IndiaJerseyCabinetDetailModal";
import { CskJerseyDetailModal } from "./CskJerseyDetailModal";
import { ArmyJerseyDetailModal } from "./ArmyJerseyDetailModal";
import { TelevisionMatchModal, TvModalTab } from "./TelevisionMatchModal";
import { storyAudio } from "@/components/storybook/StoryAudio";

export const MemorabiliaRoom: React.FC = () => {
  // Modal states
  const [activeModal, setActiveModal] = useState<
    "trophies" | "books" | "bat" | "india_jerseys" | "csk_jerseys" | "army_jersey" | "tv_match" | null
  >(null);
  const [cskJerseyType, setCskJerseyType] = useState<"IPL" | "CLT20" | "ALL">("ALL");
  const [tvInitialMode, setTvInitialMode] = useState<TvModalTab>("choice");
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [ambientAudioOn, setAmbientAudioOn] = useState<boolean>(false);
  const [isChantsPlaying, setIsChantsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize custom Dhoni chants audio MPEG
    const audio = new Audio("/dhoni_chants.mpeg");
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    const handlePlay = () => setIsChantsPlaying(true);
    const handlePause = () => setIsChantsPlaying(false);
    const handleEnded = () => setIsChantsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  const toggleDhoniChants = () => {
    storyAudio.playClick();
    if (!audioRef.current) return;
    if (isChantsPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback was blocked or failed:", err);
      });
    }
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleFullscreen = () => {
    storyAudio.playClick();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const openHotspot = (
    type: "trophies" | "books" | "bat" | "india_jerseys" | "csk_jerseys" | "army_jersey" | "tv_match",
    cskType: "IPL" | "CLT20" | "ALL" = "ALL"
  ) => {
    storyAudio.playClick();
    setCskJerseyType(cskType);
    setActiveModal(type);
  };

  const openTvModal = (mode: TvModalTab = "choice") => {
    storyAudio.playClick();
    if (audioRef.current && isChantsPlaying) {
      audioRef.current.pause();
    }
    setTvInitialMode(mode);
    setActiveModal("tv_match");
  };

  // Hotspots configured accurately against 1024x576 composition
  const HOTSPOTS = [
    {
      id: "trophies",
      label: "Explore the trophies",
      subLabel: "29 Major Titles & Medals",
      icon: Trophy,
      style: {
        left: "0%",
        top: "6%",
        width: "19.5%",
        height: "74%",
      },
      badgePos: { top: "25%", left: "10%" },
      action: () => openHotspot("trophies"),
    },
    {
      id: "books",
      label: "Open the captain's bookshelf",
      subLabel: "Four Hardcover Biographical Chronicles",
      icon: BookOpen,
      style: {
        left: "19.5%",
        top: "16%",
        width: "18%",
        height: "36%",
      },
      badgePos: { top: "30%", left: "28%" },
      action: () => openHotspot("books"),
    },
    {
      id: "tv_match",
      label: "2011 World Cup Final TV",
      subLabel: "Helicopter Shot Video · Vande Mataram Crowd Chants",
      icon: Tv,
      style: {
        left: "37.5%",
        top: "22%",
        width: "26.5%",
        height: "34%",
      },
      badgePos: { top: "36%", left: "50%" },
      action: () => openTvModal("choice"),
    },
    {
      id: "bat",
      label: "Discover the legendary bat",
      subLabel: "Reebok Willow · £100K Guinness Record",
      icon: Sparkles,
      style: {
        left: "62%",
        top: "47%",
        width: "4.5%",
        height: "28%",
      },
      badgePos: { top: "58%", left: "64%" },
      action: () => openHotspot("bat"),
    },
    {
      id: "india_jerseys",
      label: "Browse the jersey archive",
      subLabel: "Chronological India Wardrobe (2004–2019)",
      icon: Shield,
      style: {
        left: "66.5%",
        top: "6%",
        width: "24%",
        height: "72%",
      },
      badgePos: { top: "35%", left: "78%" },
      action: () => openHotspot("india_jerseys"),
    },
    {
      id: "csk_ipl",
      label: "CSK IPL Champions Jersey",
      subLabel: "Canary Yellow 5-Star Crown",
      icon: Crown,
      style: {
        left: "91.5%",
        top: "8%",
        width: "8.5%",
        height: "24%",
      },
      badgePos: { top: "18%", left: "95%" },
      action: () => openHotspot("csk_jerseys", "IPL"),
    },
    {
      id: "csk_clt20",
      label: "CSK CLT20 Double Crown Jersey",
      subLabel: "World Champions 2010 & 2014",
      icon: Flame,
      style: {
        left: "91.5%",
        top: "33%",
        width: "8.5%",
        height: "21%",
      },
      badgePos: { top: "42%", left: "95%" },
      action: () => openHotspot("csk_jerseys", "CLT20"),
    },
    {
      id: "army_jersey",
      label: "Indian Army Tribute Uniform",
      subLabel: "Honorary Lt. Colonel & Para Wings",
      icon: Shield,
      style: {
        left: "91.5%",
        top: "55%",
        width: "8.5%",
        height: "22%",
      },
      badgePos: { top: "65%", left: "95%" },
      action: () => openHotspot("army_jersey"),
    },
    {
      id: "dhoni_jersey_chants",
      label: isChantsPlaying ? "Pause Stadium Chants" : "MS Dhoni #7 Jersey",
      subLabel: isChantsPlaying ? "Echoing 'Dhoni! Dhoni!' · Click to Mute" : "Click to Play Authentic Stadium Chants",
      icon: isChantsPlaying ? Volume2 : VolumeX,
      style: {
        left: "39.8%",
        top: "67.4%",
        width: "15.8%",
        height: "25%",
      },
      badgePos: { top: "72%", left: "47%" },
      action: toggleDhoniChants,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col bg-neutral-950 text-white selection:bg-amber-500 selection:text-neutral-950 select-none overflow-x-hidden overflow-y-auto"
    >
      {/* Top Experience Subheader Bar */}
      <div className="w-full bg-neutral-950/80 backdrop-blur-md border-b border-amber-900/30 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 z-30">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-semibold">
              MS Dhoni Private Museum
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-amber-100">
            A LEGACY BEYOND NUMBERS
          </h1>
          <p className="text-xs text-neutral-400 hidden sm:block">
            Step inside the moments, milestones, and memories that defined an era. Click any artifact in the room.
          </p>
        </div>

        {/* Room HUD Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDhoniChants}
            className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer ${
              isChantsPlaying
                ? "bg-amber-500/20 border-amber-500/80 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] ring-1 ring-amber-400"
                : "bg-neutral-900/90 hover:bg-neutral-800 border-neutral-800 text-neutral-400 hover:text-white"
            }`}
            title="Toggle MS Dhoni Stadium Chants Audio"
          >
            {isChantsPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline font-bold">CHANTS: PLAYING</span>
                <span className="flex gap-0.5 items-end h-3 ml-1">
                  <span className="w-0.5 h-3 bg-amber-400 animate-pulse" />
                  <span className="w-0.5 h-2 bg-amber-400 animate-pulse delay-75" />
                  <span className="w-0.5 h-3.5 bg-amber-400 animate-pulse delay-150" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-neutral-400" />
                <span className="hidden sm:inline">DHONI CHANTS</span>
              </>
            )}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden md:inline">{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Room Viewport */}
      <div className="relative flex-1 w-full flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden">
        {/* Aspect Ratio 16:9 Canvas Container */}
        <div className="relative w-full max-w-[1340px] aspect-[16/9] rounded-2xl overflow-hidden border border-amber-500/20 shadow-[0_0_80px_rgba(0,0,0,0.9)] bg-neutral-900 group">
          {/* Main Background Image */}
          <Image
            src="/images/room/dhoni_memorabilia_room.jpg"
            alt="MS Dhoni Memorabilia Room"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1340px"
            className="object-cover object-center transform transition-transform duration-700 ease-out"
          />

          {/* Vignette & Ambient Glow */}
          <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40" />

          {/* Interactive Hotspots Layer */}
          {HOTSPOTS.map((hotspot) => {
            const isHovered = hoveredHotspot === hotspot.id;
            const isJerseySpot = hotspot.id === "dhoni_jersey_chants";
            const Icon = hotspot.icon;

            return (
              <div
                key={hotspot.id}
                style={hotspot.style}
                onClick={hotspot.action}
                onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                onMouseLeave={() => setHoveredHotspot(null)}
                className="absolute cursor-pointer transition-all duration-300 z-20 group/spot"
                role="button"
                tabIndex={0}
                aria-label={hotspot.label}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    hotspot.action();
                  }
                }}
              >
                {/* Hotspot Hover Outline & Glass highlight */}
                <div
                  className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    isJerseySpot && isChantsPlaying
                      ? "bg-amber-400/20 border-2 border-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.6)] backdrop-brightness-125 animate-pulse"
                      : isHovered
                      ? "bg-amber-400/15 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.5)] backdrop-brightness-110"
                      : "border border-white/0 hover:border-amber-400/40"
                  }`}
                />

                {/* Pulsing Beacon Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                  <div
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isJerseySpot && isChantsPlaying
                        ? "scale-125 bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/80 ring-4 ring-amber-400/40"
                        : isHovered
                        ? "scale-125 bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/60"
                        : "bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/50 shadow-md group-hover/spot:scale-110"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isJerseySpot && isChantsPlaying ? "animate-bounce" : ""}`} />
                    {/* Concentric pulse ring */}
                    {(!isHovered || (isJerseySpot && isChantsPlaying)) && (
                      <span className={`absolute -inset-1 rounded-full border border-amber-400/50 animate-ping opacity-60 ${isJerseySpot && isChantsPlaying ? "duration-700" : ""}`} />
                    )}
                  </div>
                </div>

                {/* Hover Tooltip Card */}
                {isHovered && (
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none z-30 whitespace-nowrap animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-3.5 py-1.5 rounded-xl bg-neutral-950/95 border border-amber-400/80 text-amber-200 shadow-2xl backdrop-blur-md flex flex-col items-center">
                      <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-white">
                        <span>{hotspot.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                      <span className="text-[10px] font-mono text-amber-400/80">
                        {hotspot.subLabel}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile-Friendly Interactive Artifacts Directory (Always accessible on smaller screens) */}
      <div className="w-full px-3 sm:px-6 py-5 lg:hidden bg-neutral-950/95 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-amber-300">
                Museum Artifacts & Exhibits ({HOTSPOTS.length})
              </h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">Tap to inspect</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {HOTSPOTS.map((hotspot) => {
              const Icon = hotspot.icon;
              const isJerseySpot = hotspot.id === "dhoni_jersey_chants";

              return (
                <button
                  key={hotspot.id}
                  onClick={hotspot.action}
                  className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    isJerseySpot && isChantsPlaying
                      ? "bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.3)] ring-1 ring-amber-400"
                      : "bg-neutral-900/90 hover:bg-neutral-800 border-neutral-800 hover:border-amber-500/40"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isJerseySpot && isChantsPlaying
                        ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/50"
                        : "bg-black/60 border border-amber-500/30 text-amber-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-serif font-bold text-white truncate">
                        {hotspot.label}
                      </h4>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    </div>
                    <p className="text-[11px] font-mono text-amber-400/80 truncate">
                      {hotspot.subLabel}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Artifact Quick-Navigation Strip */}
      <div className="w-full bg-neutral-950 border-t border-neutral-900 px-4 sm:px-8 py-3 z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>INTERACTIVE ARTIFACTS:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => openHotspot("trophies")}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-xs font-mono text-neutral-300 hover:text-amber-200 transition-colors"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Trophy Cabinet (29)</span>
            </button>
            <button
              onClick={() => openHotspot("books")}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-xs font-mono text-neutral-300 hover:text-amber-200 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>4 Hardcover Books (3D Flip)</span>
            </button>
            <button
              onClick={() => openTvModal("choice")}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500/40 text-xs font-mono text-neutral-300 hover:text-blue-200 transition-colors"
            >
              <Tv className="w-3.5 h-3.5 text-blue-400" />
              <span>2011 WC TV</span>
            </button>
            <button
              onClick={() => openTvModal("helicopter")}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-xs font-mono text-neutral-300 hover:text-amber-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Helicopter Shot</span>
            </button>
            <button
              onClick={() => openTvModal("vande")}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-orange-500/40 hover:border-orange-400 text-xs font-mono text-orange-300 hover:text-orange-200 transition-colors"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Crowd: Vande Mataram !!</span>
            </button>
            <button
              onClick={() => openHotspot("bat")}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-xs font-mono text-neutral-300 hover:text-amber-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Reebok Willow (£100K)</span>
            </button>
            <button
              onClick={() => openHotspot("india_jerseys")}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500/40 text-xs font-mono text-neutral-300 hover:text-blue-200 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>India Jersey Wardrobe</span>
            </button>
            <button
              onClick={() => openHotspot("csk_jerseys", "ALL")}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-xs font-mono text-neutral-300 hover:text-amber-200 transition-colors"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>CSK Journey (10 Kits)</span>
            </button>
            <button
              onClick={() => openHotspot("army_jersey")}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-emerald-500/40 text-xs font-mono text-neutral-300 hover:text-emerald-200 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Army Uniform</span>
            </button>
            <button
              onClick={toggleDhoniChants}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                isChantsPlaying
                  ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] font-bold animate-pulse"
                  : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-200"
              }`}
            >
              {isChantsPlaying ? (
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{isChantsPlaying ? "#7 Jersey Chants (Playing)" : "#7 Jersey Chants"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TrophyCabinetDetailModal
        isOpen={activeModal === "trophies"}
        onClose={() => setActiveModal(null)}
      />

      <BookshelfDetailModal
        isOpen={activeModal === "books"}
        onClose={() => setActiveModal(null)}
      />

      <TelevisionMatchModal
        isOpen={activeModal === "tv_match"}
        initialMode={tvInitialMode}
        onClose={() => setActiveModal(null)}
      />

      <ReebokBatDetailModal
        isOpen={activeModal === "bat"}
        onClose={() => setActiveModal(null)}
      />

      <IndiaJerseyCabinetDetailModal
        isOpen={activeModal === "india_jerseys"}
        onClose={() => setActiveModal(null)}
      />

      <CskJerseyDetailModal
        isOpen={activeModal === "csk_jerseys"}
        initialType={cskJerseyType}
        onClose={() => setActiveModal(null)}
      />

      <ArmyJerseyDetailModal
        isOpen={activeModal === "army_jersey"}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};
