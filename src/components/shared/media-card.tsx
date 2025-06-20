import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, Bookmark, Calendar, Tv } from "lucide-react";
import type { Result } from "../../types/types";
import { getPosterUrl } from "@/lib/utils";

interface MediaCardProps {
  media: Result;
  onFavorite?: (media: Result) => void;
  onWatchlist?: (media: Result) => void;
  isFavorited?: boolean;
  isInWatchlist?: boolean;
  mode?: "both";
  type: "movie" | "tv";
}

export default function MediaCard({
  media,
  onFavorite,
  onWatchlist,
  isFavorited = false,
  isInWatchlist = false,
  type,
}: MediaCardProps) {
  const title = type === "movie" ? media.title : media.name;
  const releaseDate =
    type === "movie" ? media.release_date : media.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "TBD";
  const posterUrl = getPosterUrl(media.poster_path, "w500");
  const linkPath =
    type === "movie" ? `/movies/${media.id}` : `/tv-series/${media.id}`;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Poster */}
      <div className="relative overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="w-full min-h-[250px] object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl"
          loading="lazy"
        />

        {/* Media Type Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
          {type === "tv" ? (
            <Tv className="h-3 w-3 text-blue-400" />
          ) : (
            <Calendar className="h-3 w-3 text-green-400" />
          )}
          <span className="text-white text-xs font-medium uppercase">
            {type === "tv" ? "TV" : "Movie"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {onFavorite && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onFavorite(media);
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isFavorited
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white hover:bg-red-500"
              }`}
            >
              <Heart
                className="h-4 w-4"
                fill={isFavorited ? "currentColor" : "none"}
              />
            </button>
          )}
          {onWatchlist && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onWatchlist(media);
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isInWatchlist
                  ? "bg-amber-500 text-white"
                  : "bg-white/20 text-white hover:bg-amber-500"
              }`}
            >
              <Bookmark
                className="h-4 w-4"
                fill={isInWatchlist ? "currentColor" : "none"}
              />
            </button>
          )}
        </div>

        {/* Play Button */}
        {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
            <Play className="h-8 w-8 text-white" fill="currentColor" />
          </div>
        </div> */}

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="h-3 w-3 text-yellow-400" fill="currentColor" />
          <span className="text-white text-xs font-medium">
            {media.vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <Link to={linkPath} className="block p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 mb-2 group-hover:text-amber-500 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{year}</p>
      </Link>
    </motion.div>
  );
}
