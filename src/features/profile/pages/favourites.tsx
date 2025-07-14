import { useState } from "react";
import { motion } from "motion/react";
import {
  Heart,
  Search,
  // X, Trash2
} from "lucide-react";
import { toast } from "sonner";
import EmptyState from "@/components/common/empty-state";
import MediaCard from "@/components/common/media-card";
import { useDebounce } from "@/hooks/use-debounce";
import { useFavouriteStore } from "@/stores/favourite-store";

export default function Favourites() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaTypeFilter, setMediaTypeFilter] = useState<
    "all" | "movie" | "tv"
  >("all");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  //   const [selectedItems, setSelectedItems] = useState<number[]>([]);
  //   const [isSelectionMode, setIsSelectionMode] = useState(false);
  const { favourites } = useFavouriteStore();

  const filteredFavourites = favourites?.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      item.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    const matchesMediaType =
      mediaTypeFilter === "all" || item.media_type === mediaTypeFilter;

    return matchesSearch && matchesMediaType;
  });

  const removeFavorite = (mediaId: number) => {
    const savedFavorites = localStorage.getItem("userFavorites");
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      const updatedIds = favoriteIds.filter((id: number) => id !== mediaId);
      localStorage.setItem("userFavorites", JSON.stringify(updatedIds));
    }

    toast.success("Removed from favorites");
  };

  //   const toggleSelection = (mediaId: number) => {
  //     setSelectedItems((prev) =>
  //       prev.includes(mediaId)
  //         ? prev.filter((id) => id !== mediaId)
  //         : [...prev, mediaId]
  //     );
  //   };

  //   const selectAll = () => {
  //     if (filteredFavourites)
  //       setSelectedItems(filteredFavourites.map((item) => item.id));
  //   };

  //   const clearSelection = () => {
  //     setSelectedItems([]);
  //     setIsSelectionMode(false);
  //   };

  //   const removeSelected = () => {
  //     selectedItems.forEach((id) => removeFavorite(id));
  //     clearSelection();
  //     toast.success(`Removed ${selectedItems.length} items from favorites`);
  //   };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Favorites
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Your collection of favorite movies and TV shows
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search favorites..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <select
                value={mediaTypeFilter}
                onChange={(e) =>
                  setMediaTypeFilter(e.target.value as "all" | "movie" | "tv")
                }
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="movie">Movies</option>
                <option value="tv">TV Shows</option>
              </select>
            </div>

            {/* Actions */}
            {/* <div className="flex items-center space-x-4"> */}
            {/* Selection Mode */}
            {/* {!isSelectionMode ? (
                <button
                  onClick={() => setIsSelectionMode(true)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Select
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={selectAll}
                    className="text-amber-600 hover:text-amber-500 text-sm"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearSelection}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {selectedItems.length > 0 && (
                    <button
                      onClick={removeSelected}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Remove ({selectedItems.length})</span>
                    </button>
                  )}
                </div>
              )}
            </div> */}
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredFavourites?.length} of {favourites?.length} favorites
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        </div>

        {/* Content */}
        {filteredFavourites?.length === 0 ? (
          <EmptyState
            icon={Heart}
            title={
              favourites?.length === 0 ? "No favorites yet" : "No matches found"
            }
            description={
              favourites?.length === 0
                ? "Start adding movies and TV shows to your favorites to see them here."
                : "Try adjusting your search or filters to find your favorites."
            }
            action={
              favourites?.length === 0
                ? {
                    label: "Discover Movies",
                    onClick: () => (window.location.href = "/movies"),
                  }
                : {
                    label: "Clear Filters",
                    onClick: () => {
                      setSearchQuery("");
                      setMediaTypeFilter("all");
                    },
                  }
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredFavourites?.map((item, index) => (
              <motion.div
                key={`${item.media_type}-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative"
              >
                {/* {isSelectionMode && (
                  <div className="absolute top-2 left-2 z-10">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelection(item.id)}
                      className="w-5 h-5 text-amber-600 bg-white border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                    />
                  </div>
                )} */}

                <MediaCard
                  type={item.media_type}
                  media={item}
                  onFavorite={() => removeFavorite(item.id)}
                  isFavorited={true}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
