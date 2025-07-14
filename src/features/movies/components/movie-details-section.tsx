import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getMovieInfoQueryOptions } from "../api/query";
import { formatRuntime, getBackdropUrl, getPosterUrl } from "@/lib/utils";
import { motion } from "motion/react";
import {
  Bookmark,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Heart,
  Play,
  Share2,
  Star,
  User,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import CastCard from "@/components/common/cast-card";
import LoadingSpinner from "@/components/common/loading-spinner";
import EmptyState from "@/components/common/empty-state";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";
import { toggleFavouriteMutationOptions } from "@/features/profile";

import type { FavouritePayload } from "@/types/types";
import { useFavouriteStore } from "@/stores/favourite-store";

const MovieDetailsSection = () => {
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("id");
  const [userRating] = useState(0);
  const { favourites } = useFavouriteStore();
  const isInWatchlist = false;
  const { data, isLoading, status } = useQuery(
    getMovieInfoQueryOptions(queryId as string)
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  const isFavorited = favourites.some(
    (item) => item.id === data?.details.id && item.media_type === "movie"
  );

  const { mutate, isPending } = useMutation(toggleFavouriteMutationOptions());

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.offsetWidth / 1.2;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading)
    return <LoadingSpinner landing text="Loading movie details..." />;

  if (status === "error")
    return (
      <EmptyState
        icon={X}
        title="Failed to fetch movie details"
        description="Check your network connection and try again"
      />
    );

  const toggleFavorite = () => {
    if (!user) {
      toast.warning("Login to add movie to favourites");
      return;
    }
    if (!data) return;

    const payload: FavouritePayload = {
      id: data.details.id,
      title: data.details.title,
      release_date: data.details.release_date,
      poster_path: data.details.poster_path,
      vote_average: data.details.vote_average,
      media_type: "movie",
    };

    mutate(payload);
  };

  return (
    <>
      <section className="relative xl:h-[calc(100vh_-_64px)] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={getBackdropUrl(
              data?.details.backdrop_path as string,
              "original"
            )}
            alt={data?.details.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            <div className="flex items-center space-x-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Movie
              </span>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                <span className="text-sm font-medium">
                  {data?.details.vote_average.toFixed(1)} (
                  {data?.details.vote_count.toLocaleString()} votes)
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {data?.details.title}
            </h1>

            {data?.details.tagline && (
              <p className="text-xl text-gray-200 italic">
                "{data?.details.tagline}"
              </p>
            )}

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl line-clamp-[11] leading-relaxed">
              {data?.details.overview}
            </p>

            {/* Movie Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(data?.details.release_date as Date).getFullYear()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{formatRuntime(data?.details.runtime as number)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>{data?.details.original_language.toUpperCase()}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {data?.details.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                //   onClick={() => setShowTrailer(true)}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-200 group cursor-pointer"
              >
                <Play
                  className="h-5 w-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                />
                <span>Watch Trailer</span>
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={toggleFavorite}
                  className={`p-4 rounded-full backdrop-blur-sm transition-all duration-200 ${
                    isFavorited
                      ? "bg-red-500 text-white"
                      : "bg-white/20 text-white hover:bg-red-500"
                  } ${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <Heart
                    className="h-5 w-5"
                    fill={isFavorited ? "currentColor" : "none"}
                  />
                </button>
                <button
                  // onClick={toggleWatchlist}
                  className={`p-4 rounded-full backdrop-blur-sm transition-all duration-200 cursor-pointer ${
                    isInWatchlist
                      ? "bg-amber-500 text-white"
                      : "bg-white/20 text-white hover:bg-amber-500"
                  }`}
                >
                  <Bookmark
                    className="h-5 w-5"
                    fill={isInWatchlist ? "currentColor" : "none"}
                  />
                </button>
                <button className="p-4 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 cursor-pointer">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* User Rating */}
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Rate this movie:</p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="transition-colors">
                    <Star
                      className={`h-6 w-6 ${
                        star <= userRating ? "text-yellow-400" : "text-gray-400"
                      }`}
                      fill={star <= userRating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <img
              src={getPosterUrl(data?.details.poster_path as string, "w500")}
              alt={data?.details.title}
              className="w-full max-w-md mx-auto rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Casts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <User className="h-6 w-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Casts
              </h2>
            </div>
          </div>

          <div className="relative">
            {/* Arrows */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 md:-left-6 lg:-left-8 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/30 backdrop-blur-sm hover:bg-black/50 rounded-full text-white transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 md:-right-6 lg:-right-8 top-1/2 transform -translate-y-1/2 z-20 p-3 backdrop-blur-sm bg-black/30 hover:bg-black/50 rounded-full text-white transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-white" />
            </button>

            <div
              ref={scrollRef}
              className="grid grid-flow-col auto-cols-[230px] gap-6 overflow-x-scroll scroll-smooth transition-all scrollbar-none py-2"
            >
              {data?.casts.cast.map((cast) => (
                <CastCard key={cast.id} castMember={cast} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetailsSection;
