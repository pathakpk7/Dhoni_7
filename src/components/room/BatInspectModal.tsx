"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Award, ShieldCheck, Sparkles, Volume2, Eye } from "lucide-react";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface BatInspectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BAT_VIEWS = [
  {
    id: "autograph",
    label: "FACE & AUTOGRAPH",
    shortLabel: "FACE",
    src: "/images/motifs/dhoni_reebok_bat_autograph.png",
    alt: "MS Dhoni autographed Reebok bat face with Lots of Love & Best wishes Mahi",
    desc: "Autographed blade face with blue Reebok sticker & personal message",
  },
  {
    id: "blade_toe",
    label: "BLADE & TOE PROFILE",
    shortLabel: "BLADE & TOE",
    src: "/images/motifs/dhoni_reebok_bat_back.png",
    alt: "MS Dhoni Reebok bat back spine, edge profile and thick toe",
    desc: "Contoured spine, thick 40mm power edges and sculpted protective toe",
  },
  {
    id: "grip",
    label: "MATRIX RUBBER GRIP",
    shortLabel: "GRIP",
    src: "/images/motifs/dhoni_reebok_bat_grip.png",
    alt: "MS Dhoni red diamond pyramid matrix rubber bat grip",
    desc: "Signature diamond pyramid matrix grip texture for bottom-hand leverage",
  },
  {
    id: "cutout",
    label: "MATCH EDITION DECAL",
    shortLabel: "MATCH WILLOW",
    src: "/images/motifs/dhoni_reebok_bat_front_cutout.png",
    alt: "MS Dhoni 2011 World Cup edition Reebok bat cutout",
    desc: "The iconic 2011 World Cup tournament willow with dynamic lower blade swoosh",
  },
];

