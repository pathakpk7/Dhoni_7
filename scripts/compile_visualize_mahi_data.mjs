import fs from "fs";
import path from "path";

const MATCHES_FILE = path.join(process.cwd(), "src/data/dhoni_matches.json");
const WAREHOUSE_BUNDLE_FILE = path.join(process.cwd(), "src/data/dhoni_warehouse_bundle.json");
const OUTPUT_FILE = path.join(process.cwd(), "src/data/visualize_mahi_data.json");

const matches = JSON.parse(fs.readFileSync(MATCHES_FILE, "utf8"));
const bundle = JSON.parse(fs.readFileSync(WAREHOUSE_BUNDLE_FILE, "utf8"));

const formatKeys = ["ALL_INTL", "TEST", "ODI", "T20I", "IPL"];

// Helper for formatting
function round(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num)) return null;
  return Number(Number(num).toFixed(decimals));
}

// 1. CAREER OVERVIEW PER FORMAT
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
      if (r > hs) {
        hs = r;
        hsNotOut = !!m.not_out;
      }
    }
  });

  const avg = dismissals > 0 ? round(totalRuns / dismissals) : null;
  const sr = balls > 0 ? round((totalRuns / balls) * 100) : null;

  careerOverview[fk] = {
    format: fk,
    matches: list.length,
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

// 2. RUNS AGAINST EVERY OPPONENT (Flagship Animated Horizontal Bar Chart)
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
        if (runsScored > maxR) {
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

// 3. ANNUAL RUNS PROGRESSION & CAREER RUNS TIMELINE
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
      if (r > byYr[yr].hs) {
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

// 4. STATISTICAL MILESTONE CROSSING POINTS (From actual chronological match innings)
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

// 5. BATTING POSITION ANALYTICS
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
        if (r > posMap[pos].hs) {
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

// 6. SCORING & BOUNDARY ANALYTICS
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

// 7. HIGHEST SCORES & CONSISTENCY BANDS
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

// Consistency Scoring Bands
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
  scoreBands[fk] = Object.entries(bands).map(([band, count]) => ({
    band,
    inningsCount: count,
    percentage: round((count / list.filter((x) => x.batting_position).length) * 100, 1),
  }));
});

// 8. CHASING VS BATTING FIRST
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
      if (runs > hs) {
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
      averageInWins: winDis > 0 ? round(winRuns / winDis) : null,
      winsCount: winsList.length,
    };
  };

  chasingComparison[fk] = {
    battingFirst: calcSituation(false),
    chasing: calcSituation(true),
  };
});

// 9. MATCH RESULTS BREAKDOWN
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
      if (r > outcomes[res].hs) {
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

// 10. VENUE ANALYTICS
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
      if (r > venueMap[v].hs) {
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

// 11. INDIA VS CSK BATTING COMPARISON
const calcBatchStats = (filterFn, label) => {
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
      if (r > hs) {
        hs = r;
        hsNotOut = !!m.not_out;
      }
    }
  });

  return {
    label,
    matches: filtered.length,
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
  india: calcBatchStats((m) => ["TEST", "ODI", "T20I"].includes(m.format), "Team India (International)"),
  csk: calcBatchStats(
    (m) => m.format === "IPL" && (m.team === "Chennai Super Kings" || !m.team || m.team.includes("Chennai")),
    "Chennai Super Kings (IPL)"
  ),
  rps: calcBatchStats(
    (m) => m.format === "IPL" && (m.team === "Rising Pune Supergiant" || m.team === "Rising Pune Supergiants"),
    "Rising Pune Supergiants (IPL)"
  ),
};

// 12. YEAR-BY-FORMAT CAREER HEATMAP
const heatmapYears = [];
for (let y = 2004; y <= 2024; y++) {
  heatmapYears.push(y);
}
const careerHeatmap = heatmapYears.map((yr) => {
  const row = { year: yr, formats: {} };
  ["TEST", "ODI", "T20I", "IPL"].forEach((fmt) => {
    const list = matches.filter((m) => m.year === yr && m.format === fmt);
    if (list.length === 0) {
      row.formats[fmt] = null; // No matches played
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

// 13. WICKETKEEPING, CAPTAINCY, FINISHING FROM VALIDATED BUNDLE
const wicketkeeping = bundle.wicketkeeping_stats || [];
const captaincy = bundle.captaincy_stats || [];
const finishing = bundle.finishing_stats || [];
const historicalMilestones = bundle.milestones || [];

// 14. TOP BOWLER DISMISSALS (Who dismissed Dhoni the most)
const bowlerDismissalsMap = {};
matches.forEach((m) => {
  if (m.bowler && m.bowler.trim() && m.dismissed) {
    const b = m.bowler.trim();
    bowlerDismissalsMap[b] = (bowlerDismissalsMap[b] || 0) + 1;
  }
});
const topDismissers = Object.entries(bowlerDismissalsMap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .map(([bowler, count]) => ({ bowler, dismissals: count }));

// 15. VERIFIED BOWLING FIGURES (Dhoni bowled in 9 international matches)
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
];

const compiledData = {
  meta: {
    generatedAt: new Date().toISOString(),
    sourceDatasets: ["dhoni_matches.json", "dhoni_warehouse_bundle.json"],
    coveredYears: "2004-2024",
    totalMatchesRepresented: matches.length,
    totalInternationalRuns: 17266,
  },
  careerOverview,
  opponentEvolution,
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
console.log("Successfully compiled Visualize Mahi dataset to:", OUTPUT_FILE);
console.log("File size:", (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1), "KB");
