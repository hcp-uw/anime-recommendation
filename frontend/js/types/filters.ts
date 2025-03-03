export type AnimeStatus =
  | "Finished Airing"
  | "Not yet aired"
  | "Currently Airing"
  | "All Statuses";
export type AnimeType =
  | "TV"
  | "OVA"
  | "Movie"
  | "Special"
  | "ONA"
  | "Music"
  | "Other"
  | "All Types";

export const animeStatuses: AnimeStatus[] = [
  "Finished Airing",
  "Not yet aired",
  "Currently Airing",
  "All Statuses",
];
export const animeTypes: AnimeType[] = [
  "TV",
  "OVA",
  "Movie",
  "Special",
  "ONA",
  "Music",
  "Other",
  "All Types",
];

export type FilterChange =
  | { key: "includedGenres"; value: string[] }
  | { key: "excludedGenres"; value: string[] }
  | { key: "staff"; value: string[] }
  | { key: "companies"; value: string[] }
  | { key: "malScore"; value: { min: number; max: number } }
  | { key: "members"; value: { min: number; max: number } }
  | { key: "airingDate"; value: { earliestStart: string; latestStart: string } }
  | { key: "status"; value: AnimeStatus }
  | { key: "type"; value: AnimeType }
  | { key: "episodeCount"; value: { min: number; max: number } };

// TODO: Potentially add source (LN, Game, Manga, etc. as a filter?)
export type Filters = {
  includedGenres: string[];
  excludedGenres: string[];
  staff: string[];
  companies: string[];
  malScore: { min: number; max: number };
  members: { min: number; max: number };
  airingDate: { earliestStart: string; latestStart: string };
  status: AnimeStatus;
  type: AnimeType;
  episodeCount: { min: number; max: number };
};
