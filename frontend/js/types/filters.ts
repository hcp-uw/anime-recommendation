import { AnimeStatus, AnimeType } from ".";

export type FilterChange =
  | { key: "includedGenres"; value: string[] }
  | { key: "excludedGenres"; value: string[] }
  | { key: "staff"; value: string[] }
  | { key: "companies"; value: string[] }
  | { key: "malScoreMin"; value: number }
  | { key: "malScoreMax"; value: number }
  | { key: "memberMin"; value: number }
  | { key: "memberMax"; value: number }
  | { key: "earliestAiringStart"; value: string }
  | { key: "latestAiringStart"; value: string }
  | { key: "status"; value: AnimeStatus }
  | { key: "type"; value: AnimeType }
  | { key: "episodeCountMin"; value: number }
  | { key: "episodeCountMax"; value: number };

// TODO: Potentially add source (LN, Game, Manga, etc. as a filter?)
export type Filters = {
  includedGenres: string[];
  excludedGenres: string[];
  staff: string[];
  companies: string[];
  malScoreMin: number;
  malScoreMax: number;
  memberMin: number;
  memberMax: number;
  earliestAiringStart: string;
  latestAiringStart: string;
  status: AnimeStatus;
  type: AnimeType;
  episodeCountMin: number;
  episodeCountMax: number;
};
