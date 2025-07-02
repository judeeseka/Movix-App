import type { MovieData } from "../../../types/types";
import { api } from "@/lib/axios";

export const getTrendingMovies = async () => {
    const response = await api.get<MovieData>("/movies/trending");
    return response.data.data
}

export const getPopularMovies = async () => {
    const response = await api.get<MovieData>("/movies/popular");
    return response.data.data
}

export const getTopRatedMovies = async () => {
    const response = await api.get<MovieData>("/movies/top-rated");
    return response.data.data
}

export const getPopularSeries = async () => {
    const response = await api.get<MovieData>("/series/popular")
    return response.data.data
}

export const getTopRatedSeries = async () => {
    const response = await api.get<MovieData>("/series/top-rated");
    return response.data.data
}