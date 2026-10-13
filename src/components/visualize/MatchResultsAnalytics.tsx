"use client";

import React, { useState } from "react";
import type { MatchResultItem, FormatKey } from "@/types/visualize";
import { cn } from "@/lib/utils";
import { Award, Trophy, CheckCircle2, XCircle, MinusCircle } from "lucide-react";

interface MatchResultsAnalyticsProps {
  matchResultsData: Record<FormatKey, MatchResultItem[]>;
}

export const MatchResultsAnalytics: React.FC<MatchResultsAnalyticsProps> = ({
  matchResultsData,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>("ALL_INTL");
  const outcomes = matchResultsData[selectedFormat] || [];

  return (
    <section id="match-results" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>MODULE 10 · OUTPUT ACROSS MATCH OUTCOMES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              BATTING IN WINS, LOSSES & DRAWS
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              Compare Dhoni's batting productivity across official match results.
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

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {outcomes.map((item) => {
            const isWon = item.result === "WON";
            const isLost = item.result === "LOST";

            return (
              <div
                key={item.result}
                className={cn(
                  "rounded-xl p-5 border flex flex-col justify-between",
                  isWon
                    ? "bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : isLost
                    ? "bg-rose-950/20 border-rose-500/30"
                    : "bg-black/40 border-white/10"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={cn(
                        "text-xs font-mono font-bold uppercase tracking-wider",
                        isWon ? "text-emerald-400" : isLost ? "text-rose-400" : "text-slate-300"
                      )}
                    >
                      {item.result}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{item.matches} Matches</span>
                  </div>
                  <p className="text-3xl font-display font-bold text-white mt-1">
                    {item.runs.toLocaleString()}{" "}
                    <span className="text-xs font-mono font-normal text-slate-400">runs</span>
                  </p>
                </div>

                <div className="space-y-1.5 mt-4 pt-4 border-t border-white/10 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Batting Average</span>
                    <span className={cn("font-bold", isWon ? "text-emerald-400" : "text-amber-400")}>
                      {item.average ?? "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Strike Rate</span>
                    <span className="text-white font-bold">{item.strikeRate ?? "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">High Score</span>
                    <span className="text-white font-bold">{item.highestScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">100s / 50s</span>
                    <span className="text-white font-bold">{item.hundreds} / {item.fifties}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
