import { infiniteQueryOptions } from "@tanstack/react-query";
import { getAllSeries } from "./client";

export const getAllSeriesQueryOptions = (
  genre: string,
  year: string,
  sortBy: string,
  rating: string
) =>
  infiniteQueryOptions({
    queryKey: ["all-movies", genre, year, sortBy, rating],
    queryFn: ({ pageParam = 1 }) =>
      getAllSeries({
        pageParam: Number(pageParam ?? 1),
        genre,
        year,
        sortBy,
        rating,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
