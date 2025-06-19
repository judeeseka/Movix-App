import { tmdbBaseUrl } from "@/lib/contants";
import { useEffect, useState } from "react";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Film,
  Play,
  Star,
  Tv,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import type { MovieData } from "../../../types/types";

const HeroSection = ({
  heroData,
}: {
  heroData: MovieData["data"] | undefined;
}) => {
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);

  const handleNext = () => {
    if (currentTrendingIndex < heroData!.results.length - 1) {
      setCurrentTrendingIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTrendingIndex > 0) {
      setCurrentTrendingIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTrendingIndex((prev) =>
        prev < heroData!.results.length - 1 ? prev + 1 : 0
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [heroData]);

  const currentTrending = heroData?.results[currentTrendingIndex];

  if (currentTrending)
    return (
      <section className="relative h-[calc(100vh_-_64px)] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <AnimatePresence>
          <motion.div
            className="absolute inset-0"
            key={currentTrendingIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
          >
            <img
              src={`${tmdbBaseUrl}original${currentTrending.backdrop_path}`}
              alt={
                currentTrending.media_type === "movie"
                  ? currentTrending.title
                  : currentTrending.name
              }
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 rounded-full text-white transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 rounded-full text-white transition-all duration-200 cursor-pointer"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            key={currentTrendingIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white space-y-6"
          >
            <div className="flex items-center space-x-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Trending
              </span>
              <div className="flex items-center space-x-2">
                {currentTrending.media_type === "tv" ? (
                  <Tv className="h-4 w-4 text-blue-400" />
                ) : (
                  <Film className="h-4 w-4 text-green-400" />
                )}
                <span className="text-sm font-medium uppercase">
                  {currentTrending.media_type === "tv" ? "TV Series" : "Movie"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                <span className="text-sm font-medium">
                  {currentTrending.vote_average.toFixed(1)} Rating
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {currentTrending.media_type === "movie"
                ? currentTrending.title
                : currentTrending.name}
            </h1>

            <p className="md:text-lg text-gray-200 max-w-2xl leading-normal">
              {currentTrending.overview}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={
                  currentTrending.media_type === "movie"
                    ? `/movie/${currentTrending.id}`
                    : `/tv/${currentTrending.id}`
                }
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <Play
                  className="h-5 w-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                />
                <span>Watch Now</span>
              </Link>
              <button className="flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-200 cursor-pointer">
                <Bookmark className="h-5 w-5" />
                <span>Add to Watchlist</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 xl:flex space-x-2 z-10 hidden">
          {heroData.results.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTrendingIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer hover:scale-150 ${
                index === currentTrendingIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>
    );
};

export default HeroSection;
