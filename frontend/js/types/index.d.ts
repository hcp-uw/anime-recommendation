export {Anime} from './anime';
export {AnimeStatus, AnimeType, Filters, animeStatuses, animeTypes, FilterChange} from './filters';

declare global {
  interface Window {
    SENTRY_DSN: string;
    COMMIT_SHA: string;

    Urls: unknown;
  }
}
