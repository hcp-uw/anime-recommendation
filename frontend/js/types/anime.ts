import { AnimeStatus } from "./animeStatus";
import { AnimeType } from "./animeType";

export type Anime = {
  id: number;
  name: string;
  synopsis: string;
  malUrl: string;
  imageUrl: string;
  genres: string[];
  staff: string[];
  companies: string[];
  malScore: number;
  members: number;
  airingDate: { start: Date; end?: Date };
  status: AnimeStatus;
  type: AnimeType;
  episodeCount: number;
};
