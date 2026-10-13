# CAPTAIN COOL: DECODED
> *"The numbers. The decisions. The moments."*  
> *"Decoding the man behind No. 7."*

A high-precision, verified cricket data warehouse and cinematic interactive web experience exploring the career, batting, wicketkeeping, captaincy, head-to-head bowler & opposition dominance, finishing masterclasses, and legacy of **Mahendra Singh Dhoni** across **International Cricket**, the **Indian Premier League (IPL)**, and the **Champions League Twenty20 (CLT20)**.

---

## 🏏 Project Highlights

- **100% Verified Cricket Data Warehouse (2004–2024)**: Built from official Cricsheet ball-by-ball archives and verified historical match records (`player_id = MS_DHONI`, UUID `4a8a2e3b`), tracking **826 career matches** (`538 International`, `264 IPL`, `24 CLT20`), **776 batted innings**, and **25,541+ deliveries**.
- **Strict Format Isolation (6 Distinct Format Filters)**: Every chart, table, and KPI supports **`All Intl`** (`TEST + ODI + T20I`), **`ODI`**, **`Test`**, **`T20I`**, **`IPL`**, and **`Champions League` (`CLT20`)** with strict separation between IPL (`264 matches, 229 innings, 5,243 runs`) and CLT20 (`24 matches, 21 innings, 449 runs`).
- **Visualize Mahi (`/visualize`) — 17-Module Deep Telemetry Suite**:
  - **Runs Against Every Opponent (Year-by-Year & Cumulative Engine)**: Chronological head-to-head breakdown tracking **distinct Matches vs Innings** (accounting for multi-innings Test matches and DNB wicketkeeping/captaincy appearances) and **Year-Wise Highest Scores** (`yearBreakdown` & `cumulativeByYear`) for every opponent, every calendar year, and every format—complete with an interactive year scrubber and clickable Year-by-Year Breakdown table.
  - **Runs Against Bowlers (Bowler Dominance Matrix)**: Complete ball-by-ball head-to-head dominance engine covering **every bowler MS Dhoni faced** across all 6 formats (`All Intl`, `ODI`, `Test`, `T20I`, `IPL`, `Champions League`). Defaults to the **Top 30** bowlers with a **Show All** toggle to inspect the full roster in each format, plus search, sorting (`Most Runs`, `Strike Rate`, `Most 6s`, `4s + 6s`, `Dominance Index`), an `Unbeaten Only (0 Out)` filter, and an 8-metric head-to-head dossier.
  - **Annual Progression, Career Milestones & Batting Position Analytics**: Mathematical derivation of batting metrics across positions 3 to 8, milestone crossing innings (`1,000` to `17,000` international runs), and scoring/boundary splits.
  - **Chasing vs Setting, Finisher Zone & Match Results**: Deep dive into Dhoni's `102.71` average in successful ODI chases (`47 not outs`), death-over acceleration, and win/loss/draw splits.
  - **Wicketkeeping, Verified Bowling, Captaincy & Venue Explorer**: World-record `829` international dismissals (`195 stumpings`), `190` IPL dismissals (`42 stumpings`), `24` CLT20 dismissals, verified bowling spells, captaincy trophies (`2007 T20 WC`, `2011 CWC`, `2013 CT`, `5x IPL`, `2x CLT20`), and stadium-by-stadium telemetry.
- **Cinematic Interactive Web App (`/`)**: Next.js 14+, TypeScript, Tailwind CSS, Framer Motion, dark stadium aesthetic, dual-universe switcher (India Tri-Color vs CSK Yellove), Mahi Tactical Lab scenario simulator, Ask Mahi AI data intelligence, and Number 7 easter eggs.

---

## 📊 Verified Career Format Summary (2004–2024)

| Format | Matches | Innings | Not Outs | Runs | Balls | High Score | Average | Strike Rate | 100s / 50s | 4s / 6s | WK Dismissals (Cat / St) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **All Intl** | 538 | 526 | 142 | **17,266** | 21,817 | 224 | 44.96 | 79.14 | 16 / 108 | 1,486 / 359 | 829 (634c / 195st) |
| **ODI** | 350 | 297 | 84 | **10,773** | 12,303 | 183\* | 50.58 | 87.56 | 10 / 73 | 826 / 229 | 444 (321c / 123st) |
| **Test** | 90 | 144 | 16 | **4,876** | 8,226 | 224 | 38.09 | 59.28 | 6 / 33 | 544 / 78 | 294 (256c / 38st) |
| **T20I** | 98 | 85 | 42 | **1,617** | 1,288 | 56 | 37.60 | 125.54 | 0 / 2 | 116 / 52 | 91 (57c / 34st) |
| **IPL** | 264 | 229 | 95 | **5,243** | 3,812 | 84\* | 39.13 | 137.54 | 0 / 24 | 363 / 252 | 190 (148c / 42st) |
| **Champions League (CLT20)** | 24 | 21 | 10 | **449** | 328 | 63\* | 40.82 | 136.89 | 0 / 1 | 31 / 27 | 24 (18c / 6st) |

