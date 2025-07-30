import type { WatchListProp, WatchListMediaProp } from "@/types/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UpsertWatchlist {
    _id: string;
    name?: string;
    description?: string;
    is_public: boolean
}

interface WatchlistState {
  watchlists: WatchListProp[];
  setWatchlists: (watchlists: WatchListProp[]) => void;
  toggleWatchlist: (watchlist: WatchListMediaProp) => void;
  upsertWatchlist: (payload: UpsertWatchlist) => void;
  deleteWatchlist: (_id: string) => void
}

export const useWatchListStore = create(
  devtools<WatchlistState>(
    (set) => ({
      watchlists: [],
      setWatchlists: (watchlists) => set({ watchlists }),
      toggleWatchlist: (watchlist) =>
        set((state) => {
          const { watchlist_name, ...media } = watchlist;
          const existing = state.watchlists.find(
            (list) => list.name === watchlist_name
          ) as WatchListProp;

          const existsInMedia = existing.media.some(
            (w) => w.id === media.id && w.media_type === media.media_type
          );

          const updatedMedia = existsInMedia
            ? existing.media.filter(
                (w) => w.id === media.id && w.media_type === media.media_type
              )
            : [...existing.media, media];

            const updatedWatchList = {
                ...existing,
                media: updatedMedia
            }

        return {
            watchlists: state.watchlists.map((w) => w.name === watchlist_name ? updatedWatchList : w) 
        }
        }),
        upsertWatchlist: (payload) => set((state) => {
            const {_id, name, description, is_public} = payload

            if (_id) {
                // UPDATE existing by _id
                return {
                  watchlists: state.watchlists.map((w) =>
                    w._id === _id
                      ? {
                          ...w,
                          ...(name && { name }),
                          ...(description && { description }),
                          ...(is_public && { is_public }),
                        }
                      : w
                  ),
                };
              }
          
              // CREATE new waitlist
              return {
                waitlists: [
                  ...state.watchlists,
                  {
                    _id: crypto.randomUUID?.(),
                    name,
                    description: description || "",
                    is_public,
                    media: [],
                  },
                ],
              };
        }),

        deleteWatchlist: (_id) =>
            set((state) => ({
              watchlists: state.watchlists.filter((w) => w._id !== _id),
            })),
    }),
    { name: "WatchlistStore" }
  )
);
