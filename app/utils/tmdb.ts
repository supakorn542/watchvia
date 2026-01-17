import { TMDBResponse } from "../types/tmdb";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

export const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";
export const BASE_IMG_URL_ORIGINAL = "https://image.tmdb.org/t/p/original";

export async function fetchTMDB(endpoint: string): Promise<TMDBResponse> {
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=th-TH`;

  const res = await fetch(url);

  if (!res.ok) throw new Error(`Failed to fetch: ${endpoint}`);

  return res.json();
}

export async function fetchMovieDetail(id: string) {

  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=th-TH&append_to_response=credits,videos,watch/providers,recommendations,similar&include_video_language=th,en`;

  const res = await fetch(url);

  if (!res.ok) throw new Error(`Failed to fetch movie detail`);

  return res.json();
}

export async function fetchTvDetail(id: string) {
  const url = `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=th-TH&append_to_response=credits,videos,watch/providers,recommendations,similar&include_video_language=th,en`;

  const res = await fetch(url);

  if (!res.ok) throw new Error(`Failed to fetch tv detail`);

  return res.json();
}
