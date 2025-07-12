import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { updateProfileData } from "../api/client";
import type { IUserData } from "../types";
import axios from "axios";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const previouslyRejectedUsername = useRef<string | null>(null);
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);

  const mutation = useMutation({
    mutationFn: (formData: FormData) => updateProfileData(formData),

    onMutate: async (formData: FormData) => {
      const username = formData.get("username")?.toString();
      const name = formData.get("name")?.toString();
      const bio = formData.get("bio")?.toString();
      const genres = formData.getAll("preferredGenres[]").map(String);
      const imageFile = formData.get("avatarImg") as File | null;

      await queryClient.cancelQueries({ queryKey: ["user-data"] });

      const previousUser = queryClient.getQueryData<IUserData>(["user-data"]);

      const previewUrl = imageFile ? URL.createObjectURL(imageFile) : null;

      queryClient.setQueryData(["user-data"], (old: IUserData) => {
        return {
          ...old,
          name: name ?? old.name,
          username: username ?? old.username,
          bio: bio ?? old.bio,
          preferredGenres: genres.length ? genres : old.preferredGenres,
          profileImage: {
            ...old.profileImage,
            path: previewUrl ?? old.profileImage.path,
          },
        };
      });

      return { previousUser, attemptedUsername: username };
    },

    onError: (error: unknown, _variables, context) => {
      console.log(error);
      if (context?.previousUser) {
        queryClient.setQueryData(["user-data"], context.previousUser);
      }

      const attemptedUsername = context?.attemptedUsername;

      if (axios.isAxiosError(error)) {
        if (!error.response) {
          toast.error("Network error, try again!");
        } else {
          if (error?.response?.status === 409 && attemptedUsername) {
            previouslyRejectedUsername.current = attemptedUsername;

            const suggestions = error.response.data?.data?.suggestions || [];
            setUsernameSuggestions(suggestions);

            toast.error(
              "Username is already taken. Try one of the suggestions."
            );
          } else {
            toast.error("Profile update failed.");
          }
        }
      } else {
        toast.error("Internal server error");
      }
    },

    onSuccess: () => {
      previouslyRejectedUsername.current = null;
      setUsernameSuggestions([]);
      toast.success("Profile updated successfully!");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
  });

  return {
    ...mutation,
    previouslyRejectedUsername,
    usernameSuggestions,
  };
};
