import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getAllMoviesQueryOptions } from "../api/query";
import { Film, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { movieGenres } from "@/lib/contants";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "@/components/common/loading-spinner";
import EmptyState from "@/components/common/empty-state";
import MediaCard from "@/components/common/media-card";

const MovieHome = () => {
  const [searchparams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const [genre, setGenre] = useState(searchparams.get("genre") || "");
  const [movieYear, setMovieYear] = useState(searchparams.get("year") || "");
  const [sortBy, setSortBy] = useState(
    searchparams.get("sort_by") || "popularity.desc"
  );
  const [rating, setRating] = useState(searchparams.get("rating") || "");
  const location = useLocation();
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const { data, status, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      getAllMoviesQueryOptions(genre, movieYear, sortBy, rating)
    );

  const clearFilters = () => {
    setGenre("");
    setMovieYear("");
    setSortBy("popularity.desc");
    setRating("");
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (genre) params.set("genre", genre);
    if (movieYear) params.set("year", movieYear);
    if (sortBy !== "popularity.desc") params.set("sort_by", sortBy);
    if (rating) params.set("rating", rating);

    const newUrl = `${location.pathname}?${params.toString()}`;

    navigate(newUrl, { replace: true });
  }, [genre, location.pathname, movieYear, navigate, rating, sortBy]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Film className="h-8 w-8 text-amber-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Movies
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Discover amazing movies from our extensive collection
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Genre Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Genre
                  </label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">All Genres</option>
                    {movieGenres.map((genre) => (
                      <option key={genre.id} value={genre.name.toLowerCase()}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year
                  </label>
                  <select
                    value={movieYear}
                    onChange={(e) => setMovieYear(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="popularity.desc">Most Popular</option>
                    <option value="vote_average.desc">Highest Rated</option>
                    <option value="primary_release_date.desc">
                      Newest First
                    </option>
                    <option value="title.asc">Title A-Z</option>
                  </select>
                </div>

                {/* Minimum Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Any Rating</option>
                    <option value="7">7.0+</option>
                    <option value="8">8.0+</option>
                    <option value="9">9.0+</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <X className="h-4 w-4" />
                  <span>Clear Filters</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" text="Loading movies..." />
          </div>
        ) : status === "error" ? (
          <EmptyState
            icon={Search}
            title="No movies found"
            description="Try adjusting your search criteria or filters to find more movies."
            action={{
              label: "Clear Filters",
              onClick: clearFilters,
            }}
          />
        ) : (
          <>
            {/* Movies Grid */}
            <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-6">
              {data?.pages.map((page) =>
                page.results.map((movie, index) => (
                  <motion.div
                    key={`${movie.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <MediaCard type="movie" media={movie} />
                  </motion.div>
                ))
              )}
            </div>
            <div className="mt-4" ref={ref}></div>
            {isFetchingNextPage && <LoadingSpinner text="Loading more..." />}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieHome;
