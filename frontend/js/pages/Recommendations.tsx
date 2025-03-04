import RecommendationList from "../components/RecommendationList/RecommendationList";
import { dummyAnimeList } from "../constants";
import { Anime } from "../types";

const Recommendations = () => {
  // TODO: Change this to fetch recommendations from the backend instead of a dummy test file
  const allRecommendations: Anime[] = dummyAnimeList;

  return <RecommendationList allRecommendations={allRecommendations} />;
};

export default Recommendations;
