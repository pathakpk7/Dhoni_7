"use client";

import React from "react";
import { Award, Zap, Crosshair, TrendingUp, Shield, BarChart2 } from "lucide-react";
import type { CareerSummary, FormatKey } from "@/types/visualize";
import { cn } from "@/lib/utils";

interface CareerOverviewProps {
  careerStats: Record<FormatKey, CareerSummary>;
  selectedFormat: FormatKey;
  onFormatChange: (fmt: FormatKey) => void;
}

const FORMAT_LABELS: Record<FormatKey, { label: string; shortLabel: string; desc: string }> = {
  ALL_INTL: { label: "All International", shortLabel: "All Intl", desc: "Combined official Tests, ODIs & T20Is (538 matches, 17,266 runs, 2004–2019)" },
  ODI: { label: "One Day Internationals", shortLabel: "ODI", desc: "350 matches, 10,773 runs, 50.58 average, 10 centuries (2004–2019)" },
  TEST: { label: "Test Cricket", shortLabel: "Test", desc: "90 matches, 4,876 runs, 6 centuries, 224 HS (2005–2014)" },
  T20I: { label: "T20 Internationals", shortLabel: "T20I", desc: "98 matches, 1,617 runs, 126.13 strike rate (2006–2019)" },
  IPL: { label: "Indian Premier League", shortLabel: "IPL", desc: "264 matches, 5,243 runs, 5x IPL champion — strictly separated from CLT20 (2008–2024)" },
  CLT20: { label: "Champions League T20", shortLabel: "Champions League", desc: "24 matches, 449 runs, 40.82 average, 136.89 SR, 2x CLT20 champion (2010–2014)" },
};

export const CareerOverview: React.FC<CareerOverviewProps> = ({
  careerStats,
  selectedFormat,
  onFormatChange,
}) => {
  const current = careerStats[selectedFormat] || careerStats.ALL_INTL;

  const statItems = [
    { label: "Matches Played", value: current.matches.toLocaleString(), hint: "Official appearances", highlight: false },
    { label: "Innings Batted", value: current.innings.toLocaleString(), hint: `${current.notOuts} times unbeaten`, highlight: false },
    { label: "Total Runs", value: current.runs.toLocaleString(), hint: "Off legal deliveries", highlight: true, color: "text-sky-400" },
    { label: "Batting Average", value: current.average !== null ? current.average.toFixed(2) : "N/A", hint: "Runs per dismissal", highlight: true, color: "text-amber-400" },
    { label: "Batting Strike Rate", value: current.strikeRate !== null ? current.strikeRate.toFixed(2) : "N/A", hint: "Per 100 balls faced", highlight: true, color: "text-emerald-400" },
    { label: "Highest Score", value: current.highestScore, hint: "Career individual best", highlight: false },
    { label: "Centuries (100s)", value: current.hundreds.toString(), hint: "Triple digit scores", highlight: false },
    { label: "Half-Centuries (50s)", value: current.fifties.toString(), hint: "Scores of 50 to 99", highlight: false },
    { label: "Fours (4s)", value: current.fours.toLocaleString(), hint: `${(current.fours * 4).toLocaleString()} runs`, highlight: false },
    { label: "Sixes (6s)", value: current.sixes.toLocaleString(), hint: `${(current.sixes * 6).toLocaleString()} runs`, highlight: false },
  ];

  return (
    <section id="career-overview" className="scroll-mt-24">
      <div className="bg-gradient-to-b from-[#0c0e17] via-[#090b12] to-[#07080d] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>MODULE 01 · VERIFIED METRICS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              THE NUMBERS BEHIND THE LEGEND.
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              {FORMAT_LABELS[selectedFormat]?.desc}
            </p>
          </div>

          {/* Format Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-white/10">
            {(Object.keys(FORMAT_LABELS) as FormatKey[]).map((fmt) => {
              const isSelected = selectedFormat === fmt;
              const isFranchise = fmt === "IPL" || fmt === "CLT20";
              return (
                <button
                  key={fmt}
                  onClick={() => onFormatChange(fmt)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer",
                    isSelected
                      ? isFranchise
                        ? "bg-csk-gold/25 text-csk-yellow border border-csk-gold/50 shadow-glow-gold font-bold"
                        : "bg-sky-500/25 text-sky-300 border border-sky-500/50 shadow-[0_0_12px_rgba(14,165,233,0.3)] font-bold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                  )}
                >
                  {FORMAT_LABELS[fmt].shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-6 relative z-10">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "rounded-xl p-4 border transition-all flex flex-col justify-between",
                item.highlight
                  ? "bg-white/[0.04] border-white/15 hover:border-sky-500/40 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  : "bg-black/30 border-white/5 hover:border-white/15"
              )}
            >
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 truncate">
                  {item.label}
                </p>
                <p className={cn("text-2xl sm:text-3xl font-display font-bold mt-1 tracking-tight", item.color || "text-white")}>
                  {item.value}
                </p>
              </div>
              <p className="text-[10px] font-mono text-slate-500 mt-2 truncate">
                {item.hint}
              </p>
            </div>
          ))}
        </div>

        {/* Format Separation Notice */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Strict Format Separation: IPL (264 matches) and Champions League T20 (24 matches) are isolated across all datasets.</span>
          </div>
          {(selectedFormat === "IPL" || selectedFormat === "CLT20") && (
            <span className="text-csk-gold font-semibold">
              ★ {selectedFormat === "IPL" ? "IPL (CSK & RPS)" : "Champions League T20 (CSK)"} isolated from international & other T20 records.
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
