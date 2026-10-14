import { MAHI_STORY_LIBRARY } from "./mahiStoryLibrary";
import type { StoryEntry } from "@/types/storybook";

export interface CollectorBook {
  id: string;
  volumeNumber: 1 | 2 | 3 | 4;
  romanNumeral: "I" | "II" | "III" | "IV";
  title: string;
  shortTitle: string;
  subtitle: string;
  era: string;
  timelineSpan: string;
  tagline: string;
  coverImage: string;
  themeColor: string;
  spineColor: string;
  accentGradient: string;
  description: string;
  storyIds: string[];
  stories: StoryEntry[];
}

// 1. BOOK I: 1995 to Mid-2007 (Before Debut up to Before T20 WC 2007)
const BOOK_1_STORY_IDS = [
  "ranchi-goalkeeper-origins",
  "the-first-rajdoot-restoration",
  "kharagpur-ticket-collector",
  "kenya-tri-series-breakthrough",
  "chittagong-debut-runout",
  "vizag-148-unleashed",
  "jaipur-183-destruction",
  "play-your-game-backing",
];

// 2. BOOK II: Sep 2007 to 2013 (Start of T20 WC 2007 up to winning 2013 Champions Trophy)
const BOOK_2_STORY_IDS = [
  "kingsmead-bowl-out-instinct",
  "johannesburg-joginder-final-over",
  "shirtless-trophy-handover",
  "cb-series-proving-cricinfo-wrong",
  "cb-series-silent-celebration",
  "kishore-kumar-to-sean-paul",
  "test-mace-brabourne-2009",
  "stump-mic-chronicles",
  "promoting-ahead-of-yuvraj",
  "wankhede-kulasekara-winning-six",
  "honorary-lt-col-commission",
  "process-over-result-doctrine",
  "helicopter-stool-bouncers-quip",
  "duckworth-lewis-deadpan-quip",
  "ask-physio-press-release-quip",
  "the-open-hotel-room-protocol",
  "chepauk-double-hundred-2013",
  "edgbaston-rain-champions-trophy",
  "not-here-to-prove-champions-trophy",
];

// 3. BOOK III: 2014 to 2019 (MCG Test exit to 2019 World Cup / 19:29 Retirement)
const BOOK_3_STORY_IDS = [
  "mcg-2014-silent-test-exit",
  "balidan-maroon-wings-jumps",
  "point-zero-eight-second-stumping",
  "bengaluru-sprint-single-glove",
  "you-want-me-to-retire-sam-ferris",
  "midnight-solo-ranchi-rides",
  "dont-ride-all-bikes-at-a-time",
  "victor-force-kashmir-patrol",
  "solitary-walk-ranchi-outfield",
  "nineteen-twenty-nine-retirement",
  "the-mentor-silhouette",
];

// 4. BOOK IV: 2008 to 2026 (IPL & CLT20 Chennai Super Kings Dynasty)
const BOOK_4_STORY_IDS = [
  "dharamsala-helmet-punch-2010",
  "csk-first-ipl-crown-2010",
  "the-2018-comeback-tears",
  "lifting-jadeja-at-3am-2023",
];

// Helper to resolve stories safely
function getStoriesForIds(ids: string[]): StoryEntry[] {
  return ids
    .map((id) => MAHI_STORY_LIBRARY.find((s) => s.id === id))
    .filter((s): s is StoryEntry => Boolean(s));
}

