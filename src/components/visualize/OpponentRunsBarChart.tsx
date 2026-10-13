"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Info,
  Sparkles,
  ChevronRight,
  Calendar,
  Award,
  Layers,
} from "lucide-react";
import type {
  OpponentEvolutionData,
  OpponentDetail,
  OpponentYearStats,
  FormatKey,
} from "@/types/visualize";
import { cn } from "@/lib/utils";

interface OpponentRunsBarChartProps {
  evolutionData: Record<FormatKey, OpponentEvolutionData>;
  initialFormat?: FormatKey;
}

// Distinct country & franchise colors for clean visual identity
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
  "Royal Challengers Bengaluru": { bar: "bg-red-600", text: "text-red-400", bg: "bg-red-600/10" },
  "Mumbai Indians": { bar: "bg-blue-600", text: "text-blue-400", bg: "bg-blue-600/10" },
  "Kolkata Knight Riders": { bar: "bg-purple-600", text: "text-purple-400", bg: "bg-purple-600/10" },
  "Delhi Capitals": { bar: "bg-sky-500", text: "text-sky-400", bg: "bg-sky-500/10" },
  "Punjab Kings": { bar: "bg-rose-600", text: "text-rose-400", bg: "bg-rose-600/10" },
  "Kings XI Punjab": { bar: "bg-rose-600", text: "text-rose-400", bg: "bg-rose-600/10" },
  "Rajasthan Royals": { bar: "bg-pink-500", text: "text-pink-400", bg: "bg-pink-500/10" },
  "Sunrisers Hyderabad": { bar: "bg-orange-600", text: "text-orange-400", bg: "bg-orange-600/10" },
  "Deccan Chargers": { bar: "bg-indigo-500", text: "text-indigo-400", bg: "bg-indigo-500/10" },
  "Pune Warriors India": { bar: "bg-cyan-500", text: "text-cyan-400", bg: "bg-cyan-500/10" },
  "Gujarat Lions": { bar: "bg-amber-500", text: "text-amber-400", bg: "bg-amber-500/10" },
  "Gujarat Titans": { bar: "bg-teal-400", text: "text-teal-300", bg: "bg-teal-400/10" },
  "Lucknow Super Giants": { bar: "bg-sky-400", text: "text-sky-300", bg: "bg-sky-400/10" },
};

const DEFAULT_COLOR = { bar: "bg-sky-400", text: "text-sky-400", bg: "bg-sky-400/10" };

const FORMAT_LABELS: Record<FormatKey, string> = {
  ALL_INTL: "All Intl",
  ODI: "ODI",
  TEST: "Test",
  T20I: "T20I",
  IPL: "IPL",
  CLT20: "Champions League",
};

