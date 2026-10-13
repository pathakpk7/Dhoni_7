export type FormatKey = "ALL_INTL" | "ODI" | "TEST" | "T20I" | "IPL" | "CLT20";

export interface CareerSummary {
  format: FormatKey;
  matches: number;
  innings: number;
  runs: number;
  balls: number;
  notOuts: number;
  dismissals: number;
  average: number | null;
  strikeRate: number | null;
  highestScore: string;
  hundreds: number;
  fifties: number;
  fours: number;
  sixes: number;
}

export interface OpponentDetail {
  opponent: string;
  matches: number;
  innings: number;
  runs: number;
  balls: number;
  notOuts: number;
  dismissals: number;
  average: number | null;
  strikeRate: number | null;
  highestScore: string;
  hundreds: number;
  fifties: number;
  fours: number;
  sixes: number;
  yearRuns: Record<string, number>;
}

export interface OpponentRankItem {
  opponent: string;
  runs: number;
}

export interface EvolutionYearPoint {
  year: number;
  ranks: OpponentRankItem[];
  totalYearRuns?: number;
  totalCumRuns?: number;
}

export interface OpponentEvolutionData {
  years: number[];
  opponents: string[];
  annualData: EvolutionYearPoint[];
  cumulativeData: EvolutionYearPoint[];
  opponentDetails: Record<string, OpponentDetail>;
}

export interface AnnualRecord {
  year: number;
  matches: number;
  innings: number;
  runs: number;
  cumRuns: number;
  average: number | null;
  strikeRate: number | null;
  hundreds: number;
  fifties: number;
  fours: number;
  sixes: number;
  highestScore: string;
}

export interface CalculatedMilestone {
  milestone: string;
  threshold: number;
  runsAtCross: number;
  date: string;
  matchIndex: number;
  inningsScore: string;
  balls: number;
  opponent: string;
  format: string;
  venue: string;
  result: string;
}

export interface BattingPositionRecord {
  position: number;
  innings: number;
  runs: number;
  balls: number;
  average: number | null;
  strikeRate: number | null;
  hundreds: number;
  fifties: number;
  fours: number;
  sixes: number;
  highestScore: string;
}

export interface ScoringBreakdown {
  totalRuns: number;
  fours: number;
  sixes: number;
  runsFromFours: number;
  runsFromSixes: number;
  totalBoundaryRuns: number;
  runsFromRunning: number;
  boundaryPercentage: number;
  runningPercentage: number;
}

export interface HighestScoreOpponent {
  opponent: string;
  runs: number;
  notOut: boolean;
  scoreString: string;
  balls: number;
  format: string;
  date: string;
  venue: string;
  result: string;
}

export interface ScoreBandItem {
  band: string;
  inningsCount: number;
  percentage: number;
}

export interface ChasingSituation {
  innings: number;
  runs: number;
  balls: number;
  notOuts: number;
  dismissals: number;
  average: number | null;
  strikeRate: number | null;
  highestScore: string;
  hundreds: number;
  fifties: number;
  fours: number;
  sixes: number;
  averageInWins: number | null;
  winsCount: number;
}

export interface ChasingComparison {
  battingFirst: ChasingSituation;
  chasing: ChasingSituation;
}

export interface MatchResultItem {
  result: string;
  matches: number;
  innings: number;
  runs: number;
  balls: number;
  average: number | null;
  strikeRate: number | null;
  hundreds: number;
  fifties: number;
  highestScore: string;
}

export interface VenueRecord {
  venue: string;
  city: string;
  country: string;
  matches: number;
  innings: number;
  runs: number;
  average: number | null;
  strikeRate: number | null;
  highestScore: string;
  hundreds: number;
  fifties: number;
}

export interface HeatmapFormatData {
  matches: number;
  innings: number;
  runs: number;
  balls: number;
  average: number | null;
  strikeRate: number | null;
}

export interface HeatmapYearRow {
  year: number;
  formats: Record<string, HeatmapFormatData | null>;
}

export interface WicketkeepingStatsItem {
  format: string;
  matches: string;
  catches: string;
  stumpings: string;
  run_outs: string;
  total_dismissals: string;
  dismissals_per_match: string;
}

export interface CaptaincyStatsItem {
  team: string;
  format: string;
  matches_captained: string;
  wins: string;
  losses: string;
  ties: string;
  draws: string;
  no_results: string;
  win_percentage: string;
  toss_win_percentage: string;
}

export interface FinishingStatsItem {
  format: string;
  death_overs_definition: string;
  balls_faced: string;
  runs_scored: string;
  strike_rate: string;
  fours: string;
  sixes: string;
  dot_balls: string;
  dot_ball_percentage: string;
  boundary_percentage: string;
  finisher_index: string;
}

export interface BowlerDismissalItem {
  bowler: string;
  dismissals: number;
}

export interface BowlerDominanceRecord {
  bowler: string;
  rawName: string;
  team: string;
  runs: number;
  balls: number;
  innings: number;
  dismissals: number;
  average: number | null;
  strikeRate: number;
  fours: number;
  sixes: number;
  boundaryRuns: number;
  boundaryPercentage: number;
  dots: number;
  dotBallPercentage: number;
  dominanceScore: number;
  dominanceTier: string;
}

export interface BowlerDominanceFormatData {
  format: FormatKey;
  totalBowlersFaced: number;
  unbeatenBowlersCount: number;
  sixHitBowlersCount: number;
  totalRunsOffBowlers: number;
  totalBallsOffBowlers: number;
  bowlers: BowlerDominanceRecord[];
}

export interface VerifiedBowlingItem {
  format: string;
  matches: number;
  innings: number;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number | null;
  bestBowling: string;
  description: string;
}

export interface VisualizeMahiData {
  meta: {
    generatedAt: string;
    sourceDatasets: string[];
    coveredYears: string;
    totalMatchesRepresented: number;
    totalInternationalRuns: number;
  };
  careerOverview: Record<FormatKey, CareerSummary>;
  opponentEvolution: Record<FormatKey, OpponentEvolutionData>;
  bowlerDominance: Record<FormatKey, BowlerDominanceFormatData>;
  annualProgression: Record<FormatKey, AnnualRecord[]>;
  calculatedMilestones: CalculatedMilestone[];
  historicalMilestones: Array<{ date: string; milestone: string; format: string; details: string }>;
  battingPositionStats: Record<FormatKey, BattingPositionRecord[]>;
  scoringBreakdown: Record<FormatKey, ScoringBreakdown>;
  highestScoresByOpponent: Record<FormatKey, HighestScoreOpponent[]>;
  scoreBands: Record<FormatKey, ScoreBandItem[]>;
  chasingComparison: Record<FormatKey, ChasingComparison>;
  matchResultsBatting: Record<FormatKey, MatchResultItem[]>;
  venueExplorerData: Record<FormatKey, VenueRecord[]>;
  indiaVsCskBatting: {
    india: CareerSummary & { label: string };
    csk: CareerSummary & { label: string };
    clt20?: CareerSummary & { label: string };
    rps: CareerSummary & { label: string };
  };
  careerHeatmap: HeatmapYearRow[];
  wicketkeeping: WicketkeepingStatsItem[];
  captaincy: CaptaincyStatsItem[];
  finishing: FinishingStatsItem[];
  topDismissers: BowlerDismissalItem[];
  verifiedBowling: VerifiedBowlingItem[];
}

