import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import {
  User,
  Edit3,
  Save,
  X,
  Camera,
  Mail,
  Calendar,
  Film,
  Tv,
  Heart,
  Bookmark,
  Star,
  Settings,
  Upload,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

interface ProfileForm {
  fullName: string;
  username: string;
  bio: string;
  favoriteGenres: number[];
}

interface UserStats {
  totalRatings: number;
  averageRating: number;
  favoriteMovies: number;
  favoriteTVShows: number;
  watchlistItems: number;
}

const Profile = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    totalRatings: 0,
    averageRating: 0,
    favoriteMovies: 0,
    favoriteTVShows: 0,
    watchlistItems: 0,
  });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileForm>();

  useEffect(() => {
    fetchGenres();
    loadUserPreferences();
    loadUserStats();
  }, []);

  const fetchGenres = async () => {
    try {
      //   const genreList = await tmdbApi.getGenres();
      //   setGenres(genreList);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const loadUserPreferences = () => {
    const preferences = localStorage.getItem("userPreferences");
    if (preferences) {
      const parsed = JSON.parse(preferences);
      setUserPreferences(parsed);
      setSelectedGenres(parsed.favoriteGenres || []);
      setAvatarPreview(parsed.avatar || "");

      // Set form values
      // setValue("fullName", user?.user_metadata?.full_name || "");
      // setValue("username", user?.user_metadata?.username || "");
      setValue("bio", parsed.bio || "");
    }
  };

  const loadUserStats = () => {
    // Mock user stats (in real app, fetch from backend)
    const mockStats: UserStats = {
      totalRatings: 47,
      averageRating: 4.2,
      favoriteMovies: 23,
      favoriteTVShows: 15,
      watchlistItems: 31,
    };
    setUserStats(mockStats);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // toast.error("Avatar file size must be less than 5MB");
        return;
      }

      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const onSubmit = async (data: ProfileForm) => {
    try {
      setLoading(true);

      // Update user preferences
      const updatedPreferences = {
        ...userPreferences,
        bio: data.bio,
        favoriteGenres: selectedGenres,
        avatar: avatarPreview,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "userPreferences",
        JSON.stringify(updatedPreferences)
      );
      setUserPreferences(updatedPreferences);

      //   toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      //   toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    loadUserPreferences(); // Reset form
  };

  const getSelectedGenreNames = () => {
    return genres
      .filter((genre) => selectedGenres.includes(genre.id))
      .map((genre) => genre.name)
      .join(", ");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="text-center">
                {/* Avatar */}
                <div className="relative inline-block mb-4">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-white" />
                    </div>
                  )}

                  {isEditing && (
                    <label className="absolute bottom-0 right-0 p-2 bg-amber-500 text-white rounded-full cursor-pointer hover:bg-amber-600 transition-colors">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {/* {user?.user_metadata?.full_name || "User"} */}
                  User
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  {/* @{user?.user_metadata?.username || "username"} */}
                  username
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {userPreferences?.bio || "No bio added yet"}
                </p>

                {/* User Info */}
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Joined{" "}
                      {/* {new Date(user?.created_at || "").toLocaleDateString()} */}
                    </span>
                  </div>
                </div>

                {/* Edit Button */}
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 mx-auto"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Ratings
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {userStats.totalRatings}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Avg Rating
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {userStats.averageRating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Film className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Fav Movies
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {userStats.favoriteMovies}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tv className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Fav TV Shows
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {userStats.favoriteTVShows}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bookmark className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Watchlist
                    </span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {userStats.watchlistItems}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Profile Information
                </h3>
                {isEditing && (
                  <div className="flex space-x-2">
                    <button
                      onClick={cancelEdit}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      {...register("fullName", {
                        required: "Full name is required",
                      })}
                      type="text"
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Username
                    </label>
                    <input
                      {...register("username", {
                        required: "Username is required",
                      })}
                      type="text"
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    {...register("bio")}
                    rows={4}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself and your movie preferences..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 resize-none"
                  />
                </div>

                {/* Favorite Genres */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Favorite Genres
                  </label>

                  {isEditing ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {genres.map((genre) => (
                        <button
                          key={genre.id}
                          type="button"
                          onClick={() => toggleGenre(genre.id)}
                          className={`p-2 rounded-lg border text-sm transition-all duration-200 ${
                            selectedGenres.includes(genre.id)
                              ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300"
                              : "border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {genre.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white">
                      {getSelectedGenreNames() || "No genres selected"}
                    </div>
                  )}
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="h-4 w-4" />
                      <span>{loading ? "Saving..." : "Save Changes"}</span>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
