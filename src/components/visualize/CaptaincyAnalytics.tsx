"use client";

import React, { useState } from "react";
import type { CaptaincyStatsItem } from "@/types/visualize";
import { Award, Trophy, Users, Shield, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaptaincyAnalyticsProps {
  captaincyStats: CaptaincyStatsItem[];
}

export const CaptaincyAnalytics: React.FC<CaptaincyAnalyticsProps> = ({ captaincyStats }) => {
  const [selectedTeam, setSelectedTeam] = useState<string>("India");

  const teamRecords = captaincyStats.filter((c) => c.team === selectedTeam);

  return (
    <section id="captaincy-analytics" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>MODULE 12 · LEADERSHIP ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              CAPTAINCY ANALYTICS
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              Strictly segregated captaincy records: India (3 ICC trophies, Test Mace) and Chennai Super Kings (5 IPL titles, 2 CLT20).
            </p>
          </div>

          {/* Team selector */}
          <div className="flex items-center p-1 bg-black/60 rounded-xl border border-white/10 text-xs font-mono">
            {["India", "Chennai Super Kings", "ALL_TEAMS"].map((tm) => (
              <button
                key={tm}
                onClick={() => setSelectedTeam(tm)}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                  selectedTeam === tm
                    ? tm === "Chennai Super Kings"
                      ? "bg-csk-gold/25 text-csk-yellow border border-csk-gold/50 font-bold shadow-glow-gold"
                      : "bg-sky-500/25 text-sky-300 border border-sky-500/50 font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {tm === "ALL_TEAMS" ? "Combined" : tm}
              </button>
            ))}
          </div>
        </div>

        {/* Format Captaincy Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {teamRecords.map((r) => (
            <div
              key={r.format}
              className="bg-black/40 border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                    {r.format}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {r.win_percentage} Win
                  </span>
                </div>
                <p className="text-3xl font-display font-bold text-white mt-1">
                  {r.matches_captained}{" "}
                  <span className="text-xs font-mono font-normal text-slate-400">matches</span>
                </p>
              </div>

              <div className="space-y-1.5 mt-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Wins / Losses</span>
                  <span className="text-white font-bold">
                    {r.wins}W - {r.losses}L
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ties / Draws / NR</span>
                  <span className="text-slate-300">
                    {r.ties}T / {r.draws}D / {r.no_results}NR
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Toss Win %</span>
                  <span className="text-amber-400 font-bold">{r.toss_win_percentage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
