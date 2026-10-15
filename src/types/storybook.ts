export type VerificationType =
  | "VERIFIED_QUOTATION"
  | "VERIFIED_HISTORICAL_MOMENT"
  | "EDITORIAL_INTERPRETATION";

export type MediaProvider = "YOUTUBE" | "HTML5" | "IMAGE_ARCHIVE";

export interface StoryQuote {
  text: string | null;
  speaker: string | null;
  sourceTitle: string | null;
  sourceUrl: string | null;
  publicationDate?: string | null;
  verificationStatus: "VERIFIED" | "EDITORIAL" | "NOT_APPLICABLE";
  originalLanguage?: "HINDI" | "ENGLISH";
  hindiText?: string | null;
}

export interface StoryMedia {
  provider: MediaProvider;
  videoId: string | null;
  embedUrl: string | null;
  posterUrl: string;
  sourceUrl: string | null;
  attribution: string | null;
  aspectRatio?: "16:9" | "4:3" | "1:1" | "portrait" | "landscape" | "3:4" | "9:16";
  startTime?: number; // seconds
}

export interface StoryEntry {
  id: string;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  title: string;
  subtitle: string;
  eventDate: string;
  location: string;
  category:
    | "ORIGINS"
    | "BREAKTHROUGH"
    | "WORLD_CUP"
    | "LEADERSHIP"
    | "FINISHING"
    | "CAPTAINCY"
    | "MILITARY"
    | "PASSION"
    | "PERSONALITY"
    | "CSK_LEGACY"
    | "FAREWELL"
    | "UNSPOKEN";
  contentType: VerificationType;
  historicalContext: string;
  narrative: string;
  meaning: string;
  quote: StoryQuote;
  media: StoryMedia;
  visualDirection?: string;
  typographyDirection?: string;
  estimatedReadingTime?: number;
  tags: string[];
}

export interface StorybookChapter {
  id: string;
  number: number;
  romanNumeral: string;
  title: string;
  subtitle: string;
  epigraph: string;
  epigraphSource?: string;
  storyIds: string[];
  accentColor: string;
  coverImage: string;
}

export type StorybookState = "INTRODUCTION" | "STORYBOOK" | "ENDING";
