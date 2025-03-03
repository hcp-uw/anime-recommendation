type AnimeStatus = "Finished Airing" | "Not yet aired" | "Currently Airing" | "ALL";
type AnimeType = "TV" | "OVA" | "Movie" | "Special" | "ONA" | "Music" | "Other" | "ALL";

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