// Dedicated supplemental stories for Book IV (IPL & CLT20 from 2008 to 2026)
const BOOK_4_EXTRA_STORIES: StoryEntry[] = [
  {
    id: "ipl-2008-inaugural-chepauk-draft",
    chapterId: "chapter-ipl-dynasty",
    chapterNumber: 4,
    chapterTitle: "THE YELLOW FORTRESS",
    title: "THE FIRST WHISTLE: $1.5 MILLION AND A LION'S ROAR",
    subtitle: "When N. Srinivasan bet the house at the inaugural 2008 IPL auction.",
    eventDate: "2008-02-20",
    location: "ITC Gardenia, Bengaluru & MA Chidambaram Stadium, Chepauk",
    category: "CSK_LEGACY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "In the inaugural IPL player auction of February 2008, while other franchises had iconic regional icons, Chennai had none. CSK made MS Dhoni the marquee headline pick of the entire auction for a record $1.5 million.",
    narrative:
      "When the gavel struck at $1.5 million, many questioned spending so heavily on a single player. But Chennai didn't just buy a captain; they acquired a spiritual philosophy. Dhoni adopted the city, and the city unconditionally adopted him. From that very first yellow jersey presentation, 'Thala' became a permanent fixture of Tamil Nadu culture.",
    meaning:
      "Dhoni's bond with Chennai proved that home isn't where you were born; it is where you are understood. CSK became the most loyal franchise in global sports.",
    quote: {
      text: "Chennai is like my second home. The love and respect I get here is unmatched. It's the people who make it special.",
      speaker: "MS Dhoni",
      sourceTitle: "The Hindu & CSK Official Archival Records",
      sourceUrl: "https://www.thehindu.com",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/two-worlds/dhoni_csk_action_shot.jpg",
      sourceUrl: null,
      attribution: "BCCI / IPL Archives",
      aspectRatio: "16:9",
    },
    tags: ["IPL 2008", "CSK", "CHEPAUK", "AUCTION", "THALA"],
    estimatedReadingTime: 2,
  },
  {
    id: "clt20-2010-johannesburg-double",
    chapterId: "chapter-ipl-dynasty",
    chapterNumber: 4,
    chapterTitle: "THE YELLOW FORTRESS",
    title: "THE JOHANNESBURG DOUBLE: IPL + CLT20 IN ONE YEAR",
    subtitle: "Taking Chennai Super Kings to the summit of world franchise cricket.",
    eventDate: "2010-09-26",
    location: "Wanderers Stadium, Johannesburg, South Africa",
    category: "CSK_LEGACY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "After winning their maiden IPL crown in April 2010, CSK traveled to South Africa for the global Champions League Twenty20. No team had ever won both in the same calendar year.",
    narrative:
      "At the bullring of Wanderers, South Africa, Dhoni orchestrated a clinical spin web through Muralitharan and Ashwin. Restricting the Warriors to 128, CSK chased it down with 8 wickets in hand. Dhoni lifted the silver CLT20 trophy, completing an immortal double.",
    meaning:
      "Cemented CSK not merely as India's best franchise, but as the premier domestic Twenty20 club in world cricket.",
    quote: {
      text: "We wanted to prove that our IPL win wasn't a fluke. Winning in South Africa against the best teams across countries proved our depth.",
      speaker: "MS Dhoni, Post-Match Press Conference",
      sourceTitle: "ESPNcricinfo Archives",
      sourceUrl: "https://www.espncricinfo.com",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/trophies/2010_clt20.png",
      sourceUrl: null,
      attribution: "CLT20 / BCCI",
      aspectRatio: "16:9",
    },
    tags: ["CLT20 2010", "CSK", "JOHANNESBURG", "DOUBLE CROWN"],
    estimatedReadingTime: 2,
  },
  {
    id: "ipl-2011-chepauk-title-defense",
    chapterId: "chapter-ipl-dynasty",
    chapterNumber: 4,
    chapterTitle: "THE YELLOW FORTRESS",
    title: "FORTRESS CHEPAUK: BACK-TO-BACK TITLES",
    subtitle: "First team in IPL history to defend the championship crown.",
    eventDate: "2011-05-28",
    location: "MA Chidambaram Stadium, Chepauk, Chennai",
    category: "CSK_LEGACY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "Just weeks after lifting the 2011 World Cup in Mumbai, Dhoni arrived in Chennai aiming to do what no IPL franchise had ever achieved: successfully defend an IPL title.",
    narrative:
      "Chepauk was painted pure canary yellow. Murali Vijay hammered 95 and Mike Hussey scored 63 to post 205. Dhoni opened the bowling with R. Ashwin, who dismissed a menacing Chris Gayle for a third-ball duck. CSK won by 58 runs to make history.",
    meaning:
      "Proved that consistency in the volatile T20 format was possible through calm role clarity and unwavering player backing.",
    quote: {
      text: "If you have a great team and you back your players through bad patches, they will deliver when it matters most.",
      speaker: "MS Dhoni",
      sourceTitle: "IPL Post-Final Presentation 2011",
      sourceUrl: "https://www.iplt20.com",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/trophies/2011_ipl.jpg",
      sourceUrl: null,
      attribution: "IPL / BCCI",
      aspectRatio: "16:9",
    },
    tags: ["IPL 2011", "DEFENDING CHAMPIONS", "CHEPAUK", "ASHWIN"],
    estimatedReadingTime: 2,
  },
  {
    id: "clt20-2014-bengaluru-blitz",
    chapterId: "chapter-ipl-dynasty",
    chapterNumber: 4,
    chapterTitle: "THE YELLOW FORTRESS",
    title: "THE SECOND GLOBAL CROWN: CHINNASWAMY 2014",
    subtitle: "Raina's century and Dhoni's finish against Kolkata Knight Riders.",
    eventDate: "2014-10-04",
    location: "M. Chinnaswamy Stadium, Bengaluru, India",
    category: "CSK_LEGACY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "In the final of the 2014 Champions League T20, CSK faced reigning IPL champions Kolkata Knight Riders who were on a 14-match unbeaten streak.",
    narrative:
      "Chasing 181, Suresh Raina struck a majestic 109* off 62 balls before Dhoni walked in to provide the emphatic punctuation mark with an towering six over deep mid-wicket, sealing CSK's second CLT20 championship.",
    meaning:
      "Affirmed CSK's status as a generational club across both domestic and international franchise competition.",
    quote: {
      text: "When you chase 180 in a final, you need self-belief. Raina batted like a dream, and we just kept our composure.",
      speaker: "MS Dhoni",
      sourceTitle: "CLT20 2014 Post-Match Ceremony",
      sourceUrl: "https://www.espncricinfo.com",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/trophies/2014_clt20.jpg",
      sourceUrl: null,
      attribution: "BCCI / CLT20",
      aspectRatio: "16:9",
    },
    tags: ["CLT20 2014", "RAINA", "CHAMPIONS", "FINISHER"],
    estimatedReadingTime: 2,
  },
  {
    id: "ipl-2021-dubai-desert-crown",
    chapterId: "chapter-ipl-dynasty",
    chapterNumber: 4,
    chapterTitle: "THE YELLOW FORTRESS",
    title: "DESERT REDEMPTION: FOURTH TITLE IN DUBAI",
    subtitle: "From 7th place in 2020 to lifting the trophy in 2021.",
    eventDate: "2021-10-15",
    location: "Dubai International Stadium, UAE",
    category: "CSK_LEGACY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "In 2020, CSK failed to qualify for the playoffs for the first time in history. Critics claimed the era was over. Dhoni was asked if 2020 was his final game in yellow. His legendary response: 'Definitely Not.'",
    narrative:
      "A year later in Dubai, CSK dismantled KKR in the final by 27 runs. Faf du Plessis struck 86, and Dhoni marshaled his bowlers with surgical perfection. When asked about CSK's legacy at the presentation, Dhoni famously deflected praise to KKR for their spirited turnaround.",
    meaning:
      "Showcased Dhoni's philosophical resilience: never let defeat define you, and never let victory go to your head.",
    quote: {
      text: "Definitely not.",
      speaker: "MS Dhoni to Danny Morrison (October 2020)",
      sourceTitle: "IPL Official Broadcast",
      sourceUrl: "https://www.iplt20.com",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/trophies/2021_ipl.png",
      sourceUrl: null,
      attribution: "BCCI / IPL",
      aspectRatio: "16:9",
    },
    tags: ["IPL 2021", "DEFINITELY NOT", "DUBAI", "REDEMPTION"],
    estimatedReadingTime: 2,
  },
  {
    id: "ipl-2024-2026-the-eternal-seven",
    chapterId: "chapter-ipl-dynasty",
    chapterNumber: 4,
    chapterTitle: "THE YELLOW FORTRESS",
    title: "THE ETERNAL NUMBER 7: 130 DECIBELS AND COUNTING",
    subtitle: "The handover to Ruturaj and the everlasting roar across Indian cricket.",
    eventDate: "2024–2026",
    location: "Pan-India Stadiums: Chepauk, Wankhede, Eden, Chinnaswamy",
    category: "CSK_LEGACY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "On the eve of the 2024 IPL season, Dhoni seamlessly handed the captaincy to young opener Ruturaj Gaikwad. Yet everywhere in India, stadiums turn into a deafening yellow pilgrimage whenever he walks out to bat.",
    narrative:
      "Apple Watches in stadiums routinely flash 'Loud Environment Warning (125-130 dB)' when Dhoni steps out of the dugout. Even in his forties, smoking 20 runs in 4 balls against Mumbai Indians at Wankhede or Delhi at Vizag, Dhoni plays purely for the unadulterated joy of the fans who love him.",
    meaning:
      "Dhoni transcended mere cricket statistics to become an emotion. Number 7 is not just a jersey; it is a permanent cultural landmark.",
    quote: {
      text: "As long as my body allows me to contribute and give back to the fans who have given me everything, I will be out there.",
      speaker: "MS Dhoni",
      sourceTitle: "CSK Post-Season Press Interaction",
      sourceUrl: "https://www.chennaisuperkings.com",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/trophies/2023_ipl.jpg",
      sourceUrl: null,
      attribution: "CSK / IPL",
      aspectRatio: "16:9",
    },
    tags: ["2024-2026", "ETERNAL 7", "DECIBEL RECORD", "LEGACY"],
    estimatedReadingTime: 2,
  },
];

