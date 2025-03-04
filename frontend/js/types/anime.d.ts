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
    airingDate: { start: string; end?: string };
    status: AnimeStatus;
    type: AnimeType;
    episodeCount: number;
  };