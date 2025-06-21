import MovieDetailsSection from "../components/movie-details-section";
import MovieRecommendationSection from "../components/movie-recommendation-section";
import MovieReviewSection from "../components/movie-review-section";

const MovieDetails = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <MovieDetailsSection />
      <MovieReviewSection />
      <MovieRecommendationSection />
    </div>
  );
};

export default MovieDetails;
