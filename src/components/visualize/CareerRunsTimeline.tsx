"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot,
} from "recharts";
import type { AnnualRecord, CalculatedMilestone, FormatKey } from "@/types/visualize";
import { cn } from "@/lib/utils";
import { Trophy, Calendar, MapPin, Flag } from "lucide-react";

interface CareerRunsTimelineProps {
  annualData: Record<FormatKey, AnnualRecord[]>;
  milestones: CalculatedMilestone[];
}

export const CareerRunsTimeline: React.FC<CareerRunsTimelineProps> = ({
  annualData,
  milestones,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>("ALL_INTL");
  const [selectedMilestone, setSelectedMilestone] = useState<CalculatedMilestone | null>(milestones[0] || null);

  const series = annualData[selectedFormat] || [];

  return (
    <section id="career-timeline" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>MODULE 04 · CUMULATIVE TRAJECTORY & MILESTONES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              CAREER RUNS TIMELINE
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              Track the cumulative international run accumulation curve and examine the exact match innings where every 1,000-run milestone was breached.
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

        {/* Timeline Area Chart */}
        <div className="mt-6 h-72 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
              <defs>
                <linearGradient id="cumRunsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="year" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }} />
              <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload as AnnualRecord;
                    return (
                      <div className="bg-[#0b0e17] border border-white/20 p-3 rounded-xl shadow-xl font-mono text-xs">
                        <p className="font-bold text-white text-sm mb-1">{d.year}</p>
                        <p className="text-sky-400">Cumulative Runs: <span className="text-white font-bold">{d.cumRuns.toLocaleString()}</span></p>
                        <p className="text-slate-400">Annual Scored: {d.runs.toLocaleString()}</p>
                        <p className="text-amber-400">Average: {d.average ?? "N/A"}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="cumRuns" stroke="#38bdf8" strokeWidth={2.5} fillOpacity={1} fill="url(#cumRunsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Milestone Crossing Explorer */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-display font-bold text-white">
                Official International Run Milestone Markers
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Click any milestone to inspect the exact match, date, score, and venue.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-thin">
            {milestones.map((m) => {
              const isSelected = selectedMilestone?.threshold === m.threshold;
              return (
                <button
                  key={m.threshold}
                  onClick={() => setSelectedMilestone(m)}
                  className={cn(
                    "px-3 py-2 rounded-xl border text-xs font-mono whitespace-nowrap transition-all cursor-pointer flex flex-col items-start gap-0.5",
                    isSelected
                      ? "bg-sky-500/20 border-sky-500/60 text-sky-300 shadow-[0_0_12px_rgba(14,165,233,0.2)] font-bold"
                      : "bg-black/40 border-white/10 text-slate-400 hover:border-white/25 hover:text-white"
                  )}
                >
                  <span>{m.threshold.toLocaleString()} RUNS</span>
                  <span className="text-[10px] text-slate-500">{m.date.split("-")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Milestone Dossier Card */}
          {selectedMilestone && (
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-sky-950/20 to-black/60 border border-sky-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-400 shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400">
                    Milestone Verified
                  </span>
                  <h4 className="text-lg font-display font-bold text-white">
                    Crossed {selectedMilestone.milestone}
                  </h4>
                  <p className="text-xs font-mono text-slate-400">
                    Match #{selectedMilestone.matchIndex} of Dhoni's international career
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">Date</span>
                  <span className="text-white font-bold">{selectedMilestone.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Opponent</span>
                  <span className="text-amber-400 font-bold">{selectedMilestone.opponent}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Format</span>
                  <span className="text-sky-300 font-bold">{selectedMilestone.format}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Innings Score</span>
                  <span className="text-emerald-400 font-bold">{selectedMilestone.inningsScore} ({selectedMilestone.balls}b)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Venue</span>
                  <span className="text-slate-300 font-bold truncate max-w-[150px]">{selectedMilestone.venue}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
