import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src/data");
const PROCESSED_DIR = path.join(process.cwd(), "data/processed");
const MATCHES_FILE = path.join(DATA_DIR, "dhoni_matches.json");
const WAREHOUSE_BUNDLE_FILE = path.join(DATA_DIR, "dhoni_warehouse_bundle.json");
const FORMAT_STATS_FILE = path.join(DATA_DIR, "format_stats.json");
const WK_STATS_FILE = path.join(DATA_DIR, "wicketkeeping_stats.json");
const CAPTAINCY_STATS_FILE = path.join(DATA_DIR, "captaincy_stats.json");
const FINISHING_STATS_FILE = path.join(DATA_DIR, "finishing_stats.json");
const POSITION_STATS_FILE = path.join(DATA_DIR, "position_stats.json");
const ROLE_COMPARISON_FILE = path.join(DATA_DIR, "role_comparison.json");
const YEARLY_STATS_FILE = path.join(DATA_DIR, "yearly_stats.json");
const BALL_BY_BALL_CSV = path.join(PROCESSED_DIR, "dhoni_ball_by_ball.csv");
const MATCHES_CSV = path.join(PROCESSED_DIR, "dhoni_matches.csv");
const OUTPUT_FILE = path.join(DATA_DIR, "visualize_mahi_data.json");

// Helper for formatting
function round(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num)) return null;
  return Number(Number(num).toFixed(decimals));
}

// ============================================================================
// 0. CANONICAL CHAMPIONS LEAGUE TWENTY20 (CLT20) MATCH RECORDS (2010–2014)
// Strictly separated from IPL (24 matches, 21 innings, 449 runs, 328 balls,
// 10 NO, 11 dismissals, Avg 40.82, SR 136.89, HS 63*, 1x50, 31x4, 27x6)
// ============================================================================
const CLT20_MATCH_RECORDS = [
  // 2010 CLT20 (South Africa - CSK Champions, 6 matches, 5 innings)
  {
    match_id: "clt20_2010_01",
    innings_id: "clt20_2010_01_1",
    date: "2010-09-11",
    year: 2010,
    month: 9,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2010",
    team: "Chennai Super Kings",
    opponent: "Central Districts",
    opponent_code: "CD",
    venue: "SuperSport Park, Centurion",
    city: "Centurion",
    country: "South Africa",
    location_type: "NEUTRAL",
    innings_number: 1,
    batting_position: 5,
    runs: 0,
    balls: 3,
    fours: 0,
    sixes: 0,
    strike_rate: 0.0,
    dismissed: true,
    not_out: false,
    dismissal_type: "bowled",
    bowler: "Doug Bracewell",
    captain: true,
    chasing: false,
    result: "WON",
    catches: 2,
    stumpings: 1,
    dismissals_wk: 3,
  },
  {
    match_id: "clt20_2010_03",
    innings_id: "clt20_2010_03_1",
    date: "2010-09-18",
    year: 2010,
    month: 9,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2010",
    team: "Chennai Super Kings",
    opponent: "Victoria Bushrangers",
    opponent_code: "VIC",
    venue: "St George's Park, Port Elizabeth",
    city: "Port Elizabeth",
    country: "South Africa",
    location_type: "NEUTRAL",
    innings_number: 1,
    batting_position: 6,
    runs: 11,
    balls: 8,
    fours: 1,
    sixes: 0,
    strike_rate: 137.5,
    dismissed: false,
    not_out: true,
    dismissal_type: "not out",
    bowler: "",
    captain: true,
    chasing: false,
    result: "TIED",
    catches: 1,
    stumpings: 0,
    dismissals_wk: 1,
  },
  {
    match_id: "clt20_2010_04",
    innings_id: "clt20_2010_04_1",
    date: "2010-09-22",
    year: 2010,
    month: 9,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2010",
    team: "Chennai Super Kings",
    opponent: "Eastern Province Warriors",
    opponent_code: "WAR",
    venue: "St George's Park, Port Elizabeth",
    city: "Port Elizabeth",
    country: "South Africa",
    location_type: "AWAY",
    innings_number: 1,
    batting_position: 5,
    runs: 31,
    balls: 25,
    fours: 2,
    sixes: 1,
    strike_rate: 124.0,
    dismissed: true,
    not_out: false,
    dismissal_type: "caught",
    bowler: "Rusty Theron",
    captain: true,
    chasing: false,
    result: "WON",
    catches: 1,
    stumpings: 0,
    dismissals_wk: 1,
  },
  {
    match_id: "clt20_2010_05",
    innings_id: "clt20_2010_05_1",
    date: "2010-09-24",
    year: 2010,
    month: 9,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2010",
    team: "Chennai Super Kings",
    opponent: "Royal Challengers Bangalore",
    opponent_code: "RCB",
    venue: "Kingsmead, Durban",
    city: "Durban",
    country: "South Africa",
    location_type: "NEUTRAL",
    innings_number: 1,
    batting_position: 5,
    runs: 10,
    balls: 9,
    fours: 1,
    sixes: 0,
    strike_rate: 111.11,
    dismissed: true,
    not_out: false,
    dismissal_type: "caught",
    bowler: "Vinay Kumar",
    captain: true,
    chasing: false,
    result: "WON",
    catches: 1,
    stumpings: 0,
    dismissals_wk: 1,
  },
  {
    match_id: "clt20_2010_06",
    innings_id: "clt20_2010_06_2",
    date: "2010-09-26",
    year: 2010,
    month: 9,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2010",
    team: "Chennai Super Kings",
    opponent: "Eastern Province Warriors",
    opponent_code: "WAR",
    venue: "Wanderers Stadium, Johannesburg",
    city: "Johannesburg",
    country: "South Africa",
    location_type: "NEUTRAL",
    innings_number: 2,
    batting_position: 4,
    runs: 17,
    balls: 12,
    fours: 2,
    sixes: 0,
    strike_rate: 141.67,
    dismissed: false,
    not_out: true,
    dismissal_type: "not out",
    bowler: "",
    captain: true,
    chasing: true,
    result: "WON",
    catches: 1,
    stumpings: 0,
    dismissals_wk: 1,
  },
  // 2011 CLT20 (Chennai - 4 matches, 4 innings)
  {
    match_id: "clt20_2011_01",
    innings_id: "clt20_2011_01_1",
    date: "2011-09-24",
    year: 2011,
    month: 9,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2011",
    team: "Chennai Super Kings",
    opponent: "Mumbai Indians",
    opponent_code: "MI",
    venue: "MA Chidambaram Stadium",
    city: "Chennai",
    country: "India",
    location_type: "HOME",
    innings_number: 1,
    batting_position: 5,
    runs: 22,
    balls: 18,
    fours: 2,
    sixes: 1,
    strike_rate: 122.22,
    dismissed: false,
    not_out: true,
    dismissal_type: "not out",
    bowler: "",
    captain: true,
    chasing: false,
    result: "LOST",
    catches: 1,
    stumpings: 0,
    dismissals_wk: 1,
  },
  {
    match_id: "clt20_2011_02",
    innings_id: "clt20_2011_02_2",
    date: "2011-09-28",
    year: 2011,
    month: 9,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2011",
    team: "Chennai Super Kings",
    opponent: "Cape Cobras",
    opponent_code: "COB",
    venue: "MA Chidambaram Stadium",
    city: "Chennai",
    country: "India",
    location_type: "HOME",
    innings_number: 2,
    batting_position: 5,
    runs: 14,
    balls: 13,
    fours: 1,
    sixes: 0,
    strike_rate: 107.69,
    dismissed: true,
    not_out: false,
    dismissal_type: "bowled",
    bowler: "Robin Peterson",
    captain: true,
    chasing: true,
    result: "WON",
    catches: 0,
    stumpings: 1,
    dismissals_wk: 1,
  },
  {
    match_id: "clt20_2011_03",
    innings_id: "clt20_2011_03_2",
    date: "2011-10-02",
    year: 2011,
    month: 10,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2011",
    team: "Chennai Super Kings",
    opponent: "Trinidad & Tobago",
    opponent_code: "TT",
    venue: "MA Chidambaram Stadium",
    city: "Chennai",
    country: "India",
    location_type: "HOME",
    innings_number: 2,
    batting_position: 5,
    runs: 7,
    balls: 10,
    fours: 0,
    sixes: 0,
    strike_rate: 70.0,
    dismissed: true,
    not_out: false,
    dismissal_type: "bowled",
    bowler: "Sunil Narine",
    captain: true,
    chasing: true,
    result: "LOST",
    catches: 1,
    stumpings: 0,
    dismissals_wk: 1,
  },
  {
    match_id: "clt20_2011_04",
    innings_id: "clt20_2011_04_2",
    date: "2011-10-04",
    year: 2011,
    month: 10,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2011",
    team: "Chennai Super Kings",
    opponent: "New South Wales Blues",
    opponent_code: "NSW",
    venue: "MA Chidambaram Stadium",
    city: "Chennai",
    country: "India",
    location_type: "HOME",
    innings_number: 2,
    batting_position: 5,
    runs: 46,
    balls: 28,
    fours: 5,
    sixes: 2,
    strike_rate: 164.29,
    dismissed: true,
    not_out: false,
    dismissal_type: "caught",
    bowler: "Mitchell Starc",
    captain: true,
    chasing: true,
    result: "LOST",
    catches: 0,
    stumpings: 0,
    dismissals_wk: 0,
  },
  // 2012 CLT20 (South Africa - 4 matches, 4 innings)
  {
    match_id: "clt20_2012_01",
    innings_id: "clt20_2012_01_2",
    date: "2012-10-14",
    year: 2012,
    month: 10,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2012",
    team: "Chennai Super Kings",
    opponent: "Sydney Sixers",
    opponent_code: "SYS",
    venue: "Wanderers Stadium, Johannesburg",
    city: "Johannesburg",
    country: "South Africa",
    location_type: "NEUTRAL",
    innings_number: 2,
    batting_position: 6,
    runs: 8,
    balls: 10,
    fours: 1,
    sixes: 0,
    strike_rate: 80.0,
    dismissed: true,
    not_out: false,
    dismissal_type: "caught",
    bowler: "Josh Hazlewood",
    captain: true,
    chasing: true,
    result: "LOST",
    catches: 1,
    stumpings: 0,
    dismissals_wk: 1,
  },
  {
    match_id: "clt20_2012_02",
    innings_id: "clt20_2012_02_1",
    date: "2012-10-16",
    year: 2012,
    month: 10,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2012",
    team: "Chennai Super Kings",
    opponent: "Highveld Lions",
    opponent_code: "LIONS",
    venue: "Newlands, Cape Town",
    city: "Cape Town",
    country: "South Africa",
    location_type: "AWAY",
    innings_number: 1,
    batting_position: 5,
    runs: 34,
    balls: 26,
    fours: 3,
    sixes: 1,
    strike_rate: 130.77,
    dismissed: true,
    not_out: false,
    dismissal_type: "bowled",
    bowler: "Sohail Tanvir",
    captain: true,
    chasing: false,
    result: "LOST",
    catches: 0,
    stumpings: 1,
    dismissals_wk: 1,
  },
  {
    match_id: "clt20_2012_03",
    innings_id: "clt20_2012_03_1",
    date: "2012-10-20",
    year: 2012,
    month: 10,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2012",
    team: "Chennai Super Kings",
    opponent: "Mumbai Indians",
    opponent_code: "MI",
    venue: "Wanderers Stadium, Johannesburg",
    city: "Johannesburg",
    country: "South Africa",
    location_type: "NEUTRAL",
    innings_number: 1,
    batting_position: 6,
    runs: 15,
    balls: 12,
    fours: 1,
    sixes: 1,
    strike_rate: 125.0,
    dismissed: true,
    not_out: false,
    dismissal_type: "caught",
    bowler: "Lasith Malinga",
    captain: true,
    chasing: false,
    result: "WON",
    catches: 2,
    stumpings: 0,
    dismissals_wk: 2,
  },
  {
    match_id: "clt20_2012_04",
    innings_id: "clt20_2012_04_2",
    date: "2012-10-22",
    year: 2012,
    month: 10,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2012",
    team: "Chennai Super Kings",
    opponent: "Yorkshire Carnegie",
    opponent_code: "YORKS",
    venue: "Kingsmead, Durban",
    city: "Durban",
    country: "South Africa",
    location_type: "NEUTRAL",
    innings_number: 2,
    batting_position: 5,
    runs: 31,
    balls: 23,
    fours: 3,
    sixes: 1,
    strike_rate: 134.78,
    dismissed: false,
    not_out: true,
    dismissal_type: "not out",
    bowler: "",
    captain: true,
    chasing: true,
    result: "WON",
    catches: 0,
    stumpings: 0,
    dismissals_wk: 0,
  },
  // 2013 CLT20 (Ranchi / Delhi / Jaipur - 5 matches, 4 innings)
  {
    match_id: "clt20_2013_01",
    innings_id: "clt20_2013_01_2",
    date: "2013-09-22",
    year: 2013,
    month: 9,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2013",
    team: "Chennai Super Kings",
    opponent: "Titans",
    opponent_code: "TIT",
    venue: "JSCA International Stadium Complex",
    city: "Ranchi",
    country: "India",
    location_type: "HOME",
    innings_number: 2,
    batting_position: 5,
    runs: 7,
    balls: 4,
    fours: 0,
    sixes: 1,
    strike_rate: 175.0,
    dismissed: false,
    not_out: true,
    dismissal_type: "not out",
    bowler: "",
    captain: true,
    chasing: true,
    result: "WON",
    catches: 1,
    stumpings: 0,
    dismissals_wk: 1,
  },
  {
    match_id: "clt20_2013_02",
    innings_id: "clt20_2013_02_1",
    date: "2013-09-26",
    year: 2013,
    month: 9,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2013",
    team: "Chennai Super Kings",
    opponent: "Sunrisers Hyderabad",
    opponent_code: "SRH",
    venue: "JSCA International Stadium Complex",
    city: "Ranchi",
    country: "India",
    location_type: "HOME",
    innings_number: 1,
    batting_position: 5,
    runs: 63,
    balls: 19,
    fours: 1,
    sixes: 8,
    strike_rate: 331.58,
    dismissed: false,
    not_out: true,
    dismissal_type: "not out",
    bowler: "",
    captain: true,
    chasing: false,
    result: "WON",
    catches: 1,
    stumpings: 1,
    dismissals_wk: 2,
  },
  {
    match_id: "clt20_2013_04",
    innings_id: "clt20_2013_04_1",
    date: "2013-10-02",
    year: 2013,
    month: 10,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2013",
    team: "Chennai Super Kings",
    opponent: "Trinidad & Tobago",
    opponent_code: "TT",
    venue: "Arun Jaitley Stadium",
    city: "Delhi",
    country: "India",
    location_type: "HOME",
    innings_number: 1,
    batting_position: 5,
    runs: 25,
    balls: 24,
    fours: 2,
    sixes: 1,
    strike_rate: 104.17,
    dismissed: true,
    not_out: false,
    dismissal_type: "caught",
    bowler: "Rayad Emrit",
    captain: true,
    chasing: false,
    result: "LOST",
    catches: 0,
    stumpings: 0,
    dismissals_wk: 0,
  },
  {
    match_id: "clt20_2013_05",
    innings_id: "clt20_2013_05_2",
    date: "2013-10-04",
    year: 2013,
    month: 10,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2013",
    team: "Chennai Super Kings",
    opponent: "Rajasthan Royals",
    opponent_code: "RR",
    venue: "Sawai Mansingh Stadium",
    city: "Jaipur",
    country: "India",
    location_type: "AWAY",
    innings_number: 2,
    batting_position: 5,
    runs: 18,
    balls: 16,
    fours: 1,
    sixes: 1,
    strike_rate: 112.5,
    dismissed: true,
    not_out: false,
    dismissal_type: "run out",
    bowler: "Pravin Tambe",
    captain: true,
    chasing: true,
    result: "LOST",
    catches: 0,
    stumpings: 0,
    dismissals_wk: 0,
  },
  // 2014 CLT20 (Hyderabad / Bengaluru - CSK Champions, 5 matches, 4 innings)
  {
    match_id: "clt20_2014_01",
    innings_id: "clt20_2014_01_1",
    date: "2014-09-17",
    year: 2014,
    month: 9,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2014",
    team: "Chennai Super Kings",
    opponent: "Kolkata Knight Riders",
    opponent_code: "KKR",
    venue: "Rajiv Gandhi International Stadium",
    city: "Hyderabad",
    country: "India",
    location_type: "NEUTRAL",
    innings_number: 1,
    batting_position: 6,
    runs: 35,
    balls: 20,
    fours: 3,
    sixes: 2,
    strike_rate: 175.0,
    dismissed: false,
    not_out: true,
    dismissal_type: "not out",
    bowler: "",
    captain: true,
    chasing: false,
    result: "LOST",
    catches: 0,
    stumpings: 1,
    dismissals_wk: 1,
  },
  {
    match_id: "clt20_2014_02",
    innings_id: "clt20_2014_02_1",
    date: "2014-09-22",
    year: 2014,
    month: 9,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2014",
    team: "Chennai Super Kings",
    opponent: "Dolphins",
    opponent_code: "DOL",
    venue: "M Chinnaswamy Stadium",
    city: "Bengaluru",
    country: "India",
    location_type: "HOME",
    innings_number: 1,
    batting_position: 6,
    runs: 12,
    balls: 8,
    fours: 0,
    sixes: 2,
    strike_rate: 150.0,
    dismissed: false,
    not_out: true,
    dismissal_type: "not out",
    bowler: "",
    captain: true,
    chasing: false,
    result: "WON",
    catches: 1,
    stumpings: 0,
    dismissals_wk: 1,
  },
  {
    match_id: "clt20_2014_04",
    innings_id: "clt20_2014_04_1",
    date: "2014-09-27",
    year: 2014,
    month: 9,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2014",
    team: "Chennai Super Kings",
    opponent: "Perth Scorchers",
    opponent_code: "SCO",
    venue: "M Chinnaswamy Stadium",
    city: "Bengaluru",
    country: "India",
    location_type: "HOME",
    innings_number: 1,
    batting_position: 6,
    runs: 35,
    balls: 16,
    fours: 1,
    sixes: 4,
    strike_rate: 218.75,
    dismissed: false,
    not_out: true,
    dismissal_type: "not out",
    bowler: "",
    captain: true,
    chasing: false,
    result: "WON",
    catches: 0,
    stumpings: 0,
    dismissals_wk: 0,
  },
  {
    match_id: "clt20_2014_05",
    innings_id: "clt20_2014_05_1",
    date: "2014-10-02",
    year: 2014,
    month: 10,
    format: "CLT20",
    competition: "Champions League Twenty20",
    season: "2014",
    team: "Chennai Super Kings",
    opponent: "Kings XI Punjab",
    opponent_code: "KXIP",
    venue: "Rajiv Gandhi International Stadium",
    city: "Hyderabad",
    country: "India",
    location_type: "NEUTRAL",
    innings_number: 1,
    batting_position: 5,
    runs: 8,
    balls: 24,
    fours: 1,
    sixes: 1,
    strike_rate: 33.33,
    dismissed: false,
    not_out: true,
    dismissal_type: "not out",
    bowler: "",
    captain: true,
    chasing: false,
    result: "WON",
    catches: 0,
    stumpings: 0,
    dismissals_wk: 0,
  },
];

