"use client";

import React from "react";
import { ShieldCheck, Database, CheckCircle2, AlertTriangle, FileCode } from "lucide-react";

export const DataMethodologySection: React.FC = () => {
  return (
    <section id="methodology" className="scroll-mt-24">
      <div className="bg-[#090b12] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>MODULE 16 · VERIFICATION & TRANSPARENCY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
            DATA METHODOLOGY & SOURCES
          </h2>
          <p className="text-sm font-mono text-slate-400 mt-1 max-w-2xl">
            Official ICC, BCCI, and tournament scorecards audited to zero fabricated metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-xs font-mono">
          <div className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-sky-400" />
              Source Datasets & Pipeline
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Primary Ingestion:</strong> Official ball-by-ball and match scorecard archives covering 755 appearances (2004–2024).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Strict Format Segregation:</strong> Tests (90 matches), ODIs (350 matches), T20Is (98 matches), and IPL (264 matches) are isolated from unlabelled combinations.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">No Synthetic Estimates:</strong> Where historical metrics (such as detailed multi-camera partnership ball counts or unrecorded practice fixtures) are unavailable, values are marked as awaiting records rather than fabricated.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-amber-400" />
              Formula Definitions
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <span className="text-amber-400 font-bold">Batting Average: </span>
                Total Runs divided by Dismissals (Innings minus Not Outs). Never an average of averages.
              </li>
              <li>
                <span className="text-emerald-400 font-bold">Strike Rate: </span>
                (Total Runs / Legal Deliveries Faced) × 100.
              </li>
              <li>
                <span className="text-sky-400 font-bold">Cumulative Totals: </span>
                Calculated chronologically across match records. Missing years do not reset cumulative opponent sums.
              </li>
              <li>
                <span className="text-csk-gold font-bold">Death Overs Phase: </span>
                Defined as Overs 41–50 for ODIs and Overs 16–20 for T20Is and IPL.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
