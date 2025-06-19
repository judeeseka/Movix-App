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