export const BatInspectModal: React.FC<BatInspectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeViewIndex, setActiveViewIndex] = useState(0);

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentView = BAT_VIEWS[activeViewIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Museum Pedestal Card */}
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#110e0b] border-2 border-[#b89758]/50 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(249,115,22,0.2)] p-5 sm:p-8 flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#d4af37] uppercase">
                SANCTUM OF NUMBER 7 · ICONIC ARTIFACT
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-white">
                MS DHONI&apos;S AUTOGRAPHED REEBOK WILLOW
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Bat Image + Historical Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-center">
          
          {/* Bat Showcase (Left 5 Cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-between py-6 px-4 rounded-2xl bg-gradient-to-b from-black/80 via-[#18130e] to-black/90 border border-[#b89758]/30 shadow-inner">
            {/* Museum Spotlight Glow */}
            <div className="absolute top-4 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full pointer-events-none" />
            
            {/* View Selector Tabs */}
            <div className="w-full flex items-center justify-center gap-1.5 mb-4 z-10 flex-wrap">
              {BAT_VIEWS.map((view, idx) => (
                <button
                  key={view.id}
                  onClick={() => setActiveViewIndex(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider font-bold transition-all cursor-pointer ${
                    activeViewIndex === idx
                      ? "bg-orange-500 text-black shadow-lg shadow-orange-500/30 scale-105"
                      : "bg-white/5 text-stone-400 hover:bg-white/15 hover:text-stone-200 border border-white/5"
                  }`}
                >
                  {view.shortLabel}
                </button>
              ))}
            </div>

            {/* Displayed Image */}
            <div className="relative w-full h-[360px] sm:h-[440px]">
              <Image
                src={currentView.src}
                alt={currentView.alt}
                fill
                priority
                sizes="(max-width: 1024px) 300px, 420px"
                className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-all duration-500 hover:scale-105"
              />
            </div>

            {/* Current View Caption */}
            <div className="mt-3 text-center z-10">
              <span className="text-xs font-mono text-orange-300 font-bold tracking-wider block">
                {currentView.label}
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                {currentView.desc}
              </span>
            </div>

            {/* Tap to hear willow strike */}
            <button
              onClick={() => storyAudio.playBatImpactSound()}
              className="mt-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-stone-200 transition-colors shadow-lg cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-orange-400" />
              <span>TEST WILLOW STRIKE</span>
            </button>
          </div>

          {/* Specifications & Historical Callouts (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            
            {/* Feature 1: The Handwritten Signature */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-[#b89758]/30 hover:border-[#b89758]/60 transition-colors">
              <div className="flex items-center gap-2 text-[#e5c378] font-mono text-xs font-bold uppercase mb-1">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>HANDWRITTEN INSCRIPTION & AUTOGRAPH</span>
              </div>
              <p className="text-sm font-serif text-stone-300 leading-relaxed">
                Hand-signed by MS Dhoni on the face of the blade in permanent black marker:{" "}
                <span className="text-orange-300 font-bold italic">&ldquo;Lots of Love &amp; Best wishes Mahi&rdquo;</span>.
                The straight grain of the Grade-1 English willow reflects authentic battle-scars of leather ball impacts.
              </p>
            </div>

            {/* Feature 2: Specifications & Profile (Blade, Grip, Toe, Weight) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-black/50 border border-white/10">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Blade Profile</span>
                <span className="text-sm font-mono font-bold text-white">42mm Power Edges</span>
              </div>
              <div className="p-3 rounded-lg bg-black/50 border border-white/10">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Toe Profile</span>
                <span className="text-sm font-mono font-bold text-white">Curved Thick Toe</span>
              </div>
              <div className="p-3 rounded-lg bg-black/50 border border-white/10">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Handle Grip</span>
                <span className="text-sm font-mono font-bold text-orange-400">Pyramid Matrix Grip</span>
              </div>
              <div className="p-3 rounded-lg bg-black/50 border border-white/10">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Weight Profile</span>
                <span className="text-sm font-mono font-bold text-white">1.25 kg / 2.75 lb</span>
              </div>
              <div className="p-3 rounded-lg bg-black/50 border border-white/10">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Wood Grade</span>
                <span className="text-sm font-mono font-bold text-white">Grade 1 Willow</span>
              </div>
              <div className="p-3 rounded-lg bg-black/50 border border-white/10">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Sweet Spot</span>
                <span className="text-sm font-mono font-bold text-[#ffd700]">Mid-to-Low Swell</span>
              </div>
            </div>

            {/* Feature 3: The 2011 World Cup Final Winning Six */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-sky-500/30">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase mb-1">
                <Award className="w-4 h-4" />
                <span>THE WEAPON OF APRIL 2, 2011</span>
              </div>
              <p className="text-sm font-serif text-stone-300 leading-relaxed">
                Dhoni wielded this exact Reebok model to orchestrate his masterclass 91* off 79 balls at the Wankhede Stadium.
                With 4 runs needed off 11 balls, this willow delivered Nuwan Kulasekara high over long-on into the delirious Mumbai night.
              </p>
            </div>

            {/* Feature 4: Guinness World Record Auction */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#b89758]/15 via-black/40 to-transparent border border-[#b89758]/40">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono font-bold uppercase text-[#ffd700]">
                  GUINNESS WORLD RECORD CHARITY AUCTION
                </span>
                <span className="px-2 py-0.5 rounded bg-[#ffd700]/20 text-[#ffd700] text-xs font-mono font-bold">
                  £100,000 (₹83 LAKH)
                </span>
              </div>
              <p className="text-xs font-mono text-stone-300 leading-relaxed">
                At the &lsquo;Winning Ways&rsquo; charity dinner held in London on July 18, 2011, Dhoni put this historic match-winning bat under the hammer.
                It sold for an all-time world record £100,000, funding Sakshi Dhoni&apos;s foundation for underprivileged and differently-abled children.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-stone-500">
          <span>AUTHENTICATED ARTIFACT · PERMANENT MOTIF</span>
          <span>CLICK ANYWHERE OUTSIDE OR PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
