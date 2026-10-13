"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Crosshair,
  Flame,
  ShieldCheck,
  Search,
  Zap,
  Award,
  TrendingUp,
  Swords,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import type {
  BowlerDominanceFormatData,
  BowlerDominanceRecord,
  FormatKey,
} from "@/types/visualize";
import { cn } from "@/lib/utils";

interface BowlerDominanceSectionProps {
  bowlerData: Record<FormatKey, BowlerDominanceFormatData>;
  initialFormat?: FormatKey;
}

const FORMAT_OPTIONS: { key: FormatKey; label: string; badgeColor: string }[] = [
  { key: "ALL_INTL", label: "All Intl", badgeColor: "sky" },
  { key: "ODI", label: "ODI", badgeColor: "sky" },
  { key: "TEST", label: "Test", badgeColor: "sky" },
  { key: "T20I", label: "T20I", badgeColor: "sky" },
  { key: "IPL", label: "IPL", badgeColor: "gold" },
  { key: "CLT20", label: "Champions League", badgeColor: "amber" },
];

type SortMode = "runs" | "strikeRate" | "sixes" | "boundaries" | "dominance";

export const BowlerDominanceSection: React.FC<BowlerDominanceSectionProps> = ({
  bowlerData,
  initialFormat = "ALL_INTL",
}) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>(initialFormat);
  const [sortMode, setSortMode] = useState<SortMode>("runs");
  const [onlyUnbeaten, setOnlyUnbeaten] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedBowlerName, setSelectedBowlerName] = useState<string | null>(null);

  // Sync with global format selector when changed at the top of Visualize Mahi
  useEffect(() => {
    setSelectedFormat(initialFormat);
    setSelectedBowlerName(null);
  }, [initialFormat]);

  const currentFormatData = bowlerData?.[selectedFormat] || bowlerData?.ALL_INTL;

  const filteredAndSortedBowlers = useMemo(() => {
    if (!currentFormatData?.bowlers) return [];
    let list = [...currentFormatData.bowlers];

    if (onlyUnbeaten) {
      list = list.filter((b) => b.dismissals === 0);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (b) =>
          b.bowler.toLowerCase().includes(q) ||
          b.rawName.toLowerCase().includes(q) ||
          b.team.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      switch (sortMode) {
        case "runs":
          return b.runs - a.runs || b.strikeRate - a.strikeRate;
        case "strikeRate": {
          // Prioritize bowlers with at least 12 balls faced for meaningful SR ranking
          const aValid = a.balls >= 12 ? 1 : 0;
          const bValid = b.balls >= 12 ? 1 : 0;
          if (aValid !== bValid) return bValid - aValid;
          return b.strikeRate - a.strikeRate || b.runs - a.runs;
        }
        case "sixes":
          return b.sixes - a.sixes || b.runs - a.runs;
        case "boundaries":
          return b.fours + b.sixes - (a.fours + a.sixes) || b.runs - a.runs;
        case "dominance":
          return b.dominanceScore - a.dominanceScore || b.runs - a.runs;
        default:
          return b.runs - a.runs;
      }
    });

    return list;
  }, [currentFormatData, onlyUnbeaten, searchQuery, sortMode]);

  const displayedBowlers = showAll
    ? filteredAndSortedBowlers
    : filteredAndSortedBowlers.slice(0, 14);

  const activeBowler: BowlerDominanceRecord | undefined = useMemo(() => {
    if (selectedBowlerName) {
      const found = currentFormatData?.bowlers.find((b) => b.bowler === selectedBowlerName);
      if (found) return found;
    }
    return filteredAndSortedBowlers[0] || currentFormatData?.bowlers[0];
  }, [selectedBowlerName, filteredAndSortedBowlers, currentFormatData]);

  const maxRunsInList = useMemo(() => {
    if (!filteredAndSortedBowlers.length) return 100;
    return Math.max(...filteredAndSortedBowlers.map((b) => b.runs), 1);
  }, [filteredAndSortedBowlers]);

  const topPunishedBowler = currentFormatData?.bowlers?.[0];

  if (!currentFormatData) return null;

  return (
    <section id="bowler-dominance" className="scroll-mt-24">
      <div className="bg-gradient-to-b from-[#0b0d18] via-[#080a12] to-[#06070c] border border-amber-500/25 rounded-2xl p-5 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.06)] relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Swords className="w-3.5 h-3.5 text-amber-400" />
              <span>HEAD-TO-HEAD MATCHUPS · BOWLER DOMINANCE MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-wide">
              RUNS AGAINST BOWLERS
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-3xl">
              Deconstruct MS Dhoni&apos;s ball-by-ball dominance against individual bowlers across{" "}
              <span className="text-sky-300">All International</span>,{" "}
              <span className="text-sky-300">ODI</span>, <span className="text-sky-300">Test</span>,{" "}
              <span className="text-sky-300">T20I</span>,{" "}
              <span className="text-csk-yellow">IPL</span>, and{" "}
              <span className="text-amber-300">Champions League T20</span>—strictly separated by format.
            </p>
          </div>

          {/* 6-Format Filter Selector */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono shrink-0">
            {FORMAT_OPTIONS.map((fmt) => {
              const isSelected = selectedFormat === fmt.key;
              const isFranchise = fmt.key === "IPL" || fmt.key === "CLT20";
              return (
                <button
                  key={fmt.key}
                  onClick={() => {
                    setSelectedFormat(fmt.key);
                    setSelectedBowlerName(null);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap",
                    isSelected
                      ? isFranchise
                        ? "bg-csk-gold/25 text-csk-yellow border border-csk-gold/50 font-bold shadow-glow-gold"
                        : "bg-sky-500/25 text-sky-300 border border-sky-500/50 font-bold shadow-[0_0_12px_rgba(14,165,233,0.25)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  {fmt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 relative z-10">
          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Bowlers Faced ({FORMAT_OPTIONS.find((f) => f.key === selectedFormat)?.label})
            </span>
            <p className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              {currentFormatData.totalBowlersFaced.toLocaleString()}
            </p>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              {currentFormatData.totalBallsOffBowlers.toLocaleString()} deliveries tracked
            </span>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Unbeaten Matchups (0 Out)
            </span>
            <p className="text-2xl sm:text-3xl font-display font-bold text-emerald-400 mt-1">
              {currentFormatData.unbeatenBowlersCount.toLocaleString()}
            </p>
            <span className="text-[10px] font-mono text-emerald-400/80 mt-1 block">
              Bowlers who never dismissed Dhoni
            </span>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Bowlers Hit For Sixes
            </span>
            <p className="text-2xl sm:text-3xl font-display font-bold text-amber-400 mt-1">
              {currentFormatData.sixHitBowlersCount.toLocaleString()}
            </p>
            <span className="text-[10px] font-mono text-slate-500 mt-1 block">
              Cleared the ropes against
            </span>
          </div>

          <div className="bg-black/40 border border-amber-500/30 rounded-xl p-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
              #1 Most Runs Scored Off
            </span>
            <p className="text-lg sm:text-xl font-display font-bold text-white mt-1 truncate">
              {topPunishedBowler?.bowler || "—"}
            </p>
            <span className="text-[10px] font-mono text-amber-300 mt-1 block">
              {topPunishedBowler
                ? `${topPunishedBowler.runs} runs (${topPunishedBowler.balls}b • SR ${topPunishedBowler.strikeRate})`
                : ""}
            </span>
          </div>
        </div>

        {/* Search, Sort & Filter Controls */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-4 border-t border-white/10 relative z-10">
          {/* Search Input */}
          <div className="flex items-center gap-2 px-3.5 py-2 bg-black/50 border border-white/10 focus-within:border-sky-500/50 rounded-xl w-full lg:max-w-sm">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search bowler (e.g. Malinga, Steyn, Anderson, Perera)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs font-mono text-white placeholder-slate-500 outline-none w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-[10px] font-mono text-slate-400 hover:text-white cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Sort & Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
              {(
                [
                  { id: "runs", label: "Most Runs" },
                  { id: "strikeRate", label: "Strike Rate" },
                  { id: "sixes", label: "Most 6s" },
                  { id: "boundaries", label: "4s + 6s" },
                  { id: "dominance", label: "Dominance Index" },
                ] as { id: SortMode; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSortMode(tab.id)}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg transition-all cursor-pointer",
                    sortMode === tab.id
                      ? "bg-amber-500/25 text-amber-300 border border-amber-500/50 font-bold"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOnlyUnbeaten(!onlyUnbeaten)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer",
                onlyUnbeaten
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold"
                  : "bg-black/60 text-slate-400 border-white/10 hover:text-white"
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Unbeaten Only (0 Out)</span>
            </button>
          </div>
        </div>

        {/* Main 12-Column Interactive Split: Leaderboard (7 cols) + Head-to-Head Dossier (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 relative z-10">
          {/* Left: Bowler Dominance Bar Leaderboard (7 Columns) */}
          <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-display font-bold text-white uppercase tracking-wide">
                    Bowler Dominance Leaderboard
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    Click any bowler to inspect complete head-to-head telemetry on the right.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-amber-400 font-bold">
                  {filteredAndSortedBowlers.length} Bowlers Listed
                </span>
              </div>

              {displayedBowlers.length === 0 ? (
                <div className="py-12 text-center font-mono text-xs text-slate-500">
                  No bowlers matched &ldquo;{searchQuery}&rdquo; in this format filter.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1 scrollbar-thin">
                  {displayedBowlers.map((b, idx) => {
                    const isSelected = activeBowler?.bowler === b.bowler;
                    const widthPct = Math.max(8, Math.round((b.runs / maxRunsInList) * 100));
                    const boundaryWidthPct =
                      b.runs > 0 ? Math.round((b.boundaryRuns / b.runs) * 100) : 0;

                    return (
                      <div
                        key={b.bowler}
                        onClick={() => setSelectedBowlerName(b.bowler)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedBowlerName(b.bowler);
                          }
                        }}
                        className={cn(
                          "p-3 rounded-xl border transition-all cursor-pointer group",
                          isSelected
                            ? "bg-amber-500/[0.08] border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.12)]"
                            : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                        )}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs font-mono mb-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={cn(
                                "w-6 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0",
                                idx === 0
                                  ? "bg-amber-400 text-black"
                                  : idx === 1
                                  ? "bg-slate-300 text-black"
                                  : idx === 2
                                  ? "bg-amber-700 text-white"
                                  : "bg-white/10 text-slate-400"
                              )}
                            >
                              #{idx + 1}
                            </span>
                            <span className="font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                              {b.bowler}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 truncate hidden sm:inline-block">
                              {b.team}
                            </span>
                            {b.dismissals === 0 && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold shrink-0">
                                UNBEATEN
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-[11px] text-slate-400 hidden sm:inline">
                              SR <strong className="text-emerald-400">{b.strikeRate.toFixed(1)}</strong>
                            </span>
                            <span className="text-[11px] text-slate-400 hidden md:inline">
                              4s/6s:{" "}
                              <strong className="text-amber-300">
                                {b.fours}/{b.sixes}
                              </strong>
                            </span>
                            <span className="text-sm font-display font-bold text-white">
                              {b.runs}{" "}
                              <span className="text-[10px] font-mono font-normal text-slate-400">
                                ({b.balls}b)
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Proportional Bar with Boundary Highlight */}
                        <div className="h-2.5 w-full bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/5">
                          <div
                            style={{ width: `${widthPct}%` }}
                            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-amber-400 relative overflow-hidden transition-all duration-500"
                          >
                            <div
                              style={{ width: `${boundaryWidthPct}%` }}
                              className="h-full bg-amber-400/90"
                              title={`Boundary Share: ${b.boundaryPercentage}%`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Show More / Less Toggle */}
            {filteredAndSortedBowlers.length > 14 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-4 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>Show Top 14 Bowlers</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>
                      Show All {filteredAndSortedBowlers.length} Bowlers in{" "}
                      {FORMAT_OPTIONS.find((f) => f.key === selectedFormat)?.label}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Right: Interactive Bowler Head-to-Head Dossier (5 Columns) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0e1222] to-[#080a12] border border-amber-500/30 rounded-xl p-5 flex flex-col justify-between shadow-xl">
            {activeBowler ? (
              <div>
                {/* Dossier Top Badge */}
                <div className="flex items-start justify-between gap-2 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {activeBowler.dominanceTier}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {FORMAT_OPTIONS.find((f) => f.key === selectedFormat)?.label}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      MS Dhoni vs {activeBowler.bowler}
                    </h3>
                    <p className="text-xs font-mono text-sky-400 mt-0.5">
                      Opposition: <strong className="text-slate-200">{activeBowler.team}</strong> •{" "}
                      {activeBowler.innings}{" "}
                      {activeBowler.innings === 1 ? "Innings" : "Innings"} Faced
                    </p>
                  </div>

                  {/* Dominance Rating Circle */}
                  <div className="px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-center font-mono shrink-0">
                    <span className="text-[9px] uppercase text-amber-300 block">Dominance</span>
                    <span className="text-xl font-display font-black text-amber-400">
                      {activeBowler.dominanceScore}
                    </span>
                    <span className="text-[9px] text-slate-400">/99</span>
                  </div>
                </div>

                {/* 8-Metric Telemetry Grid */}
                <div className="grid grid-cols-2 gap-3 mt-4 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] uppercase text-slate-400 block">Runs Scored</span>
                    <span className="text-2xl font-display font-bold text-white mt-0.5 block">
                      {activeBowler.runs}
                    </span>
                    <span className="text-[10px] text-sky-400">
                      Off {activeBowler.balls} legal balls
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] uppercase text-slate-400 block">Strike Rate</span>
                    <span className="text-2xl font-display font-bold text-emerald-400 mt-0.5 block">
                      {activeBowler.strikeRate.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400">Runs per 100 balls</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] uppercase text-slate-400 block">
                      Head-to-Head Avg
                    </span>
                    <span className="text-2xl font-display font-bold text-amber-400 mt-0.5 block">
                      {activeBowler.average !== null
                        ? activeBowler.average.toFixed(2)
                        : `${activeBowler.runs}.00*`}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {activeBowler.dismissals === 0
                        ? "Never dismissed by bowler"
                        : `${activeBowler.dismissals} time(s) dismissed`}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] uppercase text-slate-400 block">
                      Boundaries (4s / 6s)
                    </span>
                    <span className="text-2xl font-display font-bold text-white mt-0.5 block">
                      {activeBowler.fours}{" "}
                      <span className="text-xs text-sky-400 font-mono">4s</span> /{" "}
                      {activeBowler.sixes}{" "}
                      <span className="text-xs text-amber-400 font-mono">6s</span>
                    </span>
                    <span className="text-[10px] text-amber-300">
                      {activeBowler.boundaryRuns} boundary runs ({activeBowler.boundaryPercentage}%)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] uppercase text-slate-400 block">
                      Wicket Preservation
                    </span>
                    <span
                      className={cn(
                        "text-lg font-display font-bold mt-0.5 block",
                        activeBowler.dismissals === 0 ? "text-emerald-400" : "text-white"
                      )}
                    >
                      {activeBowler.dismissals === 0
                        ? "UNBEATEN (0 OUT)"
                        : `${activeBowler.dismissals} Dismissal${
                            activeBowler.dismissals > 1 ? "s" : ""
                          }`}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Across {activeBowler.innings} innings
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] uppercase text-slate-400 block">
                      Dot Ball Percentage
                    </span>
                    <span className="text-lg font-display font-bold text-sky-300 mt-0.5 block">
                      {activeBowler.dotBallPercentage}%
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {activeBowler.dots} dot deliveries faced
                    </span>
                  </div>
                </div>

                {/* Scoring Breakdown Against Selected Bowler */}
                <div className="mt-5 p-4 rounded-xl bg-black/50 border border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className="text-amber-300 font-bold">
                      Boundary Runs: {activeBowler.boundaryRuns} ({activeBowler.boundaryPercentage}%)
                    </span>
                    <span className="text-sky-300 font-bold">
                      Singles/2s/3s: {Math.max(0, activeBowler.runs - activeBowler.boundaryRuns)} (
                      {round1(100 - activeBowler.boundaryPercentage)}%)
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-black/70 overflow-hidden flex border border-white/10 p-0.5">
                    <div
                      style={{ width: `${Math.min(100, activeBowler.boundaryPercentage)}%` }}
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-l-full transition-all duration-500"
                    />
                    <div
                      style={{
                        width: `${Math.max(0, 100 - activeBowler.boundaryPercentage)}%`,
                      }}
                      className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-r-full transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {/* Format Separation Callout */}
            <div className="mt-5 pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Strict Format Isolation Active</span>
              <span className="text-amber-400 font-bold">
                {selectedFormat === "IPL"
                  ? "IPL Only (Excludes CLT20)"
                  : selectedFormat === "CLT20"
                  ? "CLT20 Only (2010–2014)"
                  : selectedFormat === "ALL_INTL"
                  ? "Tests + ODIs + T20Is"
                  : `${selectedFormat} Only`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function round1(n: number) {
  return Math.max(0, Math.round(n * 10) / 10);
}
