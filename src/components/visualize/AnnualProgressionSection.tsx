"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LineChart,
  Line,
} from "recharts";
import type { AnnualRecord, FormatKey } from "@/types/visualize";
import { cn } from "@/lib/utils";
import { Calendar, TrendingUp } from "lucide-react";

interface AnnualProgressionSectionProps {
  annualData: Record<FormatKey, AnnualRecord[]>;
}

export const AnnualProgressionSection: React.FC<AnnualProgressionSectionProps> = ({
  annualData,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>("ALL_INTL");
  const [selectedMetric, setSelectedMetric] = useState<"runs" | "average" | "strikeRate">("runs");
  const [selectedYearRecord, setSelectedYearRecord] = useState<AnnualRecord | null>(null);

  const series = annualData[selectedFormat] || [];

  return (
    <section id="annual-progression" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>MODULE 03 · YEAR-BY-YEAR BATTING OUTPUT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              ANNUAL RUNS PROGRESSION
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              Inspect how Dhoni's scoring volume, batting average, and strike rate varied across calendar years.
            </p>
          </div>

          {/* Metric & Format selectors */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Metric selector */}
            <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
              <button
                onClick={() => setSelectedMetric("runs")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                  selectedMetric === "runs"
                    ? "bg-sky-500/25 text-sky-300 border border-sky-500/50 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Runs
              </button>
              <button
                onClick={() => setSelectedMetric("average")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                  selectedMetric === "average"
                    ? "bg-amber-500/25 text-amber-300 border border-amber-500/50 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Average
              </button>
              <button
                onClick={() => setSelectedMetric("strikeRate")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                  selectedMetric === "strikeRate"
                    ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Strike Rate
              </button>
            </div>

            {/* Format selector */}
            <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
              {(["ALL_INTL", "TEST", "ODI", "T20I", "IPL"] as FormatKey[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => {
                    setSelectedFormat(fmt);
                    setSelectedYearRecord(null);
                  }}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg transition-all cursor-pointer",
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
        </div>

        {/* Chart View */}
        <div className="mt-6 h-80 sm:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={series}
              margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
              onClick={(state) => {
                if (state && state.activePayload && state.activePayload.length > 0) {
                  setSelectedYearRecord(state.activePayload[0].payload as AnnualRecord);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis
                dataKey="year"
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as AnnualRecord;
                    return (
                      <div className="bg-[#0b0e17] border border-white/20 p-3 rounded-xl shadow-xl font-mono text-xs">
                        <p className="font-bold text-white text-sm border-b border-white/10 pb-1 mb-2">
                          {data.year} ({selectedFormat})
                        </p>
                        <p className="text-sky-400">Runs: <span className="text-white font-bold">{data.runs}</span></p>
                        <p className="text-amber-400">Average: <span className="text-white font-bold">{data.average ?? "N/A"}</span></p>
                        <p className="text-emerald-400">Strike Rate: <span className="text-white font-bold">{data.strikeRate ?? "N/A"}</span></p>
                        <p className="text-slate-400 mt-1">Innings: {data.innings} | HS: {data.highestScore}</p>
                        <p className="text-slate-400">100s: {data.hundreds} | 50s: {data.fifties}</p>
                        <p className="text-[10px] text-sky-400/80 mt-1">Click bar to pin year detail</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey={selectedMetric} radius={[4, 4, 0, 0]} cursor="pointer">
                {series.map((entry) => (
                  <Cell
                    key={entry.year}
                    fill={
                      selectedYearRecord?.year === entry.year
                        ? "#f59e0b"
                        : selectedMetric === "runs"
                        ? "#0284c7"
                        : selectedMetric === "average"
                        ? "#d97706"
                        : "#059669"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Selected Year Detail Panel */}
        {selectedYearRecord && (
          <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/15 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Pinned Record</span>
              <h4 className="text-lg font-display font-bold text-white">Year {selectedYearRecord.year} Summary</h4>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div><span className="text-slate-400">Runs: </span><span className="text-white font-bold">{selectedYearRecord.runs}</span></div>
              <div><span className="text-slate-400">Innings: </span><span className="text-white font-bold">{selectedYearRecord.innings}</span></div>
              <div><span className="text-slate-400">Avg: </span><span className="text-amber-400 font-bold">{selectedYearRecord.average ?? "N/A"}</span></div>
              <div><span className="text-slate-400">SR: </span><span className="text-emerald-400 font-bold">{selectedYearRecord.strikeRate ?? "N/A"}</span></div>
              <div><span className="text-slate-400">High Score: </span><span className="text-white font-bold">{selectedYearRecord.highestScore}</span></div>
              <div><span className="text-slate-400">100s / 50s: </span><span className="text-white font-bold">{selectedYearRecord.hundreds} / {selectedYearRecord.fifties}</span></div>
            </div>
            <button
              onClick={() => setSelectedYearRecord(null)}
              className="text-xs font-mono text-slate-400 hover:text-white underline cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
