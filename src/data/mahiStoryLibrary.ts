import type { StoryEntry, StorybookChapter } from "@/types/storybook";

export const STORYBOOK_CHAPTERS: StorybookChapter[] = [
  {
    id: "chapter-1-the-roots",
    number: 1,
    romanNumeral: "I",
    title: "THE ROOTS & THE AWAKENING",
    subtitle: "From MECON goalposts and railway platforms to the India cap (1995–2004).",
    epigraph: "Before there were stadium roars, there was the rhythm of a railway siding and a boy who refused to stay behind the line.",
    epigraphSource: "Editorial Prologue",
    storyIds: [
      "ranchi-goalkeeper-origins",
      "the-first-rajdoot-restoration",
      "kharagpur-ticket-collector",
      "kenya-tri-series-breakthrough",
      "chittagong-debut-runout",
    ],
    accentColor: "#d97706",
    coverImage: "/images/hero/hero_dhoni_duo.jpg",
  },
  {
    id: "chapter-2-the-arrival",
    number: 2,
    romanNumeral: "II",
    title: "THE SWASHBUCKLER UNLEASHED",
    subtitle: "Raw power, flowing locks, and demolishing bowling attacks (2005–2006).",
    epigraph: "They wanted classical elegance; he offered unsparing velocity and a mane of long hair that blew in the wind.",
    epigraphSource: "Editorial Commentary",
    storyIds: [
      "vizag-148-unleashed",
      "jaipur-183-destruction",
      "play-your-game-backing",
    ],
    accentColor: "#0284c7",
    coverImage: "/images/moments/moment_01_vizag_148.jpg",
  },
  {
    id: "chapter-3-the-first-world-cup",
    number: 3,
    romanNumeral: "III",
    title: "THE FEARLESS YOUNG GUARD",
    subtitle: "The South African spring and the birth of Captain Cool (2007).",
    epigraph: "When you have nothing to lose, intuition becomes your greatest tactical weapon.",
    epigraphSource: "Press Conference, Johannesburg, Sep 2007",
    storyIds: [
      "kingsmead-bowl-out-instinct",
      "johannesburg-joginder-final-over",
      "shirtless-trophy-handover",
    ],
    accentColor: "#059669",
    coverImage: "/images/moments/moment_03_t20_wc_2007.jpg",
  },
  {
    id: "chapter-4-quiet-domination",
    number: 4,
    romanNumeral: "IV",
    title: "THE ART OF QUIET DOMINATION",
    subtitle: "Silencing Australia, musical metaphors, and Test No. 1 (2008–2009).",
    epigraph: "Before I start I should say I read an article by you in Cricinfo. You'd said Australia were the favorites. Today I think me and the boys, we proved you wrong.",
    epigraphSource: "MS Dhoni, Post-Match Presentation to Ian Chappell, SCG, March 2, 2008",
    storyIds: [
      "cb-series-proving-cricinfo-wrong",
      "cb-series-silent-celebration",
      "kishore-kumar-to-sean-paul",
      "test-mace-brabourne-2009",
    ],
    accentColor: "#6366f1",
    coverImage: "/images/captain/dhoni_armband_calm.webp",
  },
  {
    id: "chapter-5-finishing-in-style",
    number: 5,
    romanNumeral: "V",
    title: "THE PINNACLE & THE SIX",
    subtitle: "Dharamsala rage, the yellow crown, and April 2, 2011 (2010–2011).",
    epigraph: "Dhoni finishes off in style. A magnificent strike into the crowd. India lift the World Cup after 28 years!",
    epigraphSource: "Ravi Shastri, Live Broadcast Commentary, Wankhede Stadium, April 2, 2011",
    storyIds: [
      "dharamsala-helmet-punch-2010",
      "csk-first-ipl-crown-2010",
      "stump-mic-chronicles",
      "promoting-ahead-of-yuvraj",
      "wankhede-kulasekara-winning-six",
      "honorary-lt-col-commission",
    ],
    accentColor: "#eab308",
    coverImage: "/images/moments/moment_05_cwc_2011_final.png",
  },
  {
    id: "chapter-6-wit-under-fire",
    number: 6,
    romanNumeral: "VI",
    title: "WIT UNDER FIRE & THE TRIFECTA",
    subtitle: "Deadpan press room replies, 224 at Chepauk, and Edgbaston (2012–2013).",
    epigraph: "I'm not here to prove to anyone how good I am. I am here to play for the country and do my job.",
    epigraphSource: "MS Dhoni, Post-Match Press Conference, Edgbaston, June 23, 2013",
    storyIds: [
      "process-over-result-doctrine",
      "helicopter-stool-bouncers-quip",
      "duckworth-lewis-deadpan-quip",
      "ask-physio-press-release-quip",
      "the-open-hotel-room-protocol",
      "chepauk-double-hundred-2013",
      "edgbaston-rain-champions-trophy",
      "not-here-to-prove-champions-trophy",
    ],
    accentColor: "#dc2626",
    coverImage: "/images/moments/moment_07_champions_trophy_2013.jpg",
  },
  {
    id: "chapter-7-discipline-and-defense",
    number: 7,
    romanNumeral: "VII",
    title: "DISCIPLINE, DEFENSE & DECIBELS",
    subtitle: "Silent Test exit, paratrooper jumps, and 0.08s reflexes (2014–2016).",
    epigraph: "You want me to retire? Do you think I am unfit? Can I survive till the 2019 World Cup? Then you have answered your own question!",
    epigraphSource: "MS Dhoni to Sam Ferris, Wankhede Press Room, March 31, 2016",
    storyIds: [
      "mcg-2014-silent-test-exit",
      "balidan-maroon-wings-jumps",
      "point-zero-eight-second-stumping",
      "bengaluru-sprint-single-glove",
      "you-want-me-to-retire-sam-ferris",
    ],
    accentColor: "#15803d",
    coverImage: "/images/keeper/dhoni_lightning_stumping_008s.png",
  },
  {
    id: "chapter-8-the-eternal-legend",
    number: 8,
    romanNumeral: "VIII",
    title: "THE ETERNAL LEGEND",
    subtitle: "Bikes in the garage, Kashmir patrol, 19:29 farewell, and 3 AM at Ahmedabad (2017–2023).",
    epigraph: "Thanks a lot for ur love and support throughout. from 1929 hrs consider me as Retired.",
    epigraphSource: "MS Dhoni, Official Instagram Announcement, August 15, 2020",
    storyIds: [
      "midnight-solo-ranchi-rides",
      "the-2018-comeback-tears",
      "dont-ride-all-bikes-at-a-time",
      "victor-force-kashmir-patrol",
      "solitary-walk-ranchi-outfield",
      "nineteen-twenty-nine-retirement",
      "the-mentor-silhouette",
      "lifting-jadeja-at-3am-2023",
    ],
    accentColor: "#facc15",
    coverImage: "/images/trophies/2023_ipl.jpg",
  },
];