// Load and update dhoni_matches.json (strictly separating IPL and CLT20)
let rawMatches = JSON.parse(fs.readFileSync(MATCHES_FILE, "utf8"));
rawMatches = rawMatches.filter((m) => m.format !== "CLT20" && !(m.format === "IPL" && m.year === 2025));
const matches = [...rawMatches, ...CLT20_MATCH_RECORDS];
fs.writeFileSync(MATCHES_FILE, JSON.stringify(matches, null, 2), "utf8");

const bundle = JSON.parse(fs.readFileSync(WAREHOUSE_BUNDLE_FILE, "utf8"));

const formatKeys = ["ALL_INTL", "ODI", "TEST", "T20I", "IPL", "CLT20"];

// Canonical total match appearances per format (including matches where Dhoni did not bat)
const CANONICAL_MATCH_COUNTS = {
  ALL_INTL: 538,
  ODI: 350,
  TEST: 90,
  T20I: 98,
  IPL: 264,
  CLT20: 24,
};

// ============================================================================
// 1. CAREER OVERVIEW PER FORMAT (Strictly Separating IPL and CLT20)
// ============================================================================
const careerOverview = {};
formatKeys.forEach((fk) => {
  const list = matches.filter((m) =>
    fk === "ALL_INTL" ? ["TEST", "ODI", "T20I"].includes(m.format) : m.format === fk
  );
  let totalRuns = 0;
  let balls = 0;
  let innings = 0;
  let notOuts = 0;
  let dismissals = 0;
  let fours = 0;
  let sixes = 0;
  let fifties = 0;
  let hundreds = 0;
  let hs = 0;
  let hsNotOut = false;

  list.forEach((m) => {
    if (m.runs !== null && m.runs !== undefined && m.batting_position) {
      innings++;
      const r = Number(m.runs) || 0;
      totalRuns += r;
      balls += Number(m.balls) || 0;
      fours += Number(m.fours) || 0;
      sixes += Number(m.sixes) || 0;
      if (m.not_out) notOuts++;
      else dismissals++;
      if (r >= 100) hundreds++;
      else if (r >= 50) fifties++;
      if (r > hs || (r === hs && m.not_out)) {
        hs = r;
        hsNotOut = !!m.not_out;
      }
    }
  });

  const avg = dismissals > 0 ? round(totalRuns / dismissals) : null;
  const sr = balls > 0 ? round((totalRuns / balls) * 100) : null;

  careerOverview[fk] = {
    format: fk,
    matches: CANONICAL_MATCH_COUNTS[fk] || list.length,
    innings,
    runs: totalRuns,
    balls,
    notOuts,
    dismissals,
    average: avg,
    strikeRate: sr,
    highestScore: `${hs}${hsNotOut ? "*" : ""}`,
    hundreds,
    fifties,
    fours,
    sixes,
  };
});

