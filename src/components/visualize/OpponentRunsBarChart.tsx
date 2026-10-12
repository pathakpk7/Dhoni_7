"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Info,
  Calendar,
  Users,
  Award,
  Sparkles,
  ChevronRight,
  TrendingUp,
  X,
} from "lucide-react";
import type { OpponentEvolutionData, OpponentDetail, FormatKey } from "@/types/visualize";
import { cn } from "@/lib/utils";

interface OpponentRunsBarChartProps {
  evolutionData: Record<FormatKey, OpponentEvolutionData>;
  initialFormat?: FormatKey;
}

// Distinct country colors for clean visual identity
const OPPONENT_COLORS: Record<string, { bar: string; text: string; bg: string }> = {
  Australia: { bar: "bg-amber-400", text: "text-amber-400", bg: "bg-amber-400/10" },
  England: { bar: "bg-rose-500", text: "text-rose-400", bg: "bg-rose-500/10" },
  "Sri Lanka": { bar: "bg-blue-500", text: "text-blue-400", bg: "bg-blue-500/10" },
  "New Zealand": { bar: "bg-slate-300", text: "text-slate-300", bg: "bg-slate-300/10" },
  Pakistan: { bar: "bg-emerald-500", text: "text-emerald-400", bg: "bg-emerald-500/10" },
  "South Africa": { bar: "bg-green-600", text: "text-green-500", bg: "bg-green-600/10" },
  "West Indies": { bar: "bg-red-800", text: "text-red-400", bg: "bg-red-800/10" },
  Bangladesh: { bar: "bg-teal-500", text: "text-teal-400", bg: "bg-teal-500/10" },
  Zimbabwe: { bar: "bg-red-500", text: "text-red-400", bg: "bg-red-500/10" },
  "Africa XI": { bar: "bg-yellow-600", text: "text-yellow-400", bg: "bg-yellow-600/10" },
  "Hong Kong": { bar: "bg-red-400", text: "text-red-300", bg: "bg-red-400/10" },
  Ireland: { bar: "bg-emerald-400", text: "text-emerald-300", bg: "bg-emerald-400/10" },
  Bermuda: { bar: "bg-blue-400", text: "text-blue-300", bg: "bg-blue-400/10" },
  Netherlands: { bar: "bg-orange-500", text: "text-orange-400", bg: "bg-orange-500/10" },
  // Franchise Opponents
  "Royal Challengers Bangalore": { bar: "bg-red-600", text: "text-red-400", bg: "bg-red-600/10" },
  "Mumbai Indians": { bar: "bg-blue-600", text: "text-blue-400", bg: "bg-blue-600/10" },
  "Kolkata Knight Riders": { bar: "bg-purple-600", text: "text-purple-400", bg: "bg-purple-600/10" },
  "Delhi Capitals": { bar: "bg-sky-500", text: "text-sky-400", bg: "bg-sky-500/10" },
  "Punjab Kings": { bar: "bg-rose-600", text: "text-rose-400", bg: "bg-rose-600/10" },
  "Rajasthan Royals": { bar: "bg-pink-500", text: "text-pink-400", bg: "bg-pink-500/10" },
  "Sunrisers Hyderabad": { bar: "bg-orange-600", text: "text-orange-400", bg: "bg-orange-600/10" },
};

const DEFAULT_COLOR = { bar: "bg-sky-400", text: "text-sky-400", bg: "bg-sky-400/10" };

