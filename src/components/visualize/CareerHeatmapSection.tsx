"use client";

import React, { useState } from "react";
import type { HeatmapYearRow } from "@/types/visualize";
import { cn } from "@/lib/utils";
import { Calendar, Info } from "lucide-react";

interface CareerHeatmapSectionProps {
  heatmapData: HeatmapYearRow[];
}

export const CareerHeatmapSection: React.FC<CareerHeatmapSectionProps> = ({ heatmapData }) => {
  const [selectedMetric, setSelectedMetric] = useState<"runs" | "innings" | "average">("runs");
  const [inspectedCell, setInspectedCell] = useState<{
    year: number;
    format: string;
    runs: number;
    innings: number;
    average: number | null;
    strikeRate: number | null;
  } | null>(null);

  const formats = ["TEST", "ODI", "T20I", "IPL", "CLT20"];

  // Color intensity scale
  const getCellColor = (val: number | null) => {
    if (val === null || val === 0) return "bg-white/[0.02] text-slate-600 border-white/5";
    if (selectedMetric === "runs") {
      if (val > 1000) return "bg-sky-500/80 text-white font-bold border-sky-400";
      if (val > 600) return "bg-sky-600/60 text-white font-semibold border-sky-500";
      if (val > 300) return "bg-sky-700/40 text-sky-200 border-sky-600/50";
      return "bg-sky-900/30 text-sky-300 border-sky-800/40";
    } else if (selectedMetric === "average") {
      if (val > 60) return "bg-amber-500/80 text-black font-bold border-amber-400";
      if (val > 45) return "bg-amber-600/60 text-white font-semibold border-amber-500";
      if (val > 30) return "bg-amber-700/40 text-amber-200 border-amber-600/50";
      return "bg-amber-900/30 text-amber-300 border-amber-800/40";
    } else {
      if (val > 25) return "bg-emerald-500/80 text-white font-bold border-emerald-400";
      if (val > 15) return "bg-emerald-600/60 text-white font-semibold border-emerald-500";
      return "bg-emerald-900/30 text-emerald-300 border-emerald-800/40";
    }
  };

  return (
    <section id="career-heatmap" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>MODULE 15 · CHRONOLOGICAL MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              CAREER YEAR-BY-FORMAT HEATMAP
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              21 seasons (2004–2024) mapped across Test, ODI, T20I, IPL, and Champions League T20. Empty cells denote format retirement or inactivity.
            </p>
          </div>

          {/* Metric Selector */}
          <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
            {(["runs", "average", "innings"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMetric(m)}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all cursor-pointer capitalize",
                  selectedMetric === m
                    ? "bg-sky-500/25 text-sky-300 border border-sky-500/50 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="mt-6 overflow-x-auto pb-4 scrollbar-thin">
          <div className="min-w-[760px]">
            {/* Format Headers */}
            <div className="grid grid-cols-6 gap-2 mb-2 text-xs font-mono text-slate-400 font-bold uppercase">
              <div className="p-2">Year</div>
              {formats.map((fmt) => (
                <div key={fmt} className="p-2 text-center bg-black/40 rounded-lg border border-white/5">
                  {fmt === "CLT20" ? "Champions League" : fmt}
                </div>
              ))}
            </div>

            {/* Rows per year */}
            <div className="space-y-1.5">
              {heatmapData.map((row) => (
                <div key={row.year} className="grid grid-cols-6 gap-2 text-xs font-mono">
                  <div className="p-2 font-bold text-slate-300 flex items-center">
                    {row.year}
                  </div>
                  {formats.map((fmt) => {
                    const cell = row.formats[fmt];
                    if (!cell) {
                      return (
                        <div
                          key={fmt}
                          className="p-2 rounded-lg text-center text-slate-600 bg-black/20 border border-white/[0.03]"
                        >
                          -
                        </div>
                      );
                    }

                    const val =
                      selectedMetric === "runs"
                        ? cell.runs
                        : selectedMetric === "average"
                        ? cell.average
                        : cell.innings;

                    return (
                      <button
                        key={fmt}
                        onClick={() =>
                          setInspectedCell({
                            year: row.year,
                            format: fmt,
                            runs: cell.runs,
                            innings: cell.innings,
                            average: cell.average,
                            strikeRate: cell.strikeRate,
                          })
                        }
                        className={cn(
                          "p-2 rounded-lg text-center border transition-all hover:scale-105 cursor-pointer",
                          getCellColor(val)
                        )}
                      >
                        {val !== null ? val : "N/A"}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inspected Cell Drawer */}
        {inspectedCell && (
          <div className="mt-6 p-4 rounded-xl bg-black/50 border border-sky-500/30 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div>
              <span className="text-[10px] text-sky-400 uppercase">Selected Cell</span>
              <p className="text-base font-bold text-white">
                {inspectedCell.year} · {inspectedCell.format}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div><span className="text-slate-400">Runs: </span><span className="text-white font-bold">{inspectedCell.runs}</span></div>
              <div><span className="text-slate-400">Innings: </span><span className="text-white font-bold">{inspectedCell.innings}</span></div>
              <div><span className="text-slate-400">Average: </span><span className="text-amber-400 font-bold">{inspectedCell.average ?? "N/A"}</span></div>
              <div><span className="text-slate-400">Strike Rate: </span><span className="text-emerald-400 font-bold">{inspectedCell.strikeRate ?? "N/A"}</span></div>
            </div>
            <button
              onClick={() => setInspectedCell(null)}
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
