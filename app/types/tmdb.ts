export interface Movie {
  id: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  adult: boolean;

  //media_type = movie
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;

  //media_type = tv
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];

  media_type?: "movie" | "tv" | "person";
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
