"use client";

import React, { useState } from "react";
import type { WicketkeepingStatsItem, VerifiedBowlingItem, BowlerDismissalItem } from "@/types/visualize";
import { ShieldCheck, Crosshair, Users, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface WicketkeepingAndBowlingProps {
  wicketkeeping: WicketkeepingStatsItem[];
  verifiedBowling: VerifiedBowlingItem[];
  topDismissers: BowlerDismissalItem[];
}

export const WicketkeepingAndBowling: React.FC<WicketkeepingAndBowlingProps> = ({
  wicketkeeping,
  verifiedBowling,
  topDismissers,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("ALL_INTERNATIONAL");

  const currentWk =
    wicketkeeping.find((w) => w.format === selectedFormat) ||
    wicketkeeping.find((w) => w.format === "ALL_INTERNATIONAL") ||
    wicketkeeping[0];

  return (
    <section id="wicketkeeping" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>MODULE 11 · GLOVEWORK & RARE BOWLING RECORDS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              WICKETKEEPING & BOWLING DISMISSALS
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              195 international stumpings (World Record), lightning reaction telemetry, and verified rare bowling figures.
            </p>
          </div>

          {/* Format selector */}
          <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
            {wicketkeeping.map((item) => (
              <button
                key={item.format}
                onClick={() => setSelectedFormat(item.format)}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                  selectedFormat === item.format
                    ? "bg-sky-500/25 text-sky-300 border border-sky-500/50 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {item.format === "ALL_INTERNATIONAL" ? "All Intl" : item.format}
              </button>
            ))}
          </div>
        </div>

        {/* Wicketkeeping KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <span className="text-[11px] font-mono uppercase text-slate-400">Total Dismissals</span>
            <p className="text-2xl sm:text-3xl font-display font-bold text-sky-400 mt-1">
              {currentWk.total_dismissals}
            </p>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              {currentWk.dismissals_per_match} per match
            </span>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <span className="text-[11px] font-mono uppercase text-slate-400">Catches Behind</span>
            <p className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              {currentWk.catches}
            </p>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              Glove catches
            </span>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <span className="text-[11px] font-mono uppercase text-slate-400">Stumpings (World Record)</span>
            <p className="text-2xl sm:text-3xl font-display font-bold text-amber-400 mt-1">
              {currentWk.stumpings}
            </p>
            <span className="text-[10px] font-mono text-amber-400/80 mt-1 block">
              0.08s fastest reaction
            </span>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <span className="text-[11px] font-mono uppercase text-slate-400">Direct Run Outs</span>
            <p className="text-2xl sm:text-3xl font-display font-bold text-emerald-400 mt-1">
              {currentWk.run_outs}
            </p>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              Attributed keeper run-outs
            </span>
          </div>
        </div>

        {/* 2-Column: Left = Rare Bowling Figures, Right = Bowlers who dismissed Dhoni */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 pt-6 border-t border-white/10">
          {/* Verified Bowling Figures (7 Columns) */}
          <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-xl p-5">
            <h3 className="text-base font-display font-bold text-white mb-1">
              Verified Bowling Contributions
            </h3>
            <p className="text-xs font-mono text-slate-400 mb-4">
              Dhoni bowled occasionally in Test cricket and ODIs when main bowlers suffered cramps or injuries.
            </p>

            <div className="space-y-3">
              {verifiedBowling.map((b) => (
                <div
                  key={b.format}
                  className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs font-mono"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{b.format}</span>
                    <span className="text-amber-400 font-bold">
                      {b.wickets} Wkt ({b.overs} ov, {b.runs} runs, Eco: {b.economy ?? "-"})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{b.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Bowlers Who Dismissed Dhoni (5 Columns) */}
          <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-xl p-5">
            <h3 className="text-base font-display font-bold text-white mb-1">
              Bowlers Who Dismissed Dhoni Most
            </h3>
            <p className="text-xs font-mono text-slate-400 mb-4">
              Bowlers with highest dismissal counts against MS Dhoni in the dataset.
            </p>

            <div className="space-y-2">
              {topDismissers.slice(0, 6).map((b, idx) => (
                <div
                  key={b.bowler}
                  className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/5 text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-4 font-bold">{idx + 1}.</span>
                    <span className="text-white font-semibold">{b.bowler}</span>
                  </div>
                  <span className="text-sky-400 font-bold">{b.dismissals} times</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
