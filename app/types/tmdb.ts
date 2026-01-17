export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  original_name: string;
  character?: string;
  profile_path: string | null;
  order?: number;
  job?: string;
  known_for_department?: string;
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface ProviderItem {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
  display_priority?: number;
}

export interface WatchProviders {
  results: {
    [key: string]: {
      link: string;
      flatrate?: ProviderItem[];
      rent?: ProviderItem[];
      buy?: ProviderItem[];
    };
  };
}

export interface BaseMovie {
  id: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  adult: boolean;

  title?: string;
  original_title?: string;
  name?: string;
  original_name?: string;

  release_date?: string;
  first_air_date?: string;

  media_type?: "movie" | "tv" | "person";
}

export interface Movie extends BaseMovie {
  genre_ids?: number[];
  video?: boolean;
  origin_country?: string[];
}

export interface MovieDetail extends BaseMovie {
  status: string;
  tagline: string | null;

  runtime?: number | null;

  episode_run_time?: number[];
  number_of_seasons?: number;
  created_by?: CastMember[];

  genres: Genre[];
  credits: {
    cast: CastMember[];
    crew: CastMember[];
  };
  videos: {
    results: VideoResult[];
  };
  "watch/providers"?: WatchProviders;
  recommendations?: TMDBResponse;
  similar?: TMDBResponse;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
