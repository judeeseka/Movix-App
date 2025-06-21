import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getAllMovies, getMovieInfo, getMovieRecommendations, getMovieReviews } from "./client";

export const getAllMoviesQueryOptions = (
  genre: string,
  year: string,
  sortBy: string,
  rating: string
) =>
  infiniteQueryOptions({
    queryKey: ["all-movies", genre, year, sortBy, rating],
    queryFn: ({ pageParam = 1 }) =>
      getAllMovies({
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

export const getMovieInfoQueryOptions = (id: string) => queryOptions({
  queryKey: ["single-movie-info", id],
  queryFn: () => getMovieInfo(id)
})

export const getMovieReviewQueryOptions = (id: string) => 
  infiniteQueryOptions({
    queryKey: ["single-movie-reviews", id],
    queryFn: ({pageParam = 1}) => 
      getMovieReviews(Number(pageParam ?? 1), id),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => 
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
  })

export const getMovieRecommendationQueryOptions = (id: string) => 
  infiniteQueryOptions({
    queryKey: ["single-movie-recommendation", id],
    queryFn: ({pageParam = 1}) => 
      getMovieRecommendations(Number(pageParam ?? 1), id),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => 
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
  })