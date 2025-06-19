import axios from "axios"
import type { MovieData } from "../../../types/types";

const moviesApi = axios.create({
    baseURL: "http://localhost:3000/api/movies"
})

const seriesApi = axios.create({
    baseURL: "http://localhost:3000/api/series"
})

export const getTrendingMovies = async () => {
    const response = await moviesApi.get<MovieData>("/trending");
    return response.data.data
}

export const getPopularMovies = async () => {
    const response = await moviesApi.get<MovieData>("/popular");
    return response.data.data
}

export const getTopRatedMovies = async () => {
    const response = await moviesApi.get<MovieData>("/top-rated");
    return response.data.data
}

export const getPopularSeries = async () => {
    const response = await seriesApi.get<MovieData>("/popular")
    return response.data.data
}

export const getTopRatedSeries = async () => {
    const response = await seriesApi.get<MovieData>("/top-rated");
    return response.data.data
}