import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Bookmark,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  Search,
  Lock,
  Globe,
} from "lucide-react";
import LoadingSpinner from "@/components/common/loading-spinner";
import EmptyState from "@/components/common/empty-state";
import MediaCard from "@/components/common/media-card";
import { useWatchListStore } from "@/stores/watchlist-store";
// import { useDebounce } from "@/hooks/use-debounce";

interface WatchlistForm {
  name: string;
  description: string;
  is_public: boolean;
}

export default function Watchlists() {
  // const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  // const [selectedWatchlist, setSelectedWatchlist] = useState(
  //   null
  // );
  // const [watchlistItems, setWatchlistItems] = useState<MediaItem[]>([]);
  const [loading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingWatchlist, setEditingWatchlist] = useState<null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  // const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const {
    register,
    // handleSubmit,
    reset,
    // setValue,
    formState: { errors },
  } = useForm<WatchlistForm>();

  const { watchlists } = useWatchListStore();
  const [selectedWatchlist, setSelectedWatchlist] = useState(watchlists[0]);

  // const createWatchlist = async (data: WatchlistForm) => {
  //   try {
  //     const newWatchlist: Watchlist = {
  //       id: Date.now().toString(),
  //       user_id: "user1",
  //       name: data.name,
  //       description: data.description,
  //       is_public: data.is_public,
  //       created_at: new Date().toISOString(),
  //       updated_at: new Date().toISOString(),
  //     };

  //     const updatedWatchlists = [...watchlists, newWatchlist];
  //     setWatchlists(updatedWatchlists);
  //     localStorage.setItem("userWatchlists", JSON.stringify(updatedWatchlists));

  //     setShowCreateModal(false);
  //     reset();
  //     toast.success("Watchlist created successfully!");
  //   } catch (error) {
  //     toast.error("Failed to create watchlist");
  //   }
  // };

  // const updateWatchlist = async (data: WatchlistForm) => {
  //   if (!editingWatchlist) return;

  //   try {
  //     const updatedWatchlist = {
  //       ...editingWatchlist,
  //       name: data.name,
  //       description: data.description,
  //       is_public: data.is_public,
  //       updated_at: new Date().toISOString(),
  //     };

  //     const updatedWatchlists = watchlists.map((w) =>
  //       w.id === editingWatchlist.id ? updatedWatchlist : w
  //     );

  //     setWatchlists(updatedWatchlists);
  //     localStorage.setItem("userWatchlists", JSON.stringify(updatedWatchlists));

  //     if (selectedWatchlist?.id === editingWatchlist.id) {
  //       setSelectedWatchlist(updatedWatchlist);
  //     }

  //     setEditingWatchlist(null);
  //     reset();
  //     toast.success("Watchlist updated successfully!");
  //   } catch (error) {
  //     toast.error("Failed to update watchlist");
  //   }
  // };

  // const deleteWatchlist = async (watchlistId: string) => {
  //   if (watchlists.length === 1) {
  //     toast.error("You must have at least one watchlist");
  //     return;
  //   }

  //   try {
  //     const updatedWatchlists = watchlists.filter((w) => w.id !== watchlistId);
  //     setWatchlists(updatedWatchlists);
  //     localStorage.setItem("userWatchlists", JSON.stringify(updatedWatchlists));
  //     localStorage.removeItem(`watchlist_${watchlistId}_items`);

  //     if (selectedWatchlist?.id === watchlistId) {
  //       setSelectedWatchlist(updatedWatchlists[0] || null);
  //     }

  //     toast.success("Watchlist deleted successfully!");
  //   } catch (error) {
  //     toast.error("Failed to delete watchlist");
  //   }
  // };

  // const removeFromWatchlist = (mediaId: number) => {
  //   if (!selectedWatchlist) return;

  //   const updatedItems = watchlistItems.filter((item) => item.id !== mediaId);
  //   setWatchlistItems(updatedItems);
  //   localStorage.setItem(
  //     `watchlist_${selectedWatchlist.id}_items`,
  //     JSON.stringify(updatedItems)
  //   );
  //   toast.success("Removed from watchlist");
  // };

  // const openEditModal = (watchlist: Watchlist) => {
  //   setEditingWatchlist(watchlist);
  //   setValue("name", watchlist.name);
  //   setValue("description", watchlist.description || "");
  //   setValue("is_public", watchlist.is_public);
  //   setShowCreateModal(true);
  // };

  const closeModal = () => {
    setShowCreateModal(false);
    setEditingWatchlist(null);
    reset();
  };

  const filteredItems = selectedWatchlist?.media.filter((item) => {
    if (!searchQuery.trim()) return true;
    const title = item.media_type === "movie" ? item.title : item.name;
    return title?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Bookmark className="h-8 w-8 text-amber-500" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Watchlists
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Organize your movies and TV shows into custom lists
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>New Watchlist</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Watchlists Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Watchlists
              </h3>

              {loading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="sm" />
                </div>
              ) : (
                <div className="space-y-2">
                  {watchlists.map((watchlist) => (
                    <div
                      key={watchlist._id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                        selectedWatchlist?._id === watchlist._id
                          ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setSelectedWatchlist(watchlist)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900 dark:text-white truncate">
                              {watchlist.name}
                            </h4>
                            {watchlist.is_public ? (
                              <Globe className="h-3 w-3 text-green-500" />
                            ) : (
                              <Lock className="h-3 w-3 text-gray-400" />
                            )}
                          </div>
                          {watchlist.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {watchlist.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            Created{" "}
                            {new Date(
                              watchlist.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // openEditModal(watchlist);
                            }}
                            className="p-1 text-gray-400 hover:text-amber-500 transition-colors"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // deleteWatchlist(watchlist._id);
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Watchlist Content */}
          <div className="lg:col-span-3">
            {selectedWatchlist ? (
              <div className="space-y-6">
                {/* Watchlist Header */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {selectedWatchlist.name}
                        </h2>
                        {selectedWatchlist.is_public ? (
                          <Globe className="h-5 w-5 text-green-500" />
                        ) : (
                          <Lock className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      {selectedWatchlist.description && (
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {selectedWatchlist.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search items..."
                          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{filteredItems.length} items</span>
                    <span>
                      Updated{" "}
                      {new Date(
                        selectedWatchlist.updated_at
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Watchlist Items */}
                {filteredItems.length === 0 ? (
                  <EmptyState
                    icon={Bookmark}
                    title="No items in this watchlist"
                    description="Start adding movies and TV shows to this watchlist to see them here."
                    action={{
                      label: "Discover Content",
                      onClick: () => (window.location.href = "/movies"),
                    }}
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredItems.map((item, index) => (
                      <motion.div
                        key={`${item.media_type}-${item.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <MediaCard
                          media={item}
                          // onWatchlist={() => removeFromWatchlist(item.id)}
                          isInWatchlist={true}
                          type={item.media_type}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <EmptyState
                icon={Bookmark}
                title="No watchlist selected"
                description="Select a watchlist from the sidebar to view its contents/create new watchlist."
              />
            )}
          </div>
        </div>

        {/* Create/Edit Watchlist Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingWatchlist ? "Edit Watchlist" : "Create New Watchlist"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form
                // onSubmit={handleSubmit(
                //   editingWatchlist ? updateWatchlist : createWatchlist
                // )}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter watchlist name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Optional description"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    {...register("is_public")}
                    type="checkbox"
                    id="is_public"
                    className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                  />
                  <label
                    htmlFor="is_public"
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    Make this watchlist public
                  </label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-amber-500 to-red-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>{editingWatchlist ? "Update" : "Create"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
