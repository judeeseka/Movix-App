import {queryOptions} from "@tanstack/react-query"
import { getPopularMovies, getPopularSeries, getTopRatedMovies, getTopRatedSeries, getTrendingMovies } from "./client"

export const gettrendingMoviesQueryOptions = () => queryOptions({
    queryKey: ["trending-movies"],
    queryFn: getTrendingMovies
})

export const getPopularMoviesQueryOptions = () => queryOptions({
    queryKey: ["popular-movies"],
    queryFn: getPopularMovies
})

export const getTopRatedQueryOptions = () => queryOptions({
    queryKey: ["top-rated-movies"],
    queryFn: getTopRatedMovies
})

export const getPopularSeriesQueryOptions = () => queryOptions({
    queryKey: ["popular-series"],
    queryFn: getPopularSeries
})

export const getTopRatedSeriesQueryOptions = () => queryOptions({
    queryKey: ['top-rated-series'],
    queryFn: getTopRatedSeries
})