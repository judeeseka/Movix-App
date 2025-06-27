import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Upload,
  User,
  Film,
  Check,
  ArrowRight,
  Camera,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { allGenres } from "@/lib/contants";
import { onboardUser } from "../api/client";
import { useAuthStore } from "@/stores/auth-store";

interface OnboardingForm {
  bio?: string;

  favoriteGenres: number[];
  avatar: File;
}

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, setUser } = useAuthStore();

  const { register, handleSubmit } = useForm<OnboardingForm>();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Avatar file size must be less than 5MB");
        return;
      }
      setAvatar(file);

      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview("");
  };

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const onSubmit = async (data: OnboardingForm) => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (data.bio) {
        formData.append("bio", data.bio);
      }

      selectedGenres.forEach((genreId) => {
        formData.append("preferredGenres[]", genreId.toString());
      });

      if (avatar) formData.append("profileImg", avatar);

      const response = await onboardUser(formData, token as string);

      setUser({
        avatarUrl: response.data.avatarUrl,
        isOnboarded: response.data.isOnboarded,
      });
      navigate("/");
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      toast.error("Onboarding failed");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (selectedGenres.length === 0) {
        toast.error("Please select at least one genre");
        return;
      }
      setStep(3);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step {step} of 3
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {Math.round((step / 3) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-amber-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <User className="h-8 w-8 text-white" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to Movix!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Let's set up your profile to personalize your movie discovery
                  experience
                </p>
              </div>

              {/* Avatar Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Upload Your Avatar
                </h3>

                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    {avatarPreview ? (
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
                    ) : (
                      <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-4 border-dashed border-gray-300 dark:border-gray-600">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <Upload className="h-4 w-4" />
                      <span>
                        {avatarPreview ? "Change Avatar" : "Upload Avatar"}
                      </span>
                    </div>
                  </label>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Optional • Max 5MB • JPG, PNG
                  </p>
                </div>
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-amber-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Film className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Choose Your Favorite Genres
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Select genres you enjoy to get personalized recommendations
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {allGenres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => toggleGenre(genre.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      selectedGenres.includes(genre.id)
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300"
                        : "border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{genre.name}</span>
                      {selectedGenres.includes(genre.id) && (
                        <Check className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Selected: {selectedGenres.length} genre
                  {selectedGenres.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={selectedGenres.length === 0}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Almost Done!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Add a bio to complete your profile (optional)
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio (Optional)
                  </label>
                  <textarea
                    {...register("bio")}
                    rows={4}
                    placeholder="Tell us about yourself and your movie preferences..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Profile Summary:
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-between">
                      <span>Avatar:</span>
                      <span>{avatarPreview ? "Uploaded" : "Not set"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Favorite Genres:</span>
                      <span>{selectedGenres.length} selected</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex flex-1 justify-center items-center bg-gradient-to-r from-amber-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Completing...
                      </>
                    ) : (
                      "Complete Setup"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
