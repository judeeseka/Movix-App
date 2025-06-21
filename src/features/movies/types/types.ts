export interface MovieInfo {
    success: boolean;
    message: string;
    data:    MovieInfoData;
}

export interface MovieInfoData {
    details: Details;
    casts:   Casts;
}

export interface Casts {
    id:   number;
    cast: Cast[];
    crew: Cast[];
}

export interface Cast {
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for_department: Department;
    name:                 string;
    original_name:        string;
    popularity:           number;
    profile_path:         null | string;
    cast_id?:             number;
    character?:           string;
    credit_id:            string;
    order?:               number;
    department?:          Department;
    job?:                 string;
}

export const Department = {
    Acting : "Acting",
    Art : "Art",
    Camera : "Camera",
    CostumeMakeUp : "Costume & Make-Up",
    Crew : "Crew",
    Directing : "Directing",
    Editing : "Editing",
    Production : "Production",
    Sound : "Sound",
    VisualEffects : "Visual Effects",
    Writing : "Writing",
}

export type Department = keyof typeof Department

export interface Details {
    adult:                 boolean;
    backdrop_path:         string;
    belongs_to_collection: null;
    budget:                number;
    genres:                Genre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    origin_country:        string[];
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           string;
    production_companies:  ProductionCompany[];
    production_countries:  ProductionCountry[];
    release_date:          Date;
    revenue:               number;
    runtime:               number;
    spoken_languages:      SpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface ProductionCompany {
    id:             number;
    logo_path:      string;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}

export interface MovieReview {
    success: boolean;
    message: string;
    data:    MovieReviewData;
}

export interface MovieReviewData {
    id:            number;
    page:          number;
    results:       MovieReviewResult[];
    total_pages:   number;
    total_results: number;
}

export interface MovieReviewResult {
    author:         string;
    author_details: AuthorDetails;
    content:        string;
    created_at:     Date;
    id:             string;
    updated_at:     Date;
    url:            string;
}

export interface AuthorDetails {
    name:        string;
    username:    string;
    avatar_path: null | string;
    rating:      number;
}