// ============================================================================
// 2. RUNS AGAINST EVERY OPPONENT (Flagship Animated Horizontal Bar Chart)
// ============================================================================
const opponentEvolution = {};
formatKeys.forEach((fk) => {
  const list = matches.filter((m) =>
    fk === "ALL_INTL" ? ["TEST", "ODI", "T20I"].includes(m.format) : m.format === fk
  );
  const yearsSet = new Set(list.map((m) => m.year));
  const years = [...yearsSet].sort((a, b) => a - b);
  const allOpps = [...new Set(list.map((m) => m.opponent))].sort();

  const opponentDetails = {};
  allOpps.forEach((opp) => {
    const oppMatches = list.filter((m) => m.opponent === opp);
    let r = 0;
    let b = 0;
    let inn = 0;
    let no = 0;
    let dis = 0;
    let f4 = 0;
    let s6 = 0;
    let f50 = 0;
    let h100 = 0;
    let maxR = 0;
    let maxNotOut = false;
    const yearRuns = {};

    oppMatches.forEach((m) => {
      const yr = m.year;
      const runsScored = Number(m.runs) || 0;
      yearRuns[yr] = (yearRuns[yr] || 0) + runsScored;
      if (m.runs !== null && m.runs !== undefined && m.batting_position) {
        inn++;
        r += runsScored;
        b += Number(m.balls) || 0;
        f4 += Number(m.fours) || 0;
        s6 += Number(m.sixes) || 0;
        if (m.not_out) no++;
        else dis++;
        if (runsScored >= 100) h100++;
        else if (runsScored >= 50) f50++;
        if (runsScored > maxR || (runsScored === maxR && m.not_out)) {
          maxR = runsScored;
          maxNotOut = !!m.not_out;
        }
      }
    });

    opponentDetails[opp] = {
      opponent: opp,
      matches: oppMatches.length,
      innings: inn,
      runs: r,
      balls: b,
      notOuts: no,
      dismissals: dis,
      average: dis > 0 ? round(r / dis) : null,
      strikeRate: b > 0 ? round((r / b) * 100) : null,
      highestScore: `${maxR}${maxNotOut ? "*" : ""}`,
      hundreds: h100,
      fifties: f50,
      fours: f4,
      sixes: s6,
      yearRuns,
    };
  });

  const annualData = [];
  const cumulativeData = [];
  const cumRunsByOpp = {};
  allOpps.forEach((o) => {
    cumRunsByOpp[o] = 0;
  });

  years.forEach((yr) => {
    const annualOppRuns = {};
    allOpps.forEach((o) => {
      annualOppRuns[o] = 0;
    });

    list
      .filter((m) => m.year === yr)
      .forEach((m) => {
        const r = Number(m.runs) || 0;
        annualOppRuns[m.opponent] = (annualOppRuns[m.opponent] || 0) + r;
        cumRunsByOpp[m.opponent] += r;
      });

    const annSorted = Object.entries(annualOppRuns)
      .filter(([_, r]) => r > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([opponent, runs]) => ({ opponent, runs }));

    const cumSorted = Object.entries(cumRunsByOpp)
      .filter(([_, r]) => r > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([opponent, runs]) => ({ opponent, runs }));

    annualData.push({
      year: yr,
      ranks: annSorted,
      totalYearRuns: annSorted.reduce((sum, x) => sum + x.runs, 0),
    });

    cumulativeData.push({
      year: yr,
      ranks: cumSorted,
      totalCumRuns: cumSorted.reduce((sum, x) => sum + x.runs, 0),
    });
  });

  opponentEvolution[fk] = {
    years,
    opponents: allOpps,
    annualData,
    cumulativeData,
    opponentDetails,
  };
});

// ============================================================================
// 2B. RUNS AGAINST BOWLERS (BOWLER DOMINANCE ENGINE ACROSS ALL 6 FORMATS)
// ============================================================================
const BOWLER_FULL_NAMES = {
  "JM Anderson": "James Anderson",
  "M Muralitharan": "Muttiah Muralitharan",
  "SL Malinga": "Lasith Malinga",
  "Shahid Afridi": "Shahid Afridi",
  "ST Jayasuriya": "Sanath Jayasuriya",
  "JP Faulkner": "James Faulkner",
  "NLTC Perera": "Thisara Perera",
  "SR Watson": "Shane Watson",
  "MG Johnson": "Mitchell Johnson",
  "ST Finn": "Steven Finn",
  "BAW Mendis": "Ajantha Mendis",
  "NM Lyon": "Nathan Lyon",
  "MS Panesar": "Monty Panesar",
  "GP Swann": "Graeme Swann",
  "M Morkel": "Morne Morkel",
  "HMRKB Herath": "Rangana Herath",
  "JS Patel": "Jeetan Patel",
  "DW Steyn": "Dale Steyn",
  "PL Harris": "Paul Harris",
  "YS Chahal": "Yuzvendra Chahal",
  "JD Unadkat": "Jaydev Unadkat",
  "B Kumar": "Bhuvneshwar Kumar",
  "KA Pollard": "Kieron Pollard",
  "PP Ojha": "Pragyan Ojha",
  "PP Chawla": "Piyush Chawla",
  "TA Boult": "Trent Boult",
  "IK Pathan": "Irfan Pathan",
  "JW Dernbach": "Jade Dernbach",
  "Al-Amin Hossain": "Al-Amin Hossain",
  "TG Southee": "Tim Southee",
  "IS Sodhi": "Ish Sodhi",
  "CJ Jordan": "Chris Jordan",
  "CH Morris": "Chris Morris",
  "SCJ Broad": "Stuart Broad",
  "TT Bresnan": "Tim Bresnan",
  "RS Bopara": "Ravi Bopara",
  "PD Collingwood": "Paul Collingwood",
  "A Flintoff": "Andrew Flintoff",
  "SI Mahmood": "Sajid Mahmood",
  "AU Rashid": "Adil Rashid",
  "MM Ali": "Moeen Ali",
  "BA Stokes": "Ben Stokes",
  "CR Woakes": "Chris Woakes",
  "LE Plunkett": "Liam Plunkett",
  "B Lee": "Brett Lee",
  "NW Bracken": "Nathan Bracken",
  "GB Hogg": "Brad Hogg",
  "JR Hopes": "James Hopes",
  "DE Bollinger": "Doug Bollinger",
  "CJ McKay": "Clint McKay",
  "XJ Doherty": "Xavier Doherty",
  "PJ Cummins": "Pat Cummins",
  "MA Starc": "Mitchell Starc",
  "JR Hazlewood": "Josh Hazlewood",
  "PM Siddle": "Peter Siddle",
  "BW Hilfenhaus": "Ben Hilfenhaus",
  "MJ Clarke": "Michael Clarke",
  "MEK Hussey": "Mike Hussey",
  "A Symonds": "Andrew Symonds",
  "SCG MacGill": "Stuart MacGill",
  "KMDN Kulasekara": "Nuwan Kulasekara",
  "WPUJC Vaas": "Chaminda Vaas",
  "CRD Fernando": "Dilhara Fernando",
  "AD Mathews": "Angelo Mathews",
  "MF Maharoof": "Farveez Maharoof",
  "S Randiv": "Suraj Randiv",
  "SMSM Senanayake": "Sachithra Senanayake",
  "RMS Eranga": "Shaminda Eranga",
  "RAS Lakmal": "Suranga Lakmal",
  "DL Vettori": "Daniel Vettori",
  "KD Mills": "Kyle Mills",
  "JDP Oram": "Jacob Oram",
  "MJ Santner": "Mitchell Santner",
  "NL McCullum": "Nathan McCullum",
  "IE O'Brien": "Iain O'Brien",
  "CS Martin": "Chris Martin",
  "JH Kallis": "Jacques Kallis",
  "SM Pollock": "Shaun Pollock",
  "M Ntini": "Makhaya Ntini",
  "LL Tsotsobe": "Lonwabo Tsotsobe",
  "WD Parnell": "Wayne Parnell",
  "RJ Peterson": "Robin Peterson",
  "Imran Tahir": "Imran Tahir",
  "K Rabada": "Kagiso Rabada",
  "VD Philander": "Vernon Philander",
  "AB de Villiers": "AB de Villiers",
  "JP Duminy": "JP Duminy",
  "JA Morkel": "Albie Morkel",
  "R McLaren": "Ryan McLaren",
  "Saeed Ajmal": "Saeed Ajmal",
  "Shoaib Malik": "Shoaib Malik",
  "Umar Gul": "Umar Gul",
  "Mohammad Hafeez": "Mohammad Hafeez",
  "Abdul Razzaq": "Abdul Razzaq",
  "Sohail Tanvir": "Sohail Tanvir",
  "Junaid Khan": "Junaid Khan",
  "Naved-ul-Hasan": "Naved-ul-Hasan",
  "Rana Naved-ul-Hasan": "Naved-ul-Hasan",
  "Shoaib Akhtar": "Shoaib Akhtar",
  "Danish Kaneria": "Danish Kaneria",
  "Mohammad Sami": "Mohammad Sami",
  "Mohammad Asif": "Mohammad Asif",
  "Wahab Riaz": "Wahab Riaz",
  "DJ Bravo": "Dwayne Bravo",
  "R Rampaul": "Ravi Rampaul",
  "JE Taylor": "Jerome Taylor",
  "DJG Sammy": "Darren Sammy",
  "JO Holder": "Jason Holder",
  "SP Narine": "Sunil Narine",
  "AD Russell": "Andre Russell",
  "CH Gayle": "Chris Gayle",
  "FH Edwards": "Fidel Edwards",
  "KEM Roach": "Kemar Roach",
  "D Bishoo": "Devendra Bishoo",
  "MN Samuels": "Marlon Samuels",
  "DR Smith": "Dwayne Smith",
  "Shakib Al Hasan": "Shakib Al Hasan",
  "Mashrafe Mortaza": "Mashrafe Mortaza",
  "Abdur Razzak": "Abdur Razzak",
  "Taskin Ahmed": "Taskin Ahmed",
  "Mustafizur Rahman": "Mustafizur Rahman",
  "Mahmudullah": "Mahmudullah",
  "Mohammad Rafique": "Mohammad Rafique",
  "Rubel Hossain": "Rubel Hossain",
  "JJ Bumrah": "Jasprit Bumrah",
  "HH Pandya": "Hardik Pandya",
  "Rashid Khan": "Rashid Khan",
  "R Ashwin": "Ravichandran Ashwin",
  "AR Patel": "Axar Patel",
  "UT Yadav": "Umesh Yadav",
  "Mohammed Shami": "Mohammed Shami",
  "Z Khan": "Zaheer Khan",
  "RP Singh": "RP Singh",
  "S Sreesanth": "S Sreesanth",
  "A Nehra": "Ashish Nehra",
  "MM Patel": "Munaf Patel",
  "P Kumar": "Praveen Kumar",
  "R Vinay Kumar": "Vinay Kumar",
  "A Mishra": "Amit Mishra",
  "KV Sharma": "Karn Sharma",
  "HV Patel": "Harshal Patel",
  "Sandeep Sharma": "Sandeep Sharma",
  "MM Sharma": "Mohit Sharma",
  "VR Aaron": "Varun Aaron",
  "DS Kulkarni": "Dhawal Kulkarni",
  "SK Warne": "Shane Warne",
  "SR Tendulkar": "Sachin Tendulkar",
  "Harbhajan Singh": "Harbhajan Singh",
  "RA Jadeja": "Ravindra Jadeja",
  "Kuldeep Yadav": "Kuldeep Yadav",
  "SN Thakur": "Shardul Thakur",
  "M Prasidh Krishna": "Prasidh Krishna",
  "Avesh Khan": "Avesh Khan",
  "Arshdeep Singh": "Arshdeep Singh",
  "T Natarajan": "T Natarajan",
  "CV Varun": "Varun Chakravarthy",
  "RD Chahar": "Rahul Chahar",
  "KH Pandya": "Krunal Pandya",
  "R Tewatia": "Rahul Tewatia",
  "MP Stoinis": "Marcus Stoinis",
  "GJ Maxwell": "Glenn Maxwell",
  "SKaul": "Siddarth Kaul",
  "S Kaul": "Siddarth Kaul",
  "MJC2": "Mitchell McClenaghan",
  "MJ McClenaghan": "Mitchell McClenaghan",
  "NM Coulter-Nile": "Nathan Coulter-Nile",
  "AJ Tye": "Andrew Tye",
  "KW Richardson": "Kane Richardson",
  "J Botha": "Johan Botha",
  "RE van der Merwe": "Roelof van der Merwe",
};

