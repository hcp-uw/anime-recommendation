import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { Anime, FilterChange } from "../../types";
import { filterAnime } from "../../utils";

import AnimeCard from "./AnimeCard";
import FilterPanel from "./FilterPanel/FilterPanel";

interface RecommendationListProps {
  allRecommendations: Anime[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  allRecommendations,
}) => {
  const [filteredRecommendations, setFilteredRecommendations] =
    useState<Anime[]>(allRecommendations);

  // Handle filter changes
  const handleFilter = (filters: FilterChange[]) => {
    const filtered = filterAnime(allRecommendations, filters);
    setFilteredRecommendations(filtered);
  };

  return (
    <Container fluid>
      <Row>
        {/* Filter Panel */}
        <Col md={3}>
          <FilterPanel onFilter={handleFilter} />
        </Col>

        {/* Recommendations List */}
        <Col md={9}>
          <div className="recommendation-list">
            {filteredRecommendations.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RecommendationList;
