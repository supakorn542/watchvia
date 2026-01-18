import React from "react";
import {
  fetchTvDetail,
  BASE_IMG_URL_ORIGINAL,
  BASE_IMG_URL,
} from "@/app/utils/tmdb";
import Image from "next/image";
import {
  StarFilled,
  ClockCircleOutlined,
  CalendarOutlined,
  PlayCircleFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import Link from "next/link";
import MovieRow from "@/app/components/MovieRow";
import CastRow from "@/app/components/CastRow";
import { MovieDetail, ProviderItem } from "@/app/types/tmdb";

export default async function TvDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tv: MovieDetail = await fetchTvDetail(id);

  const runtime = tv.episode_run_time && tv.episode_run_time.length > 0
    ? tv.episode_run_time[0]
    : 0;

  const formatTime = (mins: number) => {
    if (!mins) return "-";
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };


  const title = tv.name || "No title";
  const isLongTitle = title.length > 40;


  const creators = tv.created_by || [];

  const video = tv.videos.results.find(
    (item) =>
      (item.type === "Trailer" || item.type === "Teaser") &&
      item.site === "YouTube"
  );


  const thaiProvider = tv["watch/providers"]?.results?.TH;

  const rentBuyList = [
    ...(thaiProvider?.rent || []),
    ...(thaiProvider?.buy || []),
  ].filter((value: ProviderItem, index, array) => {
    return (
      array.findIndex((item) => item.provider_id === value.provider_id) ===
      index
    );
  });

  const hasRentBuy = rentBuyList.length > 0;


  const recommendations =
    tv.recommendations?.results && tv.recommendations.results.length > 0
      ? tv.recommendations.results
      : tv.similar?.results || [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <div className="relative w-full h-[85vh]">
        <Image
          src={BASE_IMG_URL_ORIGINAL + tv.backdrop_path}
          alt={title}
          fill
          priority
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full max-w-5xl flex flex-col gap-6">
          <div className="flex items-center gap-4 text-sm md:text-base">
            {tv.first_air_date && (
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                <CalendarOutlined />
                {tv.first_air_date.split("-")[0]}
              </span>
            )}

            {tv.number_of_seasons && (
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-gray-300">
                {tv.number_of_seasons} Seasons
                </span>
            )}

            {runtime > 0 && (
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                <ClockCircleOutlined />
                {formatTime(runtime)} / ep
              </span>
            )}

            {tv.vote_average && (
              <span className="flex items-center gap-2 font-bold px-3 py-1 rounded-full text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-md">
                <StarFilled />
                {tv.vote_average?.toFixed(1)}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h1
              className={`${
                isLongTitle ? "text-2xl md:text-4xl" : "text-4xl md:text-7xl"
              } font-bold tracking-tight`}
            >
              {title}
            </h1>
            {tv.tagline && (
              <p className="text-lg md:text-xl text-gray-400 italic font-light">
                &quot;{tv.tagline}&quot;
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            {tv.genres?.map((genre) => (
              <div key={genre.id}>
                <span className="text-xs md:text-sm text-gray-300 px-3 py-1 rounded-full border border-white/20 cursor-default">
                  {genre.name}
                </span>
              </div>
            ))}
          </div>

          <p className="text-base md:text-lg text-gray-300 line-clamp-3 max-w-3xl leading-relaxed">
            {tv.overview}
          </p>

          {creators.length > 0 && (
            <p className="text-gray-400 text-sm flex items-center gap-2">
              ผู้สร้าง:{" "}
              {creators.map((creator) => (
                 <span key={creator.id} className="text-white font-bold mr-2">{creator.name}</span>
              ))}
            </p>
          )}

          <div className="flex flex-wrap items-center">
            {video && (
              <Link
                href={`https://www.youtube.com/watch?v=${video.key}`}
                target="_blank"
              >
                <button className="flex items-center gap-2 px-4 py-2 md:px-6 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold cursor-pointer transition-all hover:scale-105 shadow-lg hover:shadow-red-600/40">
                  <YoutubeFilled className="text-xl" /> ดูตัวอย่าง
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-12 mt-12">
        <div className="px-6 md:px-12">
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm max-w-fit">
            <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider font-bold">
              ช่องทางการรับชม
            </p>
            {thaiProvider ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">สตรีมมิ่ง: </span>
                {thaiProvider.flatrate && (
                  <div className="flex -space-x-3">
                    {thaiProvider.flatrate.map((provider: ProviderItem) => (
                      <div
                        key={provider.provider_id}
                        className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#0a0a0a] hover:scale-110 hover:z-10 transition-transform"
                      >
                        <Image
                          src={BASE_IMG_URL + provider.logo_path}
                          alt={provider.provider_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <span className="text-xs text-gray-400">เช่า/ซื้อ: </span>
                {hasRentBuy && (
                  <div>
                    {rentBuyList.map((provider: ProviderItem) => (
                      <div
                        key={provider.provider_id}
                        className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#0a0a0a] hover:scale-110 hover:z-10 transition-transform"
                      >
                        <Image
                          src={BASE_IMG_URL + provider.logo_path}
                          alt={provider.provider_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  href={`https://www.themoviedb.org/tv/${tv.id}/watch`}
                  target="_blank"
                  className="ml-2 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  <PlayCircleFilled /> ดูทั้งหมด
                </Link>
              </div>
            ) : (
              <div className="text-gray-500 text-sm flex items-center gap-2">
                ยังไม่มีช่องทางรับชมออนไลน์ในขณะนี้
              </div>
            )}
          </div>
        </div>

        <div>
          <CastRow cast={tv.credits.cast} />
        </div>

        {recommendations.length > 0 && (
          <div>
            <MovieRow title="คุณอาจจะชอบสิ่งนี้" movies={recommendations} />
          </div>
        )}
      </div>
    </div>
  );
}