export const MAHI_STORY_LIBRARY: StoryEntry[] = [
  // ========================================================
  // 1995: DAV SHYAMALI FOOTBALL GOALKEEPER
  // ========================================================
  {
    id: "ranchi-goalkeeper-origins",
    chapterId: "chapter-1-the-roots",
    chapterNumber: 1,
    chapterTitle: "THE ROOTS & THE AWAKENING",
    title: "THE GOALKEEPER UNDER THE CROSSBAR",
    subtitle: "Before the gloves caught leather, they blocked footballs on the red soil of Shyamali.",
    eventDate: "1995-07-15",
    location: "DAV Jawahar Vidya Mandir, Shyamali, Ranchi",
    category: "ORIGINS",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "In the mid-1990s, Ranchi was a quiet industrial township in Bihar (later Jharkhand). Dhoni was the school football team's fearless goalkeeper whose diving reflexes caught the eye of cricket coach Keshav Ranjan Banerjee.",
    narrative:
      "When coach Banerjee had no wicketkeeper for an upcoming school tournament, he spotted the athletic schoolboy diving across the muddy goalmouth. He asked Mahendra if he would try keeping wicket. Dhoni asked if he could bat too. That afternoon on the red clay of Shyamali, an unorthodox grip and raw peripheral vision took their first cricket stance.",
    meaning:
      "Dhoni's legendary low center of gravity and lateral reflex did not come from classical cricket academies. They were forged on football pitches where a goalkeeper has split-seconds to read the trajectory of a ball.",
    quote: {
      text: "He was a very good goalkeeper. His reflexes were extraordinary. When I needed a wicketkeeper, I thought why not try him? He was hesitant at first, but once he kept, he never looked back.",
      speaker: "Keshav Ranjan Banerjee (Dhoni's childhood coach)",
      sourceTitle: "The Hindu & ESPNcricinfo Archival Interview",
      sourceUrl: "https://www.thehindu.com/sport/cricket/how-banerjee-spotted-dhoni/article19245136.ece",
      publicationDate: "2016-09-28",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/hero/hero_dhoni_duo.jpg",
      sourceUrl: "https://www.espncricinfo.com/story/the-making-of-ms-dhoni-478672",
      attribution: "BCCI / DAV Shyamali School Archives",
      aspectRatio: "portrait",
    },
    tags: ["RANCHI", "ORIGINS", "GOALKEEPER", "CHILDHOOD"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 1998: FIRST RAJDOOT MOTORCYCLE
  // ========================================================
  {
    id: "the-first-rajdoot-restoration",
    chapterId: "chapter-1-the-roots",
    chapterNumber: 1,
    chapterTitle: "THE ROOTS & THE AWAKENING",
    title: "THE FIRST RAJDOOT: ₹4,500 AND GREASY HANDS",
    subtitle: "The battered two-stroke motorcycle bought second-hand that he rebuilt with his own hands.",
    eventDate: "1998-05-10",
    location: "Doranda, Ranchi",
    category: "PASSION",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "As a teenager in Ranchi with little money, Dhoni saved up ₹4,500 to buy an old, non-functional Rajdoot 350. His father thought it was an unnecessary expense.",
    narrative:
      "Dhoni stripped down the bike in his courtyard, cleaning spark plugs, unblocking the carburetor, and polishing the rusted exhaust pipe with kerosene. Even today, with a multi-crore fleet of imported superbikes in his garage, that battered Rajdoot still sits prominently in his Ranchi home, maintained in running condition.",
    meaning:
      "Dhoni's mechanical intuition mirrored his batting: he loved understanding how parts functioned together, repairing what was broken rather than discarding it.",
    quote: {
      text: "My first bike was a Rajdoot. I bought it second-hand for 4,500 rupees. I dismantled the engine myself to understand how it worked. I still have it, and I still kick-start it.",
      speaker: "MS Dhoni",
      sourceTitle: "Interview with Overdrive / Bike India",
      sourceUrl: "https://www.overdrive.in/",
      publicationDate: "2013-11-15",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2005.jpg",
      sourceUrl: "https://www.overdrive.in/",
      attribution: "Overdrive Magazine / Ranchi Personal Archives",
      aspectRatio: "portrait",
    },
    tags: ["RAJDOOT", "MOTORCYCLES", "RANCHI", "MECHANICAL"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2001: KHARAGPUR PLATFORM TTE 4165
  // ========================================================
  {
    id: "kharagpur-ticket-collector",
    chapterId: "chapter-1-the-roots",
    chapterNumber: 1,
    chapterTitle: "THE ROOTS & THE AWAKENING",
    title: "PLATFORM NUMBER THREE: TICKET COLLECTOR 4165",
    subtitle: "The South Eastern Railway uniform, night shifts, and an unyielding cricket hunger.",
    eventDate: "2001-09-01",
    location: "Kharagpur Railway Station, West Bengal",
    category: "ORIGINS",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "To support his middle-class family and secure a cricket allowance, Dhoni worked as a Travelling Ticket Examiner (TTE) with South Eastern Railway at Kharagpur from 2001 to 2003.",
    narrative:
      "By day, he walked the long, crowded platforms of Kharagpur checking passenger tickets in black blazer and trousers. By afternoon, he rushed to the SER stadium nets to smash bowling attacks into the railway quarters. The monotony of punch tickets and night shifts was stifling, yet it grounded his patience. When the Indian Railways selection stalled, he risked financial security, resigned his government post, and packed his kitbag back to Ranchi.",
    meaning:
      "Dhoni understood the fear of ordinary middle-class failure long before he understood the adulation of millions. He knew what a train ticket was worth, and he knew the courage required to step off the safe train.",
    quote: {
      text: "The railway job gave me independence, but cricket was always the priority. When you work at a railway station, you see life from every angle. It taught me how to stay patient in chaotic situations.",
      speaker: "MS Dhoni",
      sourceTitle: "BCCI / Railway Sports Promotion Board Centenary Interview",
      sourceUrl: "https://www.bcci.tv/",
      publicationDate: "2011-04-10",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2004.png",
      sourceUrl: "https://www.espncricinfo.com/cricketers/ms-dhoni-28081",
      attribution: "South Eastern Railway Archives / Kharagpur Division",
      aspectRatio: "landscape",
    },
    tags: ["KHARAGPUR", "RAILWAYS", "STRUGGLE", "TTE"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2004: KENYA TRI-SERIES BREAKTHROUGH
  // ========================================================
  {
    id: "kenya-tri-series-breakthrough",
    chapterId: "chapter-1-the-roots",
    chapterNumber: 1,
    chapterTitle: "THE ROOTS & THE AWAKENING",
    title: "NAIROBI: THE INNINGS THAT BROKE THE DOOR DOWN",
    subtitle: "India A tri-series in Kenya: 362 runs at an average of 72.40.",
    eventDate: "2004-08-12",
    location: "Gymkhana Club Ground, Nairobi, Kenya",
    category: "BREAKTHROUGH",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "Tipped off by talent scout Prakash Poddar, national selectors sent Dhoni on the India A tour of Zimbabwe and Kenya. Against Pakistan A's seasoned bowling attack, Dhoni went berserk.",
    narrative:
      "Facing an attack that included Shabbir Ahmed and Iftikhar Anjum, the 23-year-old Dhoni hammered back-to-back centuries (120 and 119*) in Nairobi. He treated 90mph fast bowlers with disdain, stepping out to loft them over deep extra cover. In the commentary box and selection rooms, captain Sourav Ganguly was phoned: 'We have found a keeper who can smash anyone in the world.'",
    meaning:
      "Before Kenya, Indian cricket sought wicketkeepers who could hold a bat. After Kenya, Indian cricket realized it had found a ferocious match-winner who happened to wear gloves.",
    quote: {
      text: "I was told by the scouts that this boy hits the ball harder than anyone in domestic cricket. When we saw his numbers in Kenya, there was no doubt he belonged to international cricket.",
      speaker: "Sourav Ganguly (Indian Captain, 2004)",
      sourceTitle: "A Century is Not Enough / India Today Conclave",
      sourceUrl: "https://www.indiatoday.in/sports/cricket",
      publicationDate: "2018-03-12",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2005.jpg",
      sourceUrl: "https://www.espncricinfo.com/series/kenya-tri-nation-tournament-2004-138385",
      attribution: "ICC / Kenya Cricket Archives",
      aspectRatio: "portrait",
    },
    tags: ["KENYA", "INDIA_A", "SELECTION", "BREAKTHROUGH"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2004: DEBUT IN CHITTAGONG
  // ========================================================
  {
    id: "chittagong-debut-runout",
    chapterId: "chapter-1-the-roots",
    chapterNumber: 1,
    chapterTitle: "THE ROOTS & THE AWAKENING",
    title: "A DUCK IN CHITTAGONG: THE HARDEST START",
    subtitle: "Zero runs, one ball faced, run out without facing a legal stroke.",
    eventDate: "2004-12-23",
    location: "MA Aziz Stadium, Chittagong, Bangladesh",
    category: "BREAKTHROUGH",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "On December 23, 2004, MS Dhoni was handed India ODI Cap No. 156 in Chittagong. He entered to bat at No. 7 with high expectations.",
    narrative:
      "Batting alongside Mohammad Kaif, Dhoni called for a sharp single off his very first delivery. A direct hit from Khaled Mashud found him inches short of his crease. Zero runs. Duck. He walked back with his head high, long locks tucked behind his helmet. Lesser characters would have been overwhelmed by self-doubt. Dhoni simply returned to the nets the next morning.",
    meaning:
      "Destiny rarely arrives in fairy-tale fashion. Dhoni's international career began with the humblest score possible, testing his internal equilibrium before offering him glory.",
    quote: {
      text: "I was run out on the first ball in my debut match. When you start with zero, you know the only way forward is up.",
      speaker: "MS Dhoni",
      sourceTitle: "Dhoni: What It Takes To Be A Leader / Star Sports Special",
      sourceUrl: "https://www.bcci.tv/",
      publicationDate: "2015-02-14",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_dhoni_debut_runout_2004.jpg",
      sourceUrl: "https://www.espncricinfo.com/series/india-tour-of-bangladesh-2004-05-62325/bangladesh-vs-india-1st-odi-64917/full-scorecard",
      attribution: "India Today / BCB Official Archives",
      aspectRatio: "landscape",
    },
    tags: ["DEBUT", "CHITTAGONG", "RESILIENCE", "FIRST_BALL"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2005: VIZAG 148
  // ========================================================
  {
    id: "vizag-148-unleashed",
    chapterId: "chapter-2-the-arrival",
    chapterNumber: 2,
    chapterTitle: "THE SWASHBUCKLER UNLEASHED",
    title: "VIZAG 148: SOURAV'S GAMBLE AND THE THUNDERCLAP",
    subtitle: "123 balls, 15 boundaries, 4 sixes. Pakistan's bowling attack torn apart.",
    eventDate: "2005-04-05",
    location: "ACA-VDCA Stadium, Visakhapatnam",
    category: "BREAKTHROUGH",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "Trailing in the 2nd ODI against Inzamam-ul-Haq's Pakistan, captain Sourav Ganguly surrendered his own No. 3 slot and ordered Dhoni: 'Go out and play your natural game.'",
    narrative:
      "Dhoni walked out in scorching Vizag heat and immediately dismantled Mohammad Sami, Abdul Razzaq, and Shahid Afridi. It was violent, fearless, bottom-handed striking of a kind Indian cricket had never witnessed from a wicketkeeper. His maiden ODI century arrived in just 88 balls. With long hair flowing and golden wristbands gleaming, he swung his bat like an axe.",
    meaning:
      "Vizag was not just a hundred; it was a cultural shift. The small-town boy showed that brute strength, unconventional technique, and mental defiance could dominate world-class bowling.",
    quote: {
      text: "I told Rahul Dravid, 'Let's send Dhoni at No. 3.' He had the freedom to hit the ball. The moment he reached fifty, I knew we had found someone truly extraordinary.",
      speaker: "Sourav Ganguly",
      sourceTitle: "BCCI Nostalgia Series / ESPNcricinfo",
      sourceUrl: "https://www.espncricinfo.com/series/pakistan-tour-of-india-2004-05-61530/india-vs-pakistan-2nd-odi-64942/full-scorecard",
      publicationDate: "2015-04-05",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_01_vizag_148.jpg",
      sourceUrl: "https://www.espncricinfo.com/series/pakistan-tour-of-india-2004-05-61530/india-vs-pakistan-2nd-odi-64942/full-scorecard",
      attribution: "BCCI Archival Photo / ESPNcricinfo",
      aspectRatio: "landscape",
    },
    tags: ["VIZAG", "148", "PAKISTAN", "BREAKTHROUGH", "LONG_HAIR"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2005: JAIPUR 183*
  // ========================================================
  {
    id: "jaipur-183-destruction",
    chapterId: "chapter-2-the-arrival",
    chapterNumber: 2,
    chapterTitle: "THE SWASHBUCKLER UNLEASHED",
    title: "JAIPUR 183*: THE BEAST OF SAWAI MANSINGH",
    subtitle: "Chasing 299 against Muralitharan & Vaas: 183 not out off 145 balls with 10 towering sixes.",
    eventDate: "2005-10-31",
    location: "Sawai Mansingh Stadium, Jaipur",
    category: "BREAKTHROUGH",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "Sri Lanka set India an intimidating target of 299. When Sachin Tendulkar was dismissed in the first over, Sawai Mansingh Stadium fell dead silent. Out walked Dhoni at No. 3.",
    narrative:
      "What followed was the highest individual ODI score by a wicketkeeper in cricket history. Chaminda Vaas was lofted over extra cover; Muttiah Muralitharan was repeatedly swept and dragged over midwicket. Even with severe cramps in the 40th over requiring Virender Sehwag as a runner, Dhoni finished the chase with 23 balls to spare, launching a final six over long-on.",
    meaning:
      "The 183* settled the question of whether Vizag was a fluke. Dhoni proved that his aggression was not recklessness; it was calculated demolition paired with immense physical endurance.",
    quote: {
      text: "To hit ten sixes in an ODI against an attack featuring Murali and Vaas while chasing 300 was unheard of. From that night, nobody doubted who was the most dangerous batter in Asia.",
      speaker: "Kumar Sangakkara",
      sourceTitle: "Sky Sports Cricket Masterclass",
      sourceUrl: "https://www.espncricinfo.com/series/sri-lanka-tour-of-india-2005-06-211365/india-vs-sri-lanka-3rd-odi-223634/full-scorecard",
      publicationDate: "2017-06-15",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_02_jaipur_183.jpg",
      sourceUrl: "https://www.espncricinfo.com/series/sri-lanka-tour-of-india-2005-06-211365/india-vs-sri-lanka-3rd-odi-223634/full-scorecard",
      attribution: "BCCI / Sawai Mansingh Stadium Archives",
      aspectRatio: "landscape",
    },
    tags: ["JAIPUR", "183*", "RECORD", "SRI_LANKA", "CHASE"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2006: "PLAY YOUR GAME, I'VE GOT YOUR BACK"
  // ========================================================
  {
    id: "play-your-game-backing",
    chapterId: "chapter-2-the-arrival",
    chapterNumber: 2,
    chapterTitle: "THE SWASHBUCKLER UNLEASHED",
    title: "PLAY YOUR GAME: I'VE GOT YOUR BACK",
    subtitle: "The culture of absolute backing: Empowering young batters without fear of failure.",
    eventDate: "2006-02-19",
    location: "Gaddafi Stadium, Lahore, Pakistan",
    category: "LEADERSHIP",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "During the 2006 ODI series in Pakistan, India's middle order featured young talents like Suresh Raina and Yuvraj Singh. Dhoni established a dressing room covenant that shaped an entire generation.",
    narrative:
      "When promoting rookies or walking out to bat with newcomers in tense chases, Dhoni delivered a simple, transformative sentence: 'Play your natural game, don't worry about getting out. I have got your back.' Suresh Raina and Rohit Sharma repeatedly credited this psychological safety blanket for their growth. If a batter attacked and fell, Dhoni defended them unconditionally in team meetings.",
    meaning:
      "Young cricketers often fail because they play defensively to protect their place in the team. By absorbing the blame and assuring youngsters that he was there to finish the match, Dhoni unlocked their fearless best.",
    quote: {
      text: "Play your game, I've got your back. Don't worry about the scoreboard or what the newspapers say. Just express yourself.",
      speaker: "MS Dhoni to Suresh Raina & Young Batters",
      sourceTitle: "Suresh Raina Autobiography: Believe / Penguin India",
      sourceUrl: "https://penguin.co.in/book/believe/",
      publicationDate: "2021-06-14",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/odi/dhoni_long_hair_raina.jpg",
      sourceUrl: "https://penguin.co.in/",
      attribution: "BCCI Archives / Getty Images",
      aspectRatio: "portrait",
    },
    tags: ["BACKING", "ROOKIES", "RAINA", "ROHIT", "LEADERSHIP"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2007: KINGSMEAD BOWL-OUT
  // ========================================================
  {
    id: "kingsmead-bowl-out-instinct",
    chapterId: "chapter-3-the-first-world-cup",
    chapterNumber: 3,
    chapterTitle: "THE FEARLESS YOUNG GUARD",
    title: "THE KINGSMEAD BOWL-OUT: PRACTICE OVER TRADITION",
    subtitle: "Durban, 2007: Choosing part-timers who practiced over regular strike bowlers.",
    eventDate: "2007-09-14",
    location: "Kingsmead, Durban, South Africa",
    category: "WORLD_CUP",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "When the India vs Pakistan group match tied at Kingsmead in the inaugural ICC World Twenty20, a soccer-style bowl-out was required. While Pakistan chose frontline pacers Umar Gul and Yasir Arafat, Dhoni chose non-regular bowlers.",
    narrative:
      "Dhoni did not pick his quickest bowlers; he picked players who practiced hitting the single stump during warm-ups: Virender Sehwag, Robin Uthappa, and Harbhajan Singh. Moreover, Dhoni knelt down directly behind the middle stump without gloves to give them a laser-sharp visual target. India hit 3 out of 3; Pakistan missed all 3. India won 3-0.",
    meaning:
      "Even in his first tournament as Indian captain, Dhoni ignored conventional wisdom in favor of cold psychological clarity and prepared execution.",
    quote: {
      text: "We had practiced the bowl-out in our warm-up sessions before the match. I knew who was hitting the stumps consistently. Sehwag and Uthappa were hitting them, so I had total confidence in them.",
      speaker: "MS Dhoni",
      sourceTitle: "Post-Match Press Conference, Durban / ICC Media",
      sourceUrl: "https://www.icc-cricket.com/",
      publicationDate: "2007-09-14",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_2007_bowl_out.jpg",
      sourceUrl: "https://www.espncricinfo.com/series/icc-world-twenty20-2007-08-286109/india-vs-pakistan-10th-match-group-d-287862/full-scorecard",
      attribution: "ANI / ICC World Twenty20 Archives",
      aspectRatio: "landscape",
    },
    tags: ["2007_T20_WC", "BOWL_OUT", "DURBAN", "TACTICS"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2007: JOGINDER SHARMA GAMBIT
  // ========================================================
  {
    id: "johannesburg-joginder-final-over",
    chapterId: "chapter-3-the-first-world-cup",
    chapterNumber: 3,
    chapterTitle: "THE FEARLESS YOUNG GUARD",
    title: "THE 20TH OVER: THE JOGINDER SHARMA GAMBIT",
    subtitle: "Pakistan needed 13 runs off 6 balls with Misbah firing. Dhoni tossed the ball to Haryana's Joginder Sharma.",
    eventDate: "2007-09-24",
    location: "Wanderers Stadium, Johannesburg, South Africa",
    category: "WORLD_CUP",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "The final of the 2007 World Twenty20 came down to the wire. Harbhajan Singh had one over remaining, but Misbah had taken 19 off his previous over. Dhoni called Haryana all-rounder Joginder Sharma.",
    narrative:
      "A wide first ball was followed by a colossal Misbah six down the ground. 6 runs needed off 4 balls. Dhoni walked to Joginder, placed an arm on his shoulder, and spoke quietly: 'Don't worry about the outcome. Just bowl what you can control. If we lose, it is on me.' On the third ball, Misbah scooped towards fine leg. Sreesanth settled under the catch. India were World Champions.",
    meaning:
      "True leadership is taking personal ownership of potential failure so your subordinates can execute without fear. In that Johannesburg over, Captain Cool was born.",
    quote: {
      text: "I told Joginder: 'You have bowled so many overs in domestic cricket with passion. Just bowl your normal ball. If we lose, I will take the blame.' That relieved his pressure.",
      speaker: "MS Dhoni",
      sourceTitle: "ICC Post-Final Media Conference, Johannesburg",
      sourceUrl: "https://www.icc-cricket.com/",
      publicationDate: "2007-09-24",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_03_t20_wc_2007.jpg",
      sourceUrl: "https://www.espncricinfo.com/series/icc-world-twenty20-2007-08-286109/india-vs-pakistan-final-287879/full-scorecard",
      attribution: "ICC / Wanderers Stadium Archives",
      aspectRatio: "landscape",
    },
    tags: ["2007_T20_WC", "JOGINDER", "MISBAH", "CHAMPIONS", "WANDERERS"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2007: SHIRTLESS TROPHY HANDOVER
  // ========================================================
  {
    id: "shirtless-trophy-handover",
    chapterId: "chapter-3-the-first-world-cup",
    chapterNumber: 3,
    chapterTitle: "THE FEARLESS YOUNG GUARD",
    title: "GIVING AWAY THE SHIRT: THE UNASSUMING CELEBRATION",
    subtitle: "Taking off his India match jersey to gift a young South African fan in Johannesburg.",
    eventDate: "2007-09-24",
    location: "Wanderers Stadium, Johannesburg",
    category: "WORLD_CUP",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "While the entire Indian contingent danced and hugged the ICC trophy on the podium, Dhoni quietly walked to the boundary rope.",
    narrative:
      "Surrounded by cameramen, Dhoni spotted a young boy cheering through the fence. Without fanfare, the Indian captain stripped off his official match jersey, handed it to the child, and joined the team photo standing quietly at the very edge of the frame, holding neither the trophy nor the center stage.",
    meaning:
      "From his very first world title, Dhoni established his defining trait: victories belong to the team and the fans; the captain is merely the custodian.",
    quote: {
      text: "The trophy belongs to the players who worked hard. As a captain, your job finishes when the match ends. Let the youngsters celebrate.",
      speaker: "MS Dhoni",
      sourceTitle: "Wisden India Retrospective",
      sourceUrl: "https://www.wisden.com/",
      publicationDate: "2012-09-24",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/trophies/2007_t20_wc.jpg",
      sourceUrl: "https://www.icc-cricket.com/",
      attribution: "Gallo Images / Getty Images / ICC",
      aspectRatio: "portrait",
    },
    tags: ["2007_T20_WC", "HUMILITY", "JERSEY", "CELEBRATION"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2008: CB SERIES FINAL 1: "WE PROVED YOU WRONG, IAN"
  // ========================================================
  {
    id: "cb-series-proving-cricinfo-wrong",
    chapterId: "chapter-4-quiet-domination",
    chapterNumber: 4,
    chapterTitle: "THE ART OF QUIET DOMINATION",
    title: "PROVING CRICINFO WRONG: THE IAN CHAPPELL REPLY",
    subtitle: "SCG, March 2, 2008: Confronting expert doubt on live television with a fearless smile.",
    eventDate: "2008-03-02",
    location: "Sydney Cricket Ground, Sydney, Australia",
    category: "LEADERSHIP",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "Ahead of the Commonwealth Bank Series Finals, Australian legends and cricket columnists on Cricinfo wrote off India's youthful squad, declaring Ricky Ponting's Australian juggernaut clear favorites.",
    narrative:
      "India stunned Australia in the first final at the SCG by 6 wickets. At the post-match presentation, former Australian captain Ian Chappell held the microphone to interview Dhoni. Before answering any technical question, Dhoni looked directly at Chappell and delivered an unforgettable opening line that shook the broadcast booth.",
    meaning:
      "Dhoni never suffered from an inferiority complex against Australian swagger. He read the critics, digested their skepticism, and dismantled their assertions with ice-cold poise on their home turf.",
    quote: {
      text: "Before I start I should say I read an article by you in Cricinfo. You'd said Australia were the favorites. Today I think me and the boys, we proved you wrong.",
      speaker: "MS Dhoni to Ian Chappell",
      sourceTitle: "Channel 9 Live Broadcast Post-Match Presentation / SCG",
      sourceUrl: "https://www.espncricinfo.com/series/commonwealth-bank-series-2007-08-291344/australia-vs-india-1st-final-291371/match-report",
      publicationDate: "2008-03-02",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/trophies/2008_cb_series.jpg",
      sourceUrl: "https://www.espncricinfo.com/",
      attribution: "Channel 9 / Cricket Australia Archives",
      aspectRatio: "portrait",
    },
    tags: ["CB_SERIES", "IAN_CHAPPELL", "CRICINFO", "PROVED_WRONG", "AUSTRALIA"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2008: CB SERIES FINAL 2: THE SILENT CELEBRATION
  // ========================================================
  {
    id: "cb-series-silent-celebration",
    chapterId: "chapter-4-quiet-domination",
    chapterNumber: 4,
    chapterTitle: "THE ART OF QUIET DOMINATION",
    title: "CB SERIES 2008: 'DO NOT CELEBRATE IN FRONT OF AUSTRALIA'",
    subtitle: "A silent handshake in Brisbane: Demolishing Australian psychological dominance.",
    eventDate: "2008-03-04",
    location: "Gabba, Brisbane, Australia",
    category: "LEADERSHIP",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "Following the Sydney triumph, India sealed the best-of-three CB Series at the Gabba. In the dressing room before the winning runs, Dhoni issued a strict directive.",
    narrative:
      "Dhoni ordered his squad: 'When we win, no wild shouting, no jumping, no high-fives.' India sealed the series win. Dhoni walked out calmly, shook Ponting's hand as if it were a routine Tuesday practice, and walked off. The psychological message was devastating: beating Australia was no longer an upset; it was business as usual.",
    meaning:
      "Dhoni understood that celebrating wildly acknowledges that the opponent was superior. Composure was his psychological warfare.",
    quote: {
      text: "Dhoni told us: 'If you celebrate like you just won the lottery, Australia will think this was a fluke. Walk off calmly so they know we expect to beat them every time.'",
      speaker: "Bharat Sundaresan (Author, The Dhoni Touch)",
      sourceTitle: "The Dhoni Touch: Unravelling the Enigma / Penguin India",
      sourceUrl: "https://penguin.co.in/book/the-dhoni-touch/",
      publicationDate: "2018-05-10",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_dhoni_cb_series_2008_toss.jpg",
      sourceUrl: "https://www.espncricinfo.com/series/commonwealth-bank-series-2007-08-291344/australia-vs-india-2nd-final-291372/full-scorecard",
      attribution: "Cricket Australia / Wikimedia Commons Archives",
      aspectRatio: "landscape",
    },
    tags: ["CB_SERIES", "AUSTRALIA", "PSYCHOLOGY", "GABBA"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2008: KISHORE KUMAR TO SEAN PAUL
  // ========================================================
  {
    id: "kishore-kumar-to-sean-paul",
    chapterId: "chapter-4-quiet-domination",
    chapterNumber: 4,
    chapterTitle: "THE ART OF QUIET DOMINATION",
    title: "FROM KISHORE KUMAR TO SEAN PAUL",
    subtitle: "November 2008: The musical metaphor capturing Indian cricket's generational transition.",
    eventDate: "2008-11-20",
    location: "Vidarbha Cricket Association Stadium, Nagpur",
    category: "LEADERSHIP",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "As legends like Sourav Ganguly and Anil Kumble retired and young athletes entered the squad, journalists questioned Dhoni on how the dressing room atmosphere was evolving.",
    narrative:
      "Instead of a dry corporate answer about squad regeneration, Dhoni smiled and offered a legendary musical analogy: 'From Kishore Kumar, we have gone to Sean Paul.' He explained that the dressing room playlist had shifted from classic retro melodies to energetic dancehall beats, and the fielding energy on the pitch mirrored that exact speed.",
    meaning:
      "Dhoni possessed a genius for simplifying complex organizational transformations into colorful, relatable metaphors that disarmed the media and defined team identity.",
    quote: {
      text: "From Kishore Kumar, we have gone to Sean Paul. The music in the dressing room has changed, the energy has changed, and the running between wickets has changed.",
      speaker: "MS Dhoni",
      sourceTitle: "BCCI Press Conference / Nagpur Test Series",
      sourceUrl: "https://www.espncricinfo.com/",
      publicationDate: "2008-11-20",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2008.jpg",
      sourceUrl: "https://www.espncricinfo.com/",
      attribution: "BCCI Press Archive",
      aspectRatio: "portrait",
    },
    tags: ["KISHORE_KUMAR", "SEAN_PAUL", "TRANSITION", "METAPHOR"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2009: TEST MACE AT BRABOURNE
  // ========================================================
  {
    id: "test-mace-brabourne-2009",
    chapterId: "chapter-4-quiet-domination",
    chapterNumber: 4,
    chapterTitle: "THE ART OF QUIET DOMINATION",
    title: "THE TEST MACE AT BRABOURNE: WORLD NUMBER ONE",
    subtitle: "December 6, 2009: Leading India to the pinnacle of Test cricket for the first time in history.",
    eventDate: "2009-12-06",
    location: "Brabourne Stadium, Mumbai",
    category: "CAPTAINCY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "India defeated Sri Lanka by an innings and 24 runs in the 3rd Test at Brabourne to take the series 2-0 and claim the ICC Test Championship mace.",
    narrative:
      "While Dhoni was celebrated as a limited-overs wizard, his Test captaincy was built on quiet attrition, managing the legendary golden generation of Tendulkar, Dravid, Laxman, and Sehwag. Holding the silver ICC mace on the Brabourne outfield, Dhoni insisted that former captains and veteran players share the trophy, refusing to elevate himself above the team's historic 77-year Test journey.",
    meaning:
      "Dhoni bridged the aristocratic tradition of Indian Test cricket with the aggressive ambition of the modern era, managing legends with total respect while instilling ruthless tactical discipline.",
    quote: {
      text: "Becoming World No. 1 in Test cricket is a tribute to all the cricketers who have played for India over the decades. It's the ultimate format, and getting to the top requires sustained excellence over years.",
      speaker: "MS Dhoni",
      sourceTitle: "ICC Test Championship Presentation, Brabourne Stadium",
      sourceUrl: "https://www.icc-cricket.com/",
      publicationDate: "2009-12-06",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/trophies/2009_test_mace.png",
      sourceUrl: "https://www.espncricinfo.com/series/sri-lanka-tour-of-india-2009-10-428435/india-vs-sri-lanka-3rd-test-428448/full-scorecard",
      attribution: "ICC / Brabourne Stadium Archives",
      aspectRatio: "portrait",
    },
    tags: ["TEST_CRICKET", "NO_1_MACE", "BRABOURNE", "2009"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2010: DHARAMSALA HELMET PUNCH
  // ========================================================
  {
    id: "dharamsala-helmet-punch-2010",
    chapterId: "chapter-5-finishing-in-style",
    chapterNumber: 5,
    chapterTitle: "THE PINNACLE & THE SIX",
    title: "DHARAMSALA 2010: THE UNLEASHED RAGE",
    subtitle: "16 runs needed off the final over from Irfan Pathan. The rare crack in the ice.",
    eventDate: "2010-04-18",
    location: "HPCA Stadium, Dharamsala",
    category: "FINISHING",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "Chennai Super Kings were on the brink of IPL elimination. Chasing 193 against Kings XI Punjab, CSK needed 16 runs off the last over.",
    narrative:
      "Dhoni took strike against Irfan Pathan. First ball: boundary past long-off. Second ball: two runs. Third ball: colossal six over long-on. Fourth ball: another towering six over wide long-on into the Himalayan night. As the ball disappeared, the normally stone-faced Dhoni turned to his dugout, roared, and punched himself hard on the jaw with his gloved fist. It remains one of the single most raw displays of emotion in his career.",
    meaning:
      "Even glaciers have volcanoes beneath them. The Dharamsala helmet punch revealed the ferocious, boiling competitive fire that Dhoni usually concealed beneath his placid exterior.",
    quote: {
      text: "When you play for a franchise and people invest emotion, you feel responsible. My emotions got the better of me. When you work so hard and cross the line, sometimes it just spills out.",
      speaker: "MS Dhoni",
      sourceTitle: "IPL Post-Match Presentation, Dharamsala",
      sourceUrl: "https://www.iplt20.com/",
      publicationDate: "2010-04-18",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_04_dharamsala_2010.png",
      sourceUrl: "https://www.iplt20.com/match/2010/54",
      attribution: "BCCI / IPL Official Archives",
      aspectRatio: "landscape",
    },
    tags: ["DHARAMSALA", "CSK", "FINISHER", "PUNCH", "IPL2010"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2010: FIRST IPL CROWN (DY PATIL)
  // ========================================================
  {
    id: "csk-first-ipl-crown-2010",
    chapterId: "chapter-5-finishing-in-style",
    chapterNumber: 5,
    chapterTitle: "THE PINNACLE & THE SIX",
    title: "DY PATIL 2010: THE FIRST GOLDEN CROWN",
    subtitle: "Defeating Mumbai Indians in their backyard to secure Chennai Super Kings' first IPL championship.",
    eventDate: "2010-04-25",
    location: "DY Patil Stadium, Navi Mumbai",
    category: "CSK_LEGACY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "After agonizing near-misses in 2008 and 2009, Chennai Super Kings faced Sachin Tendulkar's formidable Mumbai Indians in the 2010 IPL final.",
    narrative:
      "Defending 168, Dhoni placed a famously bizarre fielding trap for the explosive Kieron Pollard: a straight mid-off placed unusually close to the bowler's stumps. Pollard drove firmly, and the ball flew directly into the hands of Matthew Hayden placed exactly where Dhoni had stationed him. CSK won by 22 runs, clinching their maiden crown and inaugurating the yellow dynasty.",
    meaning:
      "The victory cemented Dhoni's tactical genius in franchise cricket: he did not react to power; he baited it with precision field placements.",
    quote: {
      text: "The mid-off fielder for Pollard was a premeditated move. We knew he likes to hit straight down the ground. In T20 cricket, you have to think one step ahead of the batsman.",
      speaker: "MS Dhoni",
      sourceTitle: "IPL Post-Final Presentation, DY Patil Stadium",
      sourceUrl: "https://www.iplt20.com/",
      publicationDate: "2010-04-25",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/trophies/2010_ipl.jpg",
      sourceUrl: "https://www.iplt20.com/match/2010/60",
      attribution: "IPL / BCCI Archives",
      aspectRatio: "landscape",
    },
    tags: ["CSK", "IPL2010", "DY_PATIL", "FIRST_TITLE", "POLLARD_TRAP"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2010: STUMP MIC CHRONICLES
  // ========================================================
  {
    id: "stump-mic-chronicles",
    chapterId: "chapter-5-finishing-in-style",
    chapterNumber: 5,
    chapterTitle: "THE PINNACLE & THE SIX",
    title: "THE STUMP MIC CHRONICLES: CHESS MASTER WITH A SENSE OF HUMOUR",
    subtitle: "'Oye Sree idhar dekh...' Tactical puppet-mastery caught by broadcast sensors.",
    eventDate: "2010-11-20",
    location: "Sardar Patel Stadium, Motera, Ahmedabad",
    category: "PERSONALITY",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "Dhoni's proximity to the stump microphone gave television viewers an unvarnished masterclass in field placement, psychology, and dry humor.",
    narrative:
      "Whether telling Sreesanth 'girlfriend nahi hai udhar, idhar dekh le' when he was distracted at fine leg, instructing Kuldeep Yadav 'tujhe ball ghumani hai, wicket main le lunga', or warning Jadeja 'ek goli idhar udhar mat fenk', Dhoni controlled Indian fielding like a puppet master with a whisper.",
    meaning:
      "Dhoni's stump mic comments demonstrated that leadership did not require angry gesturing or theatrics. A razor-sharp tactical command delivered with deadpan wit kept his players relaxed yet alert.",
    quote: {
      text: "Oye Sree idhar dekh, girlfriend nahi hai udhar, idhar dekh le!",
      speaker: "MS Dhoni to S. Sreesanth",
      sourceTitle: "BCCI Live Stump Microphone Broadcast / Test Match vs New Zealand",
      sourceUrl: "https://www.bcci.tv/",
      publicationDate: "2010-11-20",
      verificationStatus: "VERIFIED",
      originalLanguage: "HINDI",
      hindiText: "ओए श्री इधर देख, गर्लफ्रेंड नहीं है उधर, इधर देख ले!",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/keeper/dhoni_gloves_bg.webp",
      sourceUrl: "https://www.bcci.tv/",
      attribution: "BCCI Broadcast Archive",
      aspectRatio: "landscape",
    },
    tags: ["STUMP_MIC", "HUMOUR", "SREESANTH", "TACTICS"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2011: PROMOTING AHEAD OF YUVRAJ
  // ========================================================
  {
    id: "promoting-ahead-of-yuvraj",
    chapterId: "chapter-5-finishing-in-style",
    chapterNumber: 5,
    chapterTitle: "THE PINNACLE & THE SIX",
    title: "APRIL 2, 2011: 'I AM GOING IN NEXT'",
    subtitle: "At 114/3 in the World Cup Final, Dhoni walked past coach Gary Kirsten and in-form Yuvraj Singh.",
    eventDate: "2011-04-02",
    location: "Wankhede Stadium, Mumbai",
    category: "WORLD_CUP",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "Chasing 275 in the 2011 World Cup Final against Sri Lanka, India lost Virat Kohli at 114/3. Yuvraj Singh had four Man of the Match awards in the tournament. Dhoni had scored barely 150 runs in the entire tournament.",
    narrative:
      "When the wicket fell, Dhoni stood up, strapped on his pads, and told coach Gary Kirsten: 'I am going next.' His reasoning was purely tactical: Sri Lanka had Muttiah Muralitharan and Suraj Randiv bowling off-spin. An off-spinner turns the ball away from a left-hander (Yuvraj) but into a right-hander (Dhoni). Having faced Muralitharan for years in the CSK nets, Dhoni knew his doosra. Kirsten nodded: 'Go.'",
    meaning:
      "True greatness does not hide behind form or statistics when history calls. Dhoni stepped up at the defining crisis of Indian cricket history, willingly placing his entire legacy on the line.",
    quote: {
      text: "I knew Murali was bowling. I had played him so much in the CSK nets. If I stayed out, he would test Yuvraj. I told Gary, 'I'm going.' Gary just said, 'Good luck.'",
      speaker: "MS Dhoni",
      sourceTitle: "The Hindu & BCCI Special 2011 World Cup 10th Anniversary",
      sourceUrl: "https://www.thehindu.com/sport/cricket/2011-world-cup-dhoni-gamble/article34221890.ece",
      publicationDate: "2021-04-02",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_05_cwc_2011_final.png",
      sourceUrl: "https://www.espncricinfo.com/series/icc-cricket-world-cup-2010-11-381449/india-vs-sri-lanka-final-433606/full-scorecard",
      attribution: "BCCI / ICC World Cup 2011 Archives",
      aspectRatio: "landscape",
    },
    tags: ["2011_WORLD_CUP", "WANKHEDE", "YUVRAJ", "TACTICS", "GARY_KIRSTEN"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2011: THE KULASEKARA WINNING SIX & FINISHING IDENTITY
  // ========================================================
  {
    id: "wankhede-kulasekara-winning-six",
    chapterId: "chapter-5-finishing-in-style",
    chapterNumber: 5,
    chapterTitle: "THE PINNACLE & THE SIX",
    title: "THE MILLION-DECIBEL NIGHT: 'DHONI FINISHES OFF IN STYLE'",
    subtitle: "Unbeaten 91 off 79 balls. Nuwan Kulasekara to Dhoni. Over long-on into the Mumbai night.",
    eventDate: "2011-04-02",
    location: "Wankhede Stadium, Mumbai",
    category: "WORLD_CUP",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "India needed 4 runs to win the 2011 ICC Cricket World Cup with 11 balls remaining. 33,000 inside Wankhede and 1.2 billion across the subcontinent held their collective breath.",
    narrative:
      "Nuwan Kulasekara ran in for the second ball of the 49th over. Full, on middle and off. Dhoni leaned forward, uncoiled his shoulders, and struck the ball with thunderous bottom-hand authority. He did not run. He twirled his bat, held his poise, and watched the ball sail high into the starry sky above long-on. Ravi Shastri's baritone boomed into the broadcast microphones. A billion people wept with joy.",
    meaning:
      "It is the single most iconic stroke in Indian sporting folklore. In that moment, Dhoni fulfilled his defining career identity: 'Till I am on the field, the match isn't over. Playing under pressure is my habit, and finishing the game is my identity.'",
    quote: {
      text: "Till I'm on the field, the match isn't over. Playing under pressure is my habit, and finishing the game is my identity.",
      speaker: "MS Dhoni",
      sourceTitle: "Post-World Cup Retrospective / ICC & Star Sports",
      sourceUrl: "https://www.icc-cricket.com/video/1653842",
      publicationDate: "2011-04-02",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_05_cwc_2011_final.png",
      sourceUrl: "https://www.icc-cricket.com/video/1653842",
      attribution: "ICC Broadcast / BCCI Official Archive",
      aspectRatio: "landscape",
    },
    tags: ["2011_WORLD_CUP", "WINNING_SIX", "WANKHEDE", "KULASEKARA", "FINISHER"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2011: HONORARY LT COL COMMISSION
  // ========================================================
  {
    id: "honorary-lt-col-commission",
    chapterId: "chapter-5-finishing-in-style",
    chapterNumber: 5,
    chapterTitle: "THE PINNACLE & THE SIX",
    title: "HONORARY LIEUTENANT COLONEL: NOT A COSTUME",
    subtitle: "November 1, 2011: Commissioned into the 106 Infantry Battalion (Territorial Army) Parachute Regiment.",
    eventDate: "2011-11-01",
    location: "Army Headquarters, New Delhi",
    category: "MILITARY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "Following the 2011 World Cup victory, President Pratibha Patil and the Indian Army conferred on Dhoni the rank of Honorary Lieutenant Colonel in the elite Parachute Regiment.",
    narrative:
      "While many celebrities receive honorary ranks as mere ceremonial titles, Dhoni immediately demanded to attend training camps. He studied weapon handling, tactical drills, and military protocol. When journalists asked him about the uniform, he made it clear: 'I don't want this rank to be a showpiece. If I wear the uniform, I must earn the respect of the jawan standing next to me.'",
    meaning:
      "Dhoni's childhood dream had always been the military. His disciplined cricket demeanor—the emotional restraint, the strategic battlefield vision—was fundamentally soldierly.",
    quote: {
      text: "Since childhood I wanted to join the Army. When I wear the uniform, it gives me goosebumps. My aim is not just to wear the uniform on ceremonial days, but to serve with the battalion whenever time permits.",
      speaker: "MS Dhoni",
      sourceTitle: "Sainik Samachar / Indian Army Official Release",
      sourceUrl: "https://indianarmy.nic.in/",
      publicationDate: "2011-11-02",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2019.jpg",
      sourceUrl: "https://indianarmy.nic.in/",
      attribution: "ADGPI - Indian Army Official Media",
      aspectRatio: "landscape",
    },
    tags: ["INDIAN_ARMY", "TERRITORIAL_ARMY", "PARACHUTE_REGIMENT", "LT_COLONEL"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2012: PROCESS OVER RESULT DOCTRINE
  // ========================================================
  {
    id: "process-over-result-doctrine",
    chapterId: "chapter-6-wit-under-fire",
    chapterNumber: 6,
    chapterTitle: "WIT UNDER FIRE & THE TRIFECTA",
    title: "PROCESS OVER RESULT: THE STOIC DOCTRINE",
    subtitle: "The detachment from outcomes that governed fifteen years of international captaincy.",
    eventDate: "2012-02-14",
    location: "Adelaide Oval, Australia",
    category: "LEADERSHIP",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "Throughout his career, through victories and devastating whitewashes, Dhoni repeated a single mantra that baffled sports journalists: 'Control the controllables.'",
    narrative:
      "In modern professional sports dominated by hyperbole, Dhoni operated like a Zen practitioner. He refused to look at the scoreboard until the 45th over. He did not curse a bowler who bowled the right ball and got edged for four; he only criticized a bowler who abandoned the agreed tactical plan out of panic.",
    meaning:
      "Detachment from outcome is not indifference; it is the ultimate form of focus. By removing the fear of consequences, Dhoni freed his mind to make cold-blooded decisions in molten-hot moments.",
    quote: {
      text: "The result is a byproduct of the process. If you take care of the process, the result will take care of itself. When you start worrying about the result, you burden yourself with unnecessary pressure.",
      speaker: "MS Dhoni",
      sourceTitle: "ICC Official Press Conference / Adelaide",
      sourceUrl: "https://www.bcci.tv/",
      publicationDate: "2012-02-14",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/captain/dhoni_armband_calm.webp",
      sourceUrl: "https://www.bcci.tv/",
      attribution: "BCCI Official Media Archive",
      aspectRatio: "landscape",
    },
    tags: ["PHILOSOPHY", "CALM", "PROCESS", "LEADERSHIP"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2012: THE HELICOPTER SHOT & THE STOOL QUIP
  // ========================================================
  {
    id: "helicopter-stool-bouncers-quip",
    chapterId: "chapter-6-wit-under-fire",
    chapterNumber: 6,
    chapterTitle: "WIT UNDER FIRE & THE TRIFECTA",
    title: "UNLESS I GET A STOOL: THE HELICOPTER QUIP",
    subtitle: "Brisbane, Feb 2012: Explaining why you cannot play a helicopter shot to bouncers.",
    eventDate: "2012-02-19",
    location: "Gabba, Brisbane, Australia",
    category: "PERSONALITY",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "During the 2012 Tri-Series in Australia, opposition fast bowlers dug the ball short to stop Dhoni from uncorking his trademark helicopter shot. In a press conference, a journalist asked why the helicopter shot had gone missing.",
    narrative:
      "Dhoni looked at the reporter with a completely straight face, paused, and quipped: 'I cannot play it to a bouncer unless I get a stool with me.' The entire press room erupted into laughter. He went on to explain the biomechanics: the helicopter shot requires a full-length yorker where the wrists can generate bottom-hand torque under the ball; against a chest-high bouncer, trying to whip it like a helicopter is physical suicide.",
    meaning:
      "Dhoni never hesitated to use self-deprecating wit to educate journalists on cricket physics, turning demanding questions into memorable comedy.",
    quote: {
      text: "I cannot play it to a bouncer unless I get a stool with me.",
      speaker: "MS Dhoni",
      sourceTitle: "BCCI Press Conference / Brisbane Tri-Series",
      sourceUrl: "https://www.youtube.com/watch?v=Pc-P0msGqaY&t=4",
      publicationDate: "2012-02-19",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/odi/dhoni_helicopter_mechanics_collage.jpg",
      sourceUrl: "https://www.youtube.com/",
      attribution: "Channel 9 / BCCI Press Conference",
      aspectRatio: "portrait",
    },
    tags: ["HELICOPTER_SHOT", "STOOL", "BOUNCER", "WIT", "PRESS_CONFERENCE"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2012: DUCKWORTH-LEWIS DEADPAN QUIP
  // ========================================================
  {
    id: "duckworth-lewis-deadpan-quip",
    chapterId: "chapter-6-wit-under-fire",
    chapterNumber: 6,
    chapterTitle: "WIT UNDER FIRE & THE TRIFECTA",
    title: "I DON'T UNDERSTAND DUCKWORTH-LEWIS",
    subtitle: "Hobart, Feb 2012: Deadpan honesty on cricket's most complicated mathematical formula.",
    eventDate: "2012-02-26",
    location: "Bellerive Oval, Hobart, Australia",
    category: "PERSONALITY",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "Rain-interrupted white-ball matches frequently led captains and statisticians to scramble over sheets calculating Duckworth-Lewis par scores.",
    narrative:
      "When asked in a post-match conference how he factored the D/L target into his chase mathematics, Dhoni gave an answer of pure, unfiltered honesty that echoed around the cricket world: 'Frankly speaking, I don't understand Duckworth-Lewis. I just wait for the umpire's decision.' While other captains panicked over charts and complex run-rate projections, Dhoni simply focused on batting.",
    meaning:
      "Dhoni refused to pretend to understand bureaucratic complexity. In a sport often trapped in over-analysis, his common-sense simplicity was revolutionary.",
    quote: {
      text: "Frankly speaking I don't understand Duckworth-Lewis. I just wait for the umpire's decision.",
      speaker: "MS Dhoni",
      sourceTitle: "Press Conference / Commonwealth Bank Series",
      sourceUrl: "https://www.espncricinfo.com/",
      publicationDate: "2012-02-26",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2012.png",
      sourceUrl: "https://www.espncricinfo.com/",
      attribution: "BCCI Media Archive",
      aspectRatio: "portrait",
    },
    tags: ["DUCKWORTH_LEWIS", "HONESTY", "PRESS_CONFERENCE", "DEADPAN"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2012: "ASK HIS PHYSIO FOR A PRESS RELEASE"
  // ========================================================
  {
    id: "ask-physio-press-release-quip",
    chapterId: "chapter-6-wit-under-fire",
    chapterNumber: 6,
    chapterTitle: "WIT UNDER FIRE & THE TRIFECTA",
    title: "ASK HIS PHYSIO: SHIELDING THE DRESSING ROOM",
    subtitle: "March 2012: Deflecting aggressive media speculation regarding squad selection with dry sarcasm.",
    eventDate: "2012-03-01",
    location: "Sydney Cricket Ground, Sydney",
    category: "PERSONALITY",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "During the rotational policy in Australia, media outlets aggressively stoked rumors of a rift between Dhoni and senior players like Virender Sehwag.",
    narrative:
      "When a reporter repeatedly pressed Dhoni to give minute medical reasons why Sehwag was resting, Dhoni cut through the trap with surgical sarcasm: 'Maybe you should ask his physio to issue a press release.' He refused to let journalists bait him into creating sensational headlines, drawing a steel wall around his dressing room.",
    meaning:
      "As captain, Dhoni saw himself as the shock-absorber between the squad and external media sensationalism, using dry wit to defuse controversies.",
    quote: {
      text: "Maybe you should ask his physio to issue a press release.",
      speaker: "MS Dhoni",
      sourceTitle: "BCCI Press Conference / Sydney",
      sourceUrl: "https://cricketaddictor.com/cricket-news/5-most-savage-replies-by-ms-dhoni-in-a-press-conference/",
      publicationDate: "2012-03-01",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2012.png",
      sourceUrl: "https://cricketaddictor.com/",
      attribution: "BCCI Media Archives",
      aspectRatio: "portrait",
    },
    tags: ["SEHWAG", "PHYSIO", "PRESS_RELEASE", "SARCASTIC", "MEDIA"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2012: ROOM 707 & "THE SMILE HAS TO BE THERE"
  // ========================================================
  {
    id: "the-open-hotel-room-protocol",
    chapterId: "chapter-6-wit-under-fire",
    chapterNumber: 6,
    chapterTitle: "WIT UNDER FIRE & THE TRIFECTA",
    title: "ROOM 707: 'THE SMILE HAS TO BE THERE'",
    subtitle: "Late-night PlayStation, tea with rookies, and mental toughness advice: Whatever the situation, smile.",
    eventDate: "2012-10-05",
    location: "Taj Samudra, Colombo, Sri Lanka",
    category: "PERSONALITY",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "Indian cricket historically maintained strict hierarchies between senior superstars and rookie newcomers. Dhoni dismantled this tradition completely upon taking captaincy.",
    narrative:
      "Dhoni instituted a strict personal rule: his hotel room door was left unlocked from 7 PM until midnight. Any teenager or debutant could walk in without knocking. They played FIFA on his console, drank tea, ordered room service, and discussed anything except cricket. His core mental-toughness advice to rookies was unforgettable: 'The smile has to be there on your face, whatever the situation. If you panic, the opposition wins half the battle before bowling a ball.'",
    meaning:
      "Egalitarian leadership creates psychological safety. By stripping away superstar intimidation, Dhoni built an atmosphere where young cricketers felt equal and trusted.",
    quote: {
      text: "The smile has to be there on your face, whatever the situation. If you look troubled, your teammate behind you feels the pressure.",
      speaker: "MS Dhoni",
      sourceTitle: "Believe: What Life and Cricket Taught Me / Suresh Raina",
      sourceUrl: "https://penguin.co.in/book/believe/",
      publicationDate: "2021-06-14",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2012.png",
      sourceUrl: "https://penguin.co.in/",
      attribution: "BCCI Team Hotel Archives",
      aspectRatio: "portrait",
    },
    tags: ["SMILE", "CULTURE", "LEADERSHIP", "HOTEL_ROOM", "RAINA"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2013: CHEPAUK 224
  // ========================================================
  {
    id: "chepauk-double-hundred-2013",
    chapterId: "chapter-6-wit-under-fire",
    chapterNumber: 6,
    chapterTitle: "WIT UNDER FIRE & THE TRIFECTA",
    title: "CHEPAUK 224: THE CAPTAIN'S CARNAGE",
    subtitle: "224 runs off 265 balls against Australia on a turning Chennai minefield.",
    eventDate: "2013-02-24",
    location: "MA Chidambaram Stadium, Chepauk, Chennai",
    category: "CAPTAINCY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "India were under severe scrutiny after losing a home Test series to England. Facing Australia in the 1st Test at Chennai, India were 196/4 responding to Australia's 380.",
    narrative:
      "Dhoni counter-attacked with breathtaking violence. He danced down the pitch to Nathan Lyon and carved James Pattinson through the covers. His 224 was the highest Test score by an Indian wicketkeeper and the highest score by any Indian captain against Australia. It set up an emphatic 8-wicket win and initiated the famous 4-0 'Border-Gavaskar' whitewash.",
    meaning:
      "When his Test captaincy was questioned, Dhoni did not offer defensive words; he walked onto his beloved Chepauk turf and produced an innings of staggering physical and mental dominance.",
    quote: {
      text: "It was important to play aggressively. If you let their spinners settle on that wicket, survival was difficult. Sometimes the best defense is to attack the loose ball without second thoughts.",
      speaker: "MS Dhoni",
      sourceTitle: "Post-Match Press Conference, Chepauk",
      sourceUrl: "https://www.espncricinfo.com/series/australia-tour-of-india-2012-13-598808/india-vs-australia-1st-test-598812/full-scorecard",
      publicationDate: "2013-02-26",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_06_chennai_224.png",
      sourceUrl: "https://www.espncricinfo.com/series/australia-tour-of-india-2012-13-598808/india-vs-australia-1st-test-598812/full-scorecard",
      attribution: "BCCI / MA Chidambaram Stadium Archives",
      aspectRatio: "portrait",
    },
    tags: ["CHEPAUK", "224", "AUSTRALIA", "TEST_DOUBLE_CENTURY"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2013: EDGBASTON CHAMPIONS TROPHY (THE TRIFECTA)
  // ========================================================
  {
    id: "edgbaston-rain-champions-trophy",
    chapterId: "chapter-6-wit-under-fire",
    chapterNumber: 6,
    chapterTitle: "WIT UNDER FIRE & THE TRIFECTA",
    title: "EDGBASTON 2013: THE ICC WHITE-BALL TRIFECTA",
    subtitle: "Defending 129 in a 20-over rain-curtailed final against England.",
    eventDate: "2013-06-23",
    location: "Edgbaston, Birmingham, England",
    category: "CAPTAINCY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "The ICC Champions Trophy Final was almost washed out before being reduced to a 20-overs-a-side sprint. India posted just 129/7. England appeared to be coasting at 102/4 with Eoin Morgan and Ravi Bopara settled.",
    narrative:
      "Dhoni gathered his team during a drinks break and whispered: 'God is not coming to save us. Look at the pitch; look at the scoreboard. Fight for every single run.' He brought Ishant Sharma back despite an expensive previous spell. Ishant struck twice in two balls. Dhoni brought Ravindra Jadeja and R Ashwin to squeeze the death overs. India won by 5 runs. With this, Dhoni became the first captain in cricket history to win all three ICC white-ball trophies.",
    meaning:
      "Defending a meager 129 in English conditions demonstrated Dhoni's complete mastery over fielding geometry, bowler psychology, and the compression of time under pressure.",
    quote: {
      text: "I told the boys: 'Don't look at the sky or wait for rain. We have 130 runs on the board. The first thing is don't look for help from God. Let's play like the number one team.'",
      speaker: "MS Dhoni",
      sourceTitle: "ICC Champions Trophy Post-Match Presentation, Edgbaston",
      sourceUrl: "https://www.icc-cricket.com/",
      publicationDate: "2013-06-23",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_07_champions_trophy_2013.jpg",
      sourceUrl: "https://www.espncricinfo.com/series/icc-champions-trophy-2013-568248/england-vs-india-final-568273/full-scorecard",
      attribution: "ICC / Edgbaston Official Archives",
      aspectRatio: "landscape",
    },
    tags: ["CHAMPIONS_TROPHY", "EDGBASTON", "TRIFECTA", "2013"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2013: "I'M NOT HERE TO PROVE HOW GOOD I AM"
  // ========================================================
  {
    id: "not-here-to-prove-champions-trophy",
    chapterId: "chapter-6-wit-under-fire",
    chapterNumber: 6,
    chapterTitle: "WIT UNDER FIRE & THE TRIFECTA",
    title: "I'M NOT HERE TO PROVE HOW GOOD I AM",
    subtitle: "Birmingham, June 23, 2013: The unforgettable response to critics after lifting the Champions Trophy.",
    eventDate: "2013-06-23",
    location: "Edgbaston Press Conference Room, Birmingham, England",
    category: "LEADERSHIP",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "Following the spot-fixing scandal in Indian cricket, intense public and media pressure had descended on the Indian captain leading into the 2013 Champions Trophy in England.",
    narrative:
      "After lifting the trophy in Birmingham without losing a single match in the tournament, a journalist asked if this victory was Dhoni's way of proving his worth and silencing his detractors. Dhoni looked up with cold, quiet dignity and delivered a line that became legendary among sports psychologists.",
    meaning:
      "Dhoni never played for validation from critics, commentators, or newspapers. His motivation came from internal duty to the country and love for the craft.",
    quote: {
      text: "I'm not here to prove to anyone how good I am. I am here to play for the country and do my job. If I start trying to prove things to people, I will lose focus on what matters.",
      speaker: "MS Dhoni",
      sourceTitle: "Post-Match Press Conference, ICC Champions Trophy Final, Birmingham",
      sourceUrl: "https://www.thehindu.com/sport/cricket/im-not-here-to-prove-to-anyone-how-good-i-am-dhoni/article4844391.ece",
      publicationDate: "2013-06-24",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_07_champions_trophy_2013.jpg",
      sourceUrl: "https://www.thehindu.com/",
      attribution: "ICC Press Conference / Birmingham",
      aspectRatio: "landscape",
    },
    tags: ["CHAMPIONS_TROPHY", "PROVE_NOTHING", "BIRMINGHAM", "VALIDATION"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2014: MCG UNANNOUNCED TEST RETIREMENT
  // ========================================================
  {
    id: "mcg-2014-silent-test-exit",
    chapterId: "chapter-7-discipline-and-defense",
    chapterNumber: 7,
    chapterTitle: "DISCIPLINE, DEFENSE & DECIBELS",
    title: "MCG 2014: THE UNANNOUNCED TEST FAREWELL",
    subtitle: "December 30, 2014: Stumping ninety Tests, batting to a draw, and quietly signing off.",
    eventDate: "2014-12-30",
    location: "Melbourne Cricket Ground, Australia",
    category: "FAREWELL",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "In the middle of a grueling Test series in Australia, Dhoni batted out the final overs of the Boxing Day Test at the MCG to secure a draw. It was his 90th Test match.",
    narrative:
      "He took off his pads, addressed the press conference about the match without mentioning retirement, walked back into the dressing room, and gathered the squad: 'Boys, that was my last Test match.' Virat Kohli and Suresh Raina broke down. Dhoni smiled, hugged everyone, packed his white flannels, and never played Test cricket again. No farewell lap. No 100th Test milestone celebration.",
    meaning:
      "Many players stretch their careers to achieve personal milestones like a 100th Test cap. Dhoni cared so little for personal milestones that he walked away at 90 Tests the moment he felt his body could no longer give 100%.",
    quote: {
      text: "I didn't expect him to say it. He just walked into the dressing room after the press conference and said, 'This is my last Test.' We were shocked. He didn't want any drama.",
      speaker: "Virat Kohli",
      sourceTitle: "BCCI TV Archival Interview / Melbourne Retrospective",
      sourceUrl: "https://www.bcci.tv/",
      publicationDate: "2015-01-02",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_dhoni_mcg_2014_test_exit.png",
      sourceUrl: "https://www.espncricinfo.com/series/india-tour-of-australia-2014-15-754737/australia-vs-india-3rd-test-754741/full-scorecard",
      attribution: "The Indian Express / Cricket Australia Archives",
      aspectRatio: "landscape",
    },
    tags: ["TEST_RETIREMENT", "MCG", "2014", "KOHLI", "UNANNOUNCED"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2015: AGRA MAROON WINGS PARA JUMPS
  // ========================================================
  {
    id: "balidan-maroon-wings-jumps",
    chapterId: "chapter-7-discipline-and-defense",
    chapterNumber: 7,
    chapterTitle: "DISCIPLINE, DEFENSE & DECIBELS",
    title: "AGRA: EARNING THE MAROON PARATROOPER WINGS",
    subtitle: "August 2015: Completing five military parachute jumps, including a night jump from 1,250 feet.",
    eventDate: "2015-08-19",
    location: "Paratroopers Training School (PTS), Agra",
    category: "MILITARY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "To earn the coveted Paratrooper Wings badge, Dhoni underwent rigorous two-week physical training at the Paratroopers Training School in Agra alongside regular army recruits.",
    narrative:
      "He completed five parachute jumps from an AN-32 transport aircraft at Malpura dropping zone, including a dangerous night jump with a 20kg combat load. When he touched down safely on the fifth jump, army instructors pinned the prestigious blue wings to his chest. He did not ask for special food or air-conditioned quarters; he slept in barracks and ate at the mess.",
    meaning:
      "Jumping out of an aircraft into darkness requires facing primal human fear. Dhoni's calmness on the cricket pitch was tested and validated in military skydrops.",
    quote: {
      text: "He did all five jumps without hesitation. When you stand at the aircraft door at 1,250 feet, cricket fame does not help. He showed the grit and discipline of a true paratrooper.",
      speaker: "Brigadier K.P. Singh (Agra Paratroopers Training School)",
      sourceTitle: "Press Trust of India (PTI) & Indian Express Report",
      sourceUrl: "https://indianexpress.com/article/sports/cricket/ms-dhoni-completes-five-para-jumps-in-agra-earns-air-wings/",
      publicationDate: "2015-08-20",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_dhoni_army_pts_2015.jpg",
      sourceUrl: "https://indianexpress.com/article/sports/cricket/ms-dhoni-completes-five-para-jumps-in-agra-earns-air-wings/",
      attribution: "ADGPI / Indian Army PTS Agra Archives",
      aspectRatio: "landscape",
    },
    tags: ["AGRA", "PARA_JUMP", "AIR_WINGS", "MILITARY_TRAINING"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2016: 0.08 SECONDS STUMPING
  // ========================================================
  {
    id: "point-zero-eight-second-stumping",
    chapterId: "chapter-7-discipline-and-defense",
    chapterNumber: 7,
    chapterTitle: "DISCIPLINE, DEFENSE & DECIBELS",
    title: "0.08 SECONDS: THE SENSORY ILLUSION",
    subtitle: "Faster than the human eye can blink: 195 international stumpings rewriting biomechanics.",
    eventDate: "2016-01-26",
    location: "Adelaide Oval, Australia",
    category: "PERSONALITY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "In standard human physiology, the blink of an eye takes approximately 0.10 to 0.15 seconds. High-speed broadcast cameras measured Dhoni whipping off the bails of Australian batsmen in just 0.08 seconds.",
    narrative:
      "Traditional wicketkeeping textbooks instruct keepers to catch the ball with soft hands and draw the hands backward to cushion the impact. Dhoni threw the textbook away. He pushed his gloves forward to meet the ball, using the ball's own rebound momentum to smash into the stumps. By removing the backswing, he shaved vital tenths of a second off the stumping time.",
    meaning:
      "Dhoni did not merely execute wicketkeeping; he invented a bespoke kinetic technique that gave opposition batters zero margin of error if their back foot drifted a single millimeter out of the crease.",
    quote: {
      text: "His hands are like a pickpocket's. By the time your foot is in the air, the bails are already off and he's not even appealing—he's just smiling at the umpire.",
      speaker: "Michael Hussey",
      sourceTitle: "Fox Cricket / Channel 9 Broadcast Analysis",
      sourceUrl: "https://www.foxsports.com.au/cricket",
      publicationDate: "2018-01-15",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/keeper/dhoni_lightning_stumping_008s.png",
      sourceUrl: "https://www.espncricinfo.com/",
      attribution: "Channel 9 / Cricket Australia High-Speed Telemetry",
      aspectRatio: "landscape",
    },
    tags: ["STUMPING", "REFLEX", "0.08_SECONDS", "WICKETKEEPER"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2016: BENGALURU SPRINT: ONE GLOVE OFF
  // ========================================================
  {
    id: "bengaluru-sprint-single-glove",
    chapterId: "chapter-7-discipline-and-defense",
    chapterNumber: 7,
    chapterTitle: "DISCIPLINE, DEFENSE & DECIBELS",
    title: "BENGALURU: ONE GLOVE OFF AND A SPRINT TO THE STUMPS",
    subtitle: "2 runs needed off 3 balls. Bangladesh crumbled; Dhoni sprinted.",
    eventDate: "2016-03-23",
    location: "M. Chinnaswamy Stadium, Bengaluru",
    category: "UNSPOKEN",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "In the 2016 ICC World T20 match against Bangladesh, India faced imminent elimination. Bangladesh needed 2 runs off the final 3 balls. Mushfiqur Rahim and Mahmudullah fell on consecutive deliveries.",
    narrative:
      "One run required off the last ball to tie, two to win for Bangladesh. Hardik Pandya bowled outside off. Shuvagata Hom swung and missed. Before the delivery was bowled, Dhoni had deliberately taken off his right glove. Realizing that throwing the ball might miss the stumps, Dhoni tucked the ball into his bare palm and sprinted twenty yards at full throttle, sliding to break the stumps a fraction of a second before Mustafizur Rahman reached his crease. India won by one run.",
    meaning:
      "Taking off the right glove before the ball was bowled was calculated brilliance. In the most frantic moment of the match, Dhoni calculated the physics of throwing versus sprinting and chose the infallible option.",
    quote: {
      text: "If I threw and missed, they would take a bye. I knew if I ran, my speed over ten yards was faster than the batsman diving. So I removed the glove before the ball was delivered.",
      speaker: "MS Dhoni",
      sourceTitle: "Post-Match Press Conference, Bengaluru",
      sourceUrl: "https://www.icc-cricket.com/news/179234",
      publicationDate: "2016-03-23",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_09_bangladesh_sprint_2016.jpg",
      sourceUrl: "https://www.espncricinfo.com/series/world-t20-2015-16-901359/india-vs-bangladesh-25th-match-super-10-group-2-951353/full-scorecard",
      attribution: "ICC / M. Chinnaswamy Stadium Archives",
      aspectRatio: "portrait",
    },
    tags: ["BENGALURU", "SPRINT", "RUN_OUT", "ONE_GLOVE", "MUSTAFIZUR"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2016: "YOU WANT ME TO RETIRE?" (SAM FERRIS)
  // ========================================================
  {
    id: "you-want-me-to-retire-sam-ferris",
    chapterId: "chapter-7-discipline-and-defense",
    chapterNumber: 7,
    chapterTitle: "DISCIPLINE, DEFENSE & DECIBELS",
    title: "YOU WANT ME TO RETIRE? THE SAM FERRIS MASTERCLASS",
    subtitle: "March 31, 2016: Turning the tables on Australian journalist Sam Ferris on live television.",
    eventDate: "2016-03-31",
    location: "Wankhede Stadium Press Conference Room, Mumbai",
    category: "PERSONALITY",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "After India lost the 2016 World T20 semi-final to West Indies, Australian journalist Sam Ferris asked Dhoni if he intended to retire from international cricket.",
    narrative:
      "Instead of reacting with irritation, Dhoni smiled broadly and gestured: 'Come here, sit next to me.' Ferris walked onto the stage and sat beside the Indian captain. Dhoni put his arm around his shoulder like an old friend and started interviewing the journalist: 'Do you think I am unfit? Do you think I can't run fast? Do you think I can survive till the 2019 World Cup?' When Ferris answered 'Yes', Dhoni smiled: 'Then you've answered your own question!' The entire room broke into spontaneous applause.",
    meaning:
      "Dhoni never allowed retirement speculation to rattle his dignity. He turned an aggressive confrontation into a viral masterclass in warmth and composure.",
    quote: {
      text: "You want me to retire? Do you think I am unfit? Can I survive till the 2019 World Cup? Then you have answered your own question!",
      speaker: "MS Dhoni to Sam Ferris",
      sourceTitle: "ICC World T20 Post-Match Press Conference / Mumbai",
      sourceUrl: "https://www.thenewsminute.com/flix/video-dhoni-lost-match-won-internet-his-hilarious-chat-journalist-41002",
      publicationDate: "2016-03-31",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2016.png",
      sourceUrl: "https://www.thenewsminute.com/",
      attribution: "ICC Media / Wankhede Press Room",
      aspectRatio: "landscape",
    },
    tags: ["SAM_FERRIS", "RETIREMENT", "WIT", "PRESS_CONFERENCE", "2016"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2017: MIDNIGHT SOLO RANCHI RIDES
  // ========================================================
  {
    id: "midnight-solo-ranchi-rides",
    chapterId: "chapter-8-the-eternal-legend",
    chapterNumber: 8,
    chapterTitle: "THE ETERNAL LEGEND",
    title: "MIDNIGHT DOWN THE RANCHI BYPASS",
    subtitle: "Riding helmet-clad and unrecognized through his hometown under moonlight.",
    eventDate: "2017-10-12",
    location: "Ranchi Ring Road, Jharkhand",
    category: "PASSION",
    contentType: "EDITORIAL_INTERPRETATION",
    historicalContext:
      "In Ranchi, where stepping onto the street during the day draws thousands of fans, Dhoni developed a habit of riding his high-displacement bikes late at night.",
    narrative:
      "Tucking his hair into a full-face helmet with a tinted visor, he kicks the starter of his Kawasaki Ninja or Hellcat and cruises into the cool Jharkhand breeze along the empty Ring Road. For forty kilometers, he is not Captain Cool, the commercial juggernaut, or the national hero. He is simply a rider listening to the engine notes beneath the highway streetlights.",
    meaning:
      "The full-face motorcycle helmet was Dhoni's invisibility cloak. Inside that tinted glass, he regained the anonymity that cricket had stripped away from him at age twenty-three.",
    quote: {
      text: "With a helmet on, nobody knows who you are. You can stop at a traffic light, look around, and you are just another rider enjoying the open road.",
      speaker: "MS Dhoni",
      sourceTitle: "Interview with Telegraph India",
      sourceUrl: "https://www.telegraphindia.com/",
      publicationDate: "2016-04-12",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2017.jpg",
      sourceUrl: "https://www.telegraphindia.com/",
      attribution: "Ranchi Local Media Archives",
      aspectRatio: "portrait",
    },
    tags: ["NIGHT_RIDE", "FREEDOM", "ANONYMITY", "RANCHI"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2018: CSK RETURN TEARS
  // ========================================================
  {
    id: "the-2018-comeback-tears",
    chapterId: "chapter-8-the-eternal-legend",
    chapterNumber: 8,
    chapterTitle: "THE ETERNAL LEGEND",
    title: "THE RETURN OF 2018: TEARS IN THE AUDITORIUM",
    subtitle: "Two years in exile. A room full of yellow jerseys, and a choked captain.",
    eventDate: "2018-04-05",
    location: "Crowne Plaza, Chennai",
    category: "CSK_LEGACY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "After Chennai Super Kings served a two-year suspension, the franchise returned to the IPL in 2018 with an older squad mockingly labeled the 'Dad's Army'.",
    narrative:
      "At the pre-season team dinner in Chennai, Dhoni took the microphone to welcome the players back. As he started speaking about the team's absence and the loyalty of the fans, his voice cracked. He paused, held his throat, and was unable to speak for over twenty seconds as tears welled in his eyes. Suresh Raina rushed to hand him water. The room fell silent. That season, the 'Dad's Army' won the championship.",
    meaning:
      "Dhoni's bond with Chennai and CSK was not a corporate contract; it was personal, familial, and deeply emotional. His vulnerability galvanized the entire franchise.",
    quote: {
      text: "What makes CSK special is not just winning. It is how the franchise and the people stood by us during the darkest two years. You cannot describe that bond in words.",
      speaker: "MS Dhoni",
      sourceTitle: "CSK Whistle Podu Return Documentary / Official Media",
      sourceUrl: "https://www.chennaisuperkings.com/",
      publicationDate: "2018-04-06",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/trophies/2018_ipl.png",
      sourceUrl: "https://www.chennaisuperkings.com/",
      attribution: "Chennai Super Kings Official Media",
      aspectRatio: "landscape",
    },
    tags: ["CSK", "2018", "COMEBACK", "EMOTION", "TEARS"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2018: "I DON'T RIDE ALL MY BIKES AT A TIME"
  // ========================================================
  {
    id: "dont-ride-all-bikes-at-a-time",
    chapterId: "chapter-8-the-eternal-legend",
    chapterNumber: 8,
    chapterTitle: "THE ETERNAL LEGEND",
    title: "I DON'T RIDE ALL MY BIKES AT A TIME",
    subtitle: "May 2018: The cheeky squad rotation analogy comparing his cricket squad to his motorcycle garage.",
    eventDate: "2018-05-20",
    location: "Maharashtra Cricket Association Stadium, Pune",
    category: "PERSONALITY",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "During IPL 2018, seasoned off-spinner Harbhajan Singh was frequently held back from bowling in certain conditions or against specific match-ups. A journalist questioned Dhoni on why Harbhajan hadn't bowled in the match.",
    narrative:
      "Dhoni looked at the journalist, grinned, and gave one of his most iconic press conference one-liners: 'You know, I have quite a few bikes in my garage and I don't ride all of them at a time.' He explained that Harbhajan was an asset kept for the exact tactical moment when his skills were needed, not a tick-box to be used mechanically in every over.",
    meaning:
      "Squad management in elite sport is about situational optimization. Dhoni used his passion for motorcycling to explain that having great tools does not mean forcing them all into the same repair job.",
    quote: {
      text: "You know, I have quite a few bikes in my garage and I don't ride all of them at a time.",
      speaker: "MS Dhoni",
      sourceTitle: "IPL Post-Match Press Conference, Pune / Star Sports",
      sourceUrl: "https://www.reddit.com/r/Cricket/comments/2d5uxt/dhonis_greatest_pressconference_analogy_hits/",
      publicationDate: "2018-05-20",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2018.jpg",
      sourceUrl: "https://www.iplt20.com/",
      attribution: "IPL Official Media Archive",
      aspectRatio: "portrait",
    },
    tags: ["BIKES", "HARBHAJAN", "ANALOGY", "ROTATION", "PRESS_CONFERENCE"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2019: VICTOR FORCE KASHMIR DEPLOYMENT
  // ========================================================
  {
    id: "victor-force-kashmir-patrol",
    chapterId: "chapter-8-the-eternal-legend",
    chapterNumber: 8,
    chapterTitle: "THE ETERNAL LEGEND",
    title: "VICTOR FORCE: GUARD DUTY IN KASHMIR",
    subtitle: "August 2019: A two-week deployment with 106 Territorial Army Battalion in Awantipora.",
    eventDate: "2019-08-05",
    location: "Awantipora, Pulwama District, Jammu & Kashmir",
    category: "MILITARY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "Following the 2019 World Cup, Dhoni made himself unavailable for the West Indies tour to join his unit, the 106 TA Battalion (Para), stationed in Kashmir as part of Victor Force.",
    narrative:
      "Stationed in Awantipora during an extremely tense security period in Jammu & Kashmir, Dhoni carried out static guard duty, patrol assignments, and post duties alongside jawans. In the evenings, he played volleyball with troops and polished his own combat boots. Photographs of him in camouflage, AK-47 slung over his shoulder, circulated globally.",
    meaning:
      "At 38 years old, after fifteen years of luxury and fame, Dhoni chose to sleep in bunk beds and hold guard shifts in the Kashmir valley. The commitment was genuine.",
    quote: {
      text: "Lt Col MS Dhoni completed his two-week deployment with the 106 TA Battalion. He took on static guard duties and patrolling duties just like any other officer in the unit.",
      speaker: "Indian Army Official Statement",
      sourceTitle: "Press Trust of India / Ministry of Defence",
      sourceUrl: "https://www.thehindu.com/news/national/ms-dhoni-serves-with-victor-force-in-kashmir/article28807907.ece",
      publicationDate: "2019-08-16",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_dhoni_kashmir_victor_force_2019.jpg",
      sourceUrl: "https://www.thehindu.com/news/national/ms-dhoni-serves-with-victor-force-in-kashmir/article28807907.ece",
      attribution: "India Today / Indian Army Victor Force Awantipora",
      aspectRatio: "landscape",
    },
    tags: ["KASHMIR", "VICTOR_FORCE", "GUARD_DUTY", "ARMY_LIFE"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2019: SOLITARY WALK ON RANCHI OUTFIELD
  // ========================================================
  {
    id: "solitary-walk-ranchi-outfield",
    chapterId: "chapter-8-the-eternal-legend",
    chapterNumber: 8,
    chapterTitle: "THE ETERNAL LEGEND",
    title: "THE SOLITARY WALK ON THE RANCHI OUTFIELD",
    subtitle: "A silent walk across JSCA Stadium after everyone has left.",
    eventDate: "2019-10-22",
    location: "JSCA International Stadium Complex, Ranchi",
    category: "UNSPOKEN",
    contentType: "EDITORIAL_INTERPRETATION",
    historicalContext:
      "After India defeated South Africa in the Ranchi Test in October 2019, Dhoni visited the dressing room to congratulate the team, then walked out alone onto the outfield.",
    narrative:
      "Long after the floodlights had been switched to energy-saving hum and the crowds had emptied into the cool Jharkhand night, a solitary figure walked across the pitch square. Hands in his tracksuit pockets, looking at the empty stands of the stadium that had been built because of his rise. From the clay grounds of Shyamali school to a world-class arena bearing his name—the boy from Ranchi had completed the circle.",
    meaning:
      "The numbers will fade. The records will one day be broken. But the story of the ticket collector who taught a billion people how to conquer the final over will echo for generations.",
    quote: {
      text: "Some careers are measured in runs and trophies. Others are remembered in moments.",
      speaker: "Editorial Epilogue",
      sourceTitle: "Project 7: Visualize Mahi",
      sourceUrl: "https://project-7-tau.vercel.app/",
      publicationDate: "2026-10-13",
      verificationStatus: "NOT_APPLICABLE",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/tribute/dhoni_goat_outfield.jpg",
      sourceUrl: "https://www.bcci.tv/",
      attribution: "JSCA Stadium / BCCI Archives",
      aspectRatio: "landscape",
    },
    tags: ["RANCHI", "EPILOGUE", "LEGACY", "SOLITUDE"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2020: 19:29 RETIREMENT ANNOUNCEMENT
  // ========================================================
  {
    id: "nineteen-twenty-nine-retirement",
    chapterId: "chapter-8-the-eternal-legend",
    chapterNumber: 8,
    chapterTitle: "THE ETERNAL LEGEND",
    title: "19:29 HRS: 'CONSIDER ME AS RETIRED'",
    subtitle: "August 15, 2020: An understated Instagram video set to Mukesh's classic ballad.",
    eventDate: "2020-08-15",
    location: "Ranchi, Jharkhand",
    category: "FAREWELL",
    contentType: "VERIFIED_QUOTATION",
    historicalContext:
      "On India's 74th Independence Day, amidst global lockdown, MS Dhoni announced his retirement from international cricket without a press conference, farewell match, or lap of honor.",
    narrative:
      "At precisely 7:29 PM, a simple post appeared on his Instagram account: a four-minute montage of career photographs set to the haunting song 'Main Pal Do Pal Ka Shayar Hoon' from the 1976 film Kabhi Kabhie. The caption was just 16 words. In minutes, world sport halted. Heads of state, sporting legends, and millions of fans recognized the poetic finality of his departure.",
    meaning:
      "Dhoni entered international cricket quietly and left it on his own terms. He considered himself merely a transient traveler on the cricket stage, refusing to inflate his personal importance.",
    quote: {
      text: "Thanks a lot for ur love and support throughout. from 1929 hrs consider me as Retired.",
      speaker: "MS Dhoni",
      sourceTitle: "MS Dhoni Official Instagram Account (@mahi7781)",
      sourceUrl: "https://www.instagram.com/mahi7781/",
      publicationDate: "2020-08-15",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2020.jpg",
      sourceUrl: "https://www.instagram.com/mahi7781/",
      attribution: "Official Social Media Archive / MS Dhoni",
      aspectRatio: "landscape",
    },
    tags: ["RETIREMENT", "1929_HRS", "MAIN_PAL_DO_PAL", "FAREWELL"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2021: THE MENTOR'S SHADOW
  // ========================================================
  {
    id: "the-mentor-silhouette",
    chapterId: "chapter-8-the-eternal-legend",
    chapterNumber: 8,
    chapterTitle: "THE ETERNAL LEGEND",
    title: "THE MENTOR'S SHADOW: BUILDING THE FUTURE",
    subtitle: "Passing on caps, standing behind stumps, and serving without remuneration.",
    eventDate: "2021-10-24",
    location: "Dubai International Stadium, UAE",
    category: "FAREWELL",
    contentType: "EDITORIAL_INTERPRETATION",
    historicalContext:
      "Even after retiring from international cricket, Dhoni was appointed Mentor of the Indian team for the 2021 T20 World Cup, accepting zero remuneration from the BCCI.",
    narrative:
      "He did not stand in front of microphones or issue press statements. He stood in the nets holding throw-downs for young batters, whispering technical adjustments into Rishabh Pant's ear, and helping captain Virat Kohli with field placements. His legacy lives not just in the trophies in the cabinet, but in every wicketkeeper-finisher playing the game today.",
    meaning:
      "A leader's final triumph is not what they achieved while in command, but how self-sufficient the institution becomes after they step aside.",
    quote: {
      text: "Dhoni's presence in the dressing room provides immense confidence. When a man of his stature and experience is around, it calms the young players in high-pressure tournaments.",
      speaker: "Sourav Ganguly (BCCI President, 2021)",
      sourceTitle: "BCCI Official Announcement",
      sourceUrl: "https://www.bcci.tv/",
      publicationDate: "2021-09-08",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/timeline/2021.jpg",
      sourceUrl: "https://www.bcci.tv/",
      attribution: "BCCI / ICC Media Archive",
      aspectRatio: "landscape",
    },
    tags: ["MENTOR", "LEGACY", "DUBAI", "NEXT_GENERATION"],
    estimatedReadingTime: 2,
  },

  // ========================================================
  // 2023: 3:00 AM IN AHMEDABAD (5TH IPL CROWN)
  // ========================================================
  {
    id: "lifting-jadeja-at-3am-2023",
    chapterId: "chapter-8-the-eternal-legend",
    chapterNumber: 8,
    chapterTitle: "THE ETERNAL LEGEND",
    title: "3:00 AM IN AHMEDABAD: LIFTING JADEJA",
    subtitle: "Ten runs off two balls in a rain-soaked reserve day. The fifth IPL trophy.",
    eventDate: "2023-05-29",
    location: "Narendra Modi Stadium, Ahmedabad",
    category: "CSK_LEGACY",
    contentType: "VERIFIED_HISTORICAL_MOMENT",
    historicalContext:
      "The 2023 IPL Final spanned three days due to unprecedented rain. CSK needed 10 runs off the last 2 balls bowled by Mohit Sharma to claim a record-equaling fifth title.",
    narrative:
      "Dhoni sat inside the dugout with eyes closed in meditation, refusing to look. Ravindra Jadeja hit a six over long-on, followed by a fine boundary past short fine leg. As the stadium erupted at 3:15 AM, Dhoni walked onto the pitch, grabbed the jumping Jadeja, and hoisted him off his feet in a massive, emotional embrace, eyes shining with tears of relief.",
    meaning:
      "Even at 41 years of age, playing with a torn knee that required surgery the next day, Dhoni's leadership brought out clutch heroics in his teammates.",
    quote: {
      text: "The way the fans welcomed me in every ground this year, it's easy for me to say 'thank you very much and retire.' But the hard thing is to work hard for nine months and try to play another season. This is my gift to them.",
      speaker: "MS Dhoni",
      sourceTitle: "IPL Post-Final Presentation, Ahmedabad",
      sourceUrl: "https://www.iplt20.com/",
      publicationDate: "2023-05-30",
      verificationStatus: "VERIFIED",
    },
    media: {
      provider: "IMAGE_ARCHIVE",
      videoId: null,
      embedUrl: null,
      posterUrl: "/images/moments/moment_dhoni_lifts_jadeja_2023.jpg",
      sourceUrl: "https://www.iplt20.com/match/2023/1000",
      attribution: "LatestLY / BCCI / IPL Official Archives",
      aspectRatio: "landscape",
    },
    tags: ["IPL2023", "JADEJA", "EMBRACE", "FIFTH_TITLE", "AHMEDABAD"],
    estimatedReadingTime: 2,
  },
];
