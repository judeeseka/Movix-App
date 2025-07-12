import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Edit3,
  Save,
  X,
  Camera,
  Mail,
  Calendar,
  Star,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserQueryOptions } from "../api/query";
import LoadingSpinner from "@/components/common/loading-spinner";
import EmptyState from "@/components/common/empty-state";
import { allGenres } from "@/lib/contants";
import { arraysAreEqual } from "../utils";
import { useUpdateUserMutation } from "../hooks/use-update-user-mutation";
import { toast } from "sonner";

interface ProfileForm {
  name: string;
  username: string;
  bio: string;
  favoriteGenres: number[];
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery(getUserQueryOptions());
  const {
    mutate: updateUser,
    usernameSuggestions,
    previouslyRejectedUsername,
    isPending,
  } = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileForm>();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Avatar file size must be less than 5MB");
        return;
      }

      setAvatar(file);
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const onSubmit = async (values: ProfileForm) => {
    if (values.username === previouslyRejectedUsername.current) {
      toast.warning("This username was already rejected. Try a different one.");
      return;
    }

    const formData = new FormData();
    if (currentUser?.name !== values.name) formData.append("name", values.name);
    if (currentUser?.username !== values.username)
      formData.append("username", values.username);
    if (currentUser?.bio !== values.bio) formData.append("bio", values.bio);
    if (avatar) formData.append("avatarImg", avatar);

    const isEqualGenre = arraysAreEqual(
      currentUser?.preferredGenres.map((id) => Number(id)) as number[],
      selectedGenres
    );

    if (!isEqualGenre) {
      selectedGenres.forEach((value) => {
        formData.append("preferredGenres[]", value.toString());
      });
    }

    if ([...formData.entries()].length === 0) {
      toast.info("No changes to update");
      setIsEditing(false);
      return;
    }

    updateUser(formData);

    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview("");
  };

  const getSelectedGenreNames = () => {
    const numberedGenres = currentUser?.preferredGenres.map((id) => Number(id));
    return allGenres
      .filter((genre) => numberedGenres?.includes(genre.id))
      .map((genre) => genre.name)
      .join(", ");
  };

  useEffect(() => {
    setSelectedGenres(() => {
      const numberedGenres = currentUser?.preferredGenres.map((id) =>
        Number(id)
      );
      return numberedGenres as number[];
    });
    setValue("name", currentUser?.name || "");
    setValue("username", currentUser?.username || "");
    setValue("bio", currentUser?.bio || "");
  }, [currentUser, setValue]);

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

        {isLoading ? (
          <LoadingSpinner text="Loading user profile..." />
        ) : isError ? (
          <EmptyState
            icon={X}
            title="Failed to display user profile"
            description="Check your network connection and try again"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="text-center">
                  {/* Avatar */}
                  <div className="relative inline-block mb-4">
                    {currentUser?.profileImage.path ? (
                      <img
                        src={currentUser.profileImage.path}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center">
                        <User className="h-12 w-12 text-white" />
                      </div>
                    )}

                    {isEditing && !avatarPreview && (
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

                    {isEditing && avatarPreview && (
                      <div className="relative">
                        <img
                          src={avatarPreview}
                          alt="Avatar preview"
                          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
                        />
                        <button
                          onClick={removeAvatar}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {currentUser?.name || "User"}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    @{currentUser?.username || "username"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {currentUser?.bio || "No bio added yet"}
                  </p>

                  {/* User Info */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{currentUser?.email}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Joined{" "}
                        {new Date(
                          currentUser?.createdAt || ""
                        ).toLocaleDateString()}
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
                      {currentUser?.totalReviews}
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
                      {currentUser?.totalReviews.toFixed(1)}
                    </span>
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Film className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Fav Movies
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {userStats.favoriteMovies}
                    </span>
                  </div> */}
                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tv className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Fav TV Shows
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {userStats.favoriteTVShows}
                    </span>
                  </div> */}
                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bookmark className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Watchlist
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {userStats.watchlistItems}
                    </span>
                  </div> */}
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
                        {...register("name", {
                          required: "Full name is required",
                        })}
                        type="text"
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.name.message}
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
                      {usernameSuggestions.length > 0 && (
                        <div className="mt-2 text-sm text-red-600">
                          <p>Try one of these usernames:</p>

                          <ul className="list-disc ml-4">
                            {usernameSuggestions.map((suggestion) => (
                              <li
                                key={suggestion}
                                onClick={() => setValue("username", suggestion)}
                              >
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
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
                        {allGenres.map((genre) => (
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
                        {currentUser
                          ? getSelectedGenreNames()
                          : "No genres selected"}
                      </div>
                    )}
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="h-4 w-4" />
                        <span>{isPending ? "Saving..." : "Save Changes"}</span>
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