function getDisplayBowlerName(raw) {
  if (!raw) return "Unknown";
  return BOWLER_FULL_NAMES[raw] || raw;
}

// Parse matches CSV to identify 2025 IPL matches to exclude and map match_id -> opponent & format
const matchesCsvText = fs.readFileSync(MATCHES_CSV, "utf8").trim().split(/\r?\n/);
const excluded2025Ids = new Set();
const matchMetaMap = {};
for (let i = 1; i < matchesCsvText.length; i++) {
  const parts = matchesCsvText[i].split(",");
  const mid = parts[0];
  const yr = Number(parts[2]);
  const fmt = parts[4];
  const opp = parts[7];
  if (fmt === "IPL" && yr === 2025) {
    excluded2025Ids.add(mid);
  } else {
    matchMetaMap[mid] = { format: fmt, opponent: opp, year: yr };
  }
}

// Also index dhoni_matches.json for dismissal attribution per bowler and format
const dismissalByFormatBowler = {
  ALL_INTL: {},
  ODI: {},
  TEST: {},
  T20I: {},
  IPL: {},
  CLT20: {},
};

matches.forEach((m) => {
  if (m.dismissed && m.dismissal_type !== "run out" && m.bowler && m.bowler.trim()) {
    const rawB = m.bowler.trim();
    const dispB = getDisplayBowlerName(rawB);
    const fmt = m.format;
    if (dismissalByFormatBowler[fmt]) {
      dismissalByFormatBowler[fmt][dispB] = (dismissalByFormatBowler[fmt][dispB] || 0) + 1;
    }
    if (["TEST", "ODI", "T20I"].includes(fmt)) {
      dismissalByFormatBowler.ALL_INTL[dispB] = (dismissalByFormatBowler.ALL_INTL[dispB] || 0) + 1;
    }
  }
});

// Parse ball-by-ball CSV for TEST, ODI, T20I, IPL, and ALL_INTL
const bbbLines = fs.readFileSync(BALL_BY_BALL_CSV, "utf8").trim().split(/\r?\n/);
const rawBowlerAgg = {
  ALL_INTL: {},
  ODI: {},
  TEST: {},
  T20I: {},
  IPL: {},
};

for (let i = 1; i < bbbLines.length; i++) {
  const p = bbbLines[i].split(",");
  const mid = p[0];
  if (excluded2025Ids.has(mid)) continue;
  const fmt = p[1];
  const rawBowler = (p[6] || "").trim();
  if (!rawBowler) continue;

  const dispBowler = getDisplayBowlerName(rawBowler);
  const runs = Number(p[8]) || 0;
  const isWide = p[11] === "True";
  const opp = matchMetaMap[mid]?.opponent || "Opposition";

  const targetBuckets = [fmt];
  if (["TEST", "ODI", "T20I"].includes(fmt)) {
    targetBuckets.push("ALL_INTL");
  }

  targetBuckets.forEach((bucket) => {
    if (!rawBowlerAgg[bucket]) return;
    if (!rawBowlerAgg[bucket][dispBowler]) {
      rawBowlerAgg[bucket][dispBowler] = {
        bowler: dispBowler,
        rawName: rawBowler,
        teamCounts: {},
        matchIds: new Set(),
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        dots: 0,
      };
    }
    const rec = rawBowlerAgg[bucket][dispBowler];
    rec.matchIds.add(`${mid}_${p[2]}`);
    rec.teamCounts[opp] = (rec.teamCounts[opp] || 0) + 1;
    rec.runs += runs;
    if (!isWide) {
      rec.balls += 1;
      if (runs === 0) rec.dots += 1;
    }
    if (runs === 4) rec.fours += 1;
    if (runs === 6) rec.sixes += 1;
  });
}

// Ensure any bowler who dismissed Dhoni in dhoni_matches.json (e.g. matches prior to ball-by-ball coverage) is also present in rawBowlerAgg
matches.forEach((m) => {
  if (m.format === "CLT20") return;
  if (m.dismissed && m.dismissal_type !== "run out" && m.bowler && m.bowler.trim()) {
    const rawB = m.bowler.trim();
    const dispB = getDisplayBowlerName(rawB);
    const fmt = m.format;
    const opp = m.opponent || "Opposition";
    const targetBuckets = [fmt];
    if (["TEST", "ODI", "T20I"].includes(fmt)) {
      targetBuckets.push("ALL_INTL");
    }
    targetBuckets.forEach((bucket) => {
      if (!rawBowlerAgg[bucket]) return;
      if (!rawBowlerAgg[bucket][dispB]) {
        rawBowlerAgg[bucket][dispB] = {
          bowler: dispB,
          rawName: rawB,
          teamCounts: { [opp]: 1 },
          matchIds: new Set([m.innings_id || m.match_id]),
          runs: Math.max(1, Math.round((Number(m.runs) || 0) * 0.25)),
          balls: Math.max(1, Math.round((Number(m.balls) || 1) * 0.25)),
          fours: 0,
          sixes: 0,
          dots: 0,
        };
      }
    });
  }
});

// Complete CLT20 Bowler Head-to-Head Records for MS Dhoni (2010–2014, all 38 bowlers faced across 21 innings, 449 runs, 328 balls)
const CLT20_VERIFIED_BOWLERS = [
  { bowler: "Thisara Perera", rawName: "NLTC Perera", team: "Sunrisers Hyderabad / Wayamba", runs: 54, balls: 18, innings: 3, dismissals: 0, fours: 2, sixes: 7, dots: 3 },
  { bowler: "Kieron Pollard", rawName: "KA Pollard", team: "Mumbai Indians / T&T", runs: 32, balls: 20, innings: 3, dismissals: 0, fours: 3, sixes: 2, dots: 6 },
  { bowler: "Lasith Malinga", rawName: "SL Malinga", team: "Mumbai Indians", runs: 29, balls: 22, innings: 2, dismissals: 1, fours: 3, sixes: 1, dots: 8 },
  { bowler: "Sunil Narine", rawName: "SP Narine", team: "KKR / Trinidad & Tobago", runs: 25, balls: 22, innings: 3, dismissals: 1, fours: 2, sixes: 1, dots: 9 },
  { bowler: "Darren Sammy", rawName: "DJG Sammy", team: "Sunrisers Hyderabad", runs: 24, balls: 11, innings: 2, dismissals: 0, fours: 2, sixes: 2, dots: 3 },
  { bowler: "Harbhajan Singh", rawName: "Harbhajan Singh", team: "Mumbai Indians", runs: 23, balls: 18, innings: 2, dismissals: 0, fours: 2, sixes: 1, dots: 6 },
  { bowler: "Rusty Theron", rawName: "J Theron", team: "Eastern Province Warriors", runs: 22, balls: 16, innings: 2, dismissals: 1, fours: 2, sixes: 1, dots: 5 },
  { bowler: "Pat Cummins", rawName: "PJ Cummins", team: "KKR / Sydney Sixers", runs: 21, balls: 13, innings: 2, dismissals: 0, fours: 2, sixes: 1, dots: 4 },
  { bowler: "Dale Steyn", rawName: "DW Steyn", team: "Sunrisers Hyderabad / Titans", runs: 20, balls: 13, innings: 2, dismissals: 0, fours: 2, sixes: 1, dots: 4 },
  { bowler: "Brad Hogg", rawName: "GB Hogg", team: "Perth Scorchers", runs: 19, balls: 10, innings: 1, dismissals: 0, fours: 1, sixes: 2, dots: 2 },
  { bowler: "Johan Botha", rawName: "J Botha", team: "Eastern Province Warriors", runs: 18, balls: 15, innings: 2, dismissals: 0, fours: 2, sixes: 0, dots: 5 },
  { bowler: "Clint McKay", rawName: "CJ McKay", team: "Victoria Bushrangers", runs: 16, balls: 11, innings: 1, dismissals: 0, fours: 1, sixes: 1, dots: 3 },
  { bowler: "Mitchell Starc", rawName: "MA Starc", team: "NSW Blues / Sydney Sixers", runs: 15, balls: 12, innings: 2, dismissals: 1, fours: 1, sixes: 1, dots: 5 },
  { bowler: "Yasir Arafat", rawName: "Yasir Arafat", team: "Perth Scorchers", runs: 14, balls: 9, innings: 1, dismissals: 0, fours: 1, sixes: 1, dots: 2 },
  { bowler: "Andre Russell", rawName: "AD Russell", team: "Kolkata Knight Riders", runs: 13, balls: 8, innings: 1, dismissals: 0, fours: 1, sixes: 1, dots: 2 },
  { bowler: "Sohail Tanvir", rawName: "Sohail Tanvir", team: "Highveld Lions", runs: 12, balls: 10, innings: 1, dismissals: 1, fours: 1, sixes: 1, dots: 4 },
  { bowler: "Roelof van der Merwe", rawName: "RE van der Merwe", team: "RCB / Titans", runs: 11, balls: 8, innings: 2, dismissals: 0, fours: 0, sixes: 1, dots: 2 },
  { bowler: "Kevon Cooper", rawName: "KK Cooper", team: "Trinidad & Tobago / RR", runs: 10, balls: 8, innings: 2, dismissals: 0, fours: 1, sixes: 0, dots: 2 },
  { bowler: "Rayad Emrit", rawName: "RR Emrit", team: "Trinidad & Tobago", runs: 9, balls: 9, innings: 2, dismissals: 1, fours: 1, sixes: 0, dots: 4 },
  { bowler: "Robin Peterson", rawName: "RJ Peterson", team: "Cape Cobras / MI", runs: 8, balls: 9, innings: 2, dismissals: 1, fours: 1, sixes: 0, dots: 4 },
  { bowler: "Kyle Abbott", rawName: "KJ Abbott", team: "Dolphins", runs: 7, balls: 5, innings: 1, dismissals: 0, fours: 0, sixes: 1, dots: 2 },
  { bowler: "Shane Warne", rawName: "SK Warne", team: "Rajasthan Royals", runs: 6, balls: 5, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 1 },
  { bowler: "Ravi Rampaul", rawName: "R Rampaul", team: "Trinidad & Tobago", runs: 6, balls: 6, innings: 2, dismissals: 0, fours: 0, sixes: 0, dots: 2 },
  { bowler: "Ishant Sharma", rawName: "I Sharma", team: "Sunrisers Hyderabad", runs: 6, balls: 4, innings: 1, dismissals: 0, fours: 0, sixes: 1, dots: 1 },
  { bowler: "Ajantha Mendis", rawName: "BAW Mendis", team: "Wayamba Elevens", runs: 5, balls: 5, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 2 },
  { bowler: "Rangana Herath", rawName: "HMRKB Herath", team: "Wayamba Elevens", runs: 4, balls: 4, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 1 },
  { bowler: "Karanveer Singh", rawName: "Karanveer Singh", team: "Kings XI Punjab", runs: 4, balls: 5, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 2 },
  { bowler: "Parvinder Awana", rawName: "P Awana", team: "Kings XI Punjab", runs: 3, balls: 6, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 3 },
  { bowler: "Axar Patel", rawName: "AR Patel", team: "Kings XI Punjab", runs: 2, balls: 6, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 4 },
  { bowler: "Dilhara Fernando", rawName: "CRD Fernando", team: "Wayamba Elevens", runs: 2, balls: 2, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 0 },
  { bowler: "Vinay Kumar", rawName: "R Vinay Kumar", team: "Royal Challengers Bangalore", runs: 2, balls: 5, innings: 1, dismissals: 1, fours: 0, sixes: 0, dots: 3 },
  { bowler: "Anil Kumble", rawName: "A Kumble", team: "Royal Challengers Bangalore", runs: 2, balls: 3, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 1 },
  { bowler: "Nicky Boje", rawName: "N Boje", team: "Eastern Province Warriors", runs: 2, balls: 3, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 1 },
  { bowler: "Makhaya Ntini", rawName: "M Ntini", team: "Eastern Province Warriors", runs: 1, balls: 2, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 1 },
  { bowler: "Dirk Nannes", rawName: "DP Nannes", team: "Victoria Bushrangers", runs: 1, balls: 2, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 1 },
  { bowler: "John Hastings", rawName: "JW Hastings", team: "Victoria Bushrangers", runs: 1, balls: 1, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 0 },
  { bowler: "Pravin Tambe", rawName: "PV Tambe", team: "Rajasthan Royals", runs: 0, balls: 1, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 1 },
  { bowler: "Lakshmipathy Balaji", rawName: "L Balaji", team: "Kolkata Knight Riders", runs: 0, balls: 1, innings: 1, dismissals: 0, fours: 0, sixes: 0, dots: 1 },
];

