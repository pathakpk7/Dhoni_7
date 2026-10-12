"use client";

import React, { useState } from "react";
import type { VenueRecord, FormatKey } from "@/types/visualize";
import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface VenueExplorerSectionProps {
  venueData: Record<FormatKey, VenueRecord[]>;
}

export const VenueExplorerSection: React.FC<VenueExplorerSectionProps> = ({ venueData }) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>("ALL_INTL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const list = venueData[selectedFormat] || [];

  const filteredVenues = list.filter(
    (v) =>
      v.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="venue-explorer" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>MODULE 13 · GROUND GEOGRAPHY & RUNS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
              VENUE EXPLORER
            </h2>
            <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
              Inspect Dhoni&apos;s output across iconic cricket stadiums around the world (Chepauk, Wankhede, Eden Gardens, Lord&apos;s, MCG, etc.).
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

        {/* Search input */}
        <div className="mt-6 flex items-center gap-2 px-3 py-2 bg-black/40 border border-white/10 rounded-xl max-w-md">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search venue name, city, or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs font-mono text-white placeholder-slate-500 outline-none w-full"
          />
        </div>

        {/* Venue Table */}
        <div className="mt-4 max-h-96 overflow-y-auto scrollbar-thin border border-white/10 rounded-xl">
          <table className="w-full text-xs font-mono text-left">
            <thead className="sticky top-0 bg-[#07080e] border-b border-white/10 text-slate-400">
              <tr>
                <th className="py-2.5 px-3">Stadium / Ground</th>
                <th className="py-2.5 px-3">City / Country</th>
                <th className="py-2.5 px-3">Matches</th>
                <th className="py-2.5 px-3">Runs</th>
                <th className="py-2.5 px-3">Average</th>
                <th className="py-2.5 px-3">Strike Rate</th>
                <th className="py-2.5 px-3">High Score</th>
                <th className="py-2.5 px-3">100s / 50s</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-black/20">
              {filteredVenues.map((v) => (
                <tr key={v.venue} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-white">{v.venue}</td>
                  <td className="py-2.5 px-3 text-slate-400">{v.city}, {v.country}</td>
                  <td className="py-2.5 px-3 text-slate-300">{v.matches}</td>
                  <td className="py-2.5 px-3 font-bold text-sky-400">{v.runs.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-amber-400">{v.average ?? "N/A"}</td>
                  <td className="py-2.5 px-3 text-emerald-400">{v.strikeRate ?? "N/A"}</td>
                  <td className="py-2.5 px-3 text-white font-bold">{v.highestScore}</td>
                  <td className="py-2.5 px-3 text-slate-400">{v.hundreds} / {v.fifties}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
