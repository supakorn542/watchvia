import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchTMDB, BASE_IMG_URL } from "../app/utils/tmdb";
import HeroCarousel from "./components/HeroCarousel";
import MovieRow from "./components/MovieRow";
import { Movie } from "./types/tmdb";

export default async function HomePage() {
  const trendingData = fetchTMDB("/trending/all/day");
  const thaiData = fetchTMDB(
    "/discover/movie?with_original_language=th&sort_by=popularity.desc"
  );
  const animeData = fetchTMDB(
    "/discover/movie?with_genres=16&with_original_language=ja&sort_by=popularity.desc"
  );
  const actionData = fetchTMDB(
    "/discover/movie?with_genres=28&sort_by=popularity.desc"
  );

  const [trending, thai, anime, action] = await Promise.all([
    trendingData,
    thaiData,
    animeData,
    actionData,
  ]);

  const movieAndTvTrending = trending.results.filter(
    (item: Movie) => item.media_type !== "person"
  );

  return (
    <main className="min-h-screen">
      <HeroCarousel movies={movieAndTvTrending} />
      <div className="relative z-10 space-y-2">
        <MovieRow title="มาแรงวันนี้" movies={movieAndTvTrending} />
        <MovieRow title="หนังไทยยอดฮิต" movies={thai.results} />
        <MovieRow title="บู๊ล้างผลาญ (Action)" movies={action.results} />
        <MovieRow title="อนิเมะญี่ปุ่น" movies={anime.results} />
      </div>
    </main>
  );
}
