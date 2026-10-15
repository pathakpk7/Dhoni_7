export interface JerseyVaultItem {
  id: string;
  year: string;
  title: string;
  team: "India" | "Chennai Super Kings" | "Rising Pune Supergiant" | "Indian Army" | "Bihar / Jharkhand";
  tournament: string;
  tournamentType: "IPL" | "CLT20" | "ICC_WORLD_CUP" | "BILATERAL_ODI" | "ASIA_CUP" | "DOMESTIC" | "MILITARY";
  era: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  number: number;
  playerName: string;
  sponsor: string;
  famousMoment: string;
  description: string;
  statsInJersey: string;
  imageSrc?: string;
  designDetails: string[];
}


export const JERSEYS_VAULT: JerseyVaultItem[] = [
  // =========================================================================
  // 1. 2004: ODI DEBUT (INDIA)
  // =========================================================================
  {
    id: "jersey_2004_debut",
    imageSrc: "/images/jerseys/jersey_india_2004_debut.png",
    year: "2004",
    title: "The Debut 'Sahara' Sky Blue",
    team: "India",
    tournament: "ODI Debut vs Bangladesh (Chittagong)",
    tournamentType: "BILATERAL_ODI",
    era: "The Long Hair Swashbuckler (2004–2005)",
    primaryColor: "#38bdf8", // Sky blue
    secondaryColor: "#0284c7",
    accentColor: "#f97316", // Saffron
    number: 7,
    playerName: "DHONI",
    sponsor: "SAHARA",
    famousMoment: "December 23, 2004: Dhoni made his international debut in Chittagong, wearing #7 with golden locks tucked beneath his helmet.",
    description: "The classic early-2000s light blue Indian jersey with diagonal Indian tricolor brush strokes across the chest and bold SAHARA lettering.",
    statsInJersey: "Debut match · 0 runs (run out off 1st ball) · 1 catch behind stumps",
    designDetails: [
      "Light sky blue breathable polyester",
      "Tricolor sash flowing from right shoulder down to left hip",
      "Dark navy sleeve trims with white collar accents",
      "Classic oversized 2000s fit"
    ]
  },

  // =========================================================================
  // 2. 2005: VIZAG 148 & JAIPUR 183* (INDIA)
  // =========================================================================
  {
    id: "jersey_2005_swashbuckler",
    imageSrc: "/images/jerseys/jersey_india_2005_swashbuckler.jpg",
    year: "2005",
    title: "The Vizag 148 & Jaipur 183* Edition",
    team: "India",
    tournament: "Bilateral ODIs vs Pakistan & Sri Lanka",
    tournamentType: "BILATERAL_ODI",
    era: "The Rampaging Finisher (2005–2006)",
    primaryColor: "#0ea5e9",
    secondaryColor: "#0369a1",
    accentColor: "#fbbf24",
    number: 7,
    playerName: "DHONI",
    sponsor: "SAHARA",
    famousMoment: "Blasting 148 against Pakistan at Vizag and an astonishing 183* vs Sri Lanka in Jaipur — the highest score ever by a wicketkeeper in ODI history.",
    description: "The jersey in which Dhoni became the undisputed darling of Indian cricket, terrorizing bowlers with long flowing hair and 100-meter straight sixes.",
    statsInJersey: "183* off 145 balls (15 fours, 10 sixes) · 148 off 123 balls",
    designDetails: [
      "Deepening ocean blue shade with micro-mesh side vents",
      "Tri-colour chest stripes centered under SAHARA",
      "Official Nike swoosh introduced on right breast",
      "Number 7 printed in bold athletic block font"
    ]
  },

  // =========================================================================
  // 3. 2007: ICC CRICKET WORLD CUP (ODI - WEST INDIES)
  // =========================================================================
  {
    id: "jersey_2007_odi_wc",
    imageSrc: "/images/jerseys/jersey_india_2007_odi_wc.png",
    year: "2007",
    title: "2007 ICC Cricket World Cup (ODI)",
    team: "India",
    tournament: "2007 ICC Cricket World Cup (West Indies)",
    tournamentType: "ICC_WORLD_CUP",
    era: "The Watershed Caribbean Era (2007)",
    primaryColor: "#38bdf8",
    secondaryColor: "#0284c7",
    accentColor: "#f97316",
    number: 7,
    playerName: "DHONI",
    sponsor: "SAHARA",
    famousMoment: "March 2007 in the Caribbean: The heartbreak group stage exit that catalyzed the seismic generational transformation in Indian cricket, paving the way for Dhoni's young leadership.",
    description: "The iconic Caribbean World Cup edition light blue jersey with the dynamic tricolor curved wave down the right chest, white Nike swoosh, and embroidered BCCI crest.",
    statsInJersey: "Group Stage matches vs Bangladesh, Bermuda, and Sri Lanka · 2 catches behind stumps",
    designDetails: [
      "Signature dynamic tricolor wave curving down the chest",
      "Moisture-management side ventilation mesh",
      "White Nike swoosh and embroidered BCCI star crest",
      "Official ICC CWC Caribbean tournament patch specification"
    ]
  },

  // =========================================================================
  // 4. 2007: INAUGURAL T20 WORLD CUP (INDIA)
  // =========================================================================
  {
    id: "jersey_2007_t20_wc",
    imageSrc: "/images/jerseys/jersey_india_2007_t20_wc.jpg",
    year: "2007",
    title: "The Inaugural T20 World Cup Crown",
    team: "India",
    tournament: "2007 ICC World Twenty20 (South Africa)",
    tournamentType: "ICC_WORLD_CUP",
    era: "The Birth of Captain Cool (2007)",
    primaryColor: "#0284c7",
    secondaryColor: "#1e3a8a",
    accentColor: "#f59e0b",
    number: 7,
    playerName: "DHONI",
    sponsor: "INDIA (Clean ICC Front)",
    famousMoment: "September 24, 2007 at Wanderers: Dhoni leading young India to the inaugural T20 World Cup title, handing his jersey to a young boy in the stands.",
    description: "The historic kit featuring a bold royal blue body, curved saffron and green piping along the torso sides, and clean ICC tournament typography.",
    statsInJersey: "154 runs in tournament · Captained all 7 matches · World Cup Champions",
    designDetails: [
      "Royal Blue with athletic tapered fit",
      "Contoured saffron (kesari) curves along the lateral flanks",
      "BCCI embroidered crest with single star above it",
      "Dhoni famously gave this exact jersey away to a child in Johannesburg"
    ]
  },

  // =========================================================================
  // 4. 2008: IPL INAUGURAL SEASON (CSK)
  // =========================================================================
  {
    id: "jersey_2008_ipl_inaugural",
    imageSrc: "/images/jerseys/jersey_csk_2010.jpg",
    year: "2008",
    title: "IPL 2008: The Maiden CSK Canary Yellow",
    team: "Chennai Super Kings",
    tournament: "IPL 2008 (Inaugural Season)",
    tournamentType: "IPL",
    era: "The Yellow Fortress Begins (2008)",
    primaryColor: "#facc15", // Canary Yellow
    secondaryColor: "#dc2626", // Red Lion Roar
    accentColor: "#1e3a8a", // Blue trims
    number: 7,
    playerName: "DHONI",
    sponsor: "AIRCEL",
    famousMoment: "April 19, 2008 at Mohali: MS Dhoni walked out in yellow for the very first time after becoming the headline $1.5M auction marquee signing.",
    description: "The founding jersey that established the Whistle Podu religion across Tamil Nadu. Features the roaring red lion silhouette and the original Aircel block sponsor.",
    statsInJersey: "Captained CSK to the Final in Season 1 · 414 runs at 41.40 average (SR 133.54)",
    designDetails: [
      "Vibrant Canary Yellow fabric matching Tamil Nadu sunshine",
      "Roaring red lion silhouette on left chest",
      "Classic dark navy shoulder panels and armpit vents",
      "White and red dual-layer block lettering on back"
    ]
  },

  // =========================================================================
  // 5. 2008: CB SERIES (AUSTRALIA)
  // =========================================================================
  {
    id: "jersey_2008_cb_series",
    imageSrc: "/images/jerseys/jersey_india_2008_cb_series.jpg",
    year: "2008",
    title: "The Australia Conqueror (CB Series)",
    team: "India",
    tournament: "Commonwealth Bank Series (Australia)",
    tournamentType: "BILATERAL_ODI",
    era: "The Fearless Youth Revolution (2008)",
    primaryColor: "#0284c7",
    secondaryColor: "#0f172a",
    accentColor: "#ea580c",
    number: 7,
    playerName: "DHONI",
    sponsor: "SAHARA",
    famousMoment: "March 2 & 4, 2008: Silencing the SCG and MCG as India swept Ricky Ponting's Australia 2-0 in the best-of-three finals.",
    description: "Clean modern sapphire blue with aerodynamic side ventilation. Known for Dhoni's famous directive: 'Do not celebrate on the balcony; show them this is normal.'",
    statsInJersey: "2-0 Finals win vs Australia · Unbeaten 36* and 17* in pressure chases",
    designDetails: [
      "Breathable performance mesh fabric",
      "Subtle saffron accents around collar ribbing",
      "First kit featuring Dhoni's signature inner wrist sweatbands",
      "White typography with tricolor outline"
    ]
  },

  // =========================================================================
  // 6. 2010: IPL CHAMPIONS (CSK)
  // =========================================================================
  {
    id: "jersey_2010_ipl_champions",
    imageSrc: "/images/jerseys/jersey_csk_2010.jpg",
    year: "2010",
    title: "IPL 2010: The Maiden Championship Yellow",
    team: "Chennai Super Kings",
    tournament: "IPL 2010 (DY Patil Stadium Final)",
    tournamentType: "IPL",
    era: "The Chennai Dynasty Begins (2010)",
    primaryColor: "#eab308",
    secondaryColor: "#b91c1c",
    accentColor: "#1d4ed8",
    number: 7,
    playerName: "DHONI",
    sponsor: "AIRCEL",
    famousMoment: "April 25, 2010: Dhoni setting the famous straight mid-off trap for Kieron Pollard to defeat Mumbai Indians by 22 runs and lift CSK's maiden IPL trophy.",
    description: "The championship kit with royal blue side ribbing and gold sleeve bands. Dhoni scored 287 runs that season, including the fiery helmet-punch 54* in Dharamsala.",
    statsInJersey: "CSK's Maiden IPL Title · Defeated MI in Final · Pollard trap masterstroke",
    designDetails: [
      "Vibrant golden yellow with dark blue flank panels",
      "Roaring lion crest over the heart with golden outline",
      "White AIRCEL font with red circular logo",
      "First IPL victory jersey worn for the iconic lap of honor"
    ]
  },

  // =========================================================================
  // 7. 2010: CLT20 CHAMPIONS (CSK) - SOUTH AFRICA
  // =========================================================================
  {
    id: "jersey_2010_clt20_champions",
    imageSrc: "/images/jerseys/jersey_clt20_2010.jpg",
    year: "2010",
    title: "CLT20 2010: The South Africa Double Crown",
    team: "Chennai Super Kings",
    tournament: "Champions League Twenty20 2010 (South Africa)",
    tournamentType: "CLT20",
    era: "Global Franchise Domination (2010)",
    primaryColor: "#f59e0b",
    secondaryColor: "#1e3a8a",
    accentColor: "#dc2626",
    number: 7,
    playerName: "DHONI",
    sponsor: "AIRCEL (CLT20 Global Edition)",
    famousMoment: "September 26, 2010 at Wanderers, Johannesburg: CSK blew away the Warriors by 8 wickets to complete the historic IPL + CLT20 double in the same year.",
    description: "Special Champions League T20 edition kit featuring the official silver CLT20 tournament sleeve badge and South African cricket union branding.",
    statsInJersey: "First team in history to win IPL + CLT20 in same calendar year · Wanderers Champions",
    designDetails: [
      "Official CLT20 silver embroidered badge on right sleeve",
      "High-altitude breathable mesh tailored for South African conditions",
      "Roaring lion with global champion golden star above it",
      "Dhoni's signature wicketkeeping glove straps in matching yellow"
    ]
  },

  // =========================================================================
  // 8. 2011: WORLD CUP CHAMPIONS (INDIA)
  // =========================================================================
  {
    id: "jersey_2011_world_cup",
    imageSrc: "/images/jerseys/jersey_india_2011_wc.jpg",
    year: "2011",
    title: "The World Cup 2011 Winning Blue",
    team: "India",
    tournament: "2011 ICC Cricket World Cup",
    tournamentType: "ICC_WORLD_CUP",
    era: "The Pinnacle of Indian Cricket (2011)",
    primaryColor: "#0284c7",
    secondaryColor: "#0369a1",
    accentColor: "#f59e0b",
    number: 7,
    playerName: "DHONI",
    sponsor: "INDIA (Clean ICC Font)",
    famousMoment: "April 2, 2011 at Wankhede: 91* off 79 balls and that epochal winning six over long-on off Nuwan Kulasekara to end a 28-year wait.",
    description: "The most iconic jersey in modern Indian cricket history. Deep ocean blue with tricolor sleeve piping, textured shoulder ventilation, and a clean 'INDIA' font.",
    statsInJersey: "World Cup Champions · 91* in Final (Player of the Match) · 241 tournament runs",
    designDetails: [
      "Engineered Dri-FIT fabric with moisture wicking",
      "Tricolor piping subtly woven into the sleeve cuffs",
      "Two stars above the BCCI emblem (representing 1983 and 2007)",
      "Auctioned for charity alongside Dhoni's signed Reebok bat"
    ]
  },

  // =========================================================================
  // 9. 2011: IPL BACK-TO-BACK DEFENDING CHAMPIONS (CSK)
  // =========================================================================
  {
    id: "jersey_2011_ipl_defense",
    imageSrc: "/images/jerseys/jersey_csk_2011.jpg",
    year: "2011",
    title: "IPL 2011: Back-to-Back Title Defense",
    team: "Chennai Super Kings",
    tournament: "IPL 2011 (Chepauk Final vs RCB)",
    tournamentType: "IPL",
    era: "The Invincible Chepauk Era (2011)",
    primaryColor: "#facc15",
    secondaryColor: "#1d4ed8",
    accentColor: "#b91c1c",
    number: 7,
    playerName: "DHONI",
    sponsor: "AIRCEL",
    famousMoment: "May 28, 2011 at Chepauk: Defeating RCB by 58 runs to become the first team in IPL history to successfully defend their title back-to-back.",
    description: "Features a gleaming golden champion star embroidered above the roaring lion crest, celebrating CSK's 2010 title defense at fortress Chepauk.",
    statsInJersey: "First back-to-back champions in IPL history · 392 runs at 43.55 average (SR 158.70)",
    designDetails: [
      "First CSK jersey to bear the official golden championship star",
      "Deep navy blue side chevron mesh inserts",
      "Celebrated with Dhoni lifting the trophy in yellow confetti shower at Chepauk",
      "Paired with Dhoni's iconic Reebok spiked wicketkeeping boots"
    ]
  },

  // =========================================================================
  // 10. 2013: ICC CHAMPIONS TROPHY (INDIA)
  // =========================================================================
  {
    id: "jersey_2013_champions_trophy",
    imageSrc: "/images/jerseys/jersey_india_2013_ct.jpg",
    year: "2013",
    title: "The ICC Trifecta (Edgbaston 2013)",
    team: "India",
    tournament: "2013 ICC Champions Trophy (England)",
    tournamentType: "ICC_WORLD_CUP",
    era: "The Grand Slam Captain (2013)",
    primaryColor: "#1d4ed8",
    secondaryColor: "#1e3a8a",
    accentColor: "#fb923c",
    number: 7,
    playerName: "DHONI",
    sponsor: "INDIA",
    famousMoment: "June 23, 2013 at Edgbaston: Dancing with the white blazer as India defended 129 in a 20-over thriller, completing Dhoni's ICC white-ball trifecta.",
    description: "Electric navy blue with laser-perforated cooling zones and a distinct mandarin collar. Worn during an unbeaten campaign across England.",
    statsInJersey: "Undefeated Champions Trophy tournament · Completed the historic ICC Trifecta",
    designDetails: [
      "Modern Mandarin collar with snap button closure",
      "Laser cut perforations on back for temperature regulation",
      "Geometric micro-pattern on shoulders",
      "Paired with the official white champions blazer at Edgbaston"
    ]
  },

  // =========================================================================
  // 11. 2014: CLT20 CHAMPIONS (CSK) - BENGALURU
  // =========================================================================
  {
    id: "jersey_2014_clt20_champions",
    imageSrc: "/images/jerseys/jersey_clt20_2014.jpg",
    year: "2014",
    title: "CLT20 2014: The Second Global Crown",
    team: "Chennai Super Kings",
    tournament: "Champions League Twenty20 2014 (Chinnaswamy Final)",
    tournamentType: "CLT20",
    era: "The Two-Time Global Champions (2014)",
    primaryColor: "#eab308",
    secondaryColor: "#1e3a8a",
    accentColor: "#dc2626",
    number: 7,
    playerName: "DHONI",
    sponsor: "AIRCEL (CLT20 2014 Edition)",
    famousMoment: "October 4, 2014 in Bengaluru: Suresh Raina smashed 109* and Dhoni walked in to hit the winning six against KKR, lifting CSK's 2nd CLT20 trophy.",
    description: "The victorious CLT20 2014 kit with Karbonn Smart Champions League badge on sleeve and two golden stars embroidered above the roaring lion.",
    statsInJersey: "2nd CLT20 Championship · Broke KKR's 14-match winning streak in the Final",
    designDetails: [
      "Official Karbonn CLT20 2014 sleeve insignia",
      "Two stars above the CSK crest representing the 2010 double",
      "Contrast royal blue piping along collar and shoulder seam",
      "Dhoni finished the final with an emphatic towering six over deep midwicket"
    ]
  },

  // =========================================================================
  // 12. 2016: RISING PUNE SUPERGIANT (RPS)
  // =========================================================================
  {
    id: "jersey_2016_rps_edition",
    imageSrc: "/images/jerseys/jersey_clt20_alt.jpg",
    year: "2016–2017",
    title: "The Purple & Rose Gold RPS #7",
    team: "Rising Pune Supergiant",
    tournament: "IPL 2016 & 2017 (Pune)",
    tournamentType: "IPL",
    era: "The Two-Year Interlude (2016–2017)",
    primaryColor: "#581c87", // Deep Purple
    secondaryColor: "#be185d", // Rose Pink / Gold
    accentColor: "#facc15",
    number: 7,
    playerName: "DHONI",
    sponsor: "SPYKAR / KENT RO",
    famousMoment: "May 2016: Smashing 23 runs in the final over against Axar Patel (KXIP) in Vizag, including two sixes off the final two balls to win an impossible match.",
    description: "The unique deep violet-purple and rose gold jersey worn by MS Dhoni during CSK's 2-year suspension, leading RPS to the 2017 IPL Final.",
    statsInJersey: "23 runs off final over vs KXIP · Led RPS to the 2017 IPL Final",
    designDetails: [
      "Deep royal purple fabric with geometric magenta gradient sash",
      "Number 7 printed in vibrant yellow with gold metallic trim",
      "RPS soaring eagle crest on the left breast",
      "One of the rarest collector jerseys in Dhoni's franchise career"
    ]
  },

  // =========================================================================
  // 13. 2016: ASIA CUP T20 (INDIA)
  // =========================================================================
  {
    id: "jersey_2016_asia_cup",
    imageSrc: "/images/jerseys/jersey_india_2015_odi.jpg",
    year: "2016",
    title: "The Asia Cup T20 & 0.08s Stumping",
    team: "India",
    tournament: "2016 Asia Cup & ICC World T20",
    tournamentType: "ASIA_CUP",
    era: "The Lightning Reflexes Era (2016)",
    primaryColor: "#1e40af",
    secondaryColor: "#172554",
    accentColor: "#f97316",
    number: 7,
    playerName: "DHONI",
    sponsor: "STAR INDIA",
    famousMoment: "March 2016: Blasting 20* off 6 balls in the Asia Cup final, and the 1-glove sprint against Bangladesh at Bengaluru to effect the 1-run win.",
    description: "Deep midnight blue jersey with a chevron textured front chest panel and modernised rubberized BCCI badge.",
    statsInJersey: "Asia Cup Champions · World record 0.08s stumping reflex time",
    designDetails: [
      "Subtle chevron chest pattern symbolizing forward momentum",
      "Mandarin collar with saffron piping",
      "Printed with Dhoni's signature glove grip rubber trims",
      "STAR India chest sponsorship"
    ]
  },

  // =========================================================================
  // 14. 2018: IPL COMEBACK "DAD'S ARMY" (CSK)
  // =========================================================================
  {
    id: "jersey_2018_csk_comeback",
    imageSrc: "/images/jerseys/jersey_csk_2018.jpg",
    year: "2018",
    title: "IPL 2018: The 'Dad's Army' Fairytale Return",
    team: "Chennai Super Kings",
    tournament: "IPL 2018 (Wankhede Final vs SRH)",
    tournamentType: "IPL",
    era: "The Emotional Return (2018)",
    primaryColor: "#eab308",
    secondaryColor: "#991b1b",
    accentColor: "#1e3a8a",
    number: 7,
    playerName: "DHONI",
    sponsor: "MUTHOOT GROUP",
    famousMoment: "May 27, 2018: Lifting the IPL trophy after a 2-year hiatus. Dhoni had teared up at the pre-season dinner, then hit 455 runs at a strike rate of 150+.",
    description: "The heartwarming yellow jersey with Muthoot Group branding and two championship stars above the roaring lion crest. The emotional apex of CSK.",
    statsInJersey: "455 runs at 75.83 average · Strike rate 150.66 · 24 tournament sixes · 3rd IPL Title",
    designDetails: [
      "Two golden embroidered stars over the lion emblem",
      "Red Muthoot Group circular insignia in center",
      "Custom ribbed collar with inner Tamil inscription 'Whistle Podu'",
      "Dhoni's most prolific six-hitting IPL season"
    ]
  },

  // =========================================================================
  // 15. 2019: WORLD CUP RETIREMENT SALUTE (INDIA)
  // =========================================================================
  {
    id: "jersey_2019_world_cup",
    imageSrc: "/images/jerseys/jersey_india_2019_cwc.jpg",
    year: "2019",
    title: "The Final International Salute",
    team: "India",
    tournament: "2019 ICC Cricket World Cup (England)",
    tournamentType: "ICC_WORLD_CUP",
    era: "The Senior Statesman (2019)",
    primaryColor: "#1e3a8a",
    secondaryColor: "#ea580c",
    accentColor: "#f8fafc",
    number: 7,
    playerName: "DHONI",
    sponsor: "INDIA",
    famousMoment: "July 10, 2019 at Old Trafford: Dhoni's fighting 50 in the semi-final vs New Zealand — his 350th and final ODI appearance for India.",
    description: "Dual-tone kit: Home Navy Blue with Solar Orange accents, and the iconic Away Kit with orange torso. Featured the Balidan dagger badge on wicketkeeping gloves.",
    statsInJersey: "350th and final ODI · 10,773 career ODI runs · Final international innings",
    designDetails: [
      "Engineered laser-mesh fabric with three stars over BCCI badge",
      "Solar orange collar and flank panels",
      "Worn during the heart-stopping 2 inches Martin Guptill runout",
      "Followed by the 19:29 retirement message on August 15, 2020"
    ]
  },

  // =========================================================================
  // 16. 2021: IPL CHAMPIONS (CSK) - DUBAI CAMO
  // =========================================================================
  {
    id: "jersey_2021_csk_camo",
    imageSrc: "/images/jerseys/jersey_csk_2021.jpg",
    year: "2021",
    title: "IPL 2021: The Armed Forces Camouflage Yellow",
    team: "Chennai Super Kings",
    tournament: "IPL 2021 (Dubai Final vs KKR)",
    tournamentType: "IPL",
    era: "The Four-Star General (2021)",
    primaryColor: "#facc15",
    secondaryColor: "#4d7c0f", // Camo green
    accentColor: "#1e3a8a",
    number: 7,
    playerName: "DHONI",
    sponsor: "MYNTRA",
    famousMoment: "October 15, 2021: Fourth IPL championship victory in Dubai, bouncing back from 2020 disappointment in vintage Dhoni style.",
    description: "Features military camouflage shoulder epaulettes paying homage to the Indian Armed Forces (Territorial Army), honoring Dhoni's rank as Lt. Colonel.",
    statsInJersey: "Fourth IPL Title · First jersey to incorporate Indian Army camouflage",
    designDetails: [
      "Authentic military camouflage pattern on shoulder yokes",
      "Three stars over the roaring lion crest (updated to 4 post-final)",
      "Tribute approved by the Indian Armed Forces",
      "Yellow body with blue side ventilation"
    ]
  },

  // =========================================================================
  // 17. 2023: IPL 5TH TITLE (CSK) - 3:00 AM AHMEDABAD
  // =========================================================================
  {
    id: "jersey_2023_csk_5th_crown",
    imageSrc: "/images/jerseys/jersey_csk_2023.jpg",
    year: "2023",
    title: "IPL 2023: The 3:00 AM Rain Thriller (5th Title)",
    team: "Chennai Super Kings",
    tournament: "IPL 2023 (Narendra Modi Stadium Final vs GT)",
    tournamentType: "IPL",
    era: "The Record 5th Title (2023)",
    primaryColor: "#eab308",
    secondaryColor: "#1e3a8a",
    accentColor: "#d97706",
    number: 7,
    playerName: "DHONI",
    sponsor: "TVS EUROGRIP",
    famousMoment: "May 29, 2023 at 3:00 AM in Ahmedabad: Ravindra Jadeja hitting 6 & 4 to win the 5th title, and Dhoni lifting Jadeja into the night sky with teary eyes.",
    description: "The championship jersey worn through chronic knee injuries, with Dhoni strapped with heavy knee braces but playing every match for the stadium seas of yellow.",
    statsInJersey: "Record-equalling 5th IPL Title · 182.46 strike rate cameos · Final against GT",
    designDetails: [
      "TVS EUROGRIP sponsor in bold navy lettering",
      "Four golden stars above lion (soon to be five)",
      "High-stretch elastane allowing movement despite knee bracing",
      "Worn during the legendary victory parade through Chepauk"
    ]
  },

  // =========================================================================
  // 18. 2024–2026: IPL 5-STAR ETERNAL LEGACY (CSK)
  // =========================================================================
  // =========================================================================
  // 19. INDIAN ARMY CAMOUFLAGE UNIFORM (TERRITORIAL ARMY)
  // =========================================================================
  {
    id: "jersey_indian_army_camo",
    year: "2015–Present",
    title: "Indian Army Territorial Army Camouflage Uniform",
    team: "Indian Army",
    tournament: "106 Para TA Battalion (Kashmir and Agra)",
    tournamentType: "MILITARY",
    era: "Honorary Lieutenant Colonel (2011–Present)",
    primaryColor: "#3f4f34",
    secondaryColor: "#273320",
    accentColor: "#a16207",
    number: 7,
    playerName: "DHONI",
    sponsor: "INDIAN ARMY (Balidan Badge)",
    famousMoment: "August 2019: Deployed with the Victor Force in South Kashmir on active guard duty and completed 5 parachute jumps in Agra to earn his Balidan maroon wings.",
    description: "Official combat camouflage uniform with parachute jump wings and Balidan dagger emblem. Dhoni marched in this uniform at Rashtrapati Bhavan to receive the Padma Bhushan in 2018.",
    statsInJersey: "Honorary Lt. Colonel · 5 Parachute Jumps in Agra · Guard Duty in Kashmir",
    imageSrc: "/images/jerseys/jersey_indian_army_camo.jpg",
    designDetails: [
      "Authentic Indian Armed Forces disruptive pattern camouflage",
      "Paratrooper Balidan wings embroidered on chest",
      "Territorial Army regimental collar tabs",
      "Maroon paratrooper beret paired with uniform"
    ]
  },

  // =========================================================================
  // 20. BIHAR & JHARKHAND DOMESTIC CRICKET (RANJI TROPHY)
  // =========================================================================
  {
    id: "jersey_domestic_bihar",
    year: "1999–2004",
    title: "Bihar & Jharkhand Ranji Trophy Domestic Blue",
    team: "Bihar / Jharkhand",
    tournament: "Ranji Trophy and Deodhar Trophy",
    tournamentType: "DOMESTIC",
    era: "The Domestic Grind (1999–2004)",
    primaryColor: "#1e3a8a",
    secondaryColor: "#ca8a04",
    accentColor: "#ffffff",
    number: 7,
    playerName: "DHONI",
    sponsor: "BIHAR CRICKET",
    famousMoment: "1999–2000 debut at Keenan Stadium, Jamshedpur: Scoring a fighting 68* on Ranji debut against Assam, beginning his rise through East Zone cricket.",
    description: "The grassroots blue Ranji Trophy uniform with yellow sleeve piping, representing Bihar and Jharkhand before Dhoni's international call-up.",
    statsInJersey: "First-class debut at age 18 · Deodhar Trophy Champion 2003–04 with East Zone",
    imageSrc: "/images/jerseys/jersey_domestic_bihar.jpg",
    designDetails: [
      "Classic royal blue with yellow piping",
      "Bihar Cricket Association official crest",
      "Worn on dusty domestic wickets from Keenan to Eden Gardens",
      "The bedrock foundation of Dhoni's explosive domestic game"
    ]
  },
  {
    id: "jersey_2024_2026_legacy",
    imageSrc: "/images/jerseys/jersey_csk_2023.jpg",
    year: "2024–2026",
    title: "IPL 2024–2026: The Five-Star Eternal Yellow",
    team: "Chennai Super Kings",
    tournament: "IPL 2024–2026",
    tournamentType: "IPL",
    era: "The Mentor & Finisher (2024–2026)",
    primaryColor: "#facc15",
    secondaryColor: "#dc2626",
    accentColor: "#1e3a8a",
    number: 7,
    playerName: "DHONI",
    sponsor: "TVS EUROGRIP",
    famousMoment: "Passing the captaincy torch to Ruturaj Gaikwad while still walking out to 130-decibel stadium roars, smoking 20-run final-over cameos at age 42+.",
    description: "The majestic five-star edition of the CSK yellow jersey. Every ground in India turns into a sea of yellow whenever number 7 steps onto the turf.",
    statsInJersey: "5 Golden Stars above the roaring lion · Handover of captaincy · 250+ IPL matches",
    designDetails: [
      "Five golden embroidered stars representing 2010, 2011, 2018, 2021, 2023",
      "Lightweight hyper-breathable honeycomb fabric",
      "Number 7 officially retired in spirit across Indian cricket",
      "Still commanding maximum decibels across every Indian stadium"
    ]
  }
];
