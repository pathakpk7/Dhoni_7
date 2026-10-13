"use client";

import React, { useState } from "react";
import type { ScoringBreakdown, FormatKey } from "@/types/visualize";
import { cn } from "@/lib/utils";
import { Zap, ShieldCheck } from "lucide-react";

interface ScoringAnalyticsProps {
  scoringData: Record<FormatKey, ScoringBreakdown>;
}

export const ScoringAnalytics: React.FC<ScoringAnalyticsProps> = ({ scoringData }) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>("ALL_INTL");
  const data = scoringData[selectedFormat] || scoringData.ALL_INTL;

  return (
    <section id="scoring-boundaries" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>MODULE 06 · BOUNDARY & RUNNING DISTRIBUTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              BOUNDARIES & RUNNING BETWEEN WICKETS
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              Deconstruct Dhoni's scoring mechanics: brute boundary hitting versus elite athletic running between wickets.
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

        {/* Visual Stacked Bar Comparison */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-sky-400 font-bold">
              Boundaries: {data.boundaryPercentage}% ({data.totalBoundaryRuns.toLocaleString()} runs)
            </span>
            <span className="text-emerald-400 font-bold">
              Running Between Wickets: {data.runningPercentage}% ({data.runsFromRunning.toLocaleString()} runs)
            </span>
          </div>

          <div className="h-6 w-full rounded-full bg-black/60 overflow-hidden flex border border-white/10 p-0.5">
            <div
              style={{ width: `${data.boundaryPercentage}%` }}
              className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-l-full transition-all duration-500"
              title={`Boundaries: ${data.boundaryPercentage}%`}
            />
            <div
              style={{ width: `${data.runningPercentage}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-r-full transition-all duration-500"
              title={`Running: ${data.runningPercentage}%`}
            />
          </div>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <p className="text-[11px] font-mono uppercase text-slate-400">Total Fours (4s)</p>
            <p className="text-2xl font-display font-bold text-white mt-1">{data.fours.toLocaleString()}</p>
            <p className="text-[10px] font-mono text-sky-400 mt-1">{data.runsFromFours.toLocaleString()} runs</p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <p className="text-[11px] font-mono uppercase text-slate-400">Total Sixes (6s)</p>
            <p className="text-2xl font-display font-bold text-white mt-1">{data.sixes.toLocaleString()}</p>
            <p className="text-[10px] font-mono text-sky-400 mt-1">{data.runsFromSixes.toLocaleString()} runs</p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <p className="text-[11px] font-mono uppercase text-slate-400">Boundary Runs Total</p>
            <p className="text-2xl font-display font-bold text-sky-400 mt-1">
              {data.totalBoundaryRuns.toLocaleString()}
            </p>
            <p className="text-[10px] font-mono text-slate-500 mt-1">{data.boundaryPercentage}% of aggregate</p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <p className="text-[11px] font-mono uppercase text-slate-400">Singles, Twos & 3s</p>
            <p className="text-2xl font-display font-bold text-emerald-400 mt-1">
              {data.runsFromRunning.toLocaleString()}
            </p>
            <p className="text-[10px] font-mono text-slate-500 mt-1">{data.runningPercentage}% of aggregate</p>
          </div>
        </div>
      </div>
    </section>
  );
};
