import type { FavouritePayload } from "@/types/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FavouriteState {
    favourites: FavouritePayload[];
    setFavourites: (favorites: FavouritePayload[]) => void;
    toggleFavourite: (movie: FavouritePayload) => void
}

export const useFavouriteStore = create(
    devtools<FavouriteState>((set) => ({
        favourites: [],
        setFavourites: (favourites) => set({ favourites }),
        toggleFavourite: (movie) =>
            set((state) => {
                const exists = state.favourites.some(
                    (item) => item.id === movie.id && item.media_type === movie.media_type
                );
                return {
                    favourites: exists
                        ? state.favourites.filter(
                            (item) => !(item.id === movie.id && item.media_type === movie.media_type)
                        )
                        : [...state.favourites, movie]
                };
            })
    }), { name: "FavouriteStore" })
)