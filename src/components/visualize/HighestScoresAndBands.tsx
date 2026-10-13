"use client";

import React, { useState } from "react";
import type { HighestScoreOpponent, ScoreBandItem, FormatKey } from "@/types/visualize";
import { cn } from "@/lib/utils";
import { Award, Target, Calendar } from "lucide-react";

interface HighestScoresAndBandsProps {
  highestScores: Record<FormatKey, HighestScoreOpponent[]>;
  scoreBands: Record<FormatKey, ScoreBandItem[]>;
}

export const HighestScoresAndBands: React.FC<HighestScoresAndBandsProps> = ({
  highestScores,
  scoreBands,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>("ALL_INTL");

  const topScores = highestScores[selectedFormat] || [];
  const bands = scoreBands[selectedFormat] || [];

  return (
    <section id="highest-scores" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>MODULE 07 · INNINGS DISTRIBUTION & PEAKS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              HIGHEST SCORES & CONSISTENCY MAP
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              Leaderboard of Dhoni's career-best individual knocks against every opponent alongside scoring band distribution.
            </p>
          </div>

          {/* Format selector */}
          <div className="flex flex-wrap items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
            {(["ALL_INTL", "ODI", "TEST", "T20I", "IPL", "CLT20"] as FormatKey[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                  selectedFormat === fmt
                    ? fmt === "IPL" || fmt === "CLT20"
                      ? "bg-csk-gold/25 text-csk-yellow border border-csk-gold/50 font-bold"
                      : "bg-sky-500/25 text-sky-300 border border-sky-500/50 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {fmt === "ALL_INTL" ? "All Intl" : fmt === "CLT20" ? "Champions League" : fmt === "TEST" ? "Test" : fmt}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Layout: Left = Consistency Bands, Right = Highest Knocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Consistency Scoring Bands (5 Columns) */}
          <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-xl p-5">
            <h3 className="text-base font-display font-bold text-white mb-1">
              Innings Consistency Map
            </h3>
            <p className="text-xs font-mono text-slate-400 mb-4">
              Breakdown across mutually exclusive scoring brackets.
            </p>

            <div className="space-y-3">
              {bands.map((b) => (
                <div key={b.band}>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">{b.band}</span>
                    <span className="text-sky-400 font-bold">
                      {b.inningsCount} inns ({b.percentage}%)
                    </span>
                  </div>
                  <div className="h-2.5 bg-black rounded-full overflow-hidden border border-white/5">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        b.band === "100+"
                          ? "bg-amber-400"
                          : b.band === "50 - 99"
                          ? "bg-sky-400"
                          : "bg-slate-500"
                      )}
                      style={{ width: `${Math.min(100, b.percentage * 2.5)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highest Scores by Opponent Leaderboard (7 Columns) */}
          <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-xl p-5">
            <h3 className="text-base font-display font-bold text-white mb-1">
              Career Best Score Against Each Opponent
            </h3>
            <p className="text-xs font-mono text-slate-400 mb-4">
              Highest individual innings in the selected format.
            </p>

            <div className="max-h-96 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {topScores.map((kn, idx) => (
                <div
                  key={kn.opponent}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all text-xs font-mono"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-slate-500 w-4 font-bold">{idx + 1}.</span>
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate">{kn.opponent}</p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {kn.date} · {kn.venue}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-sky-400">{kn.scoreString}</span>
                    <span className="text-[10px] text-slate-400 block">({kn.balls} balls)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
