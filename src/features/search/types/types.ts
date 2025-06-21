export interface ISearch {
    success: boolean;
    message: string;
    data:    SearchData;
}

export interface SearchData {
    page:          number;
    results:       SearchResult[];
    total_pages:   number;
    total_results: number;
}

export interface SearchResult {
    backdrop_path?:        null | string;
    id:                    number;
    title?:                string;
    original_title?:       string;
    overview?:             string;
    poster_path?:          null | string;
    media_type:            "movie" | "person" | "tv";
    adult:                 boolean;
    original_language?:    string;
    genre_ids?:            number[];
    popularity:            number;
    release_date?:         Date;
    video?:                boolean;
    vote_average?:         number;
    vote_count?:           number;
    name?:                 string;
    original_name?:        string;
    first_air_date?:       Date;
    origin_country?:       string[];
    gender?:               number;
    known_for_department?: string;
    profile_path?:         null | string;
    known_for?:            KnownFor[];
}

export interface KnownFor {
    backdrop_path:     string;
    id:                number;
    title:             string;
    original_title:    string;
    overview:          string;
    poster_path:       string;
    media_type:        "movie" | "person" | "tv";
    adult:             boolean;
    original_language: "en" | "ja";
    genre_ids:         number[];
    popularity:        number;
    release_date:      Date;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}
