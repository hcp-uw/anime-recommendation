import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import AnimeRecommendation from './AnimeRecommendation';
import FilterPanel from './FilterPanel/FilterPanel';
import { Anime } from '../../types';
import { filterAnime } from '../../utils';

interface RecommendationListProps {
  allRecommendations: Anime[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ allRecommendations }) => {
  const [filteredRecommendations, setFilteredRecommendations] = useState<Anime[]>(allRecommendations);

  // Effect to update filtered recommendations when allRecommendations changes
  useEffect(() => {
    setFilteredRecommendations(allRecommendations);
  }, [allRecommendations]);

  // Handle filtering logic
  const handleFilter = (filters: { genres: string[]; minRating: number }) => {
    const filtered = allRecommendations.filter(anime => {
      return filters.genres.every(genre => anime.genres.includes(genre)) &&
             anime.rating >= filters.minRating;
    });
    setFilteredRecommendations(filtered);
  };

  return (
    <Row className="recommendation-list">
      <Col md={9} className="anime-list">
        <div className="anime-grid">
          {filteredRecommendations.map(anime => (
            <AnimeRecommendation key={anime.id} anime={anime} />
          ))}
        </div>
      </Col>
      <Col md={3} className="filter-panel-container">
        <FilterPanel onFilter={handleFilter} />
      </Col>
    </Row>
  );
};

export default RecommendationList;
