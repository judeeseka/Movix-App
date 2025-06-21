import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Film, Tv } from "lucide-react";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getMiniSearchQueryOptions } from "../api/query";
import { useDebounce } from "@/hooks/use-debounce";
import type { SearchResult } from "../types/types";
import { getPosterUrl } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading } = useQuery(
    getMiniSearchQueryOptions(debouncedQuery)
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  //   const handleSearch = (searchQuery: string) => {
  //     if (searchQuery.trim()) {
  //       // Add to search history
  //       const newHistory = [
  //         searchQuery,
  //         ...searchHistory.filter((h) => h !== searchQuery),
  //       ].slice(0, 5);
  //       setSearchHistory(newHistory);
  //       localStorage.setItem("searchHistory", JSON.stringify(newHistory));

  //       // Navigate to search results page
  //       window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  //       onClose();
  //     }
  //   };

  //   const clearHistory = () => {
  //     setSearchHistory([]);
  //     localStorage.removeItem("searchHistory");
  //   };

  const getMediaTitle = (item: SearchResult) => {
    return item.media_type === "movie" ? item.title : item.name;
  };

  const getMediaYear = (item: SearchResult) => {
    const date =
      item.media_type === "movie" ? item.release_date : item.first_air_date;
    return date ? new Date(date).getFullYear() : "TBD";
  };

  const getMediaLink = (item: SearchResult) => {
    return item.media_type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  //   onKeyUp={(e) => e.key === "Enter" && handleSearch(query)}
                  placeholder="Search for movies and TV shows..."
                  className="w-full pl-12 pr-12 py-4 text-lg bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-900 dark:text-white"
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {
                query.trim() && (
                  // Search Results
                  <div className="p-6">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                      </div>
                    ) : data?.results && data?.results.length > 0 ? (
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Search Results
                        </h3>
                        {data.results.map((item) => (
                          <Link
                            key={`${item.media_type}-${item.id}`}
                            to={getMediaLink(item)}
                            onClick={onClose}
                            className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                          >
                            <img
                              src={getPosterUrl(
                                item.poster_path as string,
                                "w92"
                              )}
                              alt={getMediaTitle(item)}
                              className="w-12 h-18 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                {item.media_type === "tv" ? (
                                  <Tv className="h-4 w-4 text-blue-500" />
                                ) : (
                                  <Film className="h-4 w-4 text-green-500" />
                                )}
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                  {item.media_type === "tv"
                                    ? "TV Series"
                                    : "Movie"}
                                </span>
                              </div>
                              <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors truncate">
                                {getMediaTitle(item)}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {getMediaYear(item)} • ⭐{" "}
                                {item.vote_average &&
                                  item.vote_average.toFixed(1)}
                              </p>
                            </div>
                          </Link>
                        ))}
                        <button
                          //   onClick={() => handleSearch(query)}
                          className="w-full text-center py-3 text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300 font-medium"
                        >
                          View all results for "{query}"
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          No results found for "{query}"
                        </p>
                      </div>
                    )}
                  </div>
                )
                //   : (
                //     // Default Content
                //     <div className="p-6 space-y-6">
                //       {/* Search History */}
                //       {searchHistory.length > 0 && (
                //         <div>
                //           <div className="flex items-center justify-between mb-3">
                //             <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center">
                //               <Clock className="h-4 w-4 mr-2" />
                //               Recent Searches
                //             </h3>
                //             <button
                //               onClick={clearHistory}
                //               className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                //             >
                //               Clear
                //             </button>
                //           </div>
                //           <div className="space-y-1">
                //             {searchHistory.map((historyItem, index) => (
                //               <button
                //                 key={index}
                //                 onClick={() => {
                //                   setQuery(historyItem);
                //                   handleSearch(historyItem);
                //                 }}
                //                 className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                //               >
                //                 {historyItem}
                //               </button>
                //             ))}
                //           </div>
                //         </div>
                //       )}

                //       {/* Trending */}
                //       <div>
                //         <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center">
                //           <TrendingUp className="h-4 w-4 mr-2" />
                //           Trending Now
                //         </h3>
                //         <div className="space-y-3">
                //           {trending.map((item) => (
                //             <Link
                //               key={`${item.media_type}-${item.id}`}
                //               to={getMediaLink(item)}
                //               onClick={onClose}
                //               className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                //             >
                //               <img
                //                 src={tmdbApi.getPosterUrl(item.poster_path, "w92")}
                //                 alt={getMediaTitle(item)}
                //                 className="w-12 h-18 object-cover rounded-lg"
                //               />
                //               <div className="flex-1 min-w-0">
                //                 <div className="flex items-center space-x-2">
                //                   {item.media_type === "tv" ? (
                //                     <Tv className="h-4 w-4 text-blue-500" />
                //                   ) : (
                //                     <Film className="h-4 w-4 text-green-500" />
                //                   )}
                //                   <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                //                     {item.media_type === "tv"
                //                       ? "TV Series"
                //                       : "Movie"}
                //                   </span>
                //                 </div>
                //                 <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors truncate">
                //                   {getMediaTitle(item)}
                //                 </h4>
                //                 <p className="text-sm text-gray-500 dark:text-gray-400">
                //                   {getMediaYear(item)} • ⭐{" "}
                //                   {item.vote_average.toFixed(1)}
                //                 </p>
                //               </div>
                //             </Link>
                //           ))}
                //         </div>
                //       </div>
                //     </div>
                //   )
              }
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
