import RecommendationList from "../components/RecommendationList/RecommendationList";
import { Anime } from "../types";
import { dummyAnimeList } from "../constants/DummyAnimeList";

const Recommendations = () => {
  // TODO: Change this to fetch recommendations from the backend instead of a dummy test file
  const allRecommendations: Anime[] = dummyAnimeList;

  return (
      <RecommendationList allRecommendations={allRecommendations} />
  );
};

export default Recommendations;
