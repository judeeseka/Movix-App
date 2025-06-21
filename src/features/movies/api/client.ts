import { movieGenres } from "@/lib/contants";
import { capitalizeWords } from "@/lib/utils";
import type { IMovie } from "@/types/types";
import axios from "axios";
import type { MovieInfo, MovieReview } from "../types/types";

const movieApi = axios.create({
  baseURL: "http://localhost:3000/api/movies",
});

export const getAllMovies = async ({
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
  const genreId = movieGenres.find((g) => g.name === capitalizeWords(genre));

  const response = await movieApi.get<IMovie>("/discover", {
    params: {
      page: pageParam,
      ...(genre && { with_genres: genreId!.id }),
      ...(year && { year: Number(year) }),
      ...(sortBy !== "popularity.desc" && { sort_by: sortBy }),
      ...(rating && { "vote_average.gte": Number(rating) }),
    },
  });

  return {
    results: response.data.data.results,
    page: response.data.data.page,
    total_pages: response.data.data.total_pages,
  };
};

export const getMovieInfo = async (id: string) => {
  const response = await movieApi.get<MovieInfo>(`/${id}/details`);

  return response.data.data
}

export const getMovieReviews = async (pageParam = 1,id: string) => {
  const response = await movieApi.get<MovieReview>(`/${id}/reviews`, {
    params: {
      page: pageParam
    }
  })

  return {
    results: response.data.data.results,
    page: response.data.data.page,
    total_pages: response.data.data.total_pages
  }
}

export const getMovieRecommendations = async (pageParam = 1,id: string) => {
  const response = await movieApi.get<IMovie>(`/${id}/recommendations`, {
    params: {
      page: pageParam
    }
  })

  return {
    results: response.data.data.results,
    page: response.data.data.page,
    total_pages: response.data.data.total_pages
  }
}

