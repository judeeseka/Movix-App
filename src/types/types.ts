export interface MovieData {
    success: boolean;
    message: string;
    data:    Data;
}

export interface Data {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface Result {
    backdrop_path:     string;
    id:                number;
    title?:            string;
    original_title?:   string;
    overview:          string;
    poster_path:       string;
    media_type:        "movie" | "tv";
    adult:             boolean;
    original_language: "en" | "ko" | "zh";
    genre_ids:         number[];
    popularity:        number;
    release_date?:     Date;
    video?:            boolean;
    vote_average:      number;
    vote_count:        number;
    name?:             string;
    original_name?:    string;
    first_air_date?:   Date;
    origin_country?:   string[];
}

export interface IMovie {
    success: boolean;
    message: string;
    data:    Data;
}

export interface IMovieData {
    page:          number;
    results:       IMovieResult[];
    total_pages:   number;
    total_results: number;
}

export interface IMovieResult {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      Date;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export interface ISeries {
    success: boolean;
    message: string;
    data:    Data;
}

export interface ISeriesData {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface ISeriesResult {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    origin_country:    Array<"FR" | "GB" | "HU" | "US">;
    original_language: "en" | "fr" | "hu";
    original_name:     string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    first_air_date:    Date;
    name:              string;
    vote_average:      number;
    vote_count:        number;
}

export interface FavouritePayload {
    id: number,
    title?: string;
    name?: string;
    first_air_date?: string;
    release_date?: Date;
    poster_path: string;
    vote_average: number;
    media_type: "movie" | "tv";
}

export interface WatchListMediaItem {
    id: number,
    title?: string;
    name?: string;
    first_air_date?: string;
    release_date?: string;
    poster_path: string;
    vote_average: number;
    media_type: "movie" | "tv";
}

export interface WatchListMediaProp extends WatchListMediaItem {
    watchlist_name: string;
}

export interface WatchListProp {
    _id: string;
    name: string;
    description: string;
    is_public: boolean;
    media: WatchListMediaItem[];
    created_at: Date;
    updated_at: Date;
}