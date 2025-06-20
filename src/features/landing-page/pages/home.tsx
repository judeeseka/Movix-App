import { useQuery } from "@tanstack/react-query";
import {
  getPopularMoviesQueryOptions,
  getPopularSeriesQueryOptions,
  getTopRatedQueryOptions,
  getTopRatedSeriesQueryOptions,
  gettrendingMoviesQueryOptions,
} from "../api/query";
import LoadingSpinner from "@/components/shared/loading-spinner";
import HeroSection from "../components/hero-section";
import PopularMovies from "../components/popular-movies";
import PopularSeries from "../components/popular-series";
import TopRatedMovies from "../components/top-rated-movies";
import TopRatedSeries from "../components/top-rated-series";
import CtaSection from "../components/cta-section";

const Home = () => {
  const heroQuery = useQuery(gettrendingMoviesQueryOptions());
  const popularMoviesQuery = useQuery(getPopularMoviesQueryOptions());
  const popularSeriesQuery = useQuery(getPopularSeriesQueryOptions());
  const topRatedMoviesQuery = useQuery(getTopRatedQueryOptions());
  const topRatedSeriesQuery = useQuery(getTopRatedSeriesQueryOptions());

  if (
    heroQuery.isLoading ||
    popularMoviesQuery.isLoading ||
    popularSeriesQuery.isLoading ||
    topRatedMoviesQuery.isLoading ||
    topRatedSeriesQuery.isLoading
  ) {
    return <LoadingSpinner landing text="Loading movie content..." />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection heroData={heroQuery.data} />

      {/* Popular Movies */}
      <PopularMovies popularData={popularMoviesQuery.data} />

      {/* Popular TV Shows */}
      <PopularSeries popularSeries={popularSeriesQuery.data} />

      {/* Top Rated Movies */}
      <TopRatedMovies topRatedMoviesData={topRatedMoviesQuery.data} />

      {/* Top Rated TV Shows */}
      <TopRatedSeries topRatedSeriesData={topRatedSeriesQuery.data} />

      {/* Recommendations */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recommended for You
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {recommendations.map((item, index) => (
              <motion.div
                key={`${item.media_type}-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MediaCard media={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <CtaSection />
    </div>
  );
};

export default Home;