export const COLLECTOR_BOOKS: CollectorBook[] = [
  // =========================================================================
  // BOOK I: 1995 to Mid-2007
  // =========================================================================
  {
    id: "book-1-the-genesis",
    volumeNumber: 1,
    romanNumeral: "I",
    title: "THE UNTAMED ROOTS & THE SWASHBUCKLER",
    shortTitle: "Vol I: The Roots (1995–2007)",
    subtitle: "Before Debut up to Before the 2007 T20 World Cup",
    era: "1995 – Mid 2007",
    timelineSpan: "Origins · Railway Platform 3 · Kenya · Vizag 148 · Jaipur 183*",
    tagline: "“Best thing about time — It changes.”",
    coverImage: "/images/book-cover-best-thing-about-time.jpg",
    themeColor: "#d97706", // Amber / leather brown
    spineColor: "#2e1c0c",
    accentGradient: "from-[#d97706] via-[#f59e0b] to-[#b45309]",
    description:
      "The untamed beginnings. From football goalposts in Ranchi and ticket collector shifts at Kharagpur Platform 3 to breaking into the Indian dressing room with long hair, unsparing velocity, and the world record 183* in Jaipur.",
    storyIds: BOOK_1_STORY_IDS,
    stories: getStoriesForIds(BOOK_1_STORY_IDS),
  },

  // =========================================================================
  // BOOK II: Sep 2007 to 2013
  // =========================================================================
  {
    id: "book-2-the-icc-trifecta",
    volumeNumber: 2,
    romanNumeral: "II",
    title: "THE GOLDEN ERA & THE ICC TRIFECTA",
    shortTitle: "Vol II: The Trifecta (2007–2013)",
    subtitle: "From the T20 World Cup 2007 up to the 2013 Champions Trophy",
    era: "Sep 2007 – 2013",
    timelineSpan: "Johannesburg 2007 · CB Series · Test Mace #1 · Wankhede 2011 · Edgbaston 2013",
    tagline: "“Dhoni finishes off in style. A magnificent strike into the crowd!”",
    coverImage: "/images/moments/moment_05_cwc_2011_final.png",
    themeColor: "#0284c7", // Sky blue / Sovereign ICC Navy
    spineColor: "#0c1e3a",
    accentGradient: "from-[#0284c7] via-[#38bdf8] to-[#0369a1]",
    description:
      "The golden zenith of Indian cricket. The young guard in South Africa, conquering Australia in the CB Series, lifting the Test Mace to become World No. 1, the iconic winning six on April 2, 2011, and completing the historic ICC white-ball trifecta at Edgbaston in 2013.",
    storyIds: BOOK_2_STORY_IDS,
    stories: getStoriesForIds(BOOK_2_STORY_IDS),
  },

  // =========================================================================
  // BOOK III: 2014 to 2019
  // =========================================================================
  {
    id: "book-3-the-final-salute",
    volumeNumber: 3,
    romanNumeral: "III",
    title: "THE SENIOR STATESMAN & THE FINAL SALUTE",
    shortTitle: "Vol III: The Final Salute (2014–2019)",
    subtitle: "The Test Exit, Paratrooper Wings, 0.08s Reflexes & 19:29 Farewell",
    era: "2014 – 2019",
    timelineSpan: "MCG 2014 · Balidan Maroon Wings · 0.08s Stumping · Bengaluru 1-Run · 19:29",
    tagline: "“From 1929 hrs consider me as Retired.”",
    coverImage: "/images/keeper/dhoni_lightning_stumping_008s.png",
    themeColor: "#15803d", // Army Green / Tricolor Royal
    spineColor: "#0f2615",
    accentGradient: "from-[#15803d] via-[#22c55e] to-[#166534]",
    description:
      "The selfless twilight. Walking away silently from Test cricket at the MCG, earning his Paratrooper wings in Agra, sprinting with one glove at Bengaluru, mentoring the next generation, and the poignant Instagram farewell at 19:29 hours on Independence Day.",
    storyIds: BOOK_3_STORY_IDS,
    stories: getStoriesForIds(BOOK_3_STORY_IDS),
  },

  // =========================================================================
  // BOOK IV: 2008 to 2026
  // =========================================================================
  {
    id: "book-4-the-yellow-fortress",
    volumeNumber: 4,
    romanNumeral: "IV",
    title: "THE YELLOW FORTRESS & THE CSK DYNASTY",
    shortTitle: "Vol IV: The Yellow Fortress (2008–2026)",
    subtitle: "IPL and CLT20 from the 2008 Inaugural Auction to 2026",
    era: "2008 – 2026",
    timelineSpan: "Whistle Podu · 5 IPL Championships · 2 CLT20 Titles · 3 AM Ahmedabad",
    tagline: "“Definitely Not. The Lion Never Retires.”",
    coverImage: "/images/trophies/2023_ipl.jpg",
    themeColor: "#eab308", // CSK Yellow & Gold
    spineColor: "#2b2207",
    accentGradient: "from-[#eab308] via-[#fde047] to-[#ca8a04]",
    description:
      "The immortal romance with Chennai Super Kings. 5 IPL championships, 2 Champions League T20 crowns, the emotional 2018 'Dad's Army' return, lifting Jadeja at 3:00 AM in Ahmedabad, and the enduring 130-decibel roars that echo through Indian cricket.",
    storyIds: [...BOOK_4_STORY_IDS, ...BOOK_4_EXTRA_STORIES.map((s) => s.id)],
    stories: [
      ...getStoriesForIds(BOOK_4_STORY_IDS),
      ...BOOK_4_EXTRA_STORIES,
    ],
  },
];