---

## 📂 Repository Structure

```
PROJECT 7/
├── DATA_SOURCES.md                          # Data licenses, Cricsheet terms, secondary sources
├── README.md                                # Project overview, format summary & usage guide
├── package.json                             # Next.js frontend dependencies
├── tsconfig.json                            # TypeScript compiler configuration
├── tailwind.config.js                       # Custom cinematic theme (CSK Gold, India Blue, Charcoal)
├── db/
│   ├── schema.sql                           # PostgreSQL / Supabase Relational DDL
│   └── schema.prisma                        # Production Prisma ORM schema
├── docs/
│   ├── DATA_DICTIONARY.md                   # Precise column-by-column schema definitions
│   ├── METRICS.md                           # Mathematical formulas (Avg, SR, Finisher Index)
│   └── DATA_PIPELINE.md                     # End-to-end ETL architecture documentation
├── scripts/
│   ├── compile_visualize_mahi_data.mjs      # Compiles Visualize Mahi JSON & isolates IPL/CLT20 data
│   ├── run_pipeline.py                      # Master Python pipeline execution script
│   └── pipeline/
│       ├── 01_fetch_raw_data.py             # Download raw zip archives & generate SHA-256 manifest
│       ├── 02_process_matches_innings.py    # Ball-by-ball parsing & batting position derivation
│       ├── 03_extract_keeper_captain.py     # Wicketkeeping & captaincy extraction
│       ├── 04_build_analytics.py            # Computes all analytical aggregations
│       ├── 05_validate_data.py              # Automated verification against official benchmarks
│       └── export_web_data.py               # Exports JSON bundles to src/data/ for Next.js
├── data/
│   ├── raw/                                 # Original unmodified zip files & manifest.json
│   ├── master/
│   │   └── ms_dhoni_master_innings.csv      # Golden unified innings dataset
│   ├── processed/                           # Normalized matches, keeper, captain, ball-by-ball CSVs
│   ├── analytics/                           # Aggregated analytical tables
│   ├── reference/                           # Trophies, iconic moments, milestones, comparisons
│   └── validation/                          # Automated audit & variance resolution notes
└── src/
    ├── analytics/                           # Client-side career analytics & TypeScript definitions
    ├── app/
    │   ├── layout.tsx                       # Root layout, cinematic metadata & typography
    │   ├── page.tsx                         # Main interactive documentary experience (/)
    │   └── visualize/
    │       ├── page.tsx                     # Visualize Mahi route (/visualize)
    │       └── VisualizeMahiClient.tsx      # 17-module interactive analytics client
    ├── components/
    │   ├── layout/                          # Navbar, Footer, CinematicBackground
    │   ├── ui/                              # KpiCard, SectionHeader, Badge
    │   ├── sections/                        # Main documentary & analytics sections
    │   ├── visualize/                       # 17 Visualize Mahi modules (Opponents, Bowlers, etc.)
    │   └── easter-eggs/                     # Helicopter Shot animation & Number 7 modal
    ├── data/                                # Pre-compiled JSON datasets (IPL & CLT20 isolated)
    └── types/
        └── visualize.ts                     # TypeScript interfaces for Visualize Mahi telemetry
```

---

## 🚀 Getting Started

### 1. Compile / Refresh the Analytics Datasets

```bash
# Re-compile visualize_mahi_data.json and all format-separated JSON bundles
node scripts/compile_visualize_mahi_data.mjs
```

*(Optional)* To re-run the raw Python Cricsheet ETL pipeline (Python 3.9+):
```bash
python scripts/run_pipeline.py
```

### 2. Launch the Interactive Web Experience

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

- Main Interactive Experience: [http://localhost:3000](http://localhost:3000)
- **Visualize Mahi** Deep Analytics Suite: [http://localhost:3000/visualize](http://localhost:3000/visualize)

---

## ⚖️ Attribution & Licensing

- **Primary Cricket Data**: Sourced from [Cricsheet](https://cricsheet.org/) under [Open Data Commons / CC BY 4.0](https://cricsheet.org/license/).
- **Secondary Reference**: ESPNcricinfo, ICC Official Records, IPL Official Records, CLT20 Archives, BCCI.
- **Created by**: A lifelong MS Dhoni fan.
