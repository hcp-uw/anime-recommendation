import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { Anime } from '../../types';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  return (
    <Card className="mb-3">
      <Row noGutters>
        {/* Image Section */}
        <Col md={2}>
          <Card.Img src={anime.imageUrl} alt={anime.name} className="h-100" />
        </Col>

        {/* Details Section */}
        <Col md={10}>
          <Card.Body>
            <Row>
              {/* Anime Title and Genres */}
              <Col md={3}>
                <Card.Title>{anime.name}</Card.Title>
                <div className="mb-2">
                  {anime.genres.map((genre) => (
                    <Badge key={genre} bg="secondary" className="mr-1">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </Col>

              {/* Synopsis */}
              <Col md={7}>
                <Card.Text className="text-truncate">
                  {anime.synopsis}
                </Card.Text>
              </Col>

              {/* Action Button or Status */}
              <Col md={2} className="d-flex align-items-center justify-content-center">
                <Badge pill bg="success">
                  Plan To Watch
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default AnimeCard;