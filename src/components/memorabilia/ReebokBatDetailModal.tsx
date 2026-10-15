"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  Flame,
  Target,
  Award,
} from "lucide-react";
import { storyAudio } from "@/components/storybook/StoryAudio";

interface ReebokBatDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FinishingInnings {
  id: string;
  year: string;
  match: string;
  score: string;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: string;
  target: string;
  equation: string;
  venue: string;
  significance: string;
  narrative: string;
}

const ICONIC_FINISHES: FinishingInnings[] = [
  {
    id: "jaipur-183-2005",
    year: "2005",
    match: "India vs Sri Lanka, 3rd ODI",
    score: "183*",
    balls: 145,
    fours: 15,
    sixes: 10,
    strikeRate: "126.20",
    target: "299",
    equation: "Target 299 achieved with 23 balls to spare",
    venue: "Sawai Mansingh Stadium, Jaipur",
    significance: "Highest individual score by a wicketkeeper in ODI history.",
    narrative:
      "Promoted to No. 3, Dhoni launched an unsparing assault on Muralitharan, Vaas, and Fernando. His 10 towering sixes rewrote modern ODI chasing dynamics.",
  },
  {
    id: "dharamsala-54-2010",
    year: "2010",
    match: "CSK vs KXIP, IPL League Decider",
    score: "54*",
    balls: 29,
    fours: 5,
    sixes: 2,
    strikeRate: "186.20",
    target: "193",
    equation: "16 required off the last 6 balls off Irfan Pathan (4, 2, 6, 6)",
    venue: "HPCA Stadium, Dharamsala",
    significance: "The catalyst that launched CSK's first-ever IPL championship.",
    narrative:
      "Needing a win to qualify for the playoffs, Dhoni smashed 16 runs off 4 balls against Irfan Pathan. He struck his helmet in raw passion, a rare eruption from Captain Cool.",
  },
  {
    id: "wankhede-91-2011",
    year: "2011",
    match: "ICC Cricket World Cup 2011 Final",
    score: "91*",
    balls: 79,
    fours: 8,
    sixes: 2,
    strikeRate: "115.18",
    target: "275",
    equation: "4 runs needed off 11 balls: Finished with a six into the stands",
    venue: "Wankhede Stadium, Mumbai",
    significance: "Ended India's 28-year wait for the World Cup crown; Player of the Match.",
    narrative:
      "Dhoni promoted himself ahead of in-form Yuvraj to tackle Muralitharan. In the 49th over, he twirled his bat and deposited Kulasekara into the ecstatic Wankhede crowd.",
  },
  {
    id: "adelaide-44-2012",
    year: "2012",
    match: "India vs Australia, CB Series",
    score: "44*",
    balls: 58,
    fours: 1,
    sixes: 1,
    strikeRate: "75.86",
    target: "270",
    equation: "12 required off 4 balls off Clint McKay",
    venue: "Adelaide Oval, Adelaide",
    significance: "The monstrous 112-meter straight six over long-on at Adelaide Oval.",
    narrative:
      "Dhoni took the chase deep into the 50th over. Needing 12 off 4, he unleashed an unforgettable straight six that sailed into the southern stands, sealing victory with 2 balls left.",
  },
  {
    id: "port-of-spain-45-2013",
    year: "2013",
    match: "Celkon Mobile Cup Final vs Sri Lanka",
    score: "45*",
    balls: 52,
    fours: 5,
    sixes: 2,
    strikeRate: "86.53",
    target: "202",
    equation: "15 required in final over with only Ishant Sharma at the other end",
    venue: "Queen's Park Oval, Port of Spain",
    significance: "The definitive masterclass in single-handedly farming the strike.",
    narrative:
      "India were 9 down with 15 runs needed off the 50th over. Shaminda Eranga bowled: Dot, 6 (over long-off), 4 (point), 6 (over extra cover). Tri-series won with 2 balls to spare.",
  },
  {
    id: "chinnaswamy-84-2019",
    year: "2019",
    match: "CSK vs RCB, IPL 2019",
    score: "84*",
    balls: 48,
    fours: 5,
    sixes: 7,
    strikeRate: "175.00",
    target: "162",
    equation: "26 runs needed off the 20th over bowled by Umesh Yadav",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    significance: "Dhoni's highest score in Twenty20 cricket; 24 runs in 5 balls.",
    narrative:
      "Coming in at 28/4, Dhoni single-handedly took the chase to the final ball, smashing 4, 6, 6, 2, 6, narrowly falling 1 run short in one of the most heroic lone battles ever witnessed.",
  },
];