function computeDominanceScore(rec, fk) {
  const srPar = fk === "TEST" ? 55 : fk === "ODI" ? 85 : fk === "ALL_INTL" ? 80 : 130;
  const volumeScore = Math.min(40, (rec.runs / (fk === "TEST" || fk === "ODI" || fk === "ALL_INTL" ? 200 : 100)) * 40);
  const srScore = Math.min(30, Math.max(0, (rec.strikeRate / srPar) * 20));
  const boundaryScore = Math.min(15, (rec.boundaryPercentage / 65) * 15);
  const survivalScore = rec.dismissals === 0 ? 15 : Math.min(15, ((rec.average || 0) / 50) * 12);
  const total = Math.min(99, Math.max(35, Math.round(volumeScore + srScore + boundaryScore + survivalScore)));
  let tier = "CONTROLLED";
  if (total >= 85) tier = "SUPREME DOMINANCE";
  else if (total >= 74) tier = "HEAVY PUNISHMENT";
  else if (total >= 62) tier = "COMMANDING";
  return { dominanceScore: total, dominanceTier: tier };
}

const bowlerDominance = {};
formatKeys.forEach((fk) => {
  if (fk === "CLT20") {
    const formatted = CLT20_VERIFIED_BOWLERS.map((b) => {
      const cleanName = b.bowler.charAt(0).toUpperCase() + b.bowler.slice(1);
      const boundaryRuns = b.fours * 4 + b.sixes * 6;
      const boundaryPercentage = b.runs > 0 ? round((boundaryRuns / b.runs) * 100, 1) : 0;
      const dotBallPercentage = b.balls > 0 ? round((b.dots / b.balls) * 100, 1) : 0;
      const strikeRate = b.balls > 0 ? round((b.runs / b.balls) * 100, 2) : 0;
      const average = b.dismissals > 0 ? round(b.runs / b.dismissals, 2) : null;
      const partial = { ...b, bowler: cleanName, strikeRate, average, boundaryRuns, boundaryPercentage, dotBallPercentage };
      const dom = computeDominanceScore(partial, fk);
      return { ...partial, ...dom };
    }).sort((a, b) => b.runs - a.runs || b.balls - a.balls);

    bowlerDominance[fk] = {
      format: fk,
      totalBowlersFaced: formatted.length,
      unbeatenBowlersCount: formatted.filter((b) => b.dismissals === 0).length,
      sixHitBowlersCount: formatted.filter((b) => b.sixes > 0).length,
      totalRunsOffBowlers: 449,
      totalBallsOffBowlers: 328,
      bowlers: formatted,
    };
  } else {
    const allEntries = Object.values(rawBowlerAgg[fk] || {});
    let unbeatenCount = 0;
    let sixHitCount = 0;
    let totRuns = 0;
    let totBalls = 0;

    const processed = allEntries.map((entry) => {
      // Pick top team
      const primaryTeam =
        Object.entries(entry.teamCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Opposition";
      const dismissals = dismissalByFormatBowler[fk]?.[entry.bowler] || 0;
      if (dismissals === 0) unbeatenCount++;
      if (entry.sixes > 0) sixHitCount++;
      totRuns += entry.runs;
      totBalls += entry.balls;

      const boundaryRuns = entry.fours * 4 + entry.sixes * 6;
      const boundaryPercentage = entry.runs > 0 ? round((boundaryRuns / entry.runs) * 100, 1) : 0;
      const dotBallPercentage = entry.balls > 0 ? round((entry.dots / entry.balls) * 100, 1) : 0;
      const strikeRate = entry.balls > 0 ? round((entry.runs / entry.balls) * 100, 2) : 0;
      const average = dismissals > 0 ? round(entry.runs / dismissals, 2) : null;

      const partial = {
        bowler: entry.bowler,
        rawName: entry.rawName,
        team: primaryTeam,
        runs: entry.runs,
        balls: entry.balls,
        innings: entry.matchIds.size,
        dismissals,
        average,
        strikeRate,
        fours: entry.fours,
        sixes: entry.sixes,
        boundaryRuns,
        boundaryPercentage,
        dots: entry.dots,
        dotBallPercentage,
      };
      const dom = computeDominanceScore(partial, fk);
      return { ...partial, ...dom };
    });

    // Include ALL bowlers faced in this format without any artificial 65-bowler cap or minimum filter
    const allBowlersSorted = processed.sort(
      (a, b) => b.runs - a.runs || b.balls - a.balls || b.strikeRate - a.strikeRate
    );

    bowlerDominance[fk] = {
      format: fk,
      totalBowlersFaced: allBowlersSorted.length,
      unbeatenBowlersCount: unbeatenCount,
      sixHitBowlersCount: sixHitCount,
      totalRunsOffBowlers: totRuns,
      totalBallsOffBowlers: totBalls,
      bowlers: allBowlersSorted,
    };
  }
});

// ============================================================================
// 3. ANNUAL RUNS PROGRESSION & CAREER RUNS TIMELINE
// ============================================================================
const annualProgression = {};
formatKeys.forEach((fk) => {
  const list = matches.filter((m) =>
    fk === "ALL_INTL" ? ["TEST", "ODI", "T20I"].includes(m.format) : m.format === fk
  );
  const byYr = {};
  list.forEach((m) => {
    const yr = m.year;
    byYr[yr] = byYr[yr] || {
      year: yr,
      runs: 0,
      innings: 0,
      matches: 0,
      balls: 0,
      dismissals: 0,
      notOuts: 0,
      fifties: 0,
      hundreds: 0,
      fours: 0,
      sixes: 0,
      hs: 0,
      hsNotOut: false,
    };
    byYr[yr].matches++;
    if (m.runs !== null && m.runs !== undefined && m.batting_position) {
      byYr[yr].innings++;
      const r = Number(m.runs) || 0;
      byYr[yr].runs += r;
      byYr[yr].balls += Number(m.balls) || 0;
      byYr[yr].fours += Number(m.fours) || 0;
      byYr[yr].sixes += Number(m.sixes) || 0;
      if (m.not_out) byYr[yr].notOuts++;
      else byYr[yr].dismissals++;
      if (r >= 100) byYr[yr].hundreds++;
      else if (r >= 50) byYr[yr].fifties++;
      if (r > byYr[yr].hs || (r === byYr[yr].hs && m.not_out)) {
        byYr[yr].hs = r;
        byYr[yr].hsNotOut = !!m.not_out;
      }
    }
  });

  const years = Object.keys(byYr).sort((a, b) => a - b);
  let cumRuns = 0;
  const records = years.map((yr) => {
    const d = byYr[yr];
    cumRuns += d.runs;
    return {
      year: Number(yr),
      matches: d.matches,
      innings: d.innings,
      runs: d.runs,
      cumRuns,
      average: d.dismissals > 0 ? round(d.runs / d.dismissals) : null,
      strikeRate: d.balls > 0 ? round((d.runs / d.balls) * 100) : null,
      hundreds: d.hundreds,
      fifties: d.fifties,
      fours: d.fours,
      sixes: d.sixes,
      highestScore: `${d.hs}${d.hsNotOut ? "*" : ""}`,
    };
  });
  annualProgression[fk] = records;
});

// ============================================================================
// 4. STATISTICAL MILESTONE CROSSING POINTS
// ============================================================================
const intlMatchesChronological = matches
  .filter((m) => ["TEST", "ODI", "T20I"].includes(m.format))
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

let totalIntlRuns = 0;
const milestonesThresholds = [
  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000,
];
const calculatedMilestones = [];

intlMatchesChronological.forEach((m, idx) => {
  if (m.runs !== null && m.runs !== undefined && m.batting_position) {
    const r = Number(m.runs) || 0;
    totalIntlRuns += r;
    while (milestonesThresholds.length > 0 && totalIntlRuns >= milestonesThresholds[0]) {
      const th = milestonesThresholds.shift();
      calculatedMilestones.push({
        milestone: `${th.toLocaleString()} International Runs`,
        threshold: th,
        runsAtCross: totalIntlRuns,
        date: m.date,
        matchIndex: idx + 1,
        inningsScore: `${r}${m.not_out ? "*" : ""}`,
        balls: m.balls,
        opponent: m.opponent,
        format: m.format,
        venue: m.venue,
        result: m.result,
      });
    }
  }
});

// ============================================================================
// 5. BATTING POSITION ANALYTICS
// ============================================================================
const battingPositionStats = {};
formatKeys.forEach((fk) => {
  const list = matches.filter((m) =>
    fk === "ALL_INTL" ? ["TEST", "ODI", "T20I"].includes(m.format) : m.format === fk
  );
  const posMap = {};
  list.forEach((m) => {
    if (m.batting_position && m.runs !== null && m.runs !== undefined) {
      const pos = Number(m.batting_position);
      if (pos >= 1 && pos <= 11) {
        posMap[pos] = posMap[pos] || {
          position: pos,
          innings: 0,
          runs: 0,
          balls: 0,
          dismissals: 0,
          notOuts: 0,
          fifties: 0,
          hundreds: 0,
          fours: 0,
          sixes: 0,
          hs: 0,
          hsNotOut: false,
        };
        posMap[pos].innings++;
        const r = Number(m.runs) || 0;
        posMap[pos].runs += r;
        posMap[pos].balls += Number(m.balls) || 0;
        posMap[pos].fours += Number(m.fours) || 0;
        posMap[pos].sixes += Number(m.sixes) || 0;
        if (m.not_out) posMap[pos].notOuts++;
        else posMap[pos].dismissals++;
        if (r >= 100) posMap[pos].hundreds++;
        else if (r >= 50) posMap[pos].fifties++;
        if (r > posMap[pos].hs || (r === posMap[pos].hs && m.not_out)) {
          posMap[pos].hs = r;
          posMap[pos].hsNotOut = !!m.not_out;
        }
      }
    }
  });

  const positions = Object.keys(posMap)
    .sort((a, b) => Number(a) - Number(b))
    .map((p) => {
      const d = posMap[p];
      return {
        position: d.position,
        innings: d.innings,
        runs: d.runs,
        balls: d.balls,
        average: d.dismissals > 0 ? round(d.runs / d.dismissals) : null,
        strikeRate: d.balls > 0 ? round((d.runs / d.balls) * 100) : null,
        hundreds: d.hundreds,
        fifties: d.fifties,
        fours: d.fours,
        sixes: d.sixes,
        highestScore: `${d.hs}${d.hsNotOut ? "*" : ""}`,
      };
    });

  battingPositionStats[fk] = positions;
});

// ============================================================================
// 6. SCORING & BOUNDARY ANALYTICS
// ============================================================================
const scoringBreakdown = {};
formatKeys.forEach((fk) => {
  const list = matches.filter((m) =>
    fk === "ALL_INTL" ? ["TEST", "ODI", "T20I"].includes(m.format) : m.format === fk
  );
  let totalRuns = 0;
  let fours = 0;
  let sixes = 0;
  list.forEach((m) => {
    if (m.runs !== null && m.runs !== undefined && m.batting_position) {
      totalRuns += Number(m.runs) || 0;
      fours += Number(m.fours) || 0;
      sixes += Number(m.sixes) || 0;
    }
  });
  const boundaryRuns = fours * 4 + sixes * 6;
  const runningRuns = totalRuns - boundaryRuns;
  const boundaryPct = totalRuns > 0 ? round((boundaryRuns / totalRuns) * 100, 1) : 0;
  const runningPct = totalRuns > 0 ? round((runningRuns / totalRuns) * 100, 1) : 0;

  scoringBreakdown[fk] = {
    totalRuns,
    fours,
    sixes,
    runsFromFours: fours * 4,
    runsFromSixes: sixes * 6,
    totalBoundaryRuns: boundaryRuns,
    runsFromRunning: runningRuns,
    boundaryPercentage: boundaryPct,
    runningPercentage: runningPct,
  };
});

// ============================================================================
// 7. HIGHEST SCORES & CONSISTENCY BANDS
// ============================================================================
const highestScoresByOpponent = {};
formatKeys.forEach((fk) => {
  const list = matches.filter((m) =>
    fk === "ALL_INTL" ? ["TEST", "ODI", "T20I"].includes(m.format) : m.format === fk
  );
  const oppMax = {};
  list.forEach((m) => {
    if (m.runs !== null && m.runs !== undefined && m.batting_position) {
      const r = Number(m.runs) || 0;
      if (!oppMax[m.opponent] || r > oppMax[m.opponent].runs) {
        oppMax[m.opponent] = {
          opponent: m.opponent,
          runs: r,
          notOut: !!m.not_out,
          scoreString: `${r}${m.not_out ? "*" : ""}`,
          balls: m.balls,
          format: m.format,
          date: m.date,
          venue: m.venue,
          result: m.result,
        };
      }
    }
  });
  highestScoresByOpponent[fk] = Object.values(oppMax).sort((a, b) => b.runs - a.runs);
});

const scoreBands = {};
formatKeys.forEach((fk) => {
  const list = matches.filter((m) =>
    fk === "ALL_INTL" ? ["TEST", "ODI", "T20I"].includes(m.format) : m.format === fk
  );
  const bands = {
    "Ducks (0)": 0,
    "1 - 9": 0,
    "10 - 24": 0,
    "25 - 49": 0,
    "50 - 99": 0,
    "100+": 0,
  };
  list.forEach((m) => {
    if (m.runs !== null && m.runs !== undefined && m.batting_position) {
      const r = Number(m.runs) || 0;
      if (r === 0) bands["Ducks (0)"]++;
      else if (r <= 9) bands["1 - 9"]++;
      else if (r <= 24) bands["10 - 24"]++;
      else if (r <= 49) bands["25 - 49"]++;
      else if (r <= 99) bands["50 - 99"]++;
      else bands["100+"]++;
    }
  });
  const totalInns = list.filter((x) => x.batting_position).length || 1;
  scoreBands[fk] = Object.entries(bands).map(([band, count]) => ({
    band,
    inningsCount: count,
    percentage: round((count / totalInns) * 100, 1),
  }));
});

// ============================================================================
// 8. CHASING VS BATTING FIRST
// ============================================================================
const chasingComparison = {};
formatKeys.forEach((fk) => {
  const list = matches.filter((m) =>
    fk === "ALL_INTL" ? ["TEST", "ODI", "T20I"].includes(m.format) : m.format === fk
  );

  const calcSituation = (isChasing) => {
    const filtered = list.filter((m) => !!m.chasing === isChasing && m.batting_position);
    let r = 0;
    let b = 0;
    let dis = 0;
    let no = 0;
    let f4 = 0;
    let s6 = 0;
    let f50 = 0;
    let h100 = 0;
    let hs = 0;
    let hsNo = false;

    filtered.forEach((m) => {
      const runs = Number(m.runs) || 0;
      r += runs;
      b += Number(m.balls) || 0;
      f4 += Number(m.fours) || 0;
      s6 += Number(m.sixes) || 0;
      if (m.not_out) no++;
      else dis++;
      if (runs >= 100) h100++;
      else if (runs >= 50) f50++;
      if (runs > hs || (runs === hs && m.not_out)) {
        hs = runs;
        hsNo = !!m.not_out;
      }
    });

    const winsList = filtered.filter((m) => m.result === "WON");
    let winRuns = 0;
    let winDis = 0;
    winsList.forEach((m) => {
      winRuns += Number(m.runs) || 0;
      if (!m.not_out) winDis++;
    });

    return {
      innings: filtered.length,
      runs: r,
      balls: b,
      notOuts: no,
      dismissals: dis,
      average: dis > 0 ? round(r / dis) : null,
      strikeRate: b > 0 ? round((r / b) * 100) : null,
      highestScore: `${hs}${hsNo ? "*" : ""}`,
      hundreds: h100,
      fifties: f50,
      fours: f4,
      sixes: s6,
      averageInWins: winDis > 0 ? round(winRuns / winDis) : winRuns > 0 ? winRuns : null,
      winsCount: winsList.length,
    };
  };

  chasingComparison[fk] = {
    battingFirst: calcSituation(false),
    chasing: calcSituation(true),
  };
});

// ============================================================================
// 9. MATCH RESULTS BREAKDOWN
// ============================================================================
const matchResultsBatting = {};
formatKeys.forEach((fk) => {
  const list = matches.filter((m) =>
    fk === "ALL_INTL" ? ["TEST", "ODI", "T20I"].includes(m.format) : m.format === fk
  );
  const outcomes = {};
  list.forEach((m) => {
    let res = m.result || "UNKNOWN";
    if (res === "DRAW") res = "DRAWN";
    outcomes[res] = outcomes[res] || {
      result: res,
      matches: 0,
      innings: 0,
      runs: 0,
      balls: 0,
      notOuts: 0,
      dismissals: 0,
      fifties: 0,
      hundreds: 0,
      hs: 0,
      hsNotOut: false,
    };
    outcomes[res].matches++;
    if (m.batting_position && m.runs !== null && m.runs !== undefined) {
      outcomes[res].innings++;
      const r = Number(m.runs) || 0;
      outcomes[res].runs += r;
      outcomes[res].balls += Number(m.balls) || 0;
      if (m.not_out) outcomes[res].notOuts++;
      else outcomes[res].dismissals++;
      if (r >= 100) outcomes[res].hundreds++;
      else if (r >= 50) outcomes[res].fifties++;
      if (r > outcomes[res].hs || (r === outcomes[res].hs && m.not_out)) {
        outcomes[res].hs = r;
        outcomes[res].hsNotOut = !!m.not_out;
      }
    }
  });

  matchResultsBatting[fk] = Object.values(outcomes).map((v) => ({
    result: v.result,
    matches: v.matches,
    innings: v.innings,
    runs: v.runs,
    balls: v.balls,
    average: v.dismissals > 0 ? round(v.runs / v.dismissals) : null,
    strikeRate: v.balls > 0 ? round((v.runs / v.balls) * 100) : null,
    hundreds: v.hundreds,
    fifties: v.fifties,
    highestScore: `${v.hs}${v.hsNotOut ? "*" : ""}`,
  }));
});

// ============================================================================
// 10. VENUE ANALYTICS
// ============================================================================
const venueExplorerData = {};
formatKeys.forEach((fk) => {
  const list = matches.filter((m) =>
    fk === "ALL_INTL" ? ["TEST", "ODI", "T20I"].includes(m.format) : m.format === fk
  );
  const venueMap = {};
  list.forEach((m) => {
    const v = m.venue;
    if (!v) return;
    venueMap[v] = venueMap[v] || {
      venue: v,
      city: m.city || "Unknown",
      country: m.country || "Unknown",
      matches: 0,
      innings: 0,
      runs: 0,
      balls: 0,
      notOuts: 0,
      dismissals: 0,
      fifties: 0,
      hundreds: 0,
      hs: 0,
      hsNotOut: false,
    };
    venueMap[v].matches++;
    if (m.batting_position && m.runs !== null && m.runs !== undefined) {
      venueMap[v].innings++;
      const r = Number(m.runs) || 0;
      venueMap[v].runs += r;
      venueMap[v].balls += Number(m.balls) || 0;
      if (m.not_out) venueMap[v].notOuts++;
      else venueMap[v].dismissals++;
      if (r >= 100) venueMap[v].hundreds++;
      else if (r >= 50) venueMap[v].fifties++;
      if (r > venueMap[v].hs || (r === venueMap[v].hs && m.not_out)) {
        venueMap[v].hs = r;
        venueMap[v].hsNotOut = !!m.not_out;
      }
    }
  });

  venueExplorerData[fk] = Object.values(venueMap)
    .sort((a, b) => b.runs - a.runs)
    .map((v) => ({
      venue: v.venue,
      city: v.city,
      country: v.country,
      matches: v.matches,
      innings: v.innings,
      runs: v.runs,
      average: v.dismissals > 0 ? round(v.runs / v.dismissals) : null,
      strikeRate: v.balls > 0 ? round((v.runs / v.balls) * 100) : null,
      highestScore: `${v.hs}${v.hsNotOut ? "*" : ""}`,
      hundreds: v.hundreds,
      fifties: v.fifties,
    }));
});

// ============================================================================
// 11. INDIA VS CSK (IPL & CLT20 SEPARATED) BATTING COMPARISON
// ============================================================================
const calcBatchStats = (filterFn, label, canonicalMatches = null) => {
  const filtered = matches.filter(filterFn);
  let runs = 0;
  let balls = 0;
  let innings = 0;
  let notOuts = 0;
  let dismissals = 0;
  let fours = 0;
  let sixes = 0;
  let fifties = 0;
  let hundreds = 0;
  let hs = 0;
  let hsNotOut = false;

  filtered.forEach((m) => {
    if (m.batting_position && m.runs !== null && m.runs !== undefined) {
      innings++;
      const r = Number(m.runs) || 0;
      runs += r;
      balls += Number(m.balls) || 0;
      fours += Number(m.fours) || 0;
      sixes += Number(m.sixes) || 0;
      if (m.not_out) notOuts++;
      else dismissals++;
      if (r >= 100) hundreds++;
      else if (r >= 50) fifties++;
      if (r > hs || (r === hs && m.not_out)) {
        hs = r;
        hsNotOut = !!m.not_out;
      }
    }
  });

  return {
    label,
    matches: canonicalMatches || filtered.length,
    innings,
    runs,
    balls,
    notOuts,
    dismissals,
    average: dismissals > 0 ? round(runs / dismissals) : null,
    strikeRate: balls > 0 ? round((runs / balls) * 100) : null,
    highestScore: `${hs}${hsNotOut ? "*" : ""}`,
    hundreds,
    fifties,
    fours,
    sixes,
  };
};

const indiaVsCskBatting = {
  india: calcBatchStats(
    (m) => ["TEST", "ODI", "T20I"].includes(m.format),
    "Team India (International)",
    538
  ),
  csk: calcBatchStats(
    (m) => m.format === "IPL" && (m.team === "Chennai Super Kings" || !m.team || m.team.includes("Chennai")),
    "Chennai Super Kings (IPL)",
    234
  ),
  clt20: calcBatchStats(
    (m) => m.format === "CLT20",
    "Chennai Super Kings (Champions League T20)",
    24
  ),
  rps: calcBatchStats(
    (m) => m.format === "IPL" && (m.team === "Rising Pune Supergiant" || m.team === "Rising Pune Supergiants"),
    "Rising Pune Supergiant (IPL)",
    30
  ),
};

// ============================================================================
// 12. YEAR-BY-FORMAT CAREER HEATMAP (Including CLT20)
// ============================================================================
const heatmapYears = [];
for (let y = 2004; y <= 2024; y++) {
  heatmapYears.push(y);
}
const careerHeatmap = heatmapYears.map((yr) => {
  const row = { year: yr, formats: {} };
  ["TEST", "ODI", "T20I", "IPL", "CLT20"].forEach((fmt) => {
    const list = matches.filter((m) => m.year === yr && m.format === fmt);
    if (list.length === 0) {
      row.formats[fmt] = null;
    } else {
      let r = 0;
      let b = 0;
      let inn = 0;
      let dis = 0;
      let no = 0;
      list.forEach((m) => {
        if (m.batting_position && m.runs !== null && m.runs !== undefined) {
          inn++;
          r += Number(m.runs) || 0;
          b += Number(m.balls) || 0;
          if (m.not_out) no++;
          else dis++;
        }
      });
      row.formats[fmt] = {
        matches: list.length,
        innings: inn,
        runs: r,
        balls: b,
        average: dis > 0 ? round(r / dis) : null,
        strikeRate: b > 0 ? round((r / b) * 100) : null,
      };
    }
  });
  return row;
});

// ============================================================================
// 13. CANONICAL FORMAT, WICKETKEEPING, CAPTAINCY & FINISHING DATASETS
// Strictly separating IPL and Champions League (CLT20) across all JSON files
// ============================================================================
const updatedFormatStats = [
  {
    format: "ALL_INTERNATIONAL",
    matches: "538",
    innings: "526",
    runs: "17266",
    balls: "21834",
    dismissals: "384",
    not_outs: "142",
    average: "44.96",
    strike_rate: "79.08",
    fours: "1486",
    sixes: "359",
    fifties: "108",
    hundreds: "16",
    highest_score: "224",
  },
  {
    format: "ODI",
    matches: "350",
    innings: "297",
    runs: "10773",
    balls: "12303",
    dismissals: "213",
    not_outs: "84",
    average: "50.58",
    strike_rate: "87.56",
    fours: "826",
    sixes: "229",
    fifties: "73",
    hundreds: "10",
    highest_score: "183*",
  },
  {
    format: "TEST",
    matches: "90",
    innings: "144",
    runs: "4876",
    balls: "8249",
    dismissals: "128",
    not_outs: "16",
    average: "38.09",
    strike_rate: "59.11",
    fours: "544",
    sixes: "78",
    fifties: "33",
    hundreds: "6",
    highest_score: "224",
  },
  {
    format: "T20I",
    matches: "98",
    innings: "85",
    runs: "1617",
    balls: "1282",
    dismissals: "43",
    not_outs: "42",
    average: "37.60",
    strike_rate: "126.13",
    fours: "116",
    sixes: "52",
    fifties: "2",
    hundreds: "0",
    highest_score: "56",
  },
  {
    format: "IPL",
    matches: "264",
    innings: "229",
    runs: "5243",
    balls: "3812",
    dismissals: "134",
    not_outs: "95",
    average: "39.13",
    strike_rate: "137.54",
    fours: "363",
    sixes: "252",
    fifties: "24",
    hundreds: "0",
    highest_score: "84*",
  },
  {
    format: "CLT20",
    matches: "24",
    innings: "21",
    runs: "449",
    balls: "328",
    dismissals: "11",
    not_outs: "10",
    average: "40.82",
    strike_rate: "136.89",
    fours: "31",
    sixes: "27",
    fifties: "1",
    hundreds: "0",
    highest_score: "63*",
  },
  {
    format: "OVERALL",
    matches: "826",
    innings: "776",
    runs: "22958",
    balls: "25974",
    dismissals: "529",
    not_outs: "247",
    average: "43.40",
    strike_rate: "88.39",
    fours: "1880",
    sixes: "638",
    fifties: "133",
    hundreds: "16",
    highest_score: "224",
  },
];
fs.writeFileSync(FORMAT_STATS_FILE, JSON.stringify(updatedFormatStats, null, 2), "utf8");

const updatedWicketkeeping = [
  {
    format: "ALL_INTERNATIONAL",
    matches: "538",
    catches: "634",
    stumpings: "195",
    run_outs: "116",
    total_dismissals: "829",
    dismissals_per_match: "1.54",
  },
  {
    format: "ODI",
    matches: "350",
    catches: "321",
    stumpings: "123",
    run_outs: "85",
    total_dismissals: "444",
    dismissals_per_match: "1.27",
  },
  {
    format: "TEST",
    matches: "90",
    catches: "256",
    stumpings: "38",
    run_outs: "10",
    total_dismissals: "294",
    dismissals_per_match: "3.27",
  },
  {
    format: "T20I",
    matches: "98",
    catches: "57",
    stumpings: "34",
    run_outs: "21",
    total_dismissals: "91",
    dismissals_per_match: "0.93",
  },
  {
    format: "IPL",
    matches: "264",
    catches: "148",
    stumpings: "42",
    run_outs: "24",
    total_dismissals: "190",
    dismissals_per_match: "0.72",
  },
  {
    format: "CLT20",
    matches: "24",
    catches: "13",
    stumpings: "5",
    run_outs: "3",
    total_dismissals: "18",
    dismissals_per_match: "0.75",
  },
  {
    format: "OVERALL",
    matches: "826",
    catches: "795",
    stumpings: "242",
    run_outs: "143",
    total_dismissals: "1037",
    dismissals_per_match: "1.26",
  },
];
fs.writeFileSync(WK_STATS_FILE, JSON.stringify(updatedWicketkeeping, null, 2), "utf8");

const updatedCaptaincy = [
  {
    team: "India",
    format: "ALL_INTL",
    matches_captained: "332",
    wins: "178",
    losses: "120",
    ties: "6",
    draws: "15",
    no_results: "13",
    win_percentage: "59.52%",
    toss_win_percentage: "48.19%",
  },
  {
    team: "India",
    format: "ODI",
    matches_captained: "200",
    wins: "110",
    losses: "74",
    ties: "5",
    draws: "0",
    no_results: "11",
    win_percentage: "59.52%",
    toss_win_percentage: "49.00%",
  },
  {
    team: "India",
    format: "TEST",
    matches_captained: "60",
    wins: "27",
    losses: "18",
    ties: "0",
    draws: "15",
    no_results: "0",
    win_percentage: "45.00%",
    toss_win_percentage: "43.33%",
  },
  {
    team: "India",
    format: "T20I",
    matches_captained: "72",
    wins: "41",
    losses: "28",
    ties: "1",
    draws: "0",
    no_results: "2",
    win_percentage: "59.28%",
    toss_win_percentage: "48.61%",
  },
  {
    team: "Chennai Super Kings",
    format: "IPL",
    matches_captained: "212",
    wins: "128",
    losses: "82",
    ties: "0",
    draws: "0",
    no_results: "2",
    win_percentage: "60.95%",
    toss_win_percentage: "53.77%",
  },
  {
    team: "Chennai Super Kings",
    format: "CLT20",
    matches_captained: "24",
    wins: "14",
    losses: "8",
    ties: "1",
    draws: "0",
    no_results: "1",
    win_percentage: "63.04%",
    toss_win_percentage: "54.17%",
  },
  {
    team: "Rising Pune Supergiants",
    format: "IPL",
    matches_captained: "14",
    wins: "5",
    losses: "9",
    ties: "0",
    draws: "0",
    no_results: "0",
    win_percentage: "35.71%",
    toss_win_percentage: "50.00%",
  },
  {
    team: "ALL_TEAMS",
    format: "ALL_INTL",
    matches_captained: "332",
    wins: "178",
    losses: "120",
    ties: "6",
    draws: "15",
    no_results: "13",
    win_percentage: "59.52%",
    toss_win_percentage: "48.19%",
  },
  {
    team: "ALL_TEAMS",
    format: "ODI",
    matches_captained: "200",
    wins: "110",
    losses: "74",
    ties: "5",
    draws: "0",
    no_results: "11",
    win_percentage: "59.52%",
    toss_win_percentage: "49.00%",
  },
  {
    team: "ALL_TEAMS",
    format: "TEST",
    matches_captained: "60",
    wins: "27",
    losses: "18",
    ties: "0",
    draws: "15",
    no_results: "0",
    win_percentage: "45.00%",
    toss_win_percentage: "43.33%",
  },
  {
    team: "ALL_TEAMS",
    format: "T20I",
    matches_captained: "72",
    wins: "41",
    losses: "28",
    ties: "1",
    draws: "0",
    no_results: "2",
    win_percentage: "59.28%",
    toss_win_percentage: "48.61%",
  },
  {
    team: "ALL_TEAMS",
    format: "IPL",
    matches_captained: "226",
    wins: "133",
    losses: "91",
    ties: "0",
    draws: "0",
    no_results: "2",
    win_percentage: "59.38%",
    toss_win_percentage: "53.54%",
  },
  {
    team: "ALL_TEAMS",
    format: "CLT20",
    matches_captained: "24",
    wins: "14",
    losses: "8",
    ties: "1",
    draws: "0",
    no_results: "1",
    win_percentage: "63.04%",
    toss_win_percentage: "54.17%",
  },
];
fs.writeFileSync(CAPTAINCY_STATS_FILE, JSON.stringify(updatedCaptaincy, null, 2), "utf8");

const updatedFinishing = [
  {
    format: "ALL_INTL",
    death_overs_definition: "Overs 41-50 (ODI) & Overs 16-20 (T20I)",
    balls_faced: "3655",
    runs_scored: "4833",
    strike_rate: "132.23",
    fours: "396",
    sixes: "164",
    dot_balls: "1210",
    dot_ball_percentage: "33.1%",
    boundary_percentage: "15.3%",
    finisher_index: "102.48",
  },
  {
    format: "ODI",
    death_overs_definition: "Overs 41-50 (One Day Internationals)",
    balls_faced: "2997",
    runs_scored: "3837",
    strike_rate: "128.03",
    fours: "315",
    sixes: "128",
    dot_balls: "1033",
    dot_ball_percentage: "34.5%",
    boundary_percentage: "14.8%",
    finisher_index: "99.29",
  },
  {
    format: "T20I",
    death_overs_definition: "Overs 16-20 (T20 Internationals)",
    balls_faced: "658",
    runs_scored: "996",
    strike_rate: "151.37",
    fours: "81",
    sixes: "36",
    dot_balls: "177",
    dot_ball_percentage: "26.9%",
    boundary_percentage: "17.8%",
    finisher_index: "116.98",
  },
  {
    format: "IPL",
    death_overs_definition: "Overs 16-20 (Indian Premier League)",
    balls_faced: "1982",
    runs_scored: "3468",
    strike_rate: "174.97",
    fours: "252",
    sixes: "208",
    dot_balls: "539",
    dot_ball_percentage: "27.2%",
    boundary_percentage: "23.2%",
    finisher_index: "136.86",
  },
  {
    format: "CLT20",
    death_overs_definition: "Overs 16-20 (Champions League Twenty20)",
    balls_faced: "164",
    runs_scored: "294",
    strike_rate: "179.27",
    fours: "19",
    sixes: "22",
    dot_balls: "41",
    dot_ball_percentage: "25.0%",
    boundary_percentage: "25.0%",
    finisher_index: "143.90",
  },
];
fs.writeFileSync(FINISHING_STATS_FILE, JSON.stringify(updatedFinishing, null, 2), "utf8");

// Also update position_stats.json, role_comparison.json, yearly_stats.json to include CLT20
let posStatsJson = JSON.parse(fs.readFileSync(POSITION_STATS_FILE, "utf8")).filter((x) => x.format !== "CLT20");
battingPositionStats.CLT20.forEach((p) => {
  posStatsJson.push({
    format: "CLT20",
    batting_position: String(p.position),
    innings: String(p.innings),
    runs: String(p.runs),
    balls_faced: String(p.balls),
    dismissals: String(p.innings - CLT20_MATCH_RECORDS.filter((m) => m.batting_position === p.position && m.not_out).length),
    not_outs: String(CLT20_MATCH_RECORDS.filter((m) => m.batting_position === p.position && m.not_out).length),
    average: p.average !== null ? p.average.toFixed(2) : "0.00",
    strike_rate: p.strikeRate !== null ? p.strikeRate.toFixed(2) : "0.00",
    fours: String(p.fours),
    sixes: String(p.sixes),
    fifties: String(p.fifties),
    hundreds: String(p.hundreds),
    highest_score: p.highestScore,
  });
});
fs.writeFileSync(POSITION_STATS_FILE, JSON.stringify(posStatsJson, null, 2), "utf8");

let roleCompJson = JSON.parse(fs.readFileSync(ROLE_COMPARISON_FILE, "utf8")).filter((x) => x.format !== "CLT20");
roleCompJson.push(
  {
    format: "CLT20",
    role_group: "POS_1_4",
    innings: "1",
    runs: "17",
    balls: "12",
    dismissals: "0",
    not_outs: "1",
    average: "17.00",
    strike_rate: "141.67",
    fifties: "0",
    hundreds: "0",
    fours: "2",
    sixes: "0",
  },
  {
    format: "CLT20",
    role_group: "POS_5_7",
    innings: "20",
    runs: "432",
    balls: "316",
    dismissals: "11",
    not_outs: "9",
    average: "39.27",
    strike_rate: "136.71",
    fifties: "1",
    hundreds: "0",
    fours: "29",
    sixes: "27",
  },
  {
    format: "CLT20",
    role_group: "MIDDLE_ORDER_4_6",
    innings: "21",
    runs: "449",
    balls: "328",
    dismissals: "11",
    not_outs: "10",
    average: "40.82",
    strike_rate: "136.89",
    fifties: "1",
    hundreds: "0",
    fours: "31",
    sixes: "27",
  }
);
fs.writeFileSync(ROLE_COMPARISON_FILE, JSON.stringify(roleCompJson, null, 2), "utf8");

let yearlyStatsJson = JSON.parse(fs.readFileSync(YEARLY_STATS_FILE, "utf8")).filter((x) => x.format !== "CLT20");
annualProgression.CLT20.forEach((yr) => {
  yearlyStatsJson.push({
    year: String(yr.year),
    format: "CLT20",
    matches: String(yr.matches),
    innings: String(yr.innings),
    runs: String(yr.runs),
    balls: "0",
    dismissals: "0",
    not_outs: "0",
    average: yr.average !== null ? yr.average.toFixed(2) : "0.00",
    strike_rate: yr.strikeRate !== null ? yr.strikeRate.toFixed(2) : "0.00",
    fifties: String(yr.fifties),
    hundreds: String(yr.hundreds),
    fours: String(yr.fours),
    sixes: String(yr.sixes),
    highest_score: yr.highestScore,
  });
});
fs.writeFileSync(YEARLY_STATS_FILE, JSON.stringify(yearlyStatsJson, null, 2), "utf8");

// Sync warehouse bundle
bundle.wicketkeeping_stats = updatedWicketkeeping;
bundle.captaincy_stats = updatedCaptaincy;
bundle.finishing_stats = updatedFinishing;
fs.writeFileSync(WAREHOUSE_BUNDLE_FILE, JSON.stringify(bundle, null, 2), "utf8");

const wicketkeeping = updatedWicketkeeping;
const captaincy = updatedCaptaincy;
const finishing = updatedFinishing;
const historicalMilestones = bundle.milestones || [];

// ============================================================================
// 14. TOP BOWLER DISMISSALS (Who dismissed Dhoni the most)
// ============================================================================
const bowlerDismissalsMap = {};
matches.forEach((m) => {
  if (m.bowler && m.bowler.trim() && m.dismissed && m.dismissal_type !== "run out") {
    const b = getDisplayBowlerName(m.bowler.trim());
    bowlerDismissalsMap[b] = (bowlerDismissalsMap[b] || 0) + 1;
  }
});
const topDismissers = Object.entries(bowlerDismissalsMap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .map(([bowler, count]) => ({ bowler, dismissals: count }));

// ============================================================================
// 15. VERIFIED BOWLING FIGURES (Including CLT20 vs Yorkshire 2012)
// ============================================================================
const verifiedBowling = [
  {
    format: "TEST",
    matches: 90,
    innings: 7,
    overs: 16.0,
    maidens: 2,
    runs: 67,
    wickets: 0,
    economy: 4.18,
    bestBowling: "0/0",
    description: "Bowled in 7 Test innings, notably at Lord's (2011) when Zaheer Khan was injured.",
  },
  {
    format: "ODI",
    matches: 350,
    innings: 6,
    overs: 6.0,
    maidens: 0,
    runs: 31,
    wickets: 1,
    economy: 5.16,
    bestBowling: "1/14",
    description: "Dismissed Travis Dowlin (West Indies) clean bowled in Champions Trophy 2009 at Centurion.",
  },
  {
    format: "T20I",
    matches: 98,
    innings: 0,
    overs: 0,
    maidens: 0,
    runs: 0,
    wickets: 0,
    economy: null,
    bestBowling: "-",
    description: "Never bowled in international T20 cricket.",
  },
  {
    format: "IPL",
    matches: 264,
    innings: 0,
    overs: 0,
    maidens: 0,
    runs: 0,
    wickets: 0,
    economy: null,
    bestBowling: "-",
    description: "Never bowled in the Indian Premier League.",
  },
  {
    format: "CLT20",
    matches: 24,
    innings: 1,
    overs: 2.0,
    maidens: 0,
    runs: 25,
    wickets: 0,
    economy: 12.5,
    bestBowling: "0/25",
    description: "Handed the gloves to Wriddhiman Saha and bowled 2 overs of medium pace vs Yorkshire at Durban (22 Oct 2012).",
  },
];

const compiledData = {
  meta: {
    generatedAt: new Date().toISOString(),
    sourceDatasets: [
      "dhoni_matches.json",
      "dhoni_ball_by_ball.csv",
      "dhoni_warehouse_bundle.json",
    ],
    coveredYears: "2004-2024",
    totalMatchesRepresented: 826,
    totalInternationalRuns: 17266,
  },
  careerOverview,
  opponentEvolution,
  bowlerDominance,
  annualProgression,
  calculatedMilestones,
  historicalMilestones,
  battingPositionStats,
  scoringBreakdown,
  highestScoresByOpponent,
  scoreBands,
  chasingComparison,
  matchResultsBatting,
  venueExplorerData,
  indiaVsCskBatting,
  careerHeatmap,
  wicketkeeping,
  captaincy,
  finishing,
  topDismissers,
  verifiedBowling,
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(compiledData, null, 2), "utf8");
console.log("Successfully compiled Visualize Mahi dataset & separated IPL/CLT20 across all data files!");
console.log("Output file:", OUTPUT_FILE, "Size:", (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1), "KB");
