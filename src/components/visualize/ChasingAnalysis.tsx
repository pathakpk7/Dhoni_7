"use client";

import React, { useState } from "react";
import type { ChasingComparison, FormatKey } from "@/types/visualize";
import { cn } from "@/lib/utils";
import { Crosshair, ShieldAlert } from "lucide-react";

interface ChasingAnalysisProps {
  chasingData: Record<FormatKey, ChasingComparison>;
}

export const ChasingAnalysis: React.FC<ChasingAnalysisProps> = ({ chasingData }) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>("ALL_INTL");
  const data = chasingData[selectedFormat] || chasingData.ALL_INTL;

  const b1 = data.battingFirst;
  const ch = data.chasing;

  return (
    <section id="chasing-analysis" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>MODULE 08 · MATCH SITUATION COMPARISON</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              CHASING VS BATTING FIRST
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              Side-by-side analytical contrast of MS Dhoni when setting a target versus chasing down a total under pressure.
            </p>
          </div>

          {/* Format selector */}
          <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
            {(["ALL_INTL", "TEST", "ODI", "T20I", "IPL"] as FormatKey[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                  selectedFormat === fmt
                    ? fmt === "IPL"
                      ? "bg-csk-gold/25 text-csk-yellow border border-csk-gold/50 font-bold"
                      : "bg-sky-500/25 text-sky-300 border border-sky-500/50 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {fmt === "ALL_INTL" ? "All Intl" : fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Side-by-Side Dual Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Batting First */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="text-lg font-display font-bold text-white">1st Innings · Setting Target</h3>
              <span className="text-xs font-mono text-slate-400">{b1.innings} Innings</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Runs</span>
                <span className="text-xl font-bold text-white">{b1.runs.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Average</span>
                <span className="text-xl font-bold text-amber-400">{b1.average ?? "N/A"}</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Strike Rate</span>
                <span className="text-xl font-bold text-emerald-400">{b1.strikeRate ?? "N/A"}</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">High Score</span>
                <span className="text-xl font-bold text-white">{b1.highestScore}</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">100s / 50s</span>
                <span className="text-xl font-bold text-white">{b1.hundreds} / {b1.fifties}</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Not Outs</span>
                <span className="text-xl font-bold text-sky-400">{b1.notOuts}</span>
              </div>
            </div>
          </div>

          {/* Chasing */}
          <div className="bg-gradient-to-b from-sky-950/20 to-black/40 border border-sky-500/30 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-sky-400" />
                <h3 className="text-lg font-display font-bold text-white">2nd Innings · Chasing</h3>
              </div>
              <span className="text-xs font-mono text-sky-300 font-semibold">{ch.innings} Innings</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Runs</span>
                <span className="text-xl font-bold text-sky-300">{ch.runs.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Average</span>
                <span className="text-xl font-bold text-amber-400">{ch.average ?? "N/A"}</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Strike Rate</span>
                <span className="text-xl font-bold text-emerald-400">{ch.strikeRate ?? "N/A"}</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">High Score</span>
                <span className="text-xl font-bold text-white">{ch.highestScore}</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Average in Wins</span>
                <span className="text-xl font-bold text-amber-300">
                  {ch.averageInWins ?? "N/A"}
                </span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Not Outs</span>
                <span className="text-xl font-bold text-sky-400">{ch.notOuts}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-300">
              ★ {ch.winsCount} matches won when batting second. Unbeaten in {ch.notOuts} run chases.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
