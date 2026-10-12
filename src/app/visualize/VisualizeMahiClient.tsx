"use client";

import React, { useState } from "react";
import rawData from "@/data/visualize_mahi_data.json";
import type { VisualizeMahiData, FormatKey } from "@/types/visualize";
import { VisualizeHeader } from "@/components/visualize/VisualizeHeader";
import { CareerOverview } from "@/components/visualize/CareerOverview";
import { OpponentRunsBarChart } from "@/components/visualize/OpponentRunsBarChart";
import { AnnualProgressionSection } from "@/components/visualize/AnnualProgressionSection";
import { CareerRunsTimeline } from "@/components/visualize/CareerRunsTimeline";
import { BattingPositionAnalytics } from "@/components/visualize/BattingPositionAnalytics";
import { ScoringAnalytics } from "@/components/visualize/ScoringAnalytics";
import { HighestScoresAndBands } from "@/components/visualize/HighestScoresAndBands";
import { ChasingAnalysis } from "@/components/visualize/ChasingAnalysis";
import { FinisherZoneSection } from "@/components/visualize/FinisherZoneSection";
import { MatchResultsAnalytics } from "@/components/visualize/MatchResultsAnalytics";
import { WicketkeepingAndBowling } from "@/components/visualize/WicketkeepingAndBowling";
import { CaptaincyAnalytics } from "@/components/visualize/CaptaincyAnalytics";
import { VenueExplorerSection } from "@/components/visualize/VenueExplorerSection";
import { IndiaVsCskSection } from "@/components/visualize/IndiaVsCskSection";
import { CareerHeatmapSection } from "@/components/visualize/CareerHeatmapSection";
import { DataMethodologySection } from "@/components/visualize/DataMethodologySection";
import { Footer } from "@/components/layout/Footer";

const data = rawData as unknown as VisualizeMahiData;

export default function VisualizeMahiClient() {
  const [activeModuleId, setActiveModuleId] = useState<string>("career-overview");
  const [globalFormat, setGlobalFormat] = useState<FormatKey>("ALL_INTL");

  return (
    <div className="min-h-screen bg-[#06070a] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-white">
      {/* Top Header & Sticky Navigation */}
      <VisualizeHeader
        activeModuleId={activeModuleId}
        onSelectModule={(id) => setActiveModuleId(id)}
      />

      {/* Main Interactive Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 w-full">
        {/* Module 1: Career Overview */}
        <CareerOverview
          careerStats={data.careerOverview}
          selectedFormat={globalFormat}
          onFormatChange={(fmt) => setGlobalFormat(fmt)}
        />

        {/* Module 2: Runs Against Every Opponent (Flagship) */}
        <OpponentRunsBarChart
          evolutionData={data.opponentEvolution}
          initialFormat={globalFormat}
        />

        {/* Module 3: Annual Runs Progression */}
        <AnnualProgressionSection annualData={data.annualProgression} />

        {/* Module 4: Career Runs Timeline & Milestones */}
        <CareerRunsTimeline
          annualData={data.annualProgression}
          milestones={data.calculatedMilestones}
        />

        {/* Module 5: Batting Position Analytics */}
        <BattingPositionAnalytics positionStats={data.battingPositionStats} />

        {/* Module 6: Scoring & Boundaries */}
        <ScoringAnalytics scoringData={data.scoringBreakdown} />

        {/* Module 7: Highest Scores & Consistency Bands */}
        <HighestScoresAndBands
          highestScores={data.highestScoresByOpponent}
          scoreBands={data.scoreBands}
        />

        {/* Module 8: Chasing vs Batting First */}
        <ChasingAnalysis chasingData={data.chasingComparison} />

        {/* Module 9: The Finisher's Zone */}
        <FinisherZoneSection finishingStats={data.finishing} />

        {/* Module 10: Match Results Analytics */}
        <MatchResultsAnalytics matchResultsData={data.matchResultsBatting} />

        {/* Module 11: Wicketkeeping & Bowling */}
        <WicketkeepingAndBowling
          wicketkeeping={data.wicketkeeping}
          verifiedBowling={data.verifiedBowling}
          topDismissers={data.topDismissers}
        />

        {/* Module 12: Captaincy Analytics */}
        <CaptaincyAnalytics captaincyStats={data.captaincy} />

        {/* Module 13: Venue Explorer */}
        <VenueExplorerSection venueData={data.venueExplorerData} />

        {/* Module 14: India vs CSK Batting */}
        <IndiaVsCskSection data={data.indiaVsCskBatting} />

        {/* Module 15: Career Heatmap */}
        <CareerHeatmapSection heatmapData={data.careerHeatmap} />

        {/* Module 16: Data Sources & Methodology */}
        <DataMethodologySection />
      </main>

      {/* Existing Site Footer */}
      <Footer />
    </div>
  );
}