export const ReebokBatDetailModal: React.FC<ReebokBatDetailModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeFinishIndex, setActiveFinishIndex] = useState<number>(2); // Default to 2011 WC
  const [activeComponent, setActiveComponent] = useState<
    "blade" | "handle" | "grip" | "toe" | "branding"
  >("blade");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setActiveFinishIndex((prev) => (prev - 1 + ICONIC_FINISHES.length) % ICONIC_FINISHES.length);
      }
      if (e.key === "ArrowRight") {
        setActiveFinishIndex((prev) => (prev + 1) % ICONIC_FINISHES.length);
      }
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

  const currentFinish = ICONIC_FINISHES[activeFinishIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl animate-in fade-in duration-300 p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Background Warm Amber Lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-500/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative w-full max-w-7xl bg-[#120d09] border-2 border-orange-500/40 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.98),0_0_50px_rgba(249,115,22,0.15)] overflow-hidden my-auto flex flex-col max-h-[94vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-orange-500/30 bg-[#1a120b] shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-stone-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO ROOM</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-mono font-bold tracking-widest text-orange-300 uppercase">
                THE FINISHER&apos;S WILLOW · REEBOK GRADE 1 ENGLISH WILLOW
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.15] text-stone-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Split View (Left: High-Res Interactive Bat, Right: The Art of Finishing) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-orange-500/20">
          {/* LEFT: Cinematic Bat Anatomy & Showcase (5 of 12 cols) */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between items-center text-center bg-gradient-to-b from-[#18110b] to-[#0d0905] relative">
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-stone-400">
              <span className="text-orange-400 font-bold uppercase tracking-wider">
                ANATOMY & SPECIFICATIONS
              </span>
              <span>2 lb 12 oz · Short Handle</span>
            </div>

            {/* Realistic Bat Display with Spotlight */}
            <div className="relative w-full h-72 sm:h-80 md:h-96 my-4 flex items-center justify-center">
              <div className="relative w-44 sm:w-52 h-full rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/motifs/dhoni_reebok_bat.png"
                  alt="Dhoni's Reebok Willow Bat"
                  fill
                  sizes="260px"
                  className="object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]"
                  priority
                />
              </div>
            </div>

            {/* Interactive Anatomical Inspector Tabs */}
            <div className="w-full space-y-2">
              <div className="grid grid-cols-5 gap-1 text-[10px] font-mono">
                {[
                  { id: "blade", label: "BLADE" },
                  { id: "handle", label: "HANDLE" },
                  { id: "grip", label: "GRIP" },
                  { id: "toe", label: "TOE" },
                  { id: "branding", label: "REEBOK" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      storyAudio.playBatImpactSound();
                      setActiveComponent(item.id as any);
                    }}
                    className={`py-1 rounded border transition-all cursor-pointer ${
                      activeComponent === item.id
                        ? "bg-orange-500 text-black font-bold border-orange-400 shadow-sm"
                        : "bg-black/40 text-stone-400 border-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Anatomy Description Box */}
              <div className="p-3 rounded-lg bg-black/60 border border-orange-500/30 text-left text-xs font-serif text-stone-300">
                {activeComponent === "blade" && (
                  <p>
                    <strong className="text-orange-300 font-mono text-[10px] uppercase block">Grade 1 English Willow:</strong>
                    Features 8–10 straight, unblemished grains with a pronounced mid-to-low sweet spot engineered specifically for brute bottom-hand velocity and wrist-whip helicopter shots.
                  </p>
                )}
                {activeComponent === "handle" && (
                  <p>
                    <strong className="text-orange-300 font-mono text-[10px] uppercase block">Round Sarawak Cane Handle:</strong>
                    Multi-piece cane with rubber dampening inserts, offering extreme torsional stability when executing rapid wrist rolls and power scoops.
                  </p>
                )}
                {activeComponent === "grip" && (
                  <p>
                    <strong className="text-orange-300 font-mono text-[10px] uppercase block">Double Chevron Chevron Grip:</strong>
                    Custom dual-layer rubber grip (Orange/Blue) giving maximum traction for Dhoni&apos;s distinctive high-bottom-hand grip technique.
                  </p>
                )}
                {activeComponent === "toe" && (
                  <p>
                    <strong className="text-orange-300 font-mono text-[10px] uppercase block">Curved Thick Toe Profile:</strong>
                    Generous 32mm toe depth designed to prevent feathering or cracking when digging out toe-crushing yorkers at 145+ km/h.
                  </p>
                )}
                {activeComponent === "branding" && (
                  <p>
                    <strong className="text-orange-300 font-mono text-[10px] uppercase block">The 2011 World Cup Winning Artifact:</strong>
                    At the London charity auction, Dhoni&apos;s actual 2011 World Cup-winning Reebok bat fetched a Guinness World Record £100,000 ($161,295), bought by RK Global.
                  </p>
                )}
              </div>
            </div>

            {/* Authenticity Disclaimer Note */}
            <div className="w-full pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-stone-400 text-left">
              <span className="flex items-center gap-1">
                <Info className="w-3 h-3 text-orange-400" />
                <span>Representative historical model</span>
              </span>
              <span className="text-[#ffd700] font-bold">Guinness Record: £100K</span>
            </div>
          </div>

          {/* RIGHT: The Art of Finishing (7 of 12 cols) */}
          <div className="lg:col-span-7 p-6 overflow-y-auto space-y-6 text-left bg-[#140e0a]">
            {/* Title */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
                  THE ART OF FINISHING · SELECTED MASTERCLASSES
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight">
                {currentFinish.match}
              </h2>
              <p className="mt-1 text-xs font-serif italic text-stone-300">
                {currentFinish.significance}
              </p>
            </div>

            {/* Telemetry Card */}
            <div className="p-4 rounded-xl bg-black/60 border border-orange-500/30 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-stone-400 block uppercase">Runs</span>
                  <span className="text-xl font-serif font-black text-orange-400">{currentFinish.score}</span>
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-stone-400 block uppercase">Balls</span>
                  <span className="text-xl font-serif font-black text-white">{currentFinish.balls}</span>
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-stone-400 block uppercase">Boundaries</span>
                  <span className="text-base font-serif font-bold text-stone-200">{currentFinish.fours}x4 · {currentFinish.sixes}x6</span>
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] font-mono text-stone-400 block uppercase">Strike Rate</span>
                  <span className="text-base font-serif font-bold text-[#ffd700]">{currentFinish.strikeRate}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-stone-300 gap-1">
                <span>🎯 Target: {currentFinish.target}</span>
                <span className="text-orange-300 font-bold">⚡ {currentFinish.equation}</span>
              </div>
            </div>

            {/* Narrative Breakdown */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-[#d6c7a1]">
                MATCH CONTEXT & TACTICAL PSYCHOLOGY
              </h3>
              <p className="text-sm font-serif text-stone-200 leading-relaxed text-justify">
                {currentFinish.narrative}
              </p>
            </div>

            {/* Finishing Innings Timeline Selector */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold">
                  EXPLORE ICONIC FINISHES ({ICONIC_FINISHES.length} MOMENTS)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      storyAudio.playSixBatStrikeSound();
                      setActiveFinishIndex(
                        (prev) => (prev - 1 + ICONIC_FINISHES.length) % ICONIC_FINISHES.length
                      );
                    }}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-stone-300 cursor-pointer"
                    aria-label="Previous finish"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      storyAudio.playSixBatStrikeSound();
                      setActiveFinishIndex((prev) => (prev + 1) % ICONIC_FINISHES.length);
                    }}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-stone-300 cursor-pointer"
                    aria-label="Next finish"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ICONIC_FINISHES.map((finish, idx) => {
                  const isSelected = idx === activeFinishIndex;
                  return (
                    <button
                      key={finish.id}
                      onClick={() => {
                        storyAudio.playSixBatStrikeSound();
                        setActiveFinishIndex(idx);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-orange-500/20 border-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.3)] scale-[1.02]"
                          : "bg-black/40 border-white/10 hover:border-orange-500/40 hover:bg-black/60"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className="text-orange-400 font-bold">{finish.year}</span>
                        <span className="text-stone-400">{finish.score}</span>
                      </div>
                      <span className="text-[11px] font-serif font-bold text-white line-clamp-1">
                        {finish.match.split(",")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