export const OpponentRunsBarChart: React.FC<OpponentRunsBarChartProps> = ({
  evolutionData,
  initialFormat = "ALL_INTL",
}) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>(initialFormat);
  const [viewMode, setViewMode] = useState<"cumulative" | "annual">("cumulative");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 1x, 1.5x, 2x
  const [yearIndex, setYearIndex] = useState<number>(0);
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>("Australia");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentDataset = evolutionData[selectedFormat] || evolutionData.ALL_INTL;
  const years = currentDataset.years;

  // Active year
  const activeYear = years[yearIndex] ?? years[0];

  // Pick dataset based on viewMode
  const activeDataSeries = viewMode === "cumulative"
    ? currentDataset.cumulativeData
    : currentDataset.annualData;

  const currentYearSnapshot = activeDataSeries[yearIndex] || { year: activeYear, ranks: [] };

  // Determine max runs in this view to scale bar widths proportionally
  const maxRunsInView = useMemo(() => {
    let max = 100;
    activeDataSeries.forEach((pt) => {
      pt.ranks.forEach((r) => {
        if (r.runs > max) max = r.runs;
      });
    });
    return max;
  }, [activeDataSeries]);

  // Handle format switch: reset year index
  const handleFormatChange = (fmt: FormatKey) => {
    setSelectedFormat(fmt);
    setIsPlaying(false);
    setYearIndex(0);
  };

  // Playback timer loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalTime = Math.max(500, Math.floor(1400 / playbackSpeed));
    timerRef.current = setInterval(() => {
      setYearIndex((prev) => {
        if (prev >= years.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, years.length]);

  const handlePlayPause = () => {
    if (yearIndex >= years.length - 1 && !isPlaying) {
      setYearIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setYearIndex(0);
  };

  const selectedOppDetail: OpponentDetail | undefined = selectedOpponent
    ? currentDataset.opponentDetails[selectedOpponent]
    : undefined;

  return (
    <section id="signature-opponent-runs" className="scroll-mt-24">
      <div className="bg-gradient-to-b from-[#090b14] via-[#070910] to-[#05060a] border border-sky-500/20 rounded-2xl p-5 sm:p-8 shadow-[0_0_50px_rgba(14,165,233,0.06)] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>THE SIGNATURE VISUALIZATION · YEAR-BY-YEAR EVOLUTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-wide">
              RUNS AGAINST EVERY OPPONENT
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-3xl">
              Inspired by the classic progressive Sachin Tendulkar scoring race. Watch how MS Dhoni systematically built his runs against international teams and rivals from {years[0]} to {years[years.length - 1]}.
            </p>
          </div>

          {/* Mode & Format Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
              <button
                onClick={() => setViewMode("cumulative")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                  viewMode === "cumulative"
                    ? "bg-sky-500/30 text-sky-300 border border-sky-500/50 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                CUMULATIVE CAREER
              </button>
              <button
                onClick={() => setViewMode("annual")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                  viewMode === "annual"
                    ? "bg-sky-500/30 text-sky-300 border border-sky-500/50 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                ANNUAL RUNS
              </button>
            </div>

            {/* Format Selector */}
            <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
              {(["ALL_INTL", "TEST", "ODI", "T20I", "IPL"] as FormatKey[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => handleFormatChange(fmt)}
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

        {/* Playback Controls & Big Year Display */}
        <div className="py-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Big Year Display */}
          <div className="flex items-baseline gap-4">
            <div className="font-display text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400 tracking-tight">
              {activeYear}
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                {viewMode === "cumulative" ? "Cumulative Through" : "Calendar Year"}
              </p>
              <p className="text-sm font-mono text-sky-400 font-bold">
                {currentYearSnapshot.totalCumRuns || currentYearSnapshot.totalYearRuns || 0} Runs Total
              </p>
            </div>
          </div>

          {/* VCR Playback Console */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handlePlayPause}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer shadow-lg",
                isPlaying
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30"
                  : "bg-sky-500 text-black hover:bg-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.4)]"
              )}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? "PAUSE" : "PLAY PROGRESSION"}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
              title="Reset to Career Start"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Speed pills */}
            <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 text-[11px] font-mono">
              {[1, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={cn(
                    "px-2 py-1 rounded-lg transition-all cursor-pointer",
                    playbackSpeed === spd
                      ? "bg-sky-500/30 text-sky-300 font-bold"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Year Scrubber Slider */}
        <div className="pt-4 pb-2 relative z-10">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
            <span>{years[0]} (Debut)</span>
            <span className="text-sky-400 font-bold">{activeYear} (Year {yearIndex + 1} of {years.length})</span>
            <span>{years[years.length - 1]} (Final)</span>
          </div>
          <input
            type="range"
            min={0}
            max={years.length - 1}
            value={yearIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setYearIndex(Number(e.target.value));
            }}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
        </div>

        {/* Main Chart Body + Opponent Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 relative z-10">
          {/* Animated Horizontal Bar Chart (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-2.5">
            {currentYearSnapshot.ranks.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-white/10 rounded-xl">
                <p className="text-slate-400 font-mono text-sm">
                  No match appearances or runs recorded against opponents in {activeYear} for {selectedFormat}.
                </p>
              </div>
            ) : (
              currentYearSnapshot.ranks.map((item, idx) => {
                const colorConfig = OPPONENT_COLORS[item.opponent] || DEFAULT_COLOR;
                const widthPercent = Math.min(100, Math.max(3, (item.runs / maxRunsInView) * 100));
                const isSelected = selectedOpponent === item.opponent;

                return (
                  <div
                    key={item.opponent}
                    onClick={() => setSelectedOpponent(item.opponent)}
                    className={cn(
                      "group rounded-xl p-2.5 border transition-all cursor-pointer",
                      isSelected
                        ? "bg-white/[0.06] border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                        : "bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-slate-500 w-5 text-right font-bold">#{idx + 1}</span>
                        <span className="font-semibold text-white group-hover:text-sky-300 transition-colors truncate">
                          {item.opponent}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={cn("text-sm font-bold font-mono", colorConfig.text)}>
                          {item.runs.toLocaleString()} runs
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    {/* Animated Bar Track */}
                    <div className="h-4 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500 ease-out",
                          colorConfig.bar
                        )}
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Opponent Detail Inspection Card (4 Columns) */}
          <div className="lg:col-span-4">
            {selectedOppDetail ? (
              <div className="bg-[#0b0d18] border border-white/15 rounded-xl p-5 sticky top-28 shadow-xl">
                <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
                      Opponent Dossier
                    </span>
                    <h3 className="text-xl font-display font-bold text-white mt-0.5">
                      {selectedOppDetail.opponent}
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      Career Record ({selectedFormat})
                    </p>
                  </div>
                  <div className={cn("px-2.5 py-1 rounded text-xs font-mono font-bold", OPPONENT_COLORS[selectedOppDetail.opponent]?.bg || "bg-sky-500/10", OPPONENT_COLORS[selectedOppDetail.opponent]?.text || "text-sky-400")}>
                    {selectedOppDetail.runs} Runs
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Matches</p>
                    <p className="text-lg font-mono font-bold text-white">{selectedOppDetail.matches}</p>
                  </div>
                  <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Innings (NO)</p>
                    <p className="text-lg font-mono font-bold text-white">
                      {selectedOppDetail.innings} ({selectedOppDetail.notOuts}*)
                    </p>
                  </div>
                  <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Average</p>
                    <p className="text-lg font-mono font-bold text-amber-400">
                      {selectedOppDetail.average !== null ? selectedOppDetail.average.toFixed(2) : "N/A"}
                    </p>
                  </div>
                  <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">Strike Rate</p>
                    <p className="text-lg font-mono font-bold text-emerald-400">
                      {selectedOppDetail.strikeRate !== null ? selectedOppDetail.strikeRate.toFixed(2) : "N/A"}
                    </p>
                  </div>
                  <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">High Score</p>
                    <p className="text-lg font-mono font-bold text-white">{selectedOppDetail.highestScore}</p>
                  </div>
                  <div className="bg-black/40 p-2.5 rounded-lg border border-white/5">
                    <p className="text-[10px] font-mono text-slate-400 uppercase">100s / 50s</p>
                    <p className="text-lg font-mono font-bold text-white">
                      {selectedOppDetail.hundreds} / {selectedOppDetail.fifties}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <p className="text-[10px] font-mono uppercase text-slate-400 mb-2">
                    Scoring in Selected Year ({activeYear}):
                  </p>
                  <p className="text-sm font-mono text-sky-400 font-bold">
                    {selectedOppDetail.yearRuns[activeYear]
                      ? `${selectedOppDetail.yearRuns[activeYear]} runs scored`
                      : "Did not bat against this team in " + activeYear}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center border border-white/10 rounded-xl bg-black/20">
                <Info className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                <p className="text-xs font-mono text-slate-400">
                  Select any opponent on the left to inspect Dhoni's complete career head-to-head metrics.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
