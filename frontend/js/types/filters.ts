export type AnimeStatus = "Finished Airing" | "Not yet aired" | "Currently Airing" | "All Statuses";
export type AnimeType = "TV" | "OVA" | "Movie" | "Special" | "ONA" | "Music" | "Other" | "All Types";

export const animeStatuses: AnimeStatus[] = ["Finished Airing", "Not yet aired", "Currently Airing", "All Statuses"];
export const animeTypes: AnimeType[] = ["TV", "OVA", "Movie", "Special", "ONA", "Music", "Other", "All Types"];

// TODO: Add source (LN, Game, Manga, etc. as a filter?)
export type Filters = {
  included_genres: string[];
  excluded_genres: string[];
  staff: string[];
  companies: string[];
  malScore: { min: number; max: number };
  members: { min: number; max: number };
  airing_date: { earliest_start: string, latest_start: string}
  status: AnimeStatus;
  type: AnimeType;
  episode_count: { min: number; max: number };
};