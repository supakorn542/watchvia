import React from "react";
import { fetchTMDB } from "../utils/tmdb";
import MovieCard from "../components/MovieCard";
import { Movie, MovieDetail } from "../types/tmdb";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = (await searchParams).query;

  if (!query || typeof query !== "string") {
    return (
      <div className="min-h-screen pt-24 px-6 md:px-12 text-white">
        <h1 className="text-2xl font-bold mb-4">Please enter a keyword</h1>
      </div>
    );
  }

  let movies: Movie[] = [];
  try {
    const res = await fetchTMDB(
      `/search/multi?query=${encodeURIComponent(query)}`,
    );
    movies = (res.results || []).filter(
      (item) =>
        (item.media_type === "movie" || item.media_type === "tv") &&
        item.poster_path &&
        item.vote_count > 0,
    );
  } catch (error) {
    console.error("Search Error:", error);
  }

  return (
    <div className="min-h-screen pt-24 px-6 md:px-12 pb-10">
      <div className="flex items-end gap-3 mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Search Results</h1>
        <span className="text-gray-400 text-lg pb-1">for "{query}"</span>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
          {movies.map(
            (movie) =>
              movie.poster_path && <MovieCard key={movie.id} movie={movie} />,
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl">
            No results found matching "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