export const OpponentRunsBarChart: React.FC<OpponentRunsBarChartProps> = ({
  evolutionData,
  initialFormat = "ALL_INTL",
}) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>(initialFormat);
  const [viewMode, setViewMode] = useState<"cumulative" | "annual">("cumulative");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  // Continuous floating-point progress in [0, years.length - 1] for 60fps smooth interpolation
  const [timelineProgress, setTimelineProgress] = useState<number>(0);
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);

  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const timelineTrackRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  const currentDataset = evolutionData[selectedFormat] || evolutionData.ALL_INTL;
  const years = currentDataset.years;
  const maxYearIdx = Math.max(0, years.length - 1);

  // Sync with global format selector and default to the final year so full career & year-by-year scrubber are ready
  useEffect(() => {
    setSelectedFormat(initialFormat);
    setIsPlaying(false);
    const ds = evolutionData[initialFormat] || evolutionData.ALL_INTL;
    setTimelineProgress(Math.max(0, ds.years.length - 1));
    setSelectedOpponent(null);
  }, [initialFormat, evolutionData]);

  // Discrete integer year index for badges, tables, and dossier
  const yearIndex = Math.min(maxYearIdx, Math.max(0, Math.round(timelineProgress)));
  const activeYear = years[yearIndex] ?? years[maxYearIdx] ?? years[0];

  // Pick dataset based on viewMode
  const activeDataSeries =
    viewMode === "cumulative" ? currentDataset.cumulativeData : currentDataset.annualData;

  // Overall peak runs across the entire series (used to anchor smooth bar growth without sudden surges)
  const seriesPeakRuns = useMemo(() => {
    let peak = 100;
    activeDataSeries.forEach((snap) => {
      snap.ranks.forEach((r) => {
        if (r.runs > peak) peak = r.runs;
      });
    });
    return peak;
  }, [activeDataSeries]);

  // Smoothly interpolated snapshot at the current floating-point timelineProgress
  const interpolatedSnapshot = useMemo(() => {
    if (activeDataSeries.length === 0) {
      return {
        year: activeYear,
        totalRuns: 0,
        ranks: [] as Array<
          (typeof activeDataSeries)[0]["ranks"][0] & { exactRuns: number }
        >,
      };
    }

    const clamped = Math.min(maxYearIdx, Math.max(0, timelineProgress));
    const floorIdx = Math.floor(clamped);
    const ceilIdx = Math.min(maxYearIdx, floorIdx + 1);
    const rawT = clamped - floorIdx;
    // Smooth linear-cubic blend so continuous playback never has a sudden jump or stall at year boundaries
    const t = rawT;

    const snapA = activeDataSeries[floorIdx] || activeDataSeries[0];
    const snapB = activeDataSeries[ceilIdx] || snapA;

    const totalA = snapA.totalCumRuns ?? snapA.totalYearRuns ?? 0;
    const totalB = snapB.totalCumRuns ?? snapB.totalYearRuns ?? totalA;
    const interpolatedTotalRuns = Math.round(totalA + (totalB - totalA) * t);

    if (floorIdx === ceilIdx || t === 0) {
      return {
        year: snapA.year,
        totalRuns: totalA,
        ranks: snapA.ranks.map((r) => ({ ...r, exactRuns: r.runs })),
      };
    }

    const mapA = new Map(snapA.ranks.map((r) => [r.opponent, r]));
    const mapB = new Map(snapB.ranks.map((r) => [r.opponent, r]));
    const allOpponents = new Set<string>();
    mapA.forEach((_, opp) => allOpponents.add(opp));
    mapB.forEach((_, opp) => allOpponents.add(opp));

    const blendedRanks: Array<
      (typeof activeDataSeries)[0]["ranks"][0] & { exactRuns: number }
    > = [];

    allOpponents.forEach((opp) => {
      const itemA = mapA.get(opp);
      const itemB = mapB.get(opp);

      const runsA = itemA?.runs ?? 0;
      const runsB = itemB?.runs ?? (viewMode === "cumulative" ? runsA : 0);
      const exactRuns = runsA + (runsB - runsA) * t;
      const displayRuns = Math.round(exactRuns);

      if (displayRuns <= 0 && exactRuns <= 0.1) return;

      const matA = itemA?.matches ?? 0;
      const matB = itemB?.matches ?? (viewMode === "cumulative" ? matA : 0);
      const innA = itemA?.innings ?? 0;
      const innB = itemB?.innings ?? (viewMode === "cumulative" ? innA : 0);

      const baseItem = t < 0.5 ? itemA || itemB! : itemB || itemA!;

      blendedRanks.push({
        ...baseItem,
        opponent: opp,
        runs: displayRuns,
        exactRuns,
        matches: Math.round(matA + (matB - matA) * t),
        innings: Math.round(innA + (innB - innA) * t),
      });
    });

    blendedRanks.sort((a, b) => b.exactRuns - a.exactRuns || b.innings - a.innings);

    return {
      year: activeYear,
      totalRuns: interpolatedTotalRuns,
      ranks: blendedRanks,
    };
  }, [activeDataSeries, timelineProgress, maxYearIdx, activeYear, viewMode]);

  // Smoothly scaled denominator so bars grow progressively without sudden early-year surges
  const maxRunsInView = useMemo(() => {
    let currentMax = 1;
    interpolatedSnapshot.ranks.forEach((r) => {
      if (r.exactRuns > currentMax) currentMax = r.exactRuns;
    });
    if (viewMode === "cumulative") {
      // Anchor minimum scale to 30% of career peak so early career bars start compact and smoothly grow to 100%
      return Math.max(currentMax, seriesPeakRuns * 0.3);
    }
    return Math.max(currentMax, 50);
  }, [interpolatedSnapshot, viewMode, seriesPeakRuns]);

  // Handle format switch
  const handleFormatChange = (fmt: FormatKey) => {
    setSelectedFormat(fmt);
    setIsPlaying(false);
    const ds = evolutionData[fmt] || evolutionData.ALL_INTL;
    setTimelineProgress(Math.max(0, ds.years.length - 1));
    setSelectedOpponent(null);
  };

  // 60fps requestAnimationFrame loop for buttery-smooth continuous timeline progression
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastFrameTimeRef.current = null;
      return;
    }

    // 1.35 seconds per year at 1x speed
    const msPerYear = 1350 / playbackSpeed;

    const step = (timestamp: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
      }
      const deltaMs = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;

      setTimelineProgress((prev) => {
        const next = prev + deltaMs / msPerYear;
        if (next >= maxYearIdx) {
          setIsPlaying(false);
          return maxYearIdx;
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastFrameTimeRef.current = null;
    };
  }, [isPlaying, playbackSpeed, maxYearIdx]);

  const handlePlayPause = () => {
    if (timelineProgress >= maxYearIdx - 0.02 && !isPlaying) {
      setTimelineProgress(0);
    }
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimelineProgress(0);
  };

  // Convert pointer clientX on the custom timeline line into a timelineProgress value
  const updateProgressFromClientX = (clientX: number, snapToYear = false) => {
    if (!timelineTrackRef.current || maxYearIdx === 0) return;
    const rect = timelineTrackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const rawProgress = ratio * maxYearIdx;
    setIsPlaying(false);
    setTimelineProgress(snapToYear ? Math.round(rawProgress) : rawProgress);
  };

  // Default selected opponent to top-ranked opponent in current snapshot if not explicitly chosen or not in format
  const effectiveOpponentName = useMemo(() => {
    if (selectedOpponent && currentDataset.opponentDetails[selectedOpponent]) {
      return selectedOpponent;
    }
    return interpolatedSnapshot.ranks[0]?.opponent || currentDataset.opponents[0] || null;
  }, [selectedOpponent, currentDataset, interpolatedSnapshot]);

  const selectedOppDetail: OpponentDetail | undefined = effectiveOpponentName
    ? currentDataset.opponentDetails[effectiveOpponentName]
    : undefined;

  // Year-specific stats for the selected opponent in activeYear
  const activeYearOppStats: OpponentYearStats | undefined =
    selectedOppDetail?.yearBreakdown?.[String(activeYear)];

  // Cumulative stats up through activeYear for the selected opponent
  const cumThroughYearOppStats: OpponentYearStats | undefined =
    selectedOppDetail?.cumulativeByYear?.[String(activeYear)];

  // Sorted list of all years this opponent was faced in this format
  const opponentYearsList: OpponentYearStats[] = useMemo(() => {
    if (!selectedOppDetail?.yearBreakdown) return [];
    return Object.values(selectedOppDetail.yearBreakdown).sort((a, b) => a.year - b.year);
  }, [selectedOppDetail]);

  const progressPercentage =
    maxYearIdx > 0 ? Math.min(100, Math.max(0, (timelineProgress / maxYearIdx) * 100)) : 100;

  return (
    <section id="signature-opponent-runs" className="scroll-mt-24">
      <div className="bg-gradient-to-b from-[#090b14] via-[#070910] to-[#05060a] border border-sky-500/20 rounded-2xl p-4 sm:p-8 shadow-[0_0_50px_rgba(14,165,233,0.06)] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
              <span>OPPOSITION DOMINANCE TELEMETRY · YEAR-BY-YEAR &amp; FORMAT MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-wide">
              RUNS AGAINST EVERY OPPONENT
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-3xl">
              Chronological head-to-head breakdown of MS Dhoni&apos;s dominance against every opposition side—tracking distinct matches, innings, averages, and year-wise highest scores from {years[0]} to {years[years.length - 1]}.
            </p>
          </div>

          {/* Mode & Format Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
              <button
                onClick={() => setViewMode("cumulative")}
                className={cn(
                  "flex-1 sm:flex-initial px-3 py-1.5 rounded-lg transition-all cursor-pointer",
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
                  "flex-1 sm:flex-initial px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                  viewMode === "annual"
                    ? "bg-amber-500/30 text-amber-300 border border-amber-500/50 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                YEAR-WISE ({activeYear})
              </button>
            </div>

            {/* Format Selector */}
            <div className="flex flex-wrap items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
              {(["ALL_INTL", "ODI", "TEST", "T20I", "IPL", "CLT20"] as FormatKey[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => handleFormatChange(fmt)}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg transition-all cursor-pointer",
                    selectedFormat === fmt
                      ? fmt === "IPL" || fmt === "CLT20"
                        ? "bg-csk-gold/25 text-csk-yellow border border-csk-gold/50 font-bold"
                        : "bg-sky-500/25 text-sky-300 border border-sky-500/50 font-bold"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {FORMAT_LABELS[fmt]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Playback Controls & Big Year Display */}
        <div className="py-5 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 relative z-10">
          {/* Big Year Display */}
          <div className="flex items-baseline gap-4">
            <div className="font-display text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400 tracking-tight tabular-nums">
              {activeYear}
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                {viewMode === "cumulative"
                  ? `Cumulative Through ${activeYear} (${FORMAT_LABELS[selectedFormat]})`
                  : `Single-Year Record in ${activeYear} (${FORMAT_LABELS[selectedFormat]})`}
              </p>
              <p className="text-sm font-mono text-sky-400 font-bold tabular-nums">
                {interpolatedSnapshot.totalRuns.toLocaleString()} Runs Total
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
              <span>{isPlaying ? "PAUSE" : "PLAY TIMELINE"}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
              title="Reset to Debut Year"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Playback Speed Pills */}
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

        {/* Interactive Node-Pointer Timeline Bar */}
        <div className="pt-5 pb-3 relative z-10">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3">
            <span>{years[0]} (Debut)</span>
            <span className="text-sky-400 font-bold">
              Click or drag any year pointer on the line • Active: {activeYear} ({yearIndex + 1} of {years.length})
            </span>
            <span>{years[years.length - 1]} (Final)</span>
          </div>

          {/* Scrollable wrapper on tiny screens so year node pointers never overlap */}
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="min-w-[580px] px-4 pt-3 pb-7">
              {/* Interactive Track Line */}
              <div
                ref={timelineTrackRef}
                onMouseDown={(e) => {
                  isDraggingRef.current = true;
                  updateProgressFromClientX(e.clientX, false);
                }}
                onMouseMove={(e) => {
                  if (isDraggingRef.current) {
                    updateProgressFromClientX(e.clientX, false);
                  }
                }}
                onMouseUp={(e) => {
                  if (isDraggingRef.current) {
                    isDraggingRef.current = false;
                    updateProgressFromClientX(e.clientX, true);
                  }
                }}
                onMouseLeave={() => {
                  if (isDraggingRef.current) {
                    isDraggingRef.current = false;
                    setTimelineProgress((p) => Math.round(p));
                  }
                }}
                className="relative h-2.5 bg-white/10 rounded-full cursor-pointer select-none flex items-center"
              >
                {/* Glowing Progress Fill Along the Line */}
                <div
                  className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-amber-400 shadow-[0_0_12px_rgba(56,189,248,0.55)] pointer-events-none"
                  style={{ width: `${progressPercentage}%` }}
                />

                {/* Smooth Live Playhead Thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.9)] pointer-events-none z-20"
                  style={{ left: `${progressPercentage}%` }}
                />

                {/* Clickable Node Pointers Directly on the Timeline Line for Each Year */}
                {years.map((yr, idx) => {
                  const nodePercent = maxYearIdx > 0 ? (idx / maxYearIdx) * 100 : 50;
                  const isCurrentYear = idx === yearIndex;
                  const isPassed = idx <= timelineProgress + 0.05;

                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(false);
                        setTimelineProgress(idx);
                      }}
                      style={{ left: `${nodePercent}%` }}
                      title={`Jump to ${yr}`}
                      className="group absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center focus:outline-none cursor-pointer z-10 py-3 px-1.5"
                    >
                      {/* Pointer Dot on the Line */}
                      <span
                        className={cn(
                          "rounded-full transition-all duration-200 border-2",
                          isCurrentYear
                            ? "w-4 h-4 bg-amber-400 border-white shadow-[0_0_14px_rgba(251,191,36,0.9)] scale-125"
                            : isPassed
                            ? "w-3 h-3 bg-sky-400 border-sky-950 group-hover:scale-125 group-hover:bg-amber-300 group-hover:border-white shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                            : "w-3 h-3 bg-[#111827] border-slate-500 group-hover:scale-125 group-hover:border-sky-300 group-hover:bg-sky-400/40"
                        )}
                      />

                      {/* Year Label Directly Below Each Pointer on the Line */}
                      <span
                        className={cn(
                          "absolute top-7 text-[10px] font-mono tracking-tight transition-all whitespace-nowrap px-1 py-0.5 rounded",
                          isCurrentYear
                            ? "text-amber-300 font-bold bg-amber-500/15 border border-amber-500/40 scale-105"
                            : isPassed
                            ? "text-sky-300 group-hover:text-white font-semibold"
                            : "text-slate-500 group-hover:text-slate-200"
                        )}
                      >
                        {yr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Chart Body + Dynamic Year-Wise & Career Opponent Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 relative z-10">
          {/* Left: Animated Horizontal Bar Chart (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1">
              <span>
                {viewMode === "cumulative"
                  ? `Cumulative Standings Through ${activeYear}`
                  : `Single-Year Standings in ${activeYear}`}
              </span>
              <span className="text-amber-300">
                Click any opponent bar to inspect year-by-year High Scores
              </span>
            </div>

            {interpolatedSnapshot.ranks.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-white/10 rounded-xl">
                <p className="text-slate-400 font-mono text-sm">
                  No runs recorded against opponents in {activeYear} for {FORMAT_LABELS[selectedFormat]}.
                </p>
              </div>
            ) : (
              interpolatedSnapshot.ranks.map((item, idx) => {
                const colorConfig = OPPONENT_COLORS[item.opponent] || DEFAULT_COLOR;
                const widthPercent = Math.min(
                  100,
                  Math.max(2.5, (item.exactRuns / maxRunsInView) * 100)
                );
                const isSelected = effectiveOpponentName === item.opponent;
                const playedThisYear = (item.yearInnings ?? 0) > 0 || (item.yearMatches ?? 0) > 0;

                return (
                  <div
                    key={item.opponent}
                    onClick={() => setSelectedOpponent(item.opponent)}
                    className={cn(
                      "group rounded-xl p-3 border transition-colors cursor-pointer",
                      isSelected
                        ? "bg-white/[0.06] border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                        : "bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-2">
                      <div className="flex items-center gap-2 min-w-0 flex-wrap">
                        <span className="text-slate-500 w-5 text-right font-bold">#{idx + 1}</span>
                        <span className="font-bold text-white group-hover:text-sky-300 transition-colors">
                          {item.opponent}
                        </span>
                        {/* Distinct Matches vs Innings Badge */}
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 tabular-nums">
                          {item.matches} Mat • {item.innings} Inn
                        </span>
                        {/* Year-Wise High Score Badge */}
                        {viewMode === "annual" ? (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                            {activeYear} HS: {item.highestScore}
                          </span>
                        ) : (
                          <>
                            {playedThisYear && item.yearHighestScore && item.yearHighestScore !== "DNB" && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                                {activeYear} HS: {item.yearHighestScore}
                              </span>
                            )}
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/25 text-sky-300">
                              Best (≤{activeYear}): {item.highestScore}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {item.average !== null && (
                          <span className="text-[11px] text-slate-400 hidden sm:inline">
                            Avg <strong className="text-amber-400">{item.average.toFixed(1)}</strong>
                          </span>
                        )}
                        <span className={cn("text-sm font-bold font-mono tabular-nums", colorConfig.text)}>
                          {item.runs.toLocaleString()} runs
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    {/* Smoothly Animated Bar Track */}
                    <div className="h-3.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          isPlaying ? "transition-none" : "transition-all duration-300 ease-out",
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

          {/* Right: Dynamic Year-Wise & Career Opponent Dossier (5 Columns) */}
          <div className="lg:col-span-5">
            {selectedOppDetail ? (
              <div className="bg-[#0b0d18] border border-white/15 rounded-xl p-5 sticky top-28 shadow-xl space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
                      Opponent Telemetry Dossier • {FORMAT_LABELS[selectedFormat]}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                      MS Dhoni vs {selectedOppDetail.opponent}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      Career: <strong className="text-white">{selectedOppDetail.matches} Matches</strong> •{" "}
                      <strong className="text-white">{selectedOppDetail.innings} Innings</strong> ({selectedOppDetail.notOuts} NO)
                    </p>
                  </div>
                  <div
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-mono font-bold shrink-0 text-right",
                      OPPONENT_COLORS[selectedOppDetail.opponent]?.bg || "bg-sky-500/10",
                      OPPONENT_COLORS[selectedOppDetail.opponent]?.text || "text-sky-400"
                    )}
                  >
                    <span className="block text-[9px] uppercase text-slate-400">Career Runs</span>
                    {selectedOppDetail.runs.toLocaleString()}
                  </div>
                </div>

                {/* 1. Selected Year (activeYear) Specific Performance Box */}
                <div className="p-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{activeYear} Year-Wise Record ({FORMAT_LABELS[selectedFormat]})</span>
                    </span>
                    {activeYearOppStats ? (
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {activeYear} HS: {activeYearOppStats.highestScore}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">No Matches in {activeYear}</span>
                    )}
                  </div>

                  {activeYearOppStats ? (
                    <div className="grid grid-cols-3 gap-2.5 font-mono">
                      <div className="bg-black/50 p-2.5 rounded-lg border border-white/10">
                        <p className="text-[10px] text-slate-400 uppercase">Matches / Inn</p>
                        <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                          {activeYearOppStats.matches}m / {activeYearOppStats.innings}i
                        </p>
                        <p className="text-[10px] text-slate-500">{activeYearOppStats.notOuts} not out</p>
                      </div>
                      <div className="bg-black/50 p-2.5 rounded-lg border border-white/10">
                        <p className="text-[10px] text-slate-400 uppercase">Runs ({activeYear})</p>
                        <p className="text-sm sm:text-base font-bold text-sky-400 mt-0.5">
                          {activeYearOppStats.runs}
                        </p>
                        <p className="text-[10px] text-slate-500">{activeYearOppStats.balls} balls</p>
                      </div>
                      <div className="bg-black/50 p-2.5 rounded-lg border border-amber-500/30">
                        <p className="text-[10px] text-amber-300 uppercase">High Score ({activeYear})</p>
                        <p className="text-sm sm:text-base font-bold text-amber-400 mt-0.5">
                          {activeYearOppStats.highestScore}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {activeYearOppStats.hundreds}×100 • {activeYearOppStats.fifties}×50
                        </p>
                      </div>
                      <div className="bg-black/50 p-2.5 rounded-lg border border-white/10">
                        <p className="text-[10px] text-slate-400 uppercase">Avg ({activeYear})</p>
                        <p className="text-sm font-bold text-white mt-0.5">
                          {activeYearOppStats.average !== null
                            ? activeYearOppStats.average.toFixed(2)
                            : "—"}
                        </p>
                      </div>
                      <div className="bg-black/50 p-2.5 rounded-lg border border-white/10">
                        <p className="text-[10px] text-slate-400 uppercase">SR ({activeYear})</p>
                        <p className="text-sm font-bold text-emerald-400 mt-0.5">
                          {activeYearOppStats.strikeRate !== null
                            ? activeYearOppStats.strikeRate.toFixed(2)
                            : "—"}
                        </p>
                      </div>
                      <div className="bg-black/50 p-2.5 rounded-lg border border-white/10">
                        <p className="text-[10px] text-slate-400 uppercase">4s / 6s ({activeYear})</p>
                        <p className="text-sm font-bold text-white mt-0.5">
                          {activeYearOppStats.fours} / {activeYearOppStats.sixes}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs font-mono text-slate-400 py-2">
                      MS Dhoni did not play against {selectedOppDetail.opponent} in {activeYear} in{" "}
                      {FORMAT_LABELS[selectedFormat]}. Select any active year in the table below.
                    </p>
                  )}
                </div>

                {/* 2. Cumulative Through Selected Year / Full Career Summary */}
                {cumThroughYearOppStats && (
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                        Cumulative Record Through {activeYear}
                      </span>
                      <span className="text-[11px] font-mono text-slate-300">
                        Best Through {activeYear}:{" "}
                        <strong className="text-white">{cumThroughYearOppStats.highestScore}</strong>
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
                      <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-[9px] text-slate-400 uppercase block">Matches</span>
                        <span className="font-bold text-white">{cumThroughYearOppStats.matches}</span>
                      </div>
                      <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-[9px] text-slate-400 uppercase block">Innings</span>
                        <span className="font-bold text-white">
                          {cumThroughYearOppStats.innings} ({cumThroughYearOppStats.notOuts}*)
                        </span>
                      </div>
                      <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-[9px] text-slate-400 uppercase block">Runs</span>
                        <span className="font-bold text-sky-400">{cumThroughYearOppStats.runs}</span>
                      </div>
                      <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-[9px] text-slate-400 uppercase block">Average</span>
                        <span className="font-bold text-amber-400">
                          {cumThroughYearOppStats.average !== null
                            ? cumThroughYearOppStats.average.toFixed(1)
                            : "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Complete Year-by-Year High Score & Matches/Innings Table for Selected Opponent */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                      Year-by-Year Breakdown vs {selectedOppDetail.opponent}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Click any year to inspect
                    </span>
                  </div>
                  <div className="max-h-56 overflow-y-auto rounded-xl border border-white/10 bg-black/50">
                    <table className="w-full text-left font-mono text-[11px]">
                      <thead className="bg-white/5 text-slate-400 sticky top-0">
                        <tr>
                          <th className="py-2 px-2.5">Year</th>
                          <th className="py-2 px-2">Mat</th>
                          <th className="py-2 px-2">Inn</th>
                          <th className="py-2 px-2">Runs</th>
                          <th className="py-2 px-2">Avg</th>
                          <th className="py-2 px-2.5 text-right text-amber-300">High Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {opponentYearsList.map((ys) => {
                          const isCurrentYr = ys.year === activeYear;
                          return (
                            <tr
                              key={ys.year}
                              onClick={() => {
                                setIsPlaying(false);
                                const idx = years.indexOf(ys.year);
                                if (idx !== -1) setTimelineProgress(idx);
                              }}
                              className={cn(
                                "cursor-pointer transition-colors",
                                isCurrentYr
                                  ? "bg-amber-500/20 text-white font-bold"
                                  : "text-slate-300 hover:bg-white/5"
                              )}
                            >
                              <td className="py-1.5 px-2.5 text-sky-400 font-bold">{ys.year}</td>
                              <td className="py-1.5 px-2">{ys.matches}</td>
                              <td className="py-1.5 px-2">
                                {ys.innings}
                                {ys.notOuts > 0 ? ` (${ys.notOuts}*)` : ""}
                              </td>
                              <td className="py-1.5 px-2 text-white font-bold">{ys.runs}</td>
                              <td className="py-1.5 px-2 text-slate-300">
                                {ys.average !== null ? ys.average.toFixed(1) : "—"}
                              </td>
                              <td className="py-1.5 px-2.5 text-right text-amber-400 font-bold">
                                {ys.highestScore}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center border border-white/10 rounded-xl bg-black/20">
                <Info className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                <p className="text-xs font-mono text-slate-400">
                  Select any opponent on the left to inspect Dhoni&apos;s year-by-year and career head-to-head metrics.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
