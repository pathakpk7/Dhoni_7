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
} from "recharts";
import type { BattingPositionRecord, FormatKey } from "@/types/visualize";
import { cn } from "@/lib/utils";

interface BattingPositionAnalyticsProps {
  positionStats: Record<FormatKey, BattingPositionRecord[]>;
}

export const BattingPositionAnalytics: React.FC<BattingPositionAnalyticsProps> = ({
  positionStats,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>("ALL_INTL");
  const list = positionStats[selectedFormat] || [];

  return (
    <section id="batting-position" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>MODULE 05 · TACTICAL EVOLUTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              BATTING POSITION ANALYTICS
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              From early fire-breathing No. 3 innings (148 vs Pakistan, 183* vs Sri Lanka) to legendary middle/lower-order crisis manager at No. 5, 6, and 7.
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

        {/* Chart View */}
        <div className="mt-6 h-72 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={list}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
              <XAxis type="number" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }} />
              <YAxis
                type="category"
                dataKey="position"
                stroke="#64748b"
                tickFormatter={(pos) => `No. ${pos}`}
                tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload as BattingPositionRecord;
                    return (
                      <div className="bg-[#0b0e17] border border-white/20 p-3 rounded-xl shadow-xl font-mono text-xs">
                        <p className="font-bold text-white text-sm mb-1">Batting Position No. {d.position}</p>
                        <p className="text-sky-400">Runs: <span className="text-white font-bold">{d.runs.toLocaleString()}</span></p>
                        <p className="text-slate-400">Innings: {d.innings}</p>
                        <p className="text-amber-400">Average: <span className="text-white font-bold">{d.average ?? "N/A"}</span></p>
                        <p className="text-emerald-400">Strike Rate: <span className="text-white font-bold">{d.strikeRate ?? "N/A"}</span></p>
                        <p className="text-slate-400">Highest Score: {d.highestScore}</p>
                        <p className="text-slate-400">100s / 50s: {d.hundreds} / {d.fifties}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="runs" radius={[0, 4, 4, 0]}>
                {list.map((entry) => (
                  <Cell
                    key={entry.position}
                    fill={entry.position === 5 || entry.position === 6 || entry.position === 7 ? "#0284c7" : "#38bdf8"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Position Stats Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-xs font-mono text-left">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3">Position</th>
                <th className="py-2.5 px-3">Innings</th>
                <th className="py-2.5 px-3">Runs</th>
                <th className="py-2.5 px-3">Average</th>
                <th className="py-2.5 px-3">Strike Rate</th>
                <th className="py-2.5 px-3">High Score</th>
                <th className="py-2.5 px-3">100s / 50s</th>
                <th className="py-2.5 px-3">4s / 6s</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {list.map((r) => (
                <tr key={r.position} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-3 font-bold text-white">No. {r.position}</td>
                  <td className="py-2.5 px-3 text-slate-300">{r.innings}</td>
                  <td className="py-2.5 px-3 font-bold text-sky-400">{r.runs.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-amber-400 font-semibold">{r.average ?? "N/A"}</td>
                  <td className="py-2.5 px-3 text-emerald-400">{r.strikeRate ?? "N/A"}</td>
                  <td className="py-2.5 px-3 text-white font-bold">{r.highestScore}</td>
                  <td className="py-2.5 px-3 text-slate-300">{r.hundreds} / {r.fifties}</td>
                  <td className="py-2.5 px-3 text-slate-400">{r.fours} / {r.sixes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
