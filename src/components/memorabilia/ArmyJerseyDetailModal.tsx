"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  Shield,
  Sparkles,
  Award,
  Layers,
  MapPin,
  Calendar,
  Compass,
} from "lucide-react";
import { JERSEYS_VAULT } from "@/data/jerseysVault";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface ArmyJerseyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ARMY_PHOTOS = [
  {
    id: "flag",
    title: "TRICOLOR SALUTE",
    label: "TRICOLOR",
    src: "/images/moments/moment_dhoni_army_tricolor_flag.png",
    alt: "MS Dhoni in Territorial Army uniform standing before the national flag",
    caption: "Lt. Col. Dhoni in 106 Para TA uniform standing tall with the National Tricolor",
  },
  {
    id: "combat",
    title: "VICTOR FORCE",
    label: "KASHMIR PATROL",
    src: "/images/moments/moment_dhoni_kashmir_victor_force_combat.png",
    alt: "MS Dhoni in full combat tactical loadout in Jammu & Kashmir",
    caption: "Victor Force static guard & combat patrolling deployment in Awantipora (2019)",
  },
  {
    id: "padma",
    title: "CEREMONIAL",
    label: "PADMA BHUSHAN",
    src: "/images/moments/moment_dhoni_army_padma_bhushan_2018.png",
    alt: "MS Dhoni marching in ceremonial uniform to receive Padma Bhushan",
    caption: "Marching in ceremonial Para uniform at Rashtrapati Bhavan (2018)",
  },
];

export const ArmyJerseyDetailModal: React.FC<ArmyJerseyDetailModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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

  if (!isOpen) return null;

  const currentPhoto = ARMY_PHOTOS[activePhotoIndex];

  const armyUniform =
    JERSEYS_VAULT.find((j) => j.id === "jersey_indian_army_camo") ||
    JERSEYS_VAULT.find((j) => j.tournamentType === "MILITARY") ||
    JERSEYS_VAULT[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Deep Olive / Camo Radiance */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/30 via-neutral-950/90 to-black" />

      {/* Main Shell */}
      <div className="relative w-full h-full max-w-6xl max-h-[96vh] flex flex-col mx-auto px-4 py-3 sm:px-6 sm:py-4 z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-900/40 pb-2.5 mb-2.5 gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => {
                storyAudio.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-emerald-500/30 text-emerald-300 text-xs tracking-wider uppercase font-mono transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <div className="hidden sm:block h-4 w-px bg-neutral-800 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] tracking-widest text-emerald-400 font-mono uppercase block truncate">
                Beyond the Boundary · Service & Valour
              </span>
              <h2 className="text-sm sm:text-lg font-serif text-white flex items-center gap-1.5 font-bold truncate">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">Indian Army · Territorial Army Uniform</span>
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              storyAudio.playClick();
              onClose();
            }}
            className="p-1.5 sm:p-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors shrink-0"
            aria-label="Close military tribute modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-y-auto pr-1">
          {/* Left: Uniform Visual Plate with Photo Gallery */}
          <div className="lg:col-span-5 flex flex-col items-center justify-between p-5 rounded-2xl bg-gradient-to-b from-neutral-900/90 via-emerald-950/20 to-neutral-950 border border-emerald-900/40 relative">
            
            {/* Gallery Tabs */}
            <div className="w-full flex items-center justify-center gap-1.5 mb-3 z-10 flex-wrap">
              {ARMY_PHOTOS.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider font-bold transition-all cursor-pointer ${
                    activePhotoIndex === idx
                      ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 scale-105"
                      : "bg-white/5 text-stone-400 hover:bg-white/15 hover:text-stone-200 border border-white/5"
                  }`}
                >
                  {photo.label}
                </button>
              ))}
            </div>

            {/* Photo Container */}
            <div className="relative w-full max-w-[320px] h-[340px] sm:h-[400px] rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                fill
                priority
                sizes="(max-width: 1024px) 300px, 360px"
                className="object-cover transition-all duration-500 hover:scale-105"
              />
            </div>

            {/* Photo Caption */}
            <div className="mt-3 text-center z-10">
              <span className="text-xs font-mono text-emerald-400 font-bold tracking-wider block">
                {currentPhoto.title}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {currentPhoto.caption}
              </span>
            </div>
          </div>

          {/* Right: Respectful Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-medium">
                  Honorary Lieutenant Colonel
                </span>
                <span className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 text-xs font-mono">
                  106 Para TA Battalion
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                {armyUniform.title}
              </h1>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans mb-4">
                Dhoni has often said that playing cricket was his passion, but serving the Indian Armed Forces was his lifelong childhood dream. In 2011, following the World Cup victory, the Indian Army conferred the honorary rank of Lieutenant Colonel in the Parachute Regiment upon him.
              </p>

              {/* Parachute Training Milestone */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 mb-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Earning the Blue Wings (Agra 2015)
                </div>
                <p className="text-xs sm:text-sm text-emerald-100 font-sans">
                  Unlike conventional honorary designations, Dhoni insisted on undergoing rigorous physical training at the Paratroopers Training School (PTS) in Agra. He completed five parachute jumps from an AN-32 aircraft at 1,250 feet — including a mandatory night jump — to legitimately earn his coveted para jump wings.
                </p>
              </div>

              {/* Active Duty in Kashmir */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 mb-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  Victor Force Deployment (South Kashmir 2019)
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans">
                  In August 2019, following the Cricket World Cup, Dhoni took a two-month sabbatical from competitive cricket to serve with the 106 TA Para Battalion in Jammu and Kashmir. He carried out guard, patrol, and post duties alongside jawans in Khrew, Awantipora, living in barracks without VIP privileges.
                </p>
              </div>

              {/* Design & Insignia breakdown */}
              <div>
                <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-neutral-500" />
                  Regimental Attributes
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                  {armyUniform.designDetails.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 bg-neutral-950/40 p-2 rounded-lg border border-neutral-800/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>Rashtrapati Bhavan 2018: Received Padma Bhushan in Uniform</span>
              <span className="text-emerald-400 font-semibold">Jai Hind</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
