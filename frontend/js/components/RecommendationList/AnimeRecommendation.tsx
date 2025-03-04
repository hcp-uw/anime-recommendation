import React from 'react';

const AnimeRecommendation = ({ anime }) => {
  return (
    <div className="anime-card">
      <img src={anime.image} alt={anime.title} className="anime-image" />
      <h3>{anime.title}</h3>
      <p>{anime.description}</p>
      <div className="anime-tags">
        {anime.genres.map(genre => (
          <span key={genre} className="tag">{genre}</span>
        ))}
      </div>
      <div className="anime-details">
        <span>Rating: {anime.rating}</span>
        <span>Episodes: {anime.episodes}</span>
      </div>
    </div>
  );
};

export default AnimeRecommendation;