"use client";

import React, { useState } from "react";
import type { FinishingStatsItem } from "@/types/visualize";
import { Zap, Flame, ShieldAlert, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinisherZoneSectionProps {
  finishingStats: FinishingStatsItem[];
}

export const FinisherZoneSection: React.FC<FinisherZoneSectionProps> = ({ finishingStats }) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("ODI");

  const current = finishingStats.find((f) => f.format === selectedFormat) || finishingStats[0];

  return (
    <section id="finisher-zone" className="scroll-mt-24">
      <div className="bg-gradient-to-b from-[#100c14] via-[#090b12] to-[#06070a] border border-amber-500/20 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>MODULE 09 · BALL-BY-BALL DEATH OVERS BREAKDOWN</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              THE FINISHER&apos;S ZONE
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              Ball-by-ball death overs telemetry: Overs 41–50 in ODIs and Overs 16–20 in T20I & IPL.
            </p>
          </div>

          {/* Format selector */}
          <div className="flex flex-wrap items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
            {finishingStats.map((item) => (
              <button
                key={item.format}
                onClick={() => setSelectedFormat(item.format)}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                  selectedFormat === item.format
                    ? "bg-amber-500/25 text-amber-300 border border-amber-500/50 font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {item.format === "ALL_INTL"
                  ? "All Intl"
                  : item.format === "CLT20"
                  ? "Champions League"
                  : item.format.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Phase definition note */}
        <div className="my-4 px-3 py-2 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-slate-400">
          <span className="text-amber-400 font-bold">Standard Phase Definition: </span>
          {current.death_overs_definition}
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <span className="text-[11px] font-mono uppercase text-slate-400">Death Over Runs</span>
            <p className="text-2xl sm:text-3xl font-display font-bold text-amber-400 mt-1">
              {Number(current.runs_scored).toLocaleString()}
            </p>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              Off {Number(current.balls_faced).toLocaleString()} deliveries
            </span>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <span className="text-[11px] font-mono uppercase text-slate-400">Death Strike Rate</span>
            <p className="text-2xl sm:text-3xl font-display font-bold text-emerald-400 mt-1">
              {current.strike_rate}
            </p>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              Runs per 100 death balls
            </span>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <span className="text-[11px] font-mono uppercase text-slate-400">Death Boundaries</span>
            <p className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              {current.fours} <span className="text-xs text-slate-400 font-mono">4s</span> / {current.sixes} <span className="text-xs text-amber-400 font-mono">6s</span>
            </p>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              {current.boundary_percentage} of death balls
            </span>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <span className="text-[11px] font-mono uppercase text-slate-400">Dot Ball Control</span>
            <p className="text-2xl sm:text-3xl font-display font-bold text-sky-400 mt-1">
              {current.dot_ball_percentage}
            </p>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              {current.dot_balls} dot balls faced
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
