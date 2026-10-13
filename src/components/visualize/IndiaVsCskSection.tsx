"use client";

import React from "react";
import type { CareerSummary } from "@/types/visualize";
import { ShieldCheck, Trophy, Sparkles } from "lucide-react";

interface IndiaVsCskProps {
  data: {
    india: CareerSummary & { label: string };
    csk: CareerSummary & { label: string };
    clt20?: CareerSummary & { label: string };
    rps: CareerSummary & { label: string };
  };
}

export const IndiaVsCskSection: React.FC<IndiaVsCskProps> = ({ data }) => {
  const { india, csk, clt20 } = data;

  const compareRows = [
    { label: "Matches Played", india: india.matches.toLocaleString(), csk: csk.matches.toLocaleString(), clt20: clt20 ? clt20.matches.toLocaleString() : "24" },
    { label: "Innings Batted", india: india.innings.toLocaleString(), csk: csk.innings.toLocaleString(), clt20: clt20 ? clt20.innings.toLocaleString() : "21" },
    { label: "Runs Scored", india: india.runs.toLocaleString(), csk: csk.runs.toLocaleString(), clt20: clt20 ? clt20.runs.toLocaleString() : "449", highlight: true },
    { label: "Batting Average", india: india.average?.toFixed(2) ?? "N/A", csk: csk.average?.toFixed(2) ?? "N/A", clt20: clt20?.average?.toFixed(2) ?? "40.82", highlight: true },
    { label: "Strike Rate", india: india.strikeRate?.toFixed(2) ?? "N/A", csk: csk.strikeRate?.toFixed(2) ?? "N/A", clt20: clt20?.strikeRate?.toFixed(2) ?? "136.89", highlight: true },
    { label: "Highest Score", india: india.highestScore, csk: csk.highestScore, clt20: clt20?.highestScore ?? "63*" },
    { label: "Centuries (100s)", india: india.hundreds.toString(), csk: csk.hundreds.toString(), clt20: clt20 ? clt20.hundreds.toString() : "0" },
    { label: "Half-Centuries (50s)", india: india.fifties.toString(), csk: csk.fifties.toString(), clt20: clt20 ? clt20.fifties.toString() : "1" },
    { label: "Boundaries (4s / 6s)", india: `${india.fours} / ${india.sixes}`, csk: `${csk.fours} / ${csk.sixes}`, clt20: clt20 ? `${clt20.fours} / ${clt20.sixes}` : "31 / 27" },
    { label: "Not Outs", india: india.notOuts.toString(), csk: csk.notOuts.toString(), clt20: clt20 ? clt20.notOuts.toString() : "10" },
  ];

  return (
    <section id="india-vs-csk" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>MODULE 14 · INTERNATIONAL VS FRANCHISE BATTING (IPL & CLT20 SEPARATED)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
            INDIA VS CHENNAI SUPER KINGS (IPL & CHAMPIONS LEAGUE)
          </h2>
          <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
            Clean analytical separation between Dhoni&apos;s 16 years representing Team India, his IPL career for CSK, and his Champions League T20 campaigns.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-left text-slate-400 uppercase">Metric</th>
                <th className="py-3 px-4 text-center bg-blue-950/20 text-sky-300 font-bold border-x border-white/5 uppercase">
                  🇮🇳 Team India (Intl)
                </th>
                <th className="py-3 px-4 text-center bg-amber-950/20 text-csk-yellow font-bold border-r border-white/5 uppercase">
                  🦁 CSK (IPL Only)
                </th>
                <th className="py-3 px-4 text-center bg-amber-900/15 text-amber-300 font-bold uppercase">
                  🏆 CSK (Champions League T20)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {compareRows.map((r) => (
                <tr key={r.label} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-slate-300 font-semibold">{r.label}</td>
                  <td
                    className={`py-3 px-4 text-center border-x border-white/5 font-bold ${
                      r.highlight ? "text-sky-300 text-sm" : "text-white"
                    }`}
                  >
                    {r.india}
                  </td>
                  <td
                    className={`py-3 px-4 text-center border-r border-white/5 font-bold ${
                      r.highlight ? "text-csk-yellow text-sm" : "text-white"
                    }`}
                  >
                    {r.csk}
                  </td>
                  <td
                    className={`py-3 px-4 text-center font-bold ${
                      r.highlight ? "text-amber-300 text-sm" : "text-white"
                    }`}
                  >
                    {r.clt20}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
