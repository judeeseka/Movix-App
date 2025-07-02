import { api } from "@/lib/axios";
import { seriesGenres } from "@/lib/contants";
import { capitalizeWords } from "@/lib/utils";
import type { ISeries } from "@/types/types";

export const getAllSeries = async ({
    pageParam,
    genre,
    year,
    sortBy,
    rating,
  }: {
    pageParam?: number;
    genre: string;
    year: string;
    sortBy: string;
    rating: string;
  }) => {
    const genreId = seriesGenres.find((g) => g.name === capitalizeWords(genre));
    
      const response = await api.get<ISeries>("/series/discover", {
        params: {
          page: pageParam,
          ...(genre && { with_genres: genreId!.id }),
          ...(year && { "first_air_date_year": Number(year) }),
          ...(sortBy !== "popularity.desc" && { sort_by: sortBy }),
          ...(rating && { "vote_average.gte": Number(rating) }),
        },
      });

      return response.data.data
}