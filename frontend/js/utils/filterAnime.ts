import { Anime } from '../types';
import { Filters } from '../types';

/**
 * Filters an array of Anime based on the provided filters.
 * @param allRecommendations - The full list of Anime recommendations.
 * @param filters - A Partial<Filters> object containing filtering criteria.
 * @returns A filtered array of Anime.
 */
export const filterAnime = (allRecommendations: Anime[], filters: Partial<Filters>): Anime[] => {
    return allRecommendations.filter(anime => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === undefined || value === null) return true; // Skip undefined or null filters
  
        switch (key) {
          case 'includedGenres':
            return (value as string[]).some(genre => anime.genres.includes(genre));
          case 'excludedGenres':
            return !(value as string[]).some(genre => anime.genres.includes(genre));
          case 'staff':
            return (value as string[]).some(staffMember => anime.staff.includes(staffMember));
          case 'companies':
            return (value as string[]).some(company => anime.companies.includes(company));
          case 'malScore':
            const { min: scoreMin, max: scoreMax } = value as Filters['malScore'];
            return (
              (scoreMin === undefined || anime.malScore >= scoreMin) &&
              (scoreMax === undefined || anime.malScore <= scoreMax)
            );
          case 'members':
            const { min: membersMin, max: membersMax } = value as Filters['members'];
            return (
              (membersMin === undefined || anime.members >= membersMin) &&
              (membersMax === undefined || anime.members <= membersMax)
            );
          case 'airingDate':
            const { earliestStart, latestStart } = value as Filters['airingDate'];
            const animeAiringDate = new Date(anime.airingDate.start); // Assuming anime has an `airingDate` property
            return (
              (!earliestStart || animeAiringDate >= new Date(earliestStart)) &&
              (!latestStart || animeAiringDate <= new Date(latestStart))
            );
          case 'status':
            return value === anime.status;
          case 'type':
            return value === anime.type;
          case 'episodeCount':
            const { min: episodesMin, max: episodesMax } = value as Filters['episodeCount'];
            return (
              (episodesMin === undefined || anime.episodeCount >= episodesMin) &&
              (episodesMax === undefined || anime.episodeCount <= episodesMax)
            );
          default:
            return true; // Ignore unknown filter keys
        }
      });
    });
  };