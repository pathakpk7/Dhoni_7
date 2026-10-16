"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  Tv,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  Flame,
  Radio,
  Film,
  Music,
  Share2,
  Maximize2,
  Sliders,
} from "lucide-react";
import { storyAudio } from "@/components/storybook/StoryAudio";

export type TvModalTab = "choice" | "helicopter" | "vande" | "scorecard" | "timeline";

interface TelevisionMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: TvModalTab;
}

export const TelevisionMatchModal: React.FC<TelevisionMatchModalProps> = ({
  isOpen,
  onClose,
  initialMode = "choice",
}) => {
  const [activeTab, setActiveTab] = useState<TvModalTab>(initialMode);
  
  // Vande Mataram Audio State
  const vandeAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isVandePlaying, setIsVandePlaying] = useState<boolean>(false);
  const [vandeTime, setVandeTime] = useState<number>(0);
  const [vandeDuration, setVandeDuration] = useState<number>(0);
  const [isVandeMuted, setIsVandeMuted] = useState<boolean>(false);

  // Helicopter Video State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [videoSource, setVideoSource] = useState<"/videos/2011_six.mp4" | "/videos/helicopter.mp4">(
    "/videos/2011_six.mp4"
  );
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

  // Ravi Shastri Commentary TTS State
  const [audioCommentaryPlaying, setAudioCommentaryPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialMode || "choice");
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
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

  // Clean pause on unmount or close
  const stopAllMedia = () => {
    if (vandeAudioRef.current) {
      vandeAudioRef.current.pause();
    }
    setIsVandePlaying(false);

    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoPlaying(false);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setAudioCommentaryPlaying(false);
  };

  const handleClose = () => {
    storyAudio.playClick();
    stopAllMedia();
    onClose();
  };

  const handleTabChange = (tab: TvModalTab) => {
    storyAudio.playClick();
    if (tab !== "vande" && vandeAudioRef.current) {
      vandeAudioRef.current.pause();
      setIsVandePlaying(false);
    }
    if (tab !== "helicopter" && videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setAudioCommentaryPlaying(false);
    }
    setActiveTab(tab);
  };

  // Vande Mataram Playback Controls
  const toggleVandePlay = () => {
    storyAudio.playClick();
    if (!vandeAudioRef.current) return;

    if (isVandePlaying) {
      vandeAudioRef.current.pause();
    } else {
      // Pause video if playing
      if (videoRef.current) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
      vandeAudioRef.current.play().catch((err) => {
        console.warn("Vande audio failed to play:", err);
      });
    }
  };

  const handleVandeSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (vandeAudioRef.current) {
      vandeAudioRef.current.currentTime = newTime;
      setVandeTime(newTime);
    }
  };

  const restartVande = () => {
    storyAudio.playClick();
    if (vandeAudioRef.current) {
      vandeAudioRef.current.currentTime = 0;
      vandeAudioRef.current.play().catch(console.warn);
    }
  };

  const toggleVandeMute = () => {
    storyAudio.playClick();
    if (vandeAudioRef.current) {
      vandeAudioRef.current.muted = !isVandeMuted;
      setIsVandeMuted(!isVandeMuted);
    }
  };

  // Helicopter Video Controls
  const toggleVideoPlay = () => {
    storyAudio.playClick();
    if (!videoRef.current) return;

    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      // Pause Vande audio if playing
      if (vandeAudioRef.current) {
        vandeAudioRef.current.pause();
        setIsVandePlaying(false);
      }
      videoRef.current.play().catch((err) => {
        console.warn("Video failed to play:", err);
      });
    }
  };

  const restartVideo = () => {
    storyAudio.playClick();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.warn);
    }
  };

  const toggleVideoMute = () => {
    storyAudio.playClick();
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleCommentary = () => {
    if (audioCommentaryPlaying) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setAudioCommentaryPlaying(false);
    } else {
      storyAudio.playClick();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const text =
          "Dhoni finishes off in style! A magnificent strike into the crowd! India lift the World Cup after 28 years! The party has started in the dressing room, and it is an Indian captain who has been absolutely magnificent in the night of the final!";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.1;
        utterance.onend = () => setAudioCommentaryPlaying(false);
        utterance.onerror = () => setAudioCommentaryPlaying(false);
        window.speechSynthesis.speak(utterance);
        setAudioCommentaryPlaying(true);
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Hidden Vande Mataram Audio Element */}
      <audio
        ref={vandeAudioRef}
        src="/vande.mpeg"
        preload="metadata"
        onTimeUpdate={() => {
          if (vandeAudioRef.current) {
            setVandeTime(vandeAudioRef.current.currentTime);
            setVandeDuration(vandeAudioRef.current.duration || 0);
          }
        }}
        onLoadedMetadata={() => {
          if (vandeAudioRef.current) {
            setVandeDuration(vandeAudioRef.current.duration || 0);
          }
        }}
        onPlay={() => setIsVandePlaying(true)}
        onPause={() => setIsVandePlaying(false)}
        onEnded={() => setIsVandePlaying(false)}
      />

      {/* Atmospheric Blue & Amber Stadium Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-neutral-950/90 to-black" />

      {/* Main Television Frame Container */}
      <div className="relative w-full h-full max-w-7xl max-h-[96vh] flex flex-col mx-auto px-4 py-3 sm:px-6 sm:py-4 z-10">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-blue-900/40 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-blue-500/30 text-blue-300 text-xs tracking-wider uppercase font-mono transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Room</span>
            </button>
            <div className="hidden sm:block h-4 w-px bg-neutral-800" />
            <div>
              <span className="text-[10px] tracking-widest text-blue-400 font-mono uppercase block">
                April 2, 2011 · Wankhede Stadium, Mumbai
              </span>
              <h2 className="text-base sm:text-lg font-serif text-white flex items-center gap-2 font-bold">
                <Tv className="w-5 h-5 text-blue-400" />
                <span>2011 ICC World Cup Final Live Television</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleCommentary}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                audioCommentaryPlaying
                  ? "bg-amber-500 text-neutral-950 font-bold animate-pulse"
                  : "bg-blue-950/80 hover:bg-blue-900 border border-blue-500/30 text-blue-200"
              }`}
            >
              {audioCommentaryPlaying ? <Volume2 className="w-4 h-4" /> : <Radio className="w-4 h-4" />}
              <span>{audioCommentaryPlaying ? "Stop Shastri Voice" : "Ravi Shastri Commentary"}</span>
            </button>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Primary Interactive Experience Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => handleTabChange("choice")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                activeTab === "choice"
                  ? "bg-white text-neutral-950 font-bold shadow-md shadow-white/10"
                  : "bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-neutral-400" />
              <span>Select Experience</span>
            </button>
            
            {/* Helicopter Shot Option */}
            <button
              onClick={() => handleTabChange("helicopter")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all ${
                activeTab === "helicopter"
                  ? "bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/30 ring-1 ring-amber-300"
                  : "bg-neutral-900/80 text-amber-300/90 hover:text-amber-200 border border-amber-500/30 hover:bg-amber-500/10"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>View Helicopter Shot</span>
            </button>

            {/* Vande Mataram Option */}
            <button
              onClick={() => handleTabChange("vande")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all ${
                activeTab === "vande"
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 text-white font-bold shadow-lg shadow-orange-500/30 ring-1 ring-white/40"
                  : "bg-neutral-900/80 text-orange-300/90 hover:text-orange-200 border border-orange-500/30 hover:bg-orange-500/10"
              }`}
            >
              <Music className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>Crowd: Vande Mataram !!</span>
              <span className="text-[10px] bg-red-600/80 text-white px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                ICONIC MOMENT
              </span>
            </button>

            {/* Scorecard */}
            <button
              onClick={() => handleTabChange("scorecard")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeTab === "scorecard"
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              Scorecard
            </button>

            {/* Timeline */}
            <button
              onClick={() => handleTabChange("timeline")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeTab === "timeline"
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              Timeline
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 font-bold">WANKHEDE ARCHIVE</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          
          {/* TAB 0: EXPERIENCE CHOICE SCREEN */}
          {activeTab === "choice" && (
            <div className="h-full flex flex-col justify-center max-w-5xl mx-auto py-4">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono tracking-widest uppercase mb-2">
                  <Tv className="w-3.5 h-3.5 text-blue-400" />
                  April 2, 2011 · Wankhede Stadium Television Broadcast
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-wide">
                  CHOOSE YOUR 2011 FINAL EXPERIENCE
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto mt-1">
                  Relive India&apos;s greatest sporting evening through video replay or authentic stadium audio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Choice 1: Helicopter Shot Video */}
                <div
                  onClick={() => handleTabChange("helicopter")}
                  className="group relative rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border-2 border-neutral-800 hover:border-amber-400/80 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:-translate-y-1"
                >
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono text-amber-300 font-bold tracking-widest uppercase">
                    VIDEO REPLAY
                  </div>

                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-all duration-300">
                      <Film className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase block">
                      Kulasekara to Dhoni · 48.2 Overs
                    </span>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1 mb-2 group-hover:text-amber-300 transition-colors">
                      View the Helicopter Shot
                    </h4>
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans mb-4">
                      Watch MS Dhoni twirl the willow, launch Nuwan Kulasekara high into the wide long-on stands, and pose as the ball sails into history to win the World Cup after 28 years.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400">
                      30s Replay · Shastri Commentary
                    </span>
                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                      <span>WATCH VIDEO</span>
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>

                {/* Choice 2: Crowd Chanting Vande Mataram */}
                <div
                  onClick={() => handleTabChange("vande")}
                  className="group relative rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border-2 border-orange-500/40 hover:border-orange-400 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:-translate-y-1"
                >
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-red-600 border border-red-400 text-[10px] font-mono text-white font-bold tracking-widest uppercase animate-pulse">
                    ★ ICONIC MOMENT ★
                  </div>

                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-5 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-emerald-500 group-hover:text-white transition-all duration-300">
                      <Music className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono text-orange-400 tracking-wider uppercase block">
                      33,000 Wankhede Voices In Unison · 48th Over
                    </span>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1 mb-2 group-hover:text-orange-300 transition-colors">
                      Crowd Before the Epic Win chanting Vande Mataram !!
                    </h4>
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans mb-4">
                      Feel the absolute goosebumps when 33,000 fans lit up their phone torches, waved the tricolor, and sang Vande Mataram in unified ecstasy before the winning six was struck.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400">
                      Authentic Stadium Audio Recording
                    </span>
                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-orange-400 group-hover:translate-x-1 transition-transform">
                      <span>LISTEN AUDIO</span>
                      <Volume2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: VIEW THE HELICOPTER SHOT VIDEO */}
          {activeTab === "helicopter" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
              {/* Television Screen Simulation & HTML5 Video */}
              <div className="lg:col-span-8 flex flex-col justify-between p-4 sm:p-6 rounded-2xl bg-neutral-950 border-4 border-neutral-800 shadow-[0_0_60px_rgba(37,99,235,0.25)] relative overflow-hidden">
                {/* TV Scanlines Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30 z-20" />

                {/* Top Video Header Ticker */}
                <div className="flex items-center justify-between text-xs font-mono z-20 border-b border-white/10 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                    <span className="font-bold text-red-500 tracking-wider">LIVE WANKHEDE</span>
                    <span className="text-neutral-400">| 48.2 OVERS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setVideoSource((prev) =>
                          prev === "/videos/2011_six.mp4" ? "/videos/helicopter.mp4" : "/videos/2011_six.mp4"
                        )
                      }
                      className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[11px] text-amber-300 font-mono transition-colors"
                      title="Switch Video Angle"
                    >
                      {videoSource === "/videos/2011_six.mp4" ? "Switch: Shot Loop (Slow-Mo)" : "Switch: Full 30s Replay"}
                    </button>
                  </div>
                </div>

                {/* HTML5 Video Player Frame */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center border border-neutral-800 group/video z-10">
                  <video
                    ref={videoRef}
                    key={videoSource}
                    src={videoSource}
                    playsInline
                    loop
                    muted={isVideoMuted}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    className="w-full h-full object-contain"
                  />

                  {/* Play/Pause Overlay Button */}
                  {!isVideoPlaying && (
                    <div
                      onClick={toggleVideoPlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs cursor-pointer z-30 group-hover/video:bg-black/20 transition-all"
                    >
                      <div className="w-16 h-16 rounded-full bg-amber-500/90 text-neutral-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                    </div>
                  )}

                  {/* On-screen Watermark */}
                  <div className="absolute bottom-3 left-3 bg-black/70 px-2.5 py-1 rounded border border-white/10 text-[10px] font-mono text-white/80 pointer-events-none">
                    48.2 ov · 91* (79b) · MS DHONI
                  </div>
                </div>

                {/* Video Controls Bar */}
                <div className="z-20 mt-3 pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleVideoPlay}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-neutral-950 font-bold flex items-center gap-1.5 hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      {isVideoPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      <span>{isVideoPlaying ? "PAUSE" : "PLAY"}</span>
                    </button>

                    <button
                      onClick={restartVideo}
                      className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 transition-colors"
                      title="Replay Video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={toggleVideoMute}
                      className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 transition-colors"
                      title={isVideoMuted ? "Unmute" : "Mute"}
                    >
                      {isVideoMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-neutral-300">
                    <span className="text-emerald-400 font-bold">INDIA WON BY 6 WICKETS</span>
                    <span className="text-neutral-500">|</span>
                    <span className="text-amber-300 font-semibold">TARGET: 275 CHASED</span>
                  </div>
                </div>
              </div>

              {/* Match Insights & Commentary */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
                    <Trophy className="w-4 h-4" />
                    <span>PLAYER OF THE MATCH IN WORLD CUP FINAL</span>
                  </div>

                  <h4 className="text-xl font-serif font-bold text-white mb-2">
                    The Iconic Helicopter Shot
                  </h4>

                  <p className="text-xs text-neutral-300 leading-relaxed font-sans mb-4">
                    Nuwan Kulasekara bowled a length delivery. Dhoni braced his base, transferred momentum through his wrists, and launched it deep over wide long-on. He did not run immediately — he held his pose and twirled the willow as 1.2 billion people erupted.
                  </p>

                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-2 mb-4">
                    <div className="text-amber-400 font-mono font-semibold">
                      SHOT METRICS & IMPACT:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>Distance: <span className="text-white font-bold">96 Meters</span></div>
                      <div>Launch Angle: <span className="text-white font-bold">32°</span></div>
                      <div>Bowler: <span className="text-white font-bold">N. Kulasekara</span></div>
                      <div>Required: <span className="text-emerald-400 font-bold">4 off 11 balls</span></div>
                    </div>
                  </div>

                  {/* Audio Commentary Quote Box */}
                  <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-xs">
                    <span className="font-mono text-blue-400 font-semibold block mb-1">
                      RAVI SHASTRI&apos;S HISTORIC WORDS:
                    </span>
                    <p className="italic text-blue-100">
                      &ldquo;Dhoni finishes off in style! A magnificent strike into the crowd! India lift the World Cup after 28 years! The party&apos;s started in the dressing room, and it’s an Indian captain who’s been absolutely magnificent in the night of the final!&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Wankhede Stadium, Mumbai</span>
                  <span className="text-amber-400">April 2, 2011</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CROWD CHANTING VANDE MATARAM !! . ICONIC MOMENT */}
          {activeTab === "vande" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
              {/* Vande Mataram Stadium Player */}
              <div className="lg:col-span-8 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-neutral-950 via-neutral-900 to-black border-4 border-orange-500/30 shadow-[0_0_80px_rgba(249,115,22,0.25)] relative overflow-hidden">
                
                {/* Stadium Crowd Celebration Background */}
                <div className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none">
                  <Image
                    src="/images/room/2011_celebration.jpg"
                    alt="2011 Wankhede Stadium Celebration"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
                </div>

                {/* Top Badge Ticker */}
                <div className="relative z-10 flex items-center justify-between border-b border-orange-500/20 pb-3 mb-4 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                    <span className="font-bold text-orange-400 tracking-wider">
                      CROWD ATMOSPHERE · 48TH OVER
                    </span>
                  </div>
                  <div className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px] tracking-widest uppercase">
                    ★ ICONIC MOMENT ★
                  </div>
                </div>

                {/* Main Audio Player Visualization */}
                <div className="relative z-10 my-4 text-center space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 via-white/10 to-emerald-500/20 border border-orange-400/30 text-orange-200 text-xs font-mono tracking-widest uppercase">
                    33,000 Fans United Before The Epic Finish
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-wide drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                    Crowd Before the Epic Win chanting Vande Mataram !!
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed font-sans">
                    With India needing under 15 runs to win, 33,000 spectators turned on their mobile flashlights, waved the tricolor, and spontaneously broke into A.R. Rahman&apos;s &ldquo;Vande Mataram&rdquo; at deafening volume.
                  </p>

                  {/* Equalizer Visualizer Bars */}
                  <div className="flex items-end justify-center gap-1.5 h-16 sm:h-20 py-2">
                    {[40, 65, 85, 50, 95, 70, 90, 60, 100, 75, 85, 45, 90, 80, 65, 95, 75, 60, 85, 70, 90, 100, 50, 75, 85, 95, 60, 80].map(
                      (baseHeight, i) => (
                        <div
                          key={i}
                          style={{
                            height: isVandePlaying ? `${Math.max(15, (baseHeight * ((i % 5) + 1)) % 100)}%` : "18%",
                            transition: "height 0.15s ease",
                          }}
                          className={`w-1.5 sm:w-2 rounded-full ${
                            i % 3 === 0
                              ? "bg-orange-500"
                              : i % 3 === 1
                              ? "bg-white"
                              : "bg-emerald-500"
                          } ${isVandePlaying ? "opacity-90 shadow-[0_0_10px_rgba(255,255,255,0.4)]" : "opacity-30"}`}
                        />
                      )
                    )}
                  </div>

                  {/* Big Play / Pause Button with Pulsing Glow */}
                  <div className="pt-2 flex items-center justify-center gap-4">
                    <button
                      onClick={restartVande}
                      className="p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 transition-colors"
                      title="Restart from beginning"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>

                    <button
                      onClick={toggleVandePlay}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl ${
                        isVandePlaying
                          ? "bg-gradient-to-tr from-orange-500 to-amber-400 text-neutral-950 scale-105 shadow-[0_0_50px_rgba(249,115,22,0.6)] ring-4 ring-orange-400/40"
                          : "bg-gradient-to-tr from-orange-500 to-amber-500 text-neutral-950 hover:scale-110 shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                      }`}
                      title={isVandePlaying ? "Pause Audio" : "Play Vande Mataram Chants"}
                    >
                      {isVandePlaying ? (
                        <Pause className="w-8 h-8 sm:w-9 sm:h-9 fill-current" />
                      ) : (
                        <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-current ml-1" />
                      )}
                    </button>

                    <button
                      onClick={toggleVandeMute}
                      className="p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 transition-colors"
                      title={isVandeMuted ? "Unmute" : "Mute"}
                    >
                      {isVandeMuted ? (
                        <VolumeX className="w-5 h-5 text-red-400" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-emerald-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Progress Scrubber Bar */}
                <div className="relative z-10 bg-neutral-950/80 rounded-xl p-3 border border-orange-500/20 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-neutral-400 w-10 text-right">
                      {formatTime(vandeTime)}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={vandeDuration || 100}
                      step={0.1}
                      value={vandeTime}
                      onChange={handleVandeSeek}
                      className="flex-1 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <span className="text-[11px] font-mono text-neutral-400 w-10">
                      {formatTime(vandeDuration)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1">
                    <span className="text-orange-400 font-bold">
                      {isVandePlaying ? "NOW PLAYING: STADIUM CHANTS" : "STATUS: PAUSED (CLICK PLAY)"}
                    </span>
                    <span className="text-neutral-500">Audio Source: /vande.mpeg</span>
                  </div>
                </div>
              </div>

              {/* Story & Emotional Impact Sidebar */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-orange-400 mb-2">
                    <Flame className="w-4 h-4" />
                    <span>THE PUREST GOOSEBUMPS IN CRICKET</span>
                  </div>

                  <h4 className="text-xl font-serif font-bold text-white mb-2">
                    33,000 Voices, One Nation
                  </h4>

                  <p className="text-xs text-neutral-300 leading-relaxed font-sans mb-4">
                    In the 48th over of the World Cup final, with 15 runs remaining, the crowd realised history was arriving. Without any prompt or DJ, section by section, fans stood up and began singing Vande Mataram together.
                  </p>

                  {/* Dhoni's Personal Quote */}
                  <div className="p-3.5 rounded-xl bg-orange-950/30 border border-orange-500/30 text-xs text-neutral-200 space-y-2 mb-4">
                    <div className="text-orange-400 font-mono font-bold flex items-center gap-1.5">
                      <span>MS DHONI IN HIS OWN WORDS:</span>
                    </div>
                    <p className="italic text-orange-100/90 leading-relaxed">
                      &ldquo;The atmosphere was surreal. When the entire stadium started singing Vande Mataram before the finish, that was the moment you knew it belonged to us. It was the purest goosebumps of my entire life.&rdquo;
                    </p>
                  </div>

                  {/* Coach Gary Kirsten Quote */}
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1 mb-4">
                    <div className="text-blue-400 font-mono font-semibold">
                      GARY KIRSTEN (HEAD COACH):
                    </div>
                    <p className="italic">
                      &ldquo;The entire stadium vibrated. When they sang Vande Mataram, the hair on our arms stood up. We knew right then — nothing could stop MS from bringing it home.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Wankhede Stadium, Mumbai</span>
                  <span className="text-orange-400 font-bold">April 2, 2011</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OFFICIAL SCORECARD */}
          {activeTab === "scorecard" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                <h3 className="text-base font-serif font-bold text-amber-300 mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  India Innings · 277/4 in 48.2 Overs (Target: 275)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400">
                        <th className="py-2">Batter</th>
                        <th className="py-2">Dismissal</th>
                        <th className="py-2 text-right">R</th>
                        <th className="py-2 text-right">B</th>
                        <th className="py-2 text-right">4s</th>
                        <th className="py-2 text-right">6s</th>
                        <th className="py-2 text-right">SR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900 text-neutral-200">
                      <tr>
                        <td className="py-2.5 font-bold">Virender Sehwag</td>
                        <td className="text-neutral-500">lbw b Malinga</td>
                        <td className="text-right">0</td>
                        <td className="text-right">2</td>
                        <td className="text-right">0</td>
                        <td className="text-right">0</td>
                        <td className="text-right">0.00</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Sachin Tendulkar</td>
                        <td className="text-neutral-500">c Sangakkara b Malinga</td>
                        <td className="text-right">18</td>
                        <td className="text-right">14</td>
                        <td className="text-right">2</td>
                        <td className="text-right">0</td>
                        <td className="text-right">128.57</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Gautam Gambhir</td>
                        <td className="text-neutral-500">b Perera</td>
                        <td className="text-right font-bold text-amber-300">97</td>
                        <td className="text-right">122</td>
                        <td className="text-right">9</td>
                        <td className="text-right">0</td>
                        <td className="text-right">79.50</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Virat Kohli</td>
                        <td className="text-neutral-500">c & b Dilshan</td>
                        <td className="text-right">35</td>
                        <td className="text-right">49</td>
                        <td className="text-right">4</td>
                        <td className="text-right">0</td>
                        <td className="text-right">71.42</td>
                      </tr>
                      <tr className="bg-amber-500/10 font-bold text-amber-300">
                        <td className="py-2.5">MS Dhoni (c & wk)</td>
                        <td className="text-emerald-400">not out</td>
                        <td className="text-right text-base text-amber-300">91*</td>
                        <td className="text-right">79</td>
                        <td className="text-right">8</td>
                        <td className="text-right">2</td>
                        <td className="text-right">115.18</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">Yuvraj Singh</td>
                        <td className="text-emerald-400">not out</td>
                        <td className="text-right">21*</td>
                        <td className="text-right">24</td>
                        <td className="text-right">2</td>
                        <td className="text-right">0</td>
                        <td className="text-right">87.50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MATCH TIMELINE */}
          {activeTab === "timeline" && (
            <div className="space-y-3">
              {[
                {
                  overs: "0.2 ov",
                  title: "Disaster Strikes: Sehwag 0 (2)",
                  desc: "Lasith Malinga traps Sehwag in front with a searing inswinger. Silence descends on Wankhede.",
                },
                {
                  overs: "6.1 ov",
                  title: "Tendulkar falls: 31/2",
                  desc: "Malinga induces an edge off Tendulkar. Sri Lanka are in firm command with 244 still needed.",
                },
                {
                  overs: "21.4 ov",
                  title: "Kohli Dismissed: 114/3",
                  desc: "Tillakaratne Dilshan takes a stunning return catch. Gambhir is solid, but India needs an anchor.",
                },
                {
                  overs: "22.0 ov",
                  title: "The Masterstroke: Dhoni promotes himself",
                  desc: "Overriding the established batting order, Dhoni walks out ahead of Player of the Tournament Yuvraj Singh.",
                },
                {
                  overs: "41.2 ov",
                  title: "Gambhir departs for a heroic 97",
                  desc: "Gambhir and Dhoni add 109 runs for the 4th wicket before Gambhir is bowled trying to charge Thisara Perera.",
                },
                {
                  overs: "47.4 ov",
                  title: "33,000 Wankhede fans sing Vande Mataram",
                  desc: "With 15 runs needed, the entire stadium lights up with torches and sings Vande Mataram in unison.",
                },
                {
                  overs: "48.2 ov",
                  title: "The Six into the Mumbai Night Sky",
                  desc: "Dhoni launches Kulasekara over long-on. India becomes World Champions after 28 years.",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3"
                >
                  <div className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-bold whitespace-nowrap">
                    {step.overs}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">{step.title}</h5>
                    <p className="text-xs text-neutral